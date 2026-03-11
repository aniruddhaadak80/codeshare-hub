'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Trash2 } from 'lucide-react';

interface DeleteButtonProps {
  snippetId: string;
}

export default function DeleteButton({ snippetId }: DeleteButtonProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    if (!confirm('Are you sure you want to delete this snippet?')) return;
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
    }
  };

  return (
    <button
      onClick={handleDelete}
      disabled={loading}
      className="flex items-center gap-2 px-3 py-2 rounded-lg bg-red-900/20 hover:bg-red-900/40 border border-red-800/50 hover:border-red-600 text-red-400 transition-all text-sm"
    >
      <Trash2 className="w-4 h-4" />
      {loading ? 'Deleting...' : 'Delete'}
    </button>
  );
}
