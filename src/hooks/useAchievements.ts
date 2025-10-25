'use client';

import { useState, useEffect } from 'react';
import { useUser } from '@/contexts/UserContext';

interface Achievement {
  id: string;
  title: string;
  description: string;
  coinReward: number;
  progress: number;
  threshold: number;
  isUnlocked: boolean;
  category: string;
}

interface AchievementProgress {
  [key: string]: {
    current: number;
    threshold: number;
  };
}

export function useAchievements() {
  const { user, unlockAchievement, addThreadCoins } = useUser();
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [progress, setProgress] = useState<AchievementProgress>({});

  // Track various user actions
  const trackAction = (action: string, value: number = 1) => {
    const newProgress = { ...progress };

    switch (action) {
      case 'POST_CREATED':
        newProgress.posts = {
          current: (progress.posts?.current || 0) + value,
          threshold: 10
        };
        break;
      case 'COMMENT_CREATED':
        newProgress.comments = {
          current: (progress.comments?.current || 0) + value,
          threshold: 50
        };
        break;
      case 'UPVOTES_RECEIVED':
        newProgress.upvotes = {
          current: (progress.upvotes?.current || 0) + value,
          threshold: 100
        };
        break;
      case 'COMMUNITY_JOINED':
        newProgress.communities = {
          current: (progress.communities?.current || 0) + value,
          threshold: 5
        };
        break;
    }

    setProgress(newProgress);
    checkAchievements(newProgress);
  };

  // Check if any achievements should be unlocked
  const checkAchievements = (currentProgress: AchievementProgress) => {
    achievements.forEach(achievement => {
      if (achievement.isUnlocked) return;

      let shouldUnlock = false;
      let currentValue = 0;

      switch (achievement.id) {
        case 'FIRST_POST':
          shouldUnlock = (currentProgress.posts?.current || 0) >= 1;
          currentValue = currentProgress.posts?.current || 0;
          break;
        case 'COMMUNITY_BUILDER':
          shouldUnlock = (currentProgress.communities?.current || 0) >= 5;
          currentValue = currentProgress.communities?.current || 0;
          break;
        case 'HELPFUL_COMMENTER':
          shouldUnlock = (currentProgress.comments?.current || 0) >= 50;
          currentValue = currentProgress.comments?.current || 0;
          break;
        case 'POPULAR_POSTER':
          shouldUnlock = (currentProgress.upvotes?.current || 0) >= 100;
          currentValue = currentProgress.upvotes?.current || 0;
          break;
      }

      if (shouldUnlock) {
        unlockAchievement(achievement.id);
        addThreadCoins(achievement.coinReward);
        
        setAchievements(prev => prev.map(a => 
          a.id === achievement.id ? { ...a, isUnlocked: true } : a
        ));
      } else {
        // Update progress
        setAchievements(prev => prev.map(a => 
          a.id === achievement.id ? { ...a, progress: currentValue } : a
        ));
      }
    });
  };

  // Load achievements when component mounts
  useEffect(() => {
    // TODO: Fetch achievements from API
    // For now, using sample data
    setAchievements(SAMPLE_ACHIEVEMENTS);
  }, []);

  return {
    achievements,
    trackAction,
    progress
  };
}