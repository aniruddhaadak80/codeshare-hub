'use client';

import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Save, Code2 } from 'lucide-react';
import CodeBlock from '@/components/CodeBlock';
import { LANGUAGES } from '@/types';
import Link from 'next/link';

export default function CreatePage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [preview, setPreview] = useState(false);
  const [form, setForm] = useState({
    title: '',
    description: '',
    code: '',
    language: 'javascript',
    tags: '',
    isPublic: true,
  });

  if (status === 'loading') return <div className="flex justify-center py-20"><div className="w-8 h-8 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin" /></div>;
  if (!session) return (
    <div className="text-center py-20">
      <Code2 className="w-12 h-12 mx-auto mb-4 text-gray-600" />
      <p className="text-gray-400 mb-4">Sign in to create snippets</p>
      <Link href="/login" className="bg-indigo-600 hover:bg-indigo-500 text-white px-6 py-2 rounded-lg">Sign in</Link>
    </div>
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const tags = form.tags.split(',').map(t => t.trim()).filter(Boolean);
      const res = await fetch('/api/snippets', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, tags }),
      });

      if (res.ok) {
        const snippet = await res.json();
        router.push(`/snippet/${snippet._id}`);
      } else {
        setError('Failed to create snippet. Please try again.');
      }
    } catch {
      setError('Failed to create snippet. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Create Snippet</h1>
        <p className="text-gray-400">Share your code with the community</p>
      </div>

      {error && (
        <div className="mb-4 px-4 py-3 bg-red-900/30 border border-red-700 rounded-xl text-red-400 text-sm">
          {error}
        </div>
      )}

      <div className="flex gap-2 mb-6">
        <button
          onClick={() => setPreview(false)}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${!preview ? 'bg-indigo-600 text-white' : 'bg-gray-800 text-gray-400 hover:text-white'}`}
        >
          Edit
        </button>
        <button
          onClick={() => setPreview(true)}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${preview ? 'bg-indigo-600 text-white' : 'bg-gray-800 text-gray-400 hover:text-white'}`}
        >
          Preview
        </button>
      </div>

      {preview ? (
        <div className="space-y-4">
          <h2 className="text-2xl font-bold">{form.title || 'Untitled'}</h2>
          {form.description && <p className="text-gray-400">{form.description}</p>}
          {form.code && <CodeBlock code={form.code} language={form.language} />}
        </div>
      ) : (
        <motion.form
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          onSubmit={handleSubmit}
          className="space-y-6"
        >
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Title *</label>
            <input
              required
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              placeholder="Give your snippet a descriptive title"
              className="w-full bg-gray-900 border border-gray-700 rounded-xl px-4 py-2.5 text-white placeholder-gray-500 focus:outline-none focus:border-indigo-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Description</label>
            <textarea
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              placeholder="Explain what this snippet does..."
              rows={3}
              className="w-full bg-gray-900 border border-gray-700 rounded-xl px-4 py-2.5 text-white placeholder-gray-500 focus:outline-none focus:border-indigo-500 resize-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Language *</label>
            <select
              value={form.language}
              onChange={(e) => setForm({ ...form, language: e.target.value })}
              className="w-full bg-gray-900 border border-gray-700 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-indigo-500"
            >
              {LANGUAGES.map((lang) => (
                <option key={lang} value={lang}>{lang}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Code *</label>
            <textarea
              required
              value={form.code}
              onChange={(e) => setForm({ ...form, code: e.target.value })}
              placeholder="Paste your code here..."
              rows={12}
              className="w-full bg-gray-900 border border-gray-700 rounded-xl px-4 py-2.5 text-white placeholder-gray-500 focus:outline-none focus:border-indigo-500 font-mono text-sm resize-y"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Tags</label>
            <input
              value={form.tags}
              onChange={(e) => setForm({ ...form, tags: e.target.value })}
              placeholder="react, hooks, typescript (comma-separated)"
              className="w-full bg-gray-900 border border-gray-700 rounded-xl px-4 py-2.5 text-white placeholder-gray-500 focus:outline-none focus:border-indigo-500"
            />
          </div>

          <div className="flex items-center gap-3">
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={form.isPublic}
                onChange={(e) => setForm({ ...form, isPublic: e.target.checked })}
                className="sr-only peer"
              />
              <div className="w-10 h-6 bg-gray-700 peer-focus:ring-2 peer-focus:ring-indigo-500 rounded-full peer peer-checked:bg-indigo-600 transition-colors after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:translate-x-4" />
            </label>
            <span className="text-sm text-gray-300">Make this snippet public</span>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white px-6 py-3 rounded-xl font-medium transition-colors"
          >
            <Save className="w-4 h-4" />
            {loading ? 'Creating...' : 'Create Snippet'}
          </button>
        </motion.form>
      )}
    </div>
  );
}
