'use client';

interface CommunityCardProps {
  name: string;
  description: string;
  memberCount: number;
  isJoined?: boolean;
  onJoinClick?: () => void;
}

export default function CommunityCard({
  name,
  description,
  memberCount,
  isJoined = false,
  onJoinClick
}: CommunityCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md dark:bg-gray-800 p-4">
      <div className="flex items-start justify-between">
        <div>
          <h3 className="text-xl font-semibold mb-2">r/{name}</h3>
          <p className="text-gray-600 dark:text-gray-300 mb-3">{description}</p>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {memberCount.toLocaleString()} members
          </p>
        </div>
        <button
          onClick={onJoinClick}
          className={`px-4 py-2 rounded-full text-sm font-medium ${
            isJoined
              ? 'bg-gray-100 text-gray-800 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-200'
              : 'bg-primary-500 text-white hover:bg-primary-600'
          }`}
        >
          {isJoined ? 'Joined' : 'Join'}
        </button>
      </div>
    </div>
  );
}