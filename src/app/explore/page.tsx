'use client';

import { useState, useEffect, useCallback, Suspense } from 'react';
import { Filter } from 'lucide-react';
import SnippetCard from '@/components/SnippetCard';
import SearchBar from '@/components/SearchBar';
import LoadingSpinner from '@/components/LoadingSpinner';
import { Snippet, LANGUAGES } from '@/types';
import { useSearchParams } from 'next/navigation';

function ExploreContent() {
  const searchParams = useSearchParams();
  const [snippets, setSnippets] = useState<Snippet[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState(searchParams.get('q') || '');
  const [language, setLanguage] = useState(searchParams.get('language') || '');
  const [tag, setTag] = useState(searchParams.get('tag') || '');
  const [sort, setSort] = useState('createdAt');
  const [total, setTotal] = useState(0);

  const fetchSnippets = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (search) params.set('q', search);
      if (language) params.set('language', language);
      if (tag) params.set('tag', tag);
      params.set('sort', sort);

      const res = await fetch(`/api/snippets?${params.toString()}`);
      const data = await res.json();
      setSnippets(data.snippets || []);
      setTotal(data.total || 0);
    } catch (error) {
      console.error('Error fetching snippets:', error);
    } finally {
      setLoading(false);
    }
  }, [search, language, tag, sort]);

  useEffect(() => {
    const timeout = setTimeout(fetchSnippets, 300);
    return () => clearTimeout(timeout);
  }, [fetchSnippets]);

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Explore Snippets</h1>
        <p className="text-gray-400">Discover code snippets from the community</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-1 space-y-4">
          <div className="bg-gray-900 border border-gray-800 rounded-xl p-4">
            <h3 className="flex items-center gap-2 text-sm font-medium text-gray-300 mb-3">
              <Filter className="w-4 h-4" />
              Filters
            </h3>
            <div className="space-y-3">
              <SearchBar value={search} onChange={setSearch} placeholder="Search..." />
              <div>
                <label className="text-xs text-gray-500 mb-1 block">Language</label>
                <select
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-indigo-500"
                >
                  <option value="">All languages</option>
                  {LANGUAGES.map((lang) => (
                    <option key={lang} value={lang}>{lang}</option>
                  ))}
                </select>
              </div>
              {tag && (
                <div>
                  <label className="text-xs text-gray-500 mb-1 block">Tag</label>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-indigo-400">#{tag}</span>
                    <button onClick={() => setTag('')} className="text-gray-500 hover:text-white text-xs">×</button>
                  </div>
                </div>
              )}
              <div>
                <label className="text-xs text-gray-500 mb-1 block">Sort by</label>
                <select
                  value={sort}
                  onChange={(e) => setSort(e.target.value)}
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-indigo-500"
                >
                  <option value="createdAt">Latest</option>
                  <option value="popular">Most Popular</option>
                  <option value="views">Most Viewed</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-3">
          <div className="flex items-center justify-between mb-4">
            <p className="text-sm text-gray-400">{total} snippets found</p>
          </div>
          {loading ? (
            <LoadingSpinner />
          ) : snippets.length === 0 ? (
            <div className="text-center py-16 text-gray-500">
              <p>No snippets found. Try different search terms.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {snippets.map((snippet, i) => (
                <SnippetCard key={snippet._id} snippet={snippet} index={i} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function ExplorePage() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <ExploreContent />
    </Suspense>
  );
}
