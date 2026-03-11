import Link from 'next/link';
import {
  ArrowRight,
  BookMarked,
  Code2,
  Globe2,
  Search,
  Sparkles,
  Star,
  TrendingUp,
  Users,
  Zap,
} from 'lucide-react';
import SnippetCard from '@/components/SnippetCard';
import { getBaseUrl } from '@/lib/getBaseUrl';
import { Snippet } from '@/types';
import { getLibraryTrendingSnippets } from '@/lib/snippet-library';

const highlights = [
  'Tailwind-powered gradients',
  'Smooth Framer Motion cards',
  'Curated community snippets',
];

const stats = [
  { value: '50+', label: 'Languages supported' },
  { value: '24/7', label: 'Snippet inspiration' },
  { value: '1 hub', label: 'For your best ideas' },
];

const features = [
  {
    icon: Sparkles,
    title: 'Beautiful snippet reading',
    desc: 'Elegant cards, glowing accents, and clean spacing keep every code sample easy to scan.',
  },
  {
    icon: Users,
    title: 'Community energy',
    desc: 'Discover ideas from other developers, save standouts, and build your own reusable toolbox.',
  },
  {
    icon: BookMarked,
    title: 'Organized your way',
    desc: 'Collections, tags, and rich snippet metadata help you keep fast-moving projects under control.',
  },
];

function StatsGrid({ variant = 'default' }: { variant?: 'default' | 'compact' }) {
  const cardClassName =
    variant === 'compact'
      ? 'rounded-2xl border border-white/10 bg-white/5 p-4 text-center'
      : 'rounded-2xl border border-white/10 bg-white/[0.03] p-5';

  const valueClassName = variant === 'compact' ? 'text-2xl font-bold text-white' : 'text-3xl font-semibold text-white';
  const labelClassName = variant === 'compact' ? 'mt-1 text-xs text-slate-400' : 'mt-2 text-sm text-slate-400';

  return (
    <div className="grid grid-cols-3 gap-3 sm:gap-4">
      {stats.map((stat) => (
        <div key={stat.label} className={cardClassName}>
          <div className={valueClassName}>{stat.value}</div>
          <div className={labelClassName}>{stat.label}</div>
        </div>
      ))}
    </div>
  );
}

async function getTrendingSnippets(): Promise<Snippet[]> {
  try {
    const baseUrl = getBaseUrl();
    const res = await fetch(`${baseUrl}/api/snippets?sort=popular&limit=6`, {
      cache: 'no-store',
    });
    if (!res.ok) return getLibraryTrendingSnippets(6);
    const data = await res.json();
    return data.snippets?.length ? data.snippets : getLibraryTrendingSnippets(6);
  } catch {
    return getLibraryTrendingSnippets(6);
  }
}

export default async function HomePage() {
  const snippets = await getTrendingSnippets();

  return (
    <div className="min-h-screen overflow-hidden">
      {/* Hero Section */}
      <section className="relative overflow-hidden px-4 pb-20 pt-16 sm:pt-20">
        <div className="absolute inset-0 bg-grid-pattern opacity-20 pointer-events-none" />
        <div className="absolute left-[-5%] top-16 h-56 w-56 rounded-full bg-cyan-500/15 blur-3xl animate-float-slow pointer-events-none" />
        <div className="absolute right-[-4%] top-10 h-72 w-72 rounded-full bg-fuchsia-500/15 blur-3xl animate-float-delayed pointer-events-none" />
        <div className="absolute bottom-0 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-indigo-500/10 blur-3xl pointer-events-none" />
        <div className="max-w-6xl mx-auto relative">
          <div className="glass-panel rounded-[2rem] p-8 sm:p-12 lg:p-14">
            <div className="grid gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
              <div className="text-center lg:text-left">
                <div className="inline-flex items-center gap-2 rounded-full border border-indigo-400/30 bg-indigo-500/10 px-4 py-1.5 text-sm text-indigo-200 mb-6 animate-pulse-glow">
                  <Zap className="h-3.5 w-3.5" />
                  Animated, colorful, developer-first experience
                </div>
                <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-[1.05] text-glow">
                  Share code in a
                  <span className="block text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-indigo-300 to-fuchsia-400">
                    brighter, bolder hub
                  </span>
                </h1>
                <p className="text-lg sm:text-xl text-slate-300/90 mb-8 max-w-2xl mx-auto lg:mx-0">
                  Discover, save, and showcase reusable snippets in a lively interface with colorful highlights,
                  polished cards, and motion that keeps every interaction feeling modern.
                </p>
                <div className="flex flex-wrap gap-3 justify-center lg:justify-start mb-8">
                  {highlights.map((highlight) => (
                    <div
                      key={highlight}
                      className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-200"
                    >
                      {highlight}
                    </div>
                  ))}
                </div>
                <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                  <Link
                    href="/explore"
                    className="inline-flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-indigo-500 via-violet-500 to-fuchsia-500 px-6 py-3.5 font-medium text-white shadow-lg shadow-indigo-900/30 transition-transform duration-200 hover:-translate-y-0.5"
                  >
                    <Search className="h-4 w-4" />
                    Explore Snippets
                  </Link>
                  <Link
                    href="/create"
                    className="inline-flex items-center justify-center gap-2 rounded-2xl border border-white/10 bg-slate-900/70 px-6 py-3.5 font-medium text-white transition-colors hover:border-indigo-400/40 hover:bg-slate-900"
                  >
                    <Code2 className="h-4 w-4" />
                    Share a Snippet
                  </Link>
                </div>
              </div>
              <div className="relative">
                <div className="rounded-[1.75rem] border border-white/10 bg-slate-950/80 p-6 shadow-2xl shadow-indigo-950/30">
                  <div className="flex items-center justify-between border-b border-white/10 pb-4">
                    <div>
                      <p className="text-sm uppercase tracking-[0.25em] text-cyan-300/80">Live preview</p>
                      <h2 className="mt-2 text-2xl font-semibold text-white">Snippet showcase</h2>
                    </div>
                    <div className="flex gap-2">
                      <span className="h-3 w-3 rounded-full bg-rose-400" />
                      <span className="h-3 w-3 rounded-full bg-amber-400" />
                      <span className="h-3 w-3 rounded-full bg-emerald-400" />
                    </div>
                  </div>
                  <div className="mt-6 space-y-4">
                    <div className="rounded-2xl border border-indigo-400/20 bg-gradient-to-br from-indigo-500/10 to-cyan-500/10 p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-cyan-200">Community spotlight</p>
                          <h3 className="mt-1 text-lg font-semibold text-white">Trending snippets, instantly</h3>
                        </div>
                        <TrendingUp className="h-5 w-5 text-fuchsia-300" />
                      </div>
                      <p className="mt-3 text-sm text-slate-300">
                        Browse polished code cards with language badges, tags, and quick stats in one glance.
                      </p>
                    </div>
                    <StatsGrid variant="compact" />
                    <div className="rounded-2xl border border-fuchsia-400/20 bg-fuchsia-500/10 p-4 text-sm text-fuchsia-100">
                      <div className="flex items-center gap-2 font-medium">
                        <Globe2 className="h-4 w-4" />
                        Built to feel vibrant on every screen
                      </div>
                      <p className="mt-2 text-fuchsia-100/80">
                        The refreshed landing page leans on Tailwind gradients, layered surfaces, and motion-ready UI.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-10 border-t border-white/10 pt-8">
              <StatsGrid />
            </div>
          </div>
        </div>
      </section>

      {/* Features */}

              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 py-12">
        <div className="max-w-6xl mx-auto rounded-[1.75rem] border border-cyan-400/15 bg-gradient-to-r from-cyan-500/10 via-indigo-500/10 to-fuchsia-500/10 px-6 py-5 sm:px-8">
          <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-cyan-200/70">Ready to build momentum?</p>
              <h2 className="mt-2 text-2xl font-semibold text-white">Turn your best code into a shareable library.</h2>
            </div>
            <Link
              href="/explore"
              className="inline-flex items-center gap-2 self-start rounded-2xl border border-white/10 bg-slate-950/70 px-5 py-3 text-white transition-colors hover:border-cyan-300/40 hover:text-cyan-200"
            >
              Join the trend
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Trending Snippets */}
      <section className="px-4 pb-20 pt-4">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8 flex items-center justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-indigo-400/20 bg-indigo-500/10 px-3 py-1 text-xs uppercase tracking-[0.25em] text-indigo-200">
                <Star className="h-3.5 w-3.5" />
                This week’s highlights
              </div>
              <h2 className="mt-4 text-3xl font-bold text-white">Trending Snippets</h2>
              <p className="mt-2 text-sm text-slate-400">Most popular code snippets in the community right now.</p>
            </div>
            <Link
              href="/explore"
              className="flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-indigo-300 transition-colors hover:border-indigo-400/30 hover:text-indigo-200"
            >
              View all <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          {snippets.length === 0 ? (
            <div className="rounded-[1.75rem] border border-white/10 bg-slate-900/70 py-16 text-center text-gray-500">
              <Code2 className="mx-auto mb-4 h-12 w-12 opacity-30" />
              <p>No snippets yet. Be the first to share one!</p>
              <Link href="/create" className="mt-4 inline-block text-indigo-400 hover:text-indigo-300">
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
