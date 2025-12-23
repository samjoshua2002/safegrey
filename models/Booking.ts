import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IBooking extends Document {
    name: string;
    email: string;
    topic: string;
    notes?: string;
    date: Date;
    time: string;
    timezone: string;
    meetingLink: string;
    user?: mongoose.Types.ObjectId;
    createdAt: Date;
}

const BookingSchema: Schema = new Schema({
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, lowercase: true },
    topic: { type: String, required: true, trim: true },
    notes: { type: String, trim: true },
    date: { type: Date, required: true },
    time: { type: String, required: true },
    timezone: { type: String, required: true },
    meetingLink: { type: String, required: true },
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    createdAt: { type: Date, default: Date.now },
});

const Booking: Model<IBooking> = mongoose.models.Booking || mongoose.model<IBooking>('Booking', BookingSchema);

export default Booking;
