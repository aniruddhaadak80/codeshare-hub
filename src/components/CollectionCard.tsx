'use client';

import { motion } from 'framer-motion';
import { BookOpen, Lock, Globe, ChevronRight } from 'lucide-react';
import { Collection } from '@/types';

interface CollectionCardProps {
  collection: Collection;
  index?: number;
}

export default function CollectionCard({ collection, index = 0 }: CollectionCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      className="group bg-gray-900 border border-gray-800 rounded-xl p-5 hover:border-indigo-500/50 transition-all"
    >
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3 mb-3">
          <div className="p-2 bg-indigo-600/20 rounded-lg">
            <BookOpen className="w-5 h-5 text-indigo-400" />
          </div>
          <div>
            <h3 className="font-semibold text-white group-hover:text-indigo-400 transition-colors">{collection.name}</h3>
            <p className="text-xs text-gray-500">by {collection.authorName}</p>
          </div>
        </div>
        {collection.isPublic ? (
          <Globe className="w-4 h-4 text-green-500" />
        ) : (
          <Lock className="w-4 h-4 text-gray-500" />
        )}
      </div>

      {collection.description && (
        <p className="text-sm text-gray-400 mb-3">{collection.description}</p>
      )}

      <div className="flex items-center justify-between text-xs text-gray-500 pt-3 border-t border-gray-800">
        <span>{collection.snippetIds.length} snippets</span>
        <ChevronRight className="w-4 h-4 group-hover:text-indigo-400 transition-colors" />
      </div>
    </motion.div>
  );
}
