'use client';

import { useState, useEffect, useMemo, Suspense } from 'react';
import Link from 'next/link';
import { Filter, Layers3, Sparkles } from 'lucide-react';
import SnippetCard from '@/components/SnippetCard';
import SearchBar from '@/components/SearchBar';
import LoadingSpinner from '@/components/LoadingSpinner';
import CodeBlock from '@/components/CodeBlock';
import { Snippet, LANGUAGES } from '@/types';
import { usePathname, useSearchParams } from 'next/navigation';
import { LIBRARY_SNIPPETS } from '@/lib/snippet-library';
import { getLocalSnippets } from '@/lib/local-snippets';

const LEVELS: NonNullable<Snippet['level']>[] = ['Beginner', 'Intermediate', 'Advanced'];
const SOURCE_OPTIONS: Array<{ value: 'all' | NonNullable<Snippet['source']>; label: string }> = [
  { value: 'all', label: 'All sources' },
  { value: 'community', label: 'Community' },
  { value: 'library', label: 'Library' },
  { value: 'local', label: 'Local browser' },
];

const normalize = (value: string) => value.toLowerCase();

const splitSearchTerms = (value: string) => {
  const matches = value.match(/"([^"]+)"|(\S+)/g) ?? [];
  return matches.map((term) => term.replace(/^"|"$/g, '').trim().toLowerCase()).filter(Boolean);
};

const enrichCommunitySnippet = (snippet: Snippet): Snippet => ({
  ...snippet,
  href: snippet.href || `/snippet/${snippet._id}`,
  source: snippet.source || 'community',
  level: snippet.level || (snippet.code.split('\n').length > 12 ? 'Advanced' : snippet.code.split('\n').length > 6 ? 'Intermediate' : 'Beginner'),
});

const getSearchScore = (snippet: Snippet, terms: string[]) => {
  if (terms.length === 0) return snippet.upvotes + snippet.views;

  const title = normalize(snippet.title);
  const description = normalize(snippet.description || '');
  const tags = snippet.tags.map(normalize);
  const code = normalize(snippet.code);
  const author = normalize(snippet.authorName);

  return terms.reduce((score, term) => {
    let termScore = 0;
    if (title.includes(term)) termScore += 6;
    if (tags.some((tag) => tag.includes(term))) termScore += 4;
    if (description.includes(term)) termScore += 3;
    if (author.includes(term)) termScore += 2;
    if (code.includes(term)) termScore += 1;
    return score + termScore;
  }, 0);
};

function ExploreContent() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [communitySnippets, setCommunitySnippets] = useState<Snippet[]>([]);
  const [localSnippets, setLocalSnippets] = useState<Snippet[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState(searchParams.get('q') || '');
  const [language, setLanguage] = useState(searchParams.get('language') || '');
  const [tag, setTag] = useState(searchParams.get('tag') || '');
  const [sort, setSort] = useState<'relevance' | 'createdAt' | 'popular' | 'views' | 'title'>('relevance');
  const [source, setSource] = useState<'all' | NonNullable<Snippet['source']>>('all');
  const [level, setLevel] = useState<'' | NonNullable<Snippet['level']>>('');
  const [selectedSnippetId, setSelectedSnippetId] = useState<string | null>(null);

  useEffect(() => {
    const loadSnippets = async () => {
      setLoading(true);
      try {
        const res = await fetch('/api/snippets?limit=100&sort=popular');
        const data = res.ok ? await res.json() : { snippets: [] };
        setCommunitySnippets((data.snippets || []).map(enrichCommunitySnippet));
      } catch (error) {
        console.error('Error fetching snippets:', error);
        setCommunitySnippets([]);
      } finally {
        setLocalSnippets(getLocalSnippets().map(enrichCommunitySnippet));
        setLoading(false);
      }
    };

    loadSnippets();

    const syncLocal = () => setLocalSnippets(getLocalSnippets().map(enrichCommunitySnippet));
    window.addEventListener('focus', syncLocal);
    window.addEventListener('pageshow', syncLocal);
    window.addEventListener('storage', syncLocal);
    return () => {
      window.removeEventListener('focus', syncLocal);
      window.removeEventListener('pageshow', syncLocal);
      window.removeEventListener('storage', syncLocal);
    };
  }, []);

  useEffect(() => {
    setLocalSnippets(getLocalSnippets().map(enrichCommunitySnippet));
  }, [pathname]);

  const allSnippets = useMemo(() => {
    const merged = [...localSnippets, ...LIBRARY_SNIPPETS.map(enrichCommunitySnippet), ...communitySnippets];
    return merged.filter((snippet, index) => merged.findIndex((item) => item._id === snippet._id) === index);
  }, [communitySnippets, localSnippets]);

  const searchTerms = useMemo(() => splitSearchTerms(search), [search]);

  const quickTags = useMemo(() => {
    const counts = new Map<string, number>();
    allSnippets.forEach((snippet) => {
      snippet.tags.forEach((currentTag) => {
        counts.set(currentTag, (counts.get(currentTag) || 0) + 1);
      });
    });

    return [...counts.entries()]
      .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
      .slice(0, 12)
      .map(([value]) => value);
  }, [allSnippets]);

  const suggestions = useMemo(() => {
    const values = new Set<string>();
    allSnippets.slice(0, 50).forEach((snippet) => {
      values.add(snippet.title);
      values.add(snippet.language);
      snippet.tags.slice(0, 2).forEach((item) => values.add(item));
    });
    return [...values].slice(0, 10);
  }, [allSnippets]);

  const filteredSnippets = useMemo(() => {
    const results = allSnippets.filter((snippet) => {
      const searchableText = normalize([
        snippet.title,
        snippet.description,
        snippet.code,
        snippet.authorName,
        snippet.language,
        snippet.level,
        snippet.source,
        snippet.tags.join(' '),
      ].filter(Boolean).join(' '));

      const matchesSearch = searchTerms.length === 0 || searchTerms.every((term) => searchableText.includes(term));
      const matchesLanguage = !language || snippet.language === language;
      const matchesTag = !tag || snippet.tags.includes(tag);
      const matchesSource = source === 'all' || snippet.source === source;
      const matchesLevel = !level || snippet.level === level;

      return matchesSearch && matchesLanguage && matchesTag && matchesSource && matchesLevel;
    });

    return results.sort((a, b) => {
      if (sort === 'title') return a.title.localeCompare(b.title);
      if (sort === 'popular') return b.upvotes - a.upvotes || b.views - a.views;
      if (sort === 'views') return b.views - a.views;
      if (sort === 'createdAt') return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      return getSearchScore(b, searchTerms) - getSearchScore(a, searchTerms) || b.views - a.views;
    });
  }, [allSnippets, language, level, searchTerms, sort, source, tag]);

  useEffect(() => {
    if (filteredSnippets.length === 0) {
      setSelectedSnippetId(null);
      return;
    }

    const stillVisible = filteredSnippets.some((snippet) => snippet._id === selectedSnippetId);
    if (!stillVisible) {
      setSelectedSnippetId(filteredSnippets[0]._id);
    }
  }, [filteredSnippets, selectedSnippetId]);

  const selectedSnippet = filteredSnippets.find((snippet) => snippet._id === selectedSnippetId) || null;

  const resetFilters = () => {
    setSearch('');
    setLanguage('');
    setTag('');
    setSort('relevance');
    setSource('all');
    setLevel('');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-8">
        <div className="flex flex-wrap items-center gap-3 mb-3">
          <span className="inline-flex items-center gap-2 bg-indigo-950/60 border border-indigo-800/50 rounded-full px-3 py-1 text-sm text-indigo-300">
            <Layers3 className="w-4 h-4" />
            100 library snippets + community + local browser saves
          </span>
        </div>
        <h1 className="text-3xl font-bold text-white mb-2">Explore Snippets</h1>
        <p className="text-gray-400">Search across titles, descriptions, tags, languages, code content, and snippet source with a live preview.</p>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-5 gap-6">
        <div className="xl:col-span-2 space-y-4">
          <div className="bg-gray-900 border border-gray-800 rounded-xl p-4 sticky top-24">
            <div className="flex items-center justify-between mb-4">
              <h3 className="flex items-center gap-2 text-sm font-medium text-gray-300">
                <Filter className="w-4 h-4" />
                Advanced filters
              </h3>
              <button onClick={resetFilters} className="text-xs text-indigo-300 hover:text-indigo-200 transition-colors">
                Reset all
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-xs text-gray-500 mb-1 block">Smart search</label>
                <SearchBar
                  value={search}
                  onChange={setSearch}
                  placeholder='Try "search tokenizer" or filter tags'
                  suggestions={suggestions}
                />
                <p className="text-xs text-gray-500 mt-2">Tip: use multiple words or quotes to narrow the results faster.</p>
              </div>

              <div>
                <label className="text-xs text-gray-500 mb-2 block">Source</label>
                <div className="grid grid-cols-2 gap-2">
                  {SOURCE_OPTIONS.map((option) => (
                    <button
                      key={option.value}
                      type="button"
                      onClick={() => setSource(option.value)}
                      className={`rounded-lg border px-3 py-2 text-sm transition-colors ${source === option.value ? 'border-indigo-500 bg-indigo-500/10 text-indigo-300' : 'border-gray-700 bg-gray-800 text-gray-300 hover:text-white'}`}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
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
                <div>
                  <label className="text-xs text-gray-500 mb-1 block">Sort by</label>
                  <select
                    value={sort}
                    onChange={(e) => setSort(e.target.value as typeof sort)}
                    className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-indigo-500"
                  >
                    <option value="relevance">Best match</option>
                    <option value="createdAt">Latest</option>
                    <option value="popular">Most popular</option>
                    <option value="views">Most viewed</option>
                    <option value="title">A–Z</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-xs text-gray-500 mb-2 block">Level</label>
                <div className="flex flex-wrap gap-2">
                  {LEVELS.map((currentLevel) => (
                    <button
                      key={currentLevel}
                      type="button"
                      onClick={() => setLevel(level === currentLevel ? '' : currentLevel)}
                      className={`rounded-full border px-3 py-1.5 text-sm transition-colors ${level === currentLevel ? 'border-indigo-500 bg-indigo-500/10 text-indigo-300' : 'border-gray-700 bg-gray-800 text-gray-300 hover:text-white'}`}
                    >
                      {currentLevel}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-xs text-gray-500 mb-2 block">Top tags</label>
                <div className="flex flex-wrap gap-2">
                  {quickTags.map((quickTag) => (
                    <button
                      key={quickTag}
                      type="button"
                      onClick={() => setTag(tag === quickTag ? '' : quickTag)}
                      className={`rounded-full border px-3 py-1.5 text-sm transition-colors ${tag === quickTag ? 'border-indigo-500 bg-indigo-500/10 text-indigo-300' : 'border-gray-700 bg-gray-800 text-gray-300 hover:text-white'}`}
                    >
                      #{quickTag}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="xl:col-span-3 space-y-4">
          <div className="bg-gray-900/60 border border-gray-800 rounded-xl p-4 flex flex-col md:flex-row md:items-center md:justify-between gap-3">
            <div>
              <p className="text-sm text-gray-300">{filteredSnippets.length} snippets ready to explore</p>
              <p className="text-xs text-gray-500 mt-1">Search now looks at code text, metadata, levels, and source with best-match ranking.</p>
            </div>
            <div className="flex flex-wrap gap-2 text-xs">
              {search && <span className="px-2.5 py-1 rounded-full bg-indigo-500/10 text-indigo-300 border border-indigo-500/20">Search: {search}</span>}
              {language && <span className="px-2.5 py-1 rounded-full bg-gray-800 text-gray-300 border border-gray-700">{language}</span>}
              {level && <span className="px-2.5 py-1 rounded-full bg-gray-800 text-gray-300 border border-gray-700">{level}</span>}
              {tag && <span className="px-2.5 py-1 rounded-full bg-gray-800 text-gray-300 border border-gray-700">#{tag}</span>}
              {source !== 'all' && <span className="px-2.5 py-1 rounded-full bg-gray-800 text-gray-300 border border-gray-700 capitalize">{source}</span>}
            </div>
          </div>

          {selectedSnippet && (
            <div className="bg-gradient-to-br from-gray-900 via-gray-900 to-indigo-950/20 border border-gray-800 rounded-2xl p-5">
              <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4 mb-4">
                <div>
                  <div className="flex flex-wrap gap-2 mb-3">
                    {selectedSnippet.level && (
                      <span className="px-2.5 py-1 text-xs rounded-full bg-indigo-500/10 text-indigo-300 border border-indigo-500/20">{selectedSnippet.level}</span>
                    )}
                    {selectedSnippet.source && (
                      <span className="px-2.5 py-1 text-xs rounded-full bg-gray-800 text-gray-300 border border-gray-700 capitalize">{selectedSnippet.source}</span>
                    )}
                    {!selectedSnippet.isPublic && (
                      <span className="px-2.5 py-1 text-xs rounded-full bg-amber-500/10 text-amber-300 border border-amber-500/20">Browser only</span>
                    )}
                  </div>
                  <h2 className="text-2xl font-semibold text-white mb-2">{selectedSnippet.title}</h2>
                  <p className="text-gray-400 max-w-2xl">{selectedSnippet.description}</p>
                </div>
                <Link
                  href={selectedSnippet.href || `/snippet/${selectedSnippet._id}`}
                  className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2.5 text-sm font-medium transition-colors"
                >
                  <Sparkles className="w-4 h-4" />
                  Open snippet
                </Link>
              </div>
              <CodeBlock code={selectedSnippet.code} language={selectedSnippet.language} showLineNumbers={false} />
            </div>
          )}

          {loading ? (
            <LoadingSpinner />
          ) : filteredSnippets.length === 0 ? (
            <div className="text-center py-16 text-gray-500 bg-gray-900 border border-gray-800 rounded-xl">
              <p>No snippets matched your current filters. Try clearing a tag, source, or level.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredSnippets.map((snippet, i) => (
                <SnippetCard
                  key={snippet._id}
                  snippet={snippet}
                  index={i}
                  onPreview={() => setSelectedSnippetId(snippet._id)}
                />
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
