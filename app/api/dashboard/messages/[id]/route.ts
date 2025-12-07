import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import ContactSubmission from '@/models/ContactSubmission';

export async function PUT(
    request: Request,
    { params }: { params: { id: string } }
) {
    try {
        await connectDB();
        const { id } = params;
        const { status } = await request.json();

        if (!['New', 'Read', 'Replied'].includes(status)) {
            return NextResponse.json({ error: 'Invalid status' }, { status: 400 });
        }

        const message = await ContactSubmission.findByIdAndUpdate(
            id,
            { status },
            { new: true }
        );

        if (!message) {
            return NextResponse.json({ error: 'Message not found' }, { status: 404 });
        }

        return NextResponse.json(message);
    } catch (error) {
        console.error('Error updating message status:', error);
        return NextResponse.json(
            { error: 'Failed to update message status' },
            { status: 500 }
        );
    }
}

export async function DELETE(
    request: Request,
    { params }: { params: { id: string } }
) {
    try {
        await connectDB();
        const { id } = params;

        const message = await ContactSubmission.findByIdAndDelete(id);

        if (!message) {
            return NextResponse.json({ error: 'Message not found' }, { status: 404 });
        }

        return NextResponse.json({ message: 'Message deleted successfully' });
    } catch (error) {
        console.error('Error deleting message:', error);
        return NextResponse.json(
            { error: 'Failed to delete message' },
            { status: 500 }
        );
    }
}
