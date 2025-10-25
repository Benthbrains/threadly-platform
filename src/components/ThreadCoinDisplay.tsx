'use client';

import { FiDollarSign } from 'react-icons/fi';

interface ThreadCoinDisplayProps {
  balance: number;
  size?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
}

export default function ThreadCoinDisplay({ 
  balance, 
  size = 'md',
  showLabel = true 
}: ThreadCoinDisplayProps) {
  const sizeClasses = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg'
  };

  return (
    <div className={`flex items-center gap-1 ${sizeClasses[size]}`}>
      <FiDollarSign className="text-yellow-500" />
      <span className="font-medium">{balance.toLocaleString()}</span>
      {showLabel && (
        <span className="text-gray-600 dark:text-gray-400">ThreadCoins</span>
      )}
    </div>
  );
}