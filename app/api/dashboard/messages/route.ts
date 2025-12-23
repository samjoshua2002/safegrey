import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import ContactSubmission from '@/models/ContactSubmission';
import User from '@/models/User'; // Ensure User model is registered

export const dynamic = 'force-dynamic';

export async function GET() {
    try {
        await connectDB();

        // Ensure User model is registered before populate
        // This forces the model to be loaded into Mongoose's registry
        if (!User) {
            throw new Error('User model not loaded');
        }

        // Fetch messages and populate user details
        const messages = await ContactSubmission.find({})
            .populate('userId', 'name email company')
            .sort({ submittedAt: -1 });

        // Filter out any messages where userId population failed
        const validMessages = messages.filter(msg => msg.userId && typeof msg.userId === 'object');

        return NextResponse.json(validMessages);
    } catch (error) {
        console.error('Error fetching messages:', error);
        return NextResponse.json(
            { error: 'Failed to fetch messages' },
            { status: 500 }
        );
    }
}
