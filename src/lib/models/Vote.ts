import mongoose, { Document, Schema } from 'mongoose';

export interface IVote extends Document {
  userId: string;
  snippetId: string;
  type: 'up' | 'down';
  createdAt: Date;
}

const VoteSchema = new Schema<IVote>({
  userId: { type: String, required: true },
  snippetId: { type: String, required: true },
  type: { type: String, enum: ['up', 'down'], required: true },
  createdAt: { type: Date, default: Date.now },
});

VoteSchema.index({ userId: 1, snippetId: 1 }, { unique: true });

export default mongoose.models.Vote || mongoose.model<IVote>('Vote', VoteSchema);
