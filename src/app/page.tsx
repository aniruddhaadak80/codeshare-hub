import Link from 'next/link';
import { Code2, Search, Zap, Users, Star, ArrowRight } from 'lucide-react';
import SnippetCard from '@/components/SnippetCard';
import { Snippet } from '@/types';

async function getTrendingSnippets(): Promise<Snippet[]> {
  try {
    const baseUrl = process.env.NEXTAUTH_URL || 'http://localhost:3000';
    const res = await fetch(`${baseUrl}/api/snippets?sort=popular&limit=6`, {
      cache: 'no-store',
    });
    if (!res.ok) return [];
    const data = await res.json();
    return data.snippets || [];
  } catch {
    return [];
  }
}

export default async function HomePage() {
  const snippets = await getTrendingSnippets();

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 px-4">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-950/50 via-transparent to-purple-950/30 pointer-events-none" />
        <div className="max-w-4xl mx-auto text-center relative">
          <div className="inline-flex items-center gap-2 bg-indigo-950/60 border border-indigo-800/50 rounded-full px-4 py-1.5 text-sm text-indigo-300 mb-6">
            <Zap className="w-3.5 h-3.5" />
            Community-first code sharing
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
            Share code that{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">
              matters
            </span>
          </h1>
          <p className="text-xl text-gray-400 mb-10 max-w-2xl mx-auto">
            Discover, save, and share reusable code snippets. Build your personal code library and contribute to the developer community.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/explore"
              className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white px-6 py-3 rounded-xl font-medium transition-colors"
            >
              <Search className="w-4 h-4" />
              Explore Snippets
            </Link>
            <Link
              href="/create"
              className="inline-flex items-center gap-2 bg-gray-800 hover:bg-gray-700 text-white px-6 py-3 rounded-xl font-medium border border-gray-700 transition-colors"
            >
              <Code2 className="w-4 h-4" />
              Share a Snippet
            </Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 px-4 border-y border-gray-800">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { icon: Code2, title: '50+ Languages', desc: 'Syntax highlighting for all major programming languages' },
            { icon: Users, title: 'Community Driven', desc: 'Upvote, collect, and share snippets with other developers' },
            { icon: Star, title: 'Smart Collections', desc: 'Organize snippets into public or private collections' },
          ].map((feature) => (
            <div key={feature.title} className="text-center">
              <div className="inline-flex p-3 bg-indigo-600/20 rounded-xl mb-4">
                <feature.icon className="w-6 h-6 text-indigo-400" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">{feature.title}</h3>
              <p className="text-gray-400 text-sm">{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Trending Snippets */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl font-bold text-white">Trending Snippets</h2>
              <p className="text-gray-400 text-sm mt-1">Most popular code snippets this week</p>
            </div>
            <Link href="/explore" className="flex items-center gap-1.5 text-indigo-400 hover:text-indigo-300 text-sm">
              View all <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {snippets.length === 0 ? (
            <div className="text-center py-16 text-gray-500">
              <Code2 className="w-12 h-12 mx-auto mb-4 opacity-30" />
              <p>No snippets yet. Be the first to share one!</p>
              <Link href="/create" className="inline-block mt-4 text-indigo-400 hover:text-indigo-300">
                Create a snippet →
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {snippets.map((snippet, i) => (
                <SnippetCard key={snippet._id} snippet={snippet} index={i} />
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
