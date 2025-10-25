'use client';

import { createContext, useContext, useState, useEffect } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
  threadCoins: number;
  achievements: string[];
  unlockedItems: string[];
}

interface UserContextType {
  user: User | null;
  updateUser: (user: User) => void;
  addThreadCoins: (amount: number) => void;
  spendThreadCoins: (amount: number) => Promise<boolean>;
  unlockItem: (itemId: string) => void;
  unlockAchievement: (achievementId: string) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // TODO: Fetch user data from API
    // For now, using mock data
    setUser({
      id: '1',
      name: 'Test User',
      email: 'test@example.com',
      threadCoins: 1000,
      achievements: [],
      unlockedItems: [],
    });
  }, []);

  const updateUser = (newUser: User) => {
    setUser(newUser);
  };

  const addThreadCoins = (amount: number) => {
    if (!user) return;
    setUser({
      ...user,
      threadCoins: user.threadCoins + amount,
    });
    // TODO: Update server
  };

  const spendThreadCoins = async (amount: number): Promise<boolean> => {
    if (!user || user.threadCoins < amount) return false;

    try {
      // TODO: Make API call to spend coins
      setUser({
        ...user,
        threadCoins: user.threadCoins - amount,
      });
      return true;
    } catch (error) {
      console.error('Failed to spend ThreadCoins:', error);
      return false;
    }
  };

  const unlockItem = (itemId: string) => {
    if (!user) return;
    if (user.unlockedItems.includes(itemId)) return;

    setUser({
      ...user,
      unlockedItems: [...user.unlockedItems, itemId],
    });
    // TODO: Update server
  };

  const unlockAchievement = (achievementId: string) => {
    if (!user) return;
    if (user.achievements.includes(achievementId)) return;

    setUser({
      ...user,
      achievements: [...user.achievements, achievementId],
    });
    // TODO: Update server and grant coins
  };

  return (
    <UserContext.Provider value={{
      user,
      updateUser,
      addThreadCoins,
      spendThreadCoins,
      unlockItem,
      unlockAchievement,
    }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
}