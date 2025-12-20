import { NextRequest, NextResponse } from 'next/server';
import { cookies } from "next/headers";
import connectDB from '@/lib/db';
import User from '@/models/User';
import bcrypt from 'bcryptjs';

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { email, otp, newPassword } = body;

        const cleanEmail = email?.trim().toLowerCase();
        const cleanOtp = otp?.toString().trim();

        console.log(`Verifying OTP. Email: ${cleanEmail}, InputOTP: '${cleanOtp}'`);

        if (!cleanEmail || !cleanOtp || !newPassword) {
            return NextResponse.json(
                { error: 'Missing required fields' },
                { status: 400 }
            );
        }

        await connectDB();

        // Find user by email and verify they are in 'approved' status but might need setup
        // We select '+otp +otpExpires' because they are excluded by default
        const user = await User.findOne({ email: cleanEmail }).select('+otp +otpExpires +password +status');

        if (!user) {
            console.log('User not found in DB');
            return NextResponse.json({ error: 'User not found' }, { status: 404 });
        }

        console.log(`User found. DB OTP: '${user.otp}'`);

        // Check if user is already set up (has password and no OTP valid needed?)
        // If user status is approved/active, we check OTP.

        if (user.otp !== cleanOtp) {
            console.log(`OTP Mismatch: '${user.otp}' !== '${cleanOtp}'`);
            return NextResponse.json({ error: 'Invalid One Time Password' }, { status: 400 });
        }

        if (user.otpExpires && new Date() > user.otpExpires) {
            console.log('OTP Expired');
            return NextResponse.json({ error: 'One Time Password has expired' }, { status: 400 });
        }

        // OTP is valid. Set new password.
        const hashedPassword = await bcrypt.hash(newPassword, 10);

        user.password = hashedPassword;
        user.otp = undefined; // Clear OTP
        user.otpExpires = undefined;
        // Ensure status stays approved or moves to 'active' if you have that state. 
        // We stick with 'approved' as per previous setup or 'active'.
        // User asked "granted permission forever unless admin reject", so 'approved' or 'active' is fine.
        user.status = 'approved';

        await user.save();

        // Auto-login: Set cookie
        cookies().set("admin_token", `user_${user._id}`, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 60 * 60 * 24, // 1 day
            path: "/",
        })

        return NextResponse.json({ message: 'Password set successfully. You can now login.' });

    } catch (error) {
        console.error('Error in complete-setup:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
