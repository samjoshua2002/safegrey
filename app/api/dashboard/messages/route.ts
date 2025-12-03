import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import ContactSubmission from '@/models/ContactSubmission';
import User from '@/models/User'; // Ensure User model is registered

export async function GET() {
    try {
        await connectDB();

        // Fetch messages and populate user details
        const messages = await ContactSubmission.find({})
            .populate('userId', 'name email company')
            .sort({ submittedAt: -1 });

        return NextResponse.json(messages);
    } catch (error) {
        console.error('Error fetching messages:', error);
        return NextResponse.json(
            { error: 'Failed to fetch messages' },
            { status: 500 }
        );
    }
}
