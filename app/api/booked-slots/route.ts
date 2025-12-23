import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import Booking from '@/models/Booking';

export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const date = searchParams.get('date');

        if (!date) {
            return NextResponse.json(
                { error: 'Date parameter is required' },
                { status: 400 }
            );
        }

        await connectDB();

        // Find all bookings for the specified date
        const startOfDay = new Date(date);
        startOfDay.setHours(0, 0, 0, 0);

        const endOfDay = new Date(date);
        endOfDay.setHours(23, 59, 59, 999);

        const bookings = await Booking.find({
            date: {
                $gte: startOfDay,
                $lte: endOfDay
            }
        }).select('time');

        // Extract just the time strings
        const bookedSlots = bookings.map(booking => booking.time);

        return NextResponse.json({ bookedSlots });
    } catch (error) {
        console.error('Error fetching booked slots:', error);
        return NextResponse.json(
            { error: 'Failed to fetch booked slots' },
            { status: 500 }
        );
    }
}
