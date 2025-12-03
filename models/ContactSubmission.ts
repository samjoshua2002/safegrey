import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IContactSubmission extends Document {
    userId: mongoose.Types.ObjectId;
    message: string;
    status: 'New' | 'Read' | 'Replied';
    submittedAt: Date;
}

const ContactSubmissionSchema: Schema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    message: { type: String, required: true, trim: true },
    status: {
        type: String,
        enum: ['New', 'Read', 'Replied'],
        default: 'New'
    },
    submittedAt: { type: Date, default: Date.now },
});

const ContactSubmission: Model<IContactSubmission> =
    mongoose.models.ContactSubmission ||
    mongoose.model<IContactSubmission>('ContactSubmission', ContactSubmissionSchema);

export default ContactSubmission;
