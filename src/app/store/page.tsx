'use client';

import { useState } from 'react';
import { FiShoppingBag, FiAward, FiClock } from 'react-icons/fi';
import StoreItem from '@/components/StoreItem';
import ThreadCoinDisplay from '@/components/ThreadCoinDisplay';
import TransactionHistory from '@/components/TransactionHistory';

// Sample data - will be replaced with actual data from the database
const STORE_CATEGORIES = [
  { id: 'avatars', name: 'Avatars & Flairs', icon: FiShoppingBag },
  { id: 'features', name: 'Special Features', icon: FiAward },
  { id: 'boosts', name: 'Community Boosts', icon: FiClock },
];

const SAMPLE_ITEMS = [
  {
    id: '1',
    title: 'Premium Avatar Frame',
    description: 'A sleek golden frame for your profile picture',
    cost: 100,
    type: 'avatars',
    isUnlocked: false,
  },
  {
    id: '2',
    title: 'Verified Contributor Badge',
    description: 'Show off your status as a valued community member',
    cost: 250,
    type: 'avatars',
    isUnlocked: false,
  },
  {
    id: '3',
    title: 'GIF Comments',
    description: 'Unlock the ability to use GIFs in your comments',
    cost: 500,
    type: 'features',
    isUnlocked: false,
  },
  {
    id: '4',
    title: 'Post Spotlight (24h)',
    description: 'Highlight your post in community feeds for 24 hours',
    cost: 300,
    type: 'boosts',
    isUnlocked: false,
  },
];

// Sample transaction history
const SAMPLE_TRANSACTIONS = [
  {
    id: '1',
    amount: 100,
    type: 'EARN' as const,
    reason: 'POST_UPVOTES',
    createdAt: new Date().toISOString(),
  },
  {
    id: '2',
    amount: 250,
    type: 'SPEND' as const,
    reason: 'ITEM_PURCHASE',
    createdAt: new Date().toISOString(),
  },
];

export default function StorePage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('avatars');
  const [userBalance] = useState(1000); // This will come from user context/API

  const filteredItems = SAMPLE_ITEMS.filter(item => item.type === selectedCategory);

  const handlePurchase = async (itemId: string) => {
    // TODO: Implement purchase logic with API
    console.log('Purchasing item:', itemId);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">ThreadCoin Store</h1>
          <ThreadCoinDisplay balance={userBalance} size="lg" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Store Items Section */}
          <div className="lg:col-span-2">
            {/* Category Navigation */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md mb-6">
              <div className="flex">
                {STORE_CATEGORIES.map(category => {
                  const Icon = category.icon;
                  return (
                    <button
                      key={category.id}
                      onClick={() => setSelectedCategory(category.id)}
                      className={`flex-1 px-4 py-3 flex items-center justify-center gap-2 ${
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

            {/* Store Items Grid */}
            <div className="grid gap-4">
              {filteredItems.map(item => (
                <StoreItem
                  key={item.id}
                  item={item}
                  userBalance={userBalance}
                  onPurchase={handlePurchase}
                />
              ))}
            </div>
          </div>

          {/* Transaction History Section */}
          <div className="lg:col-span-1">
            <TransactionHistory transactions={SAMPLE_TRANSACTIONS} />
          </div>
        </div>

        {/* Store Policies */}
        <div className="mt-8 bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Store Policies</h2>
          <div className="space-y-3 text-gray-600 dark:text-gray-400">
            <p>• All purchases are final and non-refundable</p>
            <p>• Items are bound to your account and cannot be transferred</p>
            <p>• Some items may have usage limitations or cooldown periods</p>
            <p>• ThreadCoins have no real-world monetary value</p>
          </div>
        </div>
      </div>
    </div>
  );
}