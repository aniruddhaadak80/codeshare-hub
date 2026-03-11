'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ThumbsUp, ThumbsDown, Eye, Clock } from 'lucide-react';
import { Snippet } from '@/types';
import TagBadge from './TagBadge';

interface SnippetCardProps {
  snippet: Snippet;
  index?: number;
  onPreview?: () => void;
}

export default function SnippetCard({ snippet, index = 0, onPreview }: SnippetCardProps) {
  const date = new Date(snippet.createdAt).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
  const href = snippet.href || `/snippet/${snippet._id}`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      className="group bg-gray-900 border border-gray-800 rounded-xl p-5 hover:border-indigo-500/50 transition-all duration-200 hover:shadow-lg hover:shadow-indigo-500/5"
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1 min-w-0">
          <Link href={href} className="block">
            <h3 className="text-base font-semibold text-white group-hover:text-indigo-400 transition-colors truncate">
              {snippet.title}
            </h3>
          </Link>
          {snippet.description && (
            <p className="text-sm text-gray-400 mt-1 line-clamp-2">{snippet.description}</p>
          )}
          <div className="flex flex-wrap gap-2 mt-2">
            {snippet.level && (
              <span className="px-2 py-1 text-[11px] font-medium rounded-full bg-indigo-500/10 text-indigo-300 border border-indigo-500/20">
                {snippet.level}
              </span>
            )}
            {snippet.source && (
              <span className="px-2 py-1 text-[11px] font-medium rounded-full bg-gray-800 text-gray-300 border border-gray-700 capitalize">
                {snippet.source}
              </span>
            )}
            {!snippet.isPublic && (
              <span className="px-2 py-1 text-[11px] font-medium rounded-full bg-amber-500/10 text-amber-300 border border-amber-500/20">
                Browser only
              </span>
            )}
          </div>
        </div>
        <span className="ml-3 flex-shrink-0 px-2.5 py-1 text-xs font-mono bg-gray-800 text-indigo-400 rounded-md border border-gray-700">
          {snippet.language}
        </span>
      </div>

      {snippet.tags && snippet.tags.length > 0 && (
        <div className="flex flex-wrap gap-1.5 mb-3">
          {snippet.tags.slice(0, 4).map((tag) => (
            <TagBadge key={tag} tag={tag} />
          ))}
        </div>
      )}

      <div className="flex items-center justify-between text-xs text-gray-500 pt-3 border-t border-gray-800">
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1">
            <ThumbsUp className="w-3.5 h-3.5" />
            {snippet.upvotes}
          </span>
          <span className="flex items-center gap-1">
            <ThumbsDown className="w-3.5 h-3.5" />
            {snippet.downvotes}
          </span>
          <span className="flex items-center gap-1">
            <Eye className="w-3.5 h-3.5" />
            {snippet.views}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="flex items-center gap-1">
            <Clock className="w-3.5 h-3.5" />
            {date}
          </span>
          {onPreview && (
            <button
              type="button"
              onClick={onPreview}
              className="px-2 py-1 rounded-md border border-gray-700 bg-gray-800 text-gray-300 hover:text-white hover:border-indigo-500 transition-colors"
            >
              Preview
            </button>
          )}
          <span className="text-gray-600">by</span>
          <span className="text-gray-400">{snippet.authorName}</span>
        </div>
      </div>
    </motion.div>
  );
}
