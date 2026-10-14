import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IProject {
  id: string;
  title: string;
  category: string;
  image: string;
  link?: string;
  description?: string;
  metric?: string;
  url?: string;
  fullCaseStudy?: string;
  stats?: Array<{ label: string; value: string }>;
  deliverables?: string[];
  tech?: string[];
}

export interface IProjectDocument extends Document {
  title: string;
  category: string;
  image: string;
  link?: string;
  description?: string;
  metric?: string;
  url?: string;
  fullCaseStudy?: string;
  stats?: Array<{ label: string; value: string }>;
  deliverables?: string[];
  tech?: string[];
  createdAt: Date;
  updatedAt: Date;
}

const ProjectSchema = new Schema<IProjectDocument>(
  {
    title: { type: String, required: true },
    category: { type: String, required: true },
    image: { type: String, required: true },
    link: { type: String },
    description: { type: String },
    metric: { type: String },
    url: { type: String },
    fullCaseStudy: { type: String },
    stats: [{ label: String, value: String }],
    deliverables: [String],
    tech: [String],
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

export const Project: Model<IProjectDocument> =
  mongoose.models.Project || mongoose.model<IProjectDocument>('Project', ProjectSchema);
