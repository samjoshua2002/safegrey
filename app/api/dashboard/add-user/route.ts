import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import connectDB from '@/lib/db';
import User from '@/models/User';

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { name, email } = body;

        if (!name || !email) {
            return NextResponse.json({ error: 'Name and Email are required' }, { status: 400 });
        }

        await connectDB();

        // Check if user already exists
        const existingUser = await User.findOne({ email: email.toLowerCase() });
        if (existingUser) {
            return NextResponse.json({ error: 'User with this email already exists' }, { status: 400 });
        }

        // Generate OTP
        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        const otpExpires = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours

        // Create new user
        const newUser = await User.create({
            name,
            email,
            status: 'approved', // Auto-approve manual additions
            otp,
            otpExpires,
        });

        // Send Email
        console.log(`Attempting to send email to: ${email}`);
        console.log(`EMAIL_USER present: ${!!process.env.EMAIL_USER}`);
        console.log(`EMAIL_PASS present: ${!!process.env.EMAIL_PASS}`);

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });

        const mailOptions = {
            from: {
                name: 'SafeGrey Security',
                address: process.env.EMAIL_USER!,
            },
            to: email,
            subject: 'SafeGrey Account Authorization - One Time Password',
            html: `
                <div style="font-family: Arial, sans-serif; padding: 20px; color: #333;">
                    <h2>Account Authorized</h2>
                    <p>Hello ${name},</p>
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
            const info = await transporter.sendMail(mailOptions);
            console.log('Email sent successfully:', info.messageId);
        } catch (mailError) {
            console.error('Nodemailer error:', mailError);
            // Don't fail the whole request, but log it
        }

        return NextResponse.json({
            message: 'User created and authorization email sent',
            user: {
                _id: newUser._id,
                name: newUser.name,
                email: newUser.email,
                status: newUser.status
            }
        });

    } catch (error) {
        console.error('Error adding user:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
