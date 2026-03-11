import mongoose, { Document, Schema } from 'mongoose';

export interface ISnippet extends Document {
  title: string;
  description: string;
  code: string;
  language: string;
  tags: string[];
  authorId: string;
  authorName: string;
  authorImage?: string;
  upvotes: number;
  downvotes: number;
  views: number;
  isPublic: boolean;
  collectionId?: string;
  createdAt: Date;
  updatedAt: Date;
}

const SnippetSchema = new Schema<ISnippet>({
  title: { type: String, required: true },
  description: { type: String, default: '' },
  code: { type: String, required: true },
  language: { type: String, required: true, default: 'javascript' },
  tags: [{ type: String }],
  authorId: { type: String, required: true },
  authorName: { type: String, required: true },
  authorImage: { type: String },
  upvotes: { type: Number, default: 0 },
  downvotes: { type: Number, default: 0 },
  views: { type: Number, default: 0 },
  isPublic: { type: Boolean, default: true },
  collectionId: { type: String },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

SnippetSchema.index({ title: 'text', description: 'text', code: 'text' });

export default mongoose.models.Snippet || mongoose.model<ISnippet>('Snippet', SnippetSchema);
