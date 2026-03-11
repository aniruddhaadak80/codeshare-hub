import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import dbConnect from '@/lib/db';
import Snippet from '@/lib/models/Snippet';
import { getSessionUserId } from '@/lib/session';

/** Escape special regex characters to prevent ReDoS attacks. */
function escapeRegex(str: string): string {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

export async function GET(request: NextRequest) {
  try {
    await dbConnect();
    const { searchParams } = new URL(request.url);
    const q = searchParams.get('q') || '';
    const language = searchParams.get('language') || '';
    const tag = searchParams.get('tag') || '';
    const sort = searchParams.get('sort') || 'createdAt';
    const limit = Math.min(parseInt(searchParams.get('limit') || '20'), 100);
    const skip = parseInt(searchParams.get('skip') || '0');

    const query: Record<string, unknown> = { isPublic: true };

    if (q) {
      const safeQ = escapeRegex(q);
      query.$or = [
        { title: { $regex: safeQ, $options: 'i' } },
        { description: { $regex: safeQ, $options: 'i' } },
        { code: { $regex: safeQ, $options: 'i' } },
      ];
    }

    if (language) {
      query.language = language;
    }

    if (tag) {
      query.tags = { $in: [tag] };
    }

    const sortObj: Record<string, 1 | -1> = {};
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
  } catch {
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
      authorId: getSessionUserId(session),
      authorName: session.user.name || 'Anonymous',
      authorImage: session.user.image,
    });

    await snippet.save();
    return NextResponse.json(snippet.toObject(), { status: 201 });
  } catch {
    return NextResponse.json({ error: 'Failed to create snippet' }, { status: 500 });
  }
}
