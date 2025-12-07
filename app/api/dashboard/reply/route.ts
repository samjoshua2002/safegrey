import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import connectDB from '@/lib/db';
import ContactSubmission from '@/models/ContactSubmission';

export async function POST(req: Request) {
    try {
        const { to, subject, message, originalMessageId } = await req.json();

        if (!to || !subject || !message) {
            return NextResponse.json(
                { error: 'Missing required fields' },
                { status: 400 }
            );
        }

        // Configure transporter
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.contact_USER,
                pass: process.env.contact_PASS,
            },
        });

        // Send email
        await transporter.sendMail({
            from: `"Safegrey Support" <${process.env.contact_USER}>`,
            to,
            subject,
            html: `
        <div style="font-family: sans-serif; color: #333;">
          ${message.replace(/\n/g, '<br>')}
          <br><br>
          <hr>
          <p style="font-size: 12px; color: #666;">
            Safegrey Security<br>
            <a href="https://safegrey.com">safegrey.com</a>
          </p>
        </div>
      `,
        });

        // Update original message status to 'Replied'
        if (originalMessageId) {
            await connectDB();
            await ContactSubmission.findByIdAndUpdate(originalMessageId, { status: 'Replied' });
        }

        return NextResponse.json({ message: 'Reply sent successfully' });
    } catch (error) {
        console.error('Error sending reply:', error);
        return NextResponse.json(
            { error: 'Failed to send reply' },
            { status: 500 }
        );
    }
}
