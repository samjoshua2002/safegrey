import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IDatasheetDownload extends Document {
    userId: mongoose.Types.ObjectId;
    name: string;
    email: string;
    serviceType: string;
    serviceCategory: string;
    downloadedAt: Date;
}

const DatasheetDownloadSchema: Schema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    // Keeping name/email for snapshot/redundancy but they are optional now if we rely on User
    name: {
        type: String,
        trim: true,
    },
    email: {
        type: String,
        lowercase: true,
        trim: true,
    },
    serviceType: {
        type: String,
        required: [true, 'Please provide a service type'],
    },
    serviceCategory: {
        type: String,
        required: [true, 'Please provide a service category'],
    },
    downloadedAt: {
        type: Date,
        default: Date.now,
    },
});

// Prevent OverwriteModelError upon hot reload in development
const DatasheetDownload: Model<IDatasheetDownload> =
    mongoose.models.DatasheetDownload ||
    mongoose.model<IDatasheetDownload>('DatasheetDownload', DatasheetDownloadSchema);

export default DatasheetDownload;
