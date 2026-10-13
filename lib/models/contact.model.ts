import mongoose, { Schema, Document, Model } from 'mongoose';
import { CONTACT_LIMITS } from '@/lib/contact-schema';

export interface IContact extends Document {
  name: string;
  email: string;
  message: string;
  createdAt: Date;
}

const ContactSchema = new Schema<IContact>({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true,
    maxlength: CONTACT_LIMITS.name.max,
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    trim: true,
    maxlength: CONTACT_LIMITS.email.max,
  },
  message: {
    type: String,
    required: [true, 'Message is required'],
    trim: true,
    maxlength: CONTACT_LIMITS.message.max,
  },
  createdAt: { type: Date, default: Date.now },
});

export const Contact: Model<IContact> =
  mongoose.models.Contact || mongoose.model<IContact>('Contact', ContactSchema);
