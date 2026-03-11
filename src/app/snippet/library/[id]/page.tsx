import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, Clock, Eye, User } from 'lucide-react';
import CodeBlock from '@/components/CodeBlock';
import TagBadge from '@/components/TagBadge';
import { getLibrarySnippetById } from '@/lib/snippet-library';

export default async function LibrarySnippetPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const snippet = getLibrarySnippetById(id);

  if (!snippet) {
    notFound();
  }

  const date = new Date(snippet.createdAt).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <Link href="/explore" className="inline-flex items-center gap-2 text-sm text-indigo-300 hover:text-indigo-200 mb-6">
        <ArrowLeft className="w-4 h-4" />
        Back to explore
      </Link>

      <div className="mb-6">
        <div className="flex items-start justify-between mb-4 gap-4">
          <div>
            <div className="flex flex-wrap gap-2 mb-3">
              <span className="px-2.5 py-1 text-xs font-medium rounded-full bg-indigo-500/10 text-indigo-300 border border-indigo-500/20">
                {snippet.level}
              </span>
              <span className="px-2.5 py-1 text-xs font-medium rounded-full bg-gray-800 text-gray-300 border border-gray-700">
                Library snippet
              </span>
            </div>
            <h1 className="text-3xl font-bold text-white mb-2">{snippet.title}</h1>
            {snippet.description && <p className="text-gray-400">{snippet.description}</p>}
          </div>
          <span className="px-3 py-1.5 text-sm font-mono bg-gray-800 text-indigo-400 rounded-lg border border-gray-700">
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

        <div className="flex flex-wrap gap-2 mb-4">
          {snippet.tags.map((tag) => (
            <TagBadge key={tag} tag={tag} />
          ))}
        </div>
      </div>

      <CodeBlock code={snippet.code} language={snippet.language} />
    </div>
  );
}
