'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { ArrowLeft, Clock, HardDrive, User } from 'lucide-react';
import CodeBlock from '@/components/CodeBlock';
import TagBadge from '@/components/TagBadge';
import { getLocalSnippetById } from '@/lib/local-snippets';
import { Snippet } from '@/types';

export default function LocalSnippetPage() {
  const params = useParams<{ id: string }>();
  const [snippet, setSnippet] = useState<Snippet | null>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (!params?.id) return;
    setSnippet(getLocalSnippetById(params.id));
    setLoaded(true);
  }, [params?.id]);

  if (!loaded) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-12 text-center text-gray-500">
        Loading local snippet...
      </div>
    );
  }

  if (!snippet) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-12 text-center">
        <HardDrive className="w-12 h-12 mx-auto mb-4 text-gray-600" />
        <h1 className="text-2xl font-bold text-white mb-2">Local snippet not found</h1>
        <p className="text-gray-400 mb-6">This browser-only snippet may have been cleared from local storage.</p>
        <Link href="/create" className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white px-5 py-2.5 rounded-lg">
          Create another local snippet
        </Link>
      </div>
    );
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
              <span className="px-2.5 py-1 text-xs font-medium rounded-full bg-amber-500/10 text-amber-300 border border-amber-500/20">
                Browser only
              </span>
              {snippet.level && (
                <span className="px-2.5 py-1 text-xs font-medium rounded-full bg-indigo-500/10 text-indigo-300 border border-indigo-500/20">
                  {snippet.level}
                </span>
              )}
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
            <HardDrive className="w-4 h-4" />
            Saved only in this browser
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
