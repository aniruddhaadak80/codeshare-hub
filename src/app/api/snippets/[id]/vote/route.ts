import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import dbConnect from '@/lib/db';
import Snippet from '@/lib/models/Snippet';
import Vote from '@/lib/models/Vote';
import { getSessionUserId } from '@/lib/session';

export async function POST(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await dbConnect();
    const { type } = await request.json();
    const userId = getSessionUserId(session);

    const existingVote = await Vote.findOne({ userId, snippetId: params.id });

    if (existingVote) {
      if (existingVote.type === type) {
        // Remove vote
        await Vote.deleteOne({ _id: existingVote._id });
        const field = type === 'up' ? 'upvotes' : 'downvotes';
        await Snippet.findByIdAndUpdate(params.id, { $inc: { [field]: -1 } });
      } else {
        // Change vote
        const oldField = existingVote.type === 'up' ? 'upvotes' : 'downvotes';
        const newField = type === 'up' ? 'upvotes' : 'downvotes';
        await Vote.updateOne({ _id: existingVote._id }, { type });
        await Snippet.findByIdAndUpdate(params.id, {
          $inc: { [oldField]: -1, [newField]: 1 },
        });
      }
    } else {
      await Vote.create({ userId, snippetId: params.id, type });
      const field = type === 'up' ? 'upvotes' : 'downvotes';
      await Snippet.findByIdAndUpdate(params.id, { $inc: { [field]: 1 } });
    }

    const snippet = await Snippet.findById(params.id).select('upvotes downvotes').lean();
    return NextResponse.json(snippet);
  } catch {
    return NextResponse.json({ error: 'Failed to vote' }, { status: 500 });
  }
}
