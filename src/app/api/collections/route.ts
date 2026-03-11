import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import dbConnect from '@/lib/db';
import Collection from '@/lib/models/Collection';

export async function GET(_request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    await dbConnect();

    const userId = session?.user ? ((session.user as any).id || session.user.email) : null;
    const query = userId ? { $or: [{ authorId: userId }, { isPublic: true }] } : { isPublic: true };

    const collections = await Collection.find(query).sort({ createdAt: -1 }).lean();
    return NextResponse.json({ collections });
  } catch (_error) {
    return NextResponse.json({ error: 'Failed to fetch collections' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await dbConnect();
    const data = await request.json();

    const collection = new Collection({
      ...data,
      authorId: (session.user as any).id || session.user.email,
      authorName: session.user.name || 'Anonymous',
    });

    await collection.save();
    return NextResponse.json(collection.toObject(), { status: 201 });
  } catch (_error) {
    return NextResponse.json({ error: 'Failed to create collection' }, { status: 500 });
  }
}
