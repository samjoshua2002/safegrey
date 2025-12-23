import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import Booking from '@/models/Booking';

export async function DELETE(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        await connectDB();

        const { id } = params;

        const deletedBooking = await Booking.findByIdAndDelete(id);

        if (!deletedBooking) {
            return NextResponse.json(
                { error: 'Booking not found' },
                { status: 404 }
            );
        }

        return NextResponse.json({
            message: 'Booking deleted successfully',
            booking: deletedBooking
        });
    } catch (error) {
        console.error('Error deleting booking:', error);
        return NextResponse.json(
            { error: 'Failed to delete booking' },
            { status: 500 }
        );
    }
}
