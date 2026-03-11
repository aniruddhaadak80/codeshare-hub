import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import dbConnect from '@/lib/db';
import Snippet from '@/lib/models/Snippet';
import { getSessionUserId } from '@/lib/session';

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    await dbConnect();
    const snippet = await Snippet.findById(params.id).lean();
    if (!snippet) {
      return NextResponse.json({ error: 'Snippet not found' }, { status: 404 });
    }
    // Increment views
    await Snippet.findByIdAndUpdate(params.id, { $inc: { views: 1 } });
    return NextResponse.json(snippet);
  } catch {
    return NextResponse.json({ error: 'Failed to fetch snippet' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await dbConnect();
    const snippet = await Snippet.findById(params.id);
    if (!snippet) {
      return NextResponse.json({ error: 'Snippet not found' }, { status: 404 });
    }

    const userId = getSessionUserId(session);
    if (snippet.authorId !== userId) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    const data = await request.json();
    const updated = await Snippet.findByIdAndUpdate(
      params.id,
      { ...data, updatedAt: new Date() },
      { new: true }
    ).lean();

    return NextResponse.json(updated);
  } catch {
    return NextResponse.json({ error: 'Failed to update snippet' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await dbConnect();
    const snippet = await Snippet.findById(params.id);
    if (!snippet) {
      return NextResponse.json({ error: 'Snippet not found' }, { status: 404 });
    }

    const userId = getSessionUserId(session);
    if (snippet.authorId !== userId) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    await Snippet.findByIdAndDelete(params.id);
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: 'Failed to delete snippet' }, { status: 500 });
  }
}
