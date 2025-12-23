import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import User from '@/models/User';
import Booking from '@/models/Booking';
import ContactSubmission from '@/models/ContactSubmission';
import DatasheetDownload from '@/models/DatasheetDownload';

export async function GET(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        await connectDB();

        const { id } = params;

        const user = await User.findById(id);

        if (!user) {
            return NextResponse.json(
                { error: 'User not found' },
                { status: 404 }
            );
        }

        return NextResponse.json(user);
    } catch (error) {
        console.error('Error fetching user:', error);
        return NextResponse.json(
            { error: 'Failed to fetch user' },
            { status: 500 }
        );
    }
}

export async function DELETE(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        await connectDB();

        const { id } = params;

        // Delete user and all associated data
        const deletedUser = await User.findByIdAndDelete(id);

        if (!deletedUser) {
            return NextResponse.json(
                { error: 'User not found' },
                { status: 404 }
            );
        }

        // Delete associated bookings
        await Booking.deleteMany({ user: id });

        // Delete associated contact submissions
        await ContactSubmission.deleteMany({ userId: id });

        // Delete associated datasheet downloads
        await DatasheetDownload.deleteMany({ userId: id });

        return NextResponse.json({
            message: 'User and associated data deleted successfully',
            user: deletedUser
        });
    } catch (error) {
        console.error('Error deleting user:', error);
        return NextResponse.json(
            { error: 'Failed to delete user' },
            { status: 500 }
        );
    }
}
