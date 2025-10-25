'use client';

import { useState } from 'react';
import ThreadCoinDisplay from './ThreadCoinDisplay';
import { FiShoppingBag, FiCheck } from 'react-icons/fi';

interface StoreItemProps {
  item: {
    id: string;
    title: string;
    description: string;
    cost: number;
    type: string;
    isUnlocked: boolean;
  };
  userBalance: number;
  onPurchase: (itemId: string) => void;
}

export default function StoreItem({ item, userBalance, onPurchase }: StoreItemProps) {
  const [isPurchasing, setIsPurchasing] = useState(false);
  const canAfford = userBalance >= item.cost;

  const handlePurchase = async () => {
    if (!canAfford || item.isUnlocked) return;
    
    setIsPurchasing(true);
    try {
      await onPurchase(item.id);
    } catch (error) {
      console.error('Purchase failed:', error);
    } finally {
      setIsPurchasing(false);
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4">
      <div className="flex items-start gap-4">
        <div className={`p-2 rounded-full ${
          item.isUnlocked
            ? 'bg-green-100 text-green-600 dark:bg-green-900 dark:text-green-300'
            : 'bg-primary-100 text-primary-600 dark:bg-primary-900 dark:text-primary-300'
        }`}>
          {item.isUnlocked ? <FiCheck className="w-6 h-6" /> : <FiShoppingBag className="w-6 h-6" />}
        </div>
        <div className="flex-1">
          <h3 className="font-semibold mb-1">{item.title}</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
            {item.description}
          </p>
          <div className="flex items-center justify-between">
            <ThreadCoinDisplay balance={item.cost} size="sm" showLabel={false} />
            <button
              onClick={handlePurchase}
              disabled={!canAfford || item.isUnlocked || isPurchasing}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                item.isUnlocked
                  ? 'bg-green-100 text-green-600 dark:bg-green-900 dark:text-green-300 cursor-default'
                  : canAfford
                  ? 'bg-primary-500 text-white hover:bg-primary-600'
                  : 'bg-gray-100 text-gray-400 dark:bg-gray-700 cursor-not-allowed'
              }`}
            >
              {item.isUnlocked
                ? 'Unlocked'
                : isPurchasing
                ? 'Purchasing...'
                : canAfford
                ? 'Purchase'
                : 'Not Enough ThreadCoins'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}