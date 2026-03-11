'use client';

import Link from 'next/link';

interface TagBadgeProps {
  tag: string;
  clickable?: boolean;
}

export default function TagBadge({ tag, clickable = true }: TagBadgeProps) {
  if (clickable) {
    return (
      <Link
        href={`/explore?tag=${encodeURIComponent(tag)}`}
        className="px-2 py-0.5 text-xs bg-gray-800 text-gray-300 rounded-md border border-gray-700 hover:border-indigo-500 hover:text-indigo-400 transition-colors"
      >
        #{tag}
      </Link>
    );
  }

  return (
    <span className="px-2 py-0.5 text-xs bg-gray-800 text-gray-300 rounded-md border border-gray-700">
      #{tag}
    </span>
  );
}
