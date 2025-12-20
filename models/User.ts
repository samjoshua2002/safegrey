import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IUser extends Document {
    firstName: string;
    lastName: string; // Optional for datasheet downloads where we might only get full name
    name: string; // Combined name or fallback
    email: string;
    phone?: string;
    company?: string;
    designation?: string;
    password?: string;
    status: 'pending' | 'approved' | 'rejected';
    otp?: string;
    otpExpires?: Date;
    createdAt: Date;
    updatedAt: Date;
}

const UserSchema: Schema = new Schema({
    firstName: { type: String, trim: true },
    lastName: { type: String, trim: true },
    name: { type: String, required: true, trim: true }, // For datasheet downloads that send full name
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    phone: { type: String, trim: true },
    company: { type: String, trim: true },
    designation: { type: String, trim: true },
    password: { type: String, select: false },
    status: {
        type: String,
        enum: ['pending', 'approved', 'rejected'],
        default: 'pending'
    },
    otp: { type: String, select: false },
    otpExpires: { type: Date, select: false },
}, {
    timestamps: true,
});

const User: Model<IUser> = mongoose.models.User || mongoose.model<IUser>('User', UserSchema);

export default User;
