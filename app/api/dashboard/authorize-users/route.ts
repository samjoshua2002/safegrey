import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import connectDB from '@/lib/db';
import User from '@/models/User';

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { userIds, action } = body;

        if (!userIds || !Array.isArray(userIds) || userIds.length === 0) {
            return NextResponse.json({ error: 'Invalid user IDs' }, { status: 400 });
        }

        if (!['approve', 'reject'].includes(action)) {
            return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
        }

        await connectDB();

        if (action === 'reject') {
            await User.updateMany(
                { _id: { $in: userIds } },
                { $set: { status: 'rejected' } }
            );
            return NextResponse.json({ message: 'Users rejected successfully' });
        }

        if (action === 'approve') {
            const users = await User.find({ _id: { $in: userIds } });
            const transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: process.env.EMAIL_USER,
                    pass: process.env.EMAIL_PASS,
                },
            });

            const results = await Promise.all(users.map(async (user) => {
                // Generate OTP
                const otp = Math.floor(100000 + Math.random() * 900000).toString();
                const otpExpires = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours

                user.otp = otp;
                user.otpExpires = otpExpires;
                user.status = 'approved'; // Mark as approved, but maybe they need to verify first? User said "grant permission... by approving". I'll mark approved.
                await user.save();

                // Send Email
                const mailOptions = {
                    from: {
                        name: 'SafeGrey Security',
                        address: process.env.EMAIL_USER!,
                    },
                    to: user.email,
                    subject: 'SafeGrey Account Authorization - One Time Password',
                    html: `
                        <div style="font-family: Arial, sans-serif; padding: 20px; color: #333;">
                            <h2>Account Authorized</h2>
                            <p>Hello ${user.name},</p>
                            <p>Your account has been authorized. To finalize your access, please click the link below and use your One Time Password (OTP) to set your secure permanent password.</p>
                            
                            <div style="margin: 30px 0; text-align: center;">
                                <a href="${process.env.NEXT_PUBLIC_APP_URL || 'https://www.safegrey.com'}/dashboard/login" style="background-color: #AE2012; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: bold;">Login to Setup Account</a>
                            </div>

                            <p style="margin-bottom: 5px;">Your One Time Password:</p>
                            <h1 style="color: #AE2012; letter-spacing: 5px; margin-top: 5px;">${otp}</h1>
                            <p>This OTP is valid for 24 hours.</p>
                            <p>If you did not request this, please ignore this email.</p>
                        </div>
                    `,
                };

                try {
                    await transporter.sendMail(mailOptions);
                    return { id: user._id, status: 'success' };
                } catch (error) {
                    console.error(`Failed to email ${user.email}`, error);
                    return { id: user._id, status: 'email_failed' };
                }
            }));

            return NextResponse.json({ message: 'Users approved and emails sent', results });
        }

        return NextResponse.json({ error: 'Action not handled' }, { status: 400 });

    } catch (error) {
        console.error('Error in authorize-users:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
