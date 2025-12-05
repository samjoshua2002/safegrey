import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import DatasheetDownload from '@/models/DatasheetDownload';
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

        // Fetch downloads and populate user details
        // We sort by downloadedAt descending (newest first)
        const downloads = await DatasheetDownload.find({})
            .populate('userId', 'firstName lastName name email company designation phone')
            .sort({ downloadedAt: -1 });

        return NextResponse.json(downloads);
    } catch (error) {
        console.error('Error fetching downloads:', error);
        return NextResponse.json(
            { error: 'Failed to fetch downloads' },
            { status: 500 }
        );
    }
}
