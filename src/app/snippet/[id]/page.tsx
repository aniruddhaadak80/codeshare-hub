import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { getSessionUserId } from '@/lib/session';
import CodeBlock from '@/components/CodeBlock';
import VoteButtons from '@/components/VoteButtons';
import ShareModal from '@/components/ShareModal';
import TagBadge from '@/components/TagBadge';
import DeleteButton from '@/components/DeleteButton';
import { getBaseUrl } from '@/lib/getBaseUrl';
import { Eye, Clock, User, Edit } from 'lucide-react';
import { Snippet } from '@/types';

async function getSnippet(id: string): Promise<Snippet | null> {
  try {
    const baseUrl = getBaseUrl();
    const res = await fetch(`${baseUrl}/api/snippets/${id}`, { cache: 'no-store' });
    if (!res.ok) return null;
    return res.json();
  } catch {
    return null;
  }
}

export default async function SnippetPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const snippet = await getSnippet(id);
  if (!snippet) notFound();

  const session = await getServerSession(authOptions);
  const userId = session?.user ? getSessionUserId(session) : null;
  const isAuthor = userId === snippet.authorId;

  const date = new Date(snippet.createdAt).toLocaleDateString('en-US', {
    month: 'long', day: 'numeric', year: 'numeric',
  });

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="mb-6">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">{snippet.title}</h1>
            {snippet.description && (
              <p className="text-gray-400">{snippet.description}</p>
            )}
          </div>
          <span className="ml-4 px-3 py-1.5 text-sm font-mono bg-gray-800 text-indigo-400 rounded-lg border border-gray-700">
            {snippet.language}
          </span>
        </div>

        <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 mb-4">
          <span className="flex items-center gap-1.5">
            <User className="w-4 h-4" />
            {snippet.authorName}
          </span>
          <span className="flex items-center gap-1.5">
            <Clock className="w-4 h-4" />
            {date}
          </span>
          <span className="flex items-center gap-1.5">
            <Eye className="w-4 h-4" />
            {snippet.views} views
          </span>
        </div>

        {snippet.tags && snippet.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {snippet.tags.map((tag) => <TagBadge key={tag} tag={tag} />)}
          </div>
        )}

        <div className="flex items-center gap-3 flex-wrap">
          <VoteButtons snippetId={snippet._id} upvotes={snippet.upvotes} downvotes={snippet.downvotes} />
          <ShareModal snippetId={snippet._id} title={snippet.title} />
          {isAuthor && (
            <>
              <Link
                href={`/edit/${snippet._id}`}
                className="flex items-center gap-2 px-3 py-2 rounded-lg bg-gray-800 hover:bg-gray-700 border border-gray-700 transition-all text-sm"
              >
                <Edit className="w-4 h-4" />
                Edit
              </Link>
              <DeleteButton snippetId={snippet._id} />
            </>
          )}
        </div>
      </div>

      <CodeBlock code={snippet.code} language={snippet.language} />
    </div>
  );
}
