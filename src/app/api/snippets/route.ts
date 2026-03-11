import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import dbConnect from '@/lib/db';
import Snippet from '@/lib/models/Snippet';

export async function GET(request: NextRequest) {
  try {
    await dbConnect();
    const { searchParams } = new URL(request.url);
    const q = searchParams.get('q') || '';
    const language = searchParams.get('language') || '';
    const tag = searchParams.get('tag') || '';
    const sort = searchParams.get('sort') || 'createdAt';
    const limit = parseInt(searchParams.get('limit') || '20');
    const skip = parseInt(searchParams.get('skip') || '0');

    const query: any = { isPublic: true };

    if (q) {
      query.$or = [
        { title: { $regex: q, $options: 'i' } },
        { description: { $regex: q, $options: 'i' } },
        { code: { $regex: q, $options: 'i' } },
      ];
    }

    if (language) {
      query.language = language;
    }

    if (tag) {
      query.tags = { $in: [tag] };
    }

    const sortObj: any = {};
    if (sort === 'popular') {
      sortObj.upvotes = -1;
    } else if (sort === 'views') {
      sortObj.views = -1;
    } else {
      sortObj.createdAt = -1;
    }

    const snippets = await Snippet.find(query).sort(sortObj).limit(limit).skip(skip).lean();
    const total = await Snippet.countDocuments(query);

    return NextResponse.json({ snippets, total });
  } catch (_error) {
    return NextResponse.json({ error: 'Failed to fetch snippets' }, { status: 500 });
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

    const snippet = new Snippet({
      ...data,
      authorId: (session.user as any).id || session.user.email,
      authorName: session.user.name || 'Anonymous',
      authorImage: session.user.image,
    });

    await snippet.save();
    return NextResponse.json(snippet.toObject(), { status: 201 });
  } catch (_error) {
    return NextResponse.json({ error: 'Failed to create snippet' }, { status: 500 });
  }
}
