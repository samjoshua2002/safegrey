import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import User from '@/models/User';
import DatasheetDownload from '@/models/DatasheetDownload';
import ContactSubmission from '@/models/ContactSubmission';
import Booking from '@/models/Booking';

export async function GET(
    request: Request,
    { params }: { params: { id: string } }
) {
    try {
        await connectDB();
        const { id } = params;

        const user = await User.findById(id);
        if (!user) {
            return NextResponse.json({ error: 'User not found' }, { status: 404 });
        }

        const downloads = await DatasheetDownload.find({ userId: id }).sort({ downloadedAt: -1 });
        const messages = await ContactSubmission.find({ userId: id }).sort({ submittedAt: -1 });
        const bookings = await Booking.find({ email: user.email }).sort({ createdAt: -1 });

        return NextResponse.json({
            user,
            downloads,
            messages,
            bookings,
        });
    } catch (error) {
        console.error('Error fetching user details:', error);
        return NextResponse.json(
            { error: 'Failed to fetch user details' },
            { status: 500 }
        );
    }
}
