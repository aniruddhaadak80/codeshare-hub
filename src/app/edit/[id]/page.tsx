'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { Save } from 'lucide-react';
import { LANGUAGES } from '@/types';
import LoadingSpinner from '@/components/LoadingSpinner';

export default function EditPage({ params }: { params: { id: string } }) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [form, setForm] = useState({
    title: '',
    description: '',
    code: '',
    language: 'javascript',
    tags: '',
    isPublic: true,
  });

  useEffect(() => {
    fetch(`/api/snippets/${params.id}`)
      .then(r => r.json())
      .then(data => {
        setForm({
          title: data.title || '',
          description: data.description || '',
          code: data.code || '',
          language: data.language || 'javascript',
          tags: (data.tags || []).join(', '),
          isPublic: data.isPublic !== false,
        });
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [params.id]);

  if (status === 'loading' || loading) return <LoadingSpinner />;
  if (!session) {
    router.push('/login');
    return null;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError('');

    try {
      const tags = form.tags.split(',').map(t => t.trim()).filter(Boolean);
      const res = await fetch(`/api/snippets/${params.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, tags }),
      });

      if (res.ok) {
        router.push(`/snippet/${params.id}`);
      } else {
        setError('Failed to update snippet. Please try again.');
      }
    } catch {
      setError('Failed to update snippet. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-white mb-8">Edit Snippet</h1>
      {error && (
        <div className="mb-4 px-4 py-3 bg-red-900/30 border border-red-700 rounded-xl text-red-400 text-sm">
          {error}
        </div>
      )}
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1">Title *</label>
          <input required value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })}
            className="w-full bg-gray-900 border border-gray-700 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-indigo-500" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1">Description</label>
          <textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })}
            rows={3} className="w-full bg-gray-900 border border-gray-700 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-indigo-500 resize-none" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1">Language</label>
          <select value={form.language} onChange={(e) => setForm({ ...form, language: e.target.value })}
            className="w-full bg-gray-900 border border-gray-700 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-indigo-500">
            {LANGUAGES.map(lang => <option key={lang} value={lang}>{lang}</option>)}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1">Code *</label>
          <textarea required value={form.code} onChange={(e) => setForm({ ...form, code: e.target.value })}
            rows={12} className="w-full bg-gray-900 border border-gray-700 rounded-xl px-4 py-2.5 text-white font-mono text-sm focus:outline-none focus:border-indigo-500 resize-y" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1">Tags</label>
          <input value={form.tags} onChange={(e) => setForm({ ...form, tags: e.target.value })}
            placeholder="react, hooks, typescript"
            className="w-full bg-gray-900 border border-gray-700 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-indigo-500" />
        </div>
        <div className="flex items-center gap-3">
          <label className="relative inline-flex items-center cursor-pointer">
            <input type="checkbox" checked={form.isPublic} onChange={(e) => setForm({ ...form, isPublic: e.target.checked })} className="sr-only peer" />
            <div className="w-10 h-6 bg-gray-700 rounded-full peer peer-checked:bg-indigo-600 transition-colors after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:translate-x-4" />
          </label>
          <span className="text-sm text-gray-300">Public snippet</span>
        </div>
        <button type="submit" disabled={saving}
          className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white px-6 py-3 rounded-xl font-medium transition-colors">
          <Save className="w-4 h-4" />
          {saving ? 'Saving...' : 'Save Changes'}
        </button>
      </form>
    </div>
  );
}
