'use client';

import { useState } from 'react';
import { FiAward, FiTrendingUp, FiMessageCircle, FiHeart, FiStar } from 'react-icons/fi';
import AchievementCard from '@/components/AchievementCard';
import ThreadCoinDisplay from '@/components/ThreadCoinDisplay';

// Sample achievement categories
const ACHIEVEMENT_CATEGORIES = [
  { id: 'all', name: 'All Achievements', icon: FiAward },
  { id: 'engagement', name: 'Community Engagement', icon: FiMessageCircle },
  { id: 'contribution', name: 'Content Creation', icon: FiTrendingUp },
  { id: 'reputation', name: 'Reputation', icon: FiHeart },
  { id: 'special', name: 'Special Events', icon: FiStar },
];

// Sample achievements data
const SAMPLE_ACHIEVEMENTS = [
  {
    id: '1',
    title: 'First Post',
    description: 'Create your first post in any community',
    coinReward: 50,
    progress: 1,
    threshold: 1,
    isUnlocked: true,
    category: 'contribution'
  },
  {
    id: '2',
    title: 'Rising Star',
    description: 'Get 100 total upvotes on your posts',
    coinReward: 200,
    progress: 75,
    threshold: 100,
    isUnlocked: false,
    category: 'reputation'
  },
  {
    id: '3',
    title: 'Community Builder',
    description: 'Join 5 different communities',
    coinReward: 100,
    progress: 3,
    threshold: 5,
    isUnlocked: false,
    category: 'engagement'
  },
  {
    id: '4',
    title: 'Helpful Hand',
    description: 'Make 50 comments on other posts',
    coinReward: 150,
    progress: 32,
    threshold: 50,
    isUnlocked: false,
    category: 'engagement'
  },
  {
    id: '5',
    title: 'Content Creator',
    description: 'Create 10 posts that each receive at least 10 upvotes',
    coinReward: 300,
    progress: 4,
    threshold: 10,
    isUnlocked: false,
    category: 'contribution'
  },
];

export default function AchievementsPage() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [totalCoins, setTotalCoins] = useState(1000); // Will come from user context
  const [earnedCoins, setEarnedCoins] = useState(450); // Will come from achievements data

  const filteredAchievements = selectedCategory === 'all'
    ? SAMPLE_ACHIEVEMENTS
    : SAMPLE_ACHIEVEMENTS.filter(achievement => achievement.category === selectedCategory);

  const stats = {
    total: SAMPLE_ACHIEVEMENTS.length,
    unlocked: SAMPLE_ACHIEVEMENTS.filter(a => a.isUnlocked).length,
    inProgress: SAMPLE_ACHIEVEMENTS.filter(a => !a.isUnlocked && a.progress > 0).length,
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-8">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold">Achievements</h1>
            <ThreadCoinDisplay balance={totalCoins} size="lg" />
          </div>
          
          {/* Achievement Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
              <div className="text-4xl font-bold text-primary-600 dark:text-primary-400 mb-2">
                {stats.unlocked}/{stats.total}
              </div>
              <div className="text-gray-600 dark:text-gray-300">Achievements Unlocked</div>
            </div>
            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
              <div className="text-4xl font-bold text-primary-600 dark:text-primary-400 mb-2">
                {stats.inProgress}
              </div>
              <div className="text-gray-600 dark:text-gray-300">In Progress</div>
            </div>
            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
              <div className="text-4xl font-bold text-primary-600 dark:text-primary-400 mb-2">
                {earnedCoins}
              </div>
              <div className="text-gray-600 dark:text-gray-300">ThreadCoins Earned</div>
            </div>
          </div>
        </div>

        {/* Category Navigation */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md mb-6">
          <div className="flex flex-wrap">
            {ACHIEVEMENT_CATEGORIES.map(category => {
              const Icon = category.icon;
              return (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`flex-1 min-w-[150px] px-4 py-3 flex items-center justify-center gap-2 ${
                    selectedCategory === category.id
                      ? 'text-primary-600 border-b-2 border-primary-500'
                      : 'text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span>{category.name}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Achievements Grid */}
        <div className="grid gap-4">
          {filteredAchievements.map(achievement => (
            <AchievementCard
              key={achievement.id}
              achievement={achievement}
            />
          ))}
        </div>

        {/* Achievement Tips */}
        <div className="mt-8 bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Tips for Earning Achievements</h2>
          <div className="space-y-3 text-gray-600 dark:text-gray-400">
            <p>• Engage regularly with communities to unlock engagement achievements</p>
            <p>• Create quality content to earn reputation achievements</p>
            <p>• Help others by commenting and sharing knowledge</p>
            <p>• Check back daily for special event achievements</p>
          </div>
        </div>
      </div>
    </div>
  );
}