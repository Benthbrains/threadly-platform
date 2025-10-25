'use client';

import { useState } from 'react';
import { FiArrowUp, FiArrowDown } from 'react-icons/fi';
import { useUser } from '@/contexts/UserContext';
import { useAchievements } from '@/hooks/useAchievements';

interface VoteProps {
  initialVotes?: number;
  postId: string;
  onVoteChange?: (newVote: number) => void;
}

export default function VoteButtons({ initialVotes = 0, postId, onVoteChange }: VoteProps) {
  const [voteCount, setVoteCount] = useState(initialVotes);
  const [userVote, setUserVote] = useState<1 | -1 | 0>(0); // 1 for upvote, -1 for downvote, 0 for no vote

  const { user, addThreadCoins } = useUser();
  const { trackAction } = useAchievements();

  const handleVote = async (voteValue: 1 | -1) => {
    if (userVote === voteValue) {
      // Clicking the same button again removes the vote
      setVoteCount(voteCount - voteValue);
      setUserVote(0);
    } else {
      // Update the vote count by removing the old vote (if any) and adding the new vote
      const voteChange = voteValue - userVote;
      setVoteCount(voteCount + voteChange);
      setUserVote(voteValue);

      // Award ThreadCoins and track achievement progress for upvotes
      if (voteValue === 1) {
        addThreadCoins(1); // Award 1 ThreadCoin for each upvote
        trackAction('UPVOTES_RECEIVED', 1);
      }
    }

    // TODO: Implement API call to save vote
    try {
      // const response = await fetch('/api/vote', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ postId, value: voteValue }),
      // });
      if (onVoteChange) {
        onVoteChange(voteCount + voteValue);
      }
    } catch (error) {
      console.error('Error voting:', error);
      // Revert the optimistic update on error
      setVoteCount(voteCount);
      setUserVote(userVote);
      if (voteValue === 1) {
        addThreadCoins(-1); // Revert ThreadCoin award
        trackAction('UPVOTES_RECEIVED', -1);
      }
    }
  };

  return (
    <div className="flex flex-col items-center gap-1">
      <button
        onClick={() => handleVote(1)}
        className={`p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors ${
          userVote === 1 ? 'text-primary-500' : 'text-gray-400'
        }`}
        aria-label="Upvote"
      >
        <FiArrowUp className="w-6 h-6" />
      </button>
      <span className={`font-medium ${userVote === 0 ? 'text-gray-600' : userVote === 1 ? 'text-primary-500' : 'text-red-500'}`}>
        {voteCount}
      </span>
      <button
        onClick={() => handleVote(-1)}
        className={`p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors ${
          userVote === -1 ? 'text-red-500' : 'text-gray-400'
        }`}
        aria-label="Downvote"
      >
        <FiArrowDown className="w-6 h-6" />
      </button>
    </div>
  );
}