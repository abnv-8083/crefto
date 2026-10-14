import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IService {
  id: string;
  title: string;
  description: string;
  icon?: string;
  subtitle?: string;
  tags?: string[];
  src?: string;
  alt?: string;
  num?: string;
}

export interface IServiceDocument extends Document {
  title: string;
  description: string;
  icon?: string;
  subtitle?: string;
  tags?: string[];
  src?: string;
  alt?: string;
  num?: string;
  createdAt: Date;
  updatedAt: Date;
}

const ServiceSchema = new Schema<IServiceDocument>(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    icon: { type: String },
    subtitle: { type: String },
    tags: [String],
    src: { type: String },
    alt: { type: String },
    num: { type: String },
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

export const Service: Model<IServiceDocument> =
  mongoose.models.Service || mongoose.model<IServiceDocument>('Service', ServiceSchema);
