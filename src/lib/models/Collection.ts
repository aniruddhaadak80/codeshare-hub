import mongoose, { Document, Schema } from 'mongoose';

export interface ICollection extends Document {
  name: string;
  description: string;
  isPublic: boolean;
  authorId: string;
  authorName: string;
  snippetIds: string[];
  createdAt: Date;
}

const CollectionSchema = new Schema<ICollection>({
  name: { type: String, required: true },
  description: { type: String, default: '' },
  isPublic: { type: Boolean, default: true },
  authorId: { type: String, required: true },
  authorName: { type: String, required: true },
  snippetIds: [{ type: String }],
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.Collection || mongoose.model<ICollection>('Collection', CollectionSchema);
