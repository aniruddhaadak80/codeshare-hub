import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import SnippetCard from '@/components/SnippetCard';
import { User, Code2 } from 'lucide-react';
import Image from 'next/image';
import { getBaseUrl } from '@/lib/getBaseUrl';
import { Snippet } from '@/types';

async function getUserSnippets(): Promise<Snippet[]> {
  try {
    const baseUrl = getBaseUrl();
    const res = await fetch(`${baseUrl}/api/snippets?limit=20`, { cache: 'no-store' });
    if (!res.ok) return [];
    const data = await res.json();
    return data.snippets || [];
  } catch {
    return [];
  }
}

export default async function ProfilePage({
  params,
}: {
  params: Promise<{ username: string }>;
}) {
  const { username } = await params;
  const session = await getServerSession(authOptions);
  const isOwnProfile = session?.user?.name?.toLowerCase().replace(/\s+/g, '-') === username;

  const snippets = isOwnProfile ? await getUserSnippets() : [];

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="bg-gray-900 border border-gray-800 rounded-2xl p-8 mb-8">
        <div className="flex items-center gap-6">
          {session?.user?.image && isOwnProfile ? (
            <Image src={session.user.image} alt="Avatar" width={80} height={80} className="rounded-full" />
          ) : (
            <div className="w-20 h-20 bg-indigo-600/20 rounded-full flex items-center justify-center">
              <User className="w-10 h-10 text-indigo-400" />
            </div>
          )}
          <div>
            <h1 className="text-2xl font-bold text-white">{username}</h1>
            {isOwnProfile && session?.user?.email && (
              <p className="text-gray-400 text-sm mt-1">{session.user.email}</p>
            )}
            <div className="flex items-center gap-4 mt-3 text-sm text-gray-500">
              <span className="flex items-center gap-1.5"><Code2 className="w-4 h-4" />{snippets.length} snippets</span>
            </div>
          </div>
        </div>
      </div>

      <h2 className="text-xl font-bold text-white mb-4">
          {isOwnProfile ? 'My Snippets' : `Snippets by ${username}`}
      </h2>

      {snippets.length === 0 ? (
        <div className="text-center py-16 text-gray-500">
          <Code2 className="w-12 h-12 mx-auto mb-4 opacity-30" />
          <p>No snippets yet.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {snippets.map((snippet, i) => <SnippetCard key={snippet._id} snippet={snippet} index={i} />)}
        </div>
      )}
    </div>
  );
}
