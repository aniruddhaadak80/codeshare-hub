'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { motion } from 'framer-motion';
import { Plus, BookOpen } from 'lucide-react';
import CollectionCard from '@/components/CollectionCard';
import LoadingSpinner from '@/components/LoadingSpinner';
import { Collection } from '@/types';
import Link from 'next/link';

export default function CollectionsPage() {
  const { data: session } = useSession();
  const [collections, setCollections] = useState<Collection[]>([]);
  const [loading, setLoading] = useState(true);
  const [showCreate, setShowCreate] = useState(false);
  const [form, setForm] = useState({ name: '', description: '', isPublic: true });
  const [creating, setCreating] = useState(false);

  useEffect(() => {
    fetch('/api/collections')
      .then(r => r.json())
      .then(data => { setCollections(data.collections || []); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    setCreating(true);
    try {
      const res = await fetch('/api/collections', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        const newCollection = await res.json();
        setCollections(prev => [newCollection, ...prev]);
        setForm({ name: '', description: '', isPublic: true });
        setShowCreate(false);
      }
    } catch (error) {
      console.error('Failed to create collection', error);
    }
    setCreating(false);
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Collections</h1>
          <p className="text-gray-400">Organize your snippets into collections</p>
        </div>
        {session && (
          <button
            onClick={() => setShowCreate(!showCreate)}
            className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2 rounded-xl text-sm font-medium transition-colors"
          >
            <Plus className="w-4 h-4" />
            New Collection
          </button>
        )}
      </div>

      {showCreate && (
        <motion.form
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          onSubmit={handleCreate}
          className="bg-gray-900 border border-gray-800 rounded-xl p-6 mb-6 space-y-4"
        >
          <h3 className="font-semibold text-white">Create New Collection</h3>
          <input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}
            placeholder="Collection name" className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-indigo-500" />
          <textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })}
            placeholder="Description (optional)" rows={2} className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-indigo-500 resize-none" />
          <div className="flex items-center gap-3">
            <input type="checkbox" checked={form.isPublic} onChange={(e) => setForm({ ...form, isPublic: e.target.checked })} className="accent-indigo-600" />
            <span className="text-sm text-gray-300">Make public</span>
          </div>
          <div className="flex gap-2">
            <button type="submit" disabled={creating} className="bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2 rounded-lg text-sm disabled:opacity-50">
              {creating ? 'Creating...' : 'Create'}
            </button>
            <button type="button" onClick={() => setShowCreate(false)} className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg text-sm">Cancel</button>
          </div>
        </motion.form>
      )}

      {collections.length === 0 ? (
        <div className="text-center py-16 text-gray-500">
          <BookOpen className="w-12 h-12 mx-auto mb-4 opacity-30" />
          <p>No collections yet.</p>
          {!session && <Link href="/login" className="text-indigo-400 hover:text-indigo-300 mt-2 block">Sign in to create collections</Link>}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {collections.map((col, i) => <CollectionCard key={col._id} collection={col} index={i} />)}
        </div>
      )}
    </div>
  );
}
