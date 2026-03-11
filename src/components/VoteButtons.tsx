'use client';

import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { ThumbsUp, ThumbsDown } from 'lucide-react';
import { motion } from 'framer-motion';

interface VoteButtonsProps {
  snippetId: string;
  upvotes: number;
  downvotes: number;
}

export default function VoteButtons({ snippetId, upvotes: initialUpvotes, downvotes: initialDownvotes }: VoteButtonsProps) {
  const { data: session } = useSession();
  const router = useRouter();
  const [upvotes, setUpvotes] = useState(initialUpvotes);
  const [downvotes, setDownvotes] = useState(initialDownvotes);
  const [voting, setVoting] = useState(false);

  const handleVote = async (type: 'up' | 'down') => {
    if (!session) {
      router.push('/login');
      return;
    }
    if (voting) return;
    setVoting(true);

    try {
      const response = await fetch(`/api/snippets/${snippetId}/vote`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type }),
      });

      if (response.ok) {
        const data = await response.json();
        setUpvotes(data.upvotes);
        setDownvotes(data.downvotes);
      }
    } catch (error) {
      console.error('Vote error:', error);
    } finally {
      setVoting(false);
    }
  };

  return (
    <div className="flex items-center gap-3">
      <motion.button
        whileTap={{ scale: 0.95 }}
        onClick={() => handleVote('up')}
        disabled={voting}
        className="flex items-center gap-2 px-3 py-2 rounded-lg bg-gray-800 hover:bg-green-900/50 hover:text-green-400 border border-gray-700 hover:border-green-500 transition-all text-sm"
      >
        <ThumbsUp className="w-4 h-4" />
        <span>{upvotes}</span>
      </motion.button>
      <motion.button
        whileTap={{ scale: 0.95 }}
        onClick={() => handleVote('down')}
        disabled={voting}
        className="flex items-center gap-2 px-3 py-2 rounded-lg bg-gray-800 hover:bg-red-900/50 hover:text-red-400 border border-gray-700 hover:border-red-500 transition-all text-sm"
      >
        <ThumbsDown className="w-4 h-4" />
        <span>{downvotes}</span>
      </motion.button>
    </div>
  );
}
