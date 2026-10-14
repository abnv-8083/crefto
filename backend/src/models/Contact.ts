import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IContact {
  id?: string;
  name: string;
  email: string;
  message: string;
  service?: string;
  status?: string;
  createdAt?: Date;
}

export interface IContactDocument extends Document {
  name: string;
  email: string;
  message: string;
  service?: string;
  status: string;
  createdAt: Date;
  updatedAt: Date;
}

const ContactSchema = new Schema<IContactDocument>(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
      maxlength: [120, 'Name cannot exceed 120 characters'],
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      trim: true,
      lowercase: true,
      match: [/^\S+@\S+\.\S+$/, 'Please provide a valid email address'],
    },
    message: {
      type: String,
      required: [true, 'Message is required'],
      trim: true,
      maxlength: [5000, 'Message cannot exceed 5000 characters'],
    },
    service: {
      type: String,
      trim: true,
    },
    status: {
      type: String,
      enum: ['new', 'contacted', 'in_progress', 'completed', 'archived'],
      default: 'new',
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
      transform: (_doc, ret: Record<string, any>) => {
        ret.id = ret._id ? ret._id.toString() : ret.id;
        delete ret._id;
        delete ret.__v;
        return ret;
      },
    },
  }
);

// Index for quick queries
ContactSchema.index({ createdAt: -1 });
ContactSchema.index({ email: 1 });

export const Contact: Model<IContactDocument> =
  mongoose.models.Contact || mongoose.model<IContactDocument>('Contact', ContactSchema);
