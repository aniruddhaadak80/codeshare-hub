'use client';

import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';
import { motion } from 'framer-motion';
import { Code2, Search, Plus, BookOpen, User, LogOut, Menu, X } from 'lucide-react';
import { useState } from 'react';
import Image from 'next/image';

export default function Navbar() {
  const { data: session } = useSession();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="sticky top-0 z-50 border-b border-white/10 bg-slate-950/75 backdrop-blur-xl"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2 text-xl font-bold text-indigo-300">
            <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-400/20 via-indigo-500/30 to-fuchsia-500/20 text-indigo-200 shadow-lg shadow-indigo-950/30">
              <Code2 className="w-5 h-5" />
            </span>
            <span>CodeShare Hub</span>
          </Link>

          <div className="hidden md:flex items-center gap-6">
            <Link href="/explore" className="flex items-center gap-1.5 text-gray-300 hover:text-white transition-colors">
              <Search className="w-4 h-4" />
              Explore
            </Link>
            {session && (
              <>
                <Link href="/create" className="flex items-center gap-1.5 text-gray-300 hover:text-white transition-colors">
                  <Plus className="w-4 h-4" />
                  Create
                </Link>
                <Link href="/collections" className="flex items-center gap-1.5 text-gray-300 hover:text-white transition-colors">
                  <BookOpen className="w-4 h-4" />
                  Collections
                </Link>
              </>
            )}
          </div>

          <div className="hidden md:flex items-center gap-4">
            {session ? (
              <div className="flex items-center gap-3">
                <Link href={`/profile/${session.user?.name?.toLowerCase().replace(/\s+/g, '-')}`}>
                  {session.user?.image ? (
                    <Image src={session.user.image} alt="Avatar" width={32} height={32} className="rounded-full" />
                  ) : (
                    <div className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center">
                      <User className="w-4 h-4" />
                    </div>
                  )}
                </Link>
                <button
                  onClick={() => signOut()}
                  className="flex items-center gap-1.5 text-gray-400 hover:text-white transition-colors text-sm"
                >
                  <LogOut className="w-4 h-4" />
                  Sign out
                </button>
              </div>
            ) : (
              <Link
                href="/login"
                className="rounded-xl bg-gradient-to-r from-indigo-500 via-violet-500 to-fuchsia-500 px-4 py-2 text-sm font-medium text-white transition-transform duration-200 hover:-translate-y-0.5"
              >
                Sign in
              </Link>
            )}
          </div>

          <button
            className="md:hidden rounded-xl border border-white/10 bg-white/5 p-2"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {menuOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className="md:hidden border-t border-white/10 bg-slate-950/95 px-4 py-4 flex flex-col gap-4"
        >
          <Link href="/explore" className="text-gray-300 hover:text-white" onClick={() => setMenuOpen(false)}>Explore</Link>
          {session && (
            <>
              <Link href="/create" className="text-gray-300 hover:text-white" onClick={() => setMenuOpen(false)}>Create</Link>
              <Link href="/collections" className="text-gray-300 hover:text-white" onClick={() => setMenuOpen(false)}>Collections</Link>
            </>
          )}
          {session ? (
            <button onClick={() => signOut()} className="text-left text-gray-400 hover:text-white">Sign out</button>
          ) : (
            <Link href="/login" className="text-indigo-400 hover:text-indigo-300">Sign in</Link>
          )}
        </motion.div>
      )}
    </motion.nav>
  );
}
