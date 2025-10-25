'use client';

import { FiAward, FiLock, FiCheck } from 'react-icons/fi';
import ThreadCoinDisplay from './ThreadCoinDisplay';

interface Achievement {
  id: string;
  title: string;
  description: string;
  coinReward: number;
  progress: number;
  threshold: number;
  isUnlocked: boolean;
}

interface AchievementCardProps {
  achievement: Achievement;
}

export default function AchievementCard({ achievement }: AchievementCardProps) {
  const progressPercentage = Math.min((achievement.progress / achievement.threshold) * 100, 100);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4">
      <div className="flex items-start gap-4">
        <div className={`p-2 rounded-full ${
          achievement.isUnlocked 
            ? 'bg-primary-100 text-primary-600 dark:bg-primary-900 dark:text-primary-300'
            : 'bg-gray-100 text-gray-400 dark:bg-gray-700'
        }`}>
          {achievement.isUnlocked ? <FiCheck className="w-6 h-6" /> : <FiAward className="w-6 h-6" />}
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <h3 className="font-semibold">{achievement.title}</h3>
            {achievement.isUnlocked && (
              <span className="text-xs bg-primary-100 text-primary-600 dark:bg-primary-900 dark:text-primary-300 px-2 py-0.5 rounded-full">
                Unlocked!
              </span>
            )}
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
            {achievement.description}
          </p>
          <div className="flex items-center justify-between text-sm mb-2">
            <span className="text-gray-500">Progress: {achievement.progress}/{achievement.threshold}</span>
            <ThreadCoinDisplay balance={achievement.coinReward} size="sm" showLabel={false} />
          </div>
          {/* Progress Bar */}
          <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
            <div
              className="h-full bg-primary-500 transition-all duration-300"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}