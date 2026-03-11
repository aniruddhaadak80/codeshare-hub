'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Trash2, AlertTriangle, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface DeleteButtonProps {
  snippetId: string;
}

export default function DeleteButton({ snippetId }: DeleteButtonProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [confirming, setConfirming] = useState(false);

  const handleDelete = async () => {
    setLoading(true);

    try {
      const res = await fetch(`/api/snippets/${snippetId}`, { method: 'DELETE' });
      if (res.ok) {
        router.push('/');
        router.refresh();
      }
    } catch (error) {
      console.error('Delete error:', error);
    } finally {
      setLoading(false);
      setConfirming(false);
    }
  };

  return (
    <>
      <button
        onClick={() => setConfirming(true)}
        disabled={loading}
        className="flex items-center gap-2 px-3 py-2 rounded-lg bg-red-900/20 hover:bg-red-900/40 border border-red-800/50 hover:border-red-600 text-red-400 transition-all text-sm"
      >
        <Trash2 className="w-4 h-4" />
        {loading ? 'Deleting...' : 'Delete'}
      </button>

      <AnimatePresence>
        {confirming && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4"
            onClick={() => setConfirming(false)}
          >
            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              className="bg-gray-900 border border-gray-800 rounded-2xl p-6 w-full max-w-sm"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-start gap-3 mb-4">
                <div className="p-2 bg-red-900/30 rounded-lg flex-shrink-0">
                  <AlertTriangle className="w-5 h-5 text-red-400" />
                </div>
                <div>
                  <h3 className="font-semibold text-white mb-1">Delete Snippet</h3>
                  <p className="text-sm text-gray-400">Are you sure you want to delete this snippet? This action cannot be undone.</p>
                </div>
                <button onClick={() => setConfirming(false)} className="text-gray-500 hover:text-white ml-auto flex-shrink-0">
                  <X className="w-4 h-4" />
                </button>
              </div>
              <div className="flex gap-3 justify-end">
                <button
                  onClick={() => setConfirming(false)}
                  className="px-4 py-2 bg-gray-800 hover:bg-gray-700 text-gray-300 rounded-lg text-sm transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDelete}
                  disabled={loading}
                  className="px-4 py-2 bg-red-600 hover:bg-red-500 disabled:opacity-50 text-white rounded-lg text-sm transition-colors"
                >
                  {loading ? 'Deleting...' : 'Delete'}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
