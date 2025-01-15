// lib/models/contact.model.ts
import mongoose, { Schema, Document, Model } from "mongoose";

export interface IContact extends Document {
    name: string;
    email: string;
    message: string;
    createdAt: Date;
}

const ContactSchema = new Schema<IContact>({
    name: { type: String, required: [true, 'Name is required'] },
    email: { type: String, required: [true, 'Email is required'] },
    message: { type: String, required: [true, 'Message is required'] },
    createdAt: { type: Date, default: Date.now },
});

export const Contact: Model<IContact> = 
    mongoose.models.Contact || mongoose.model<IContact>("Contact", ContactSchema);