'use client';

import { FiArrowUp, FiArrowDown } from 'react-icons/fi';
import ThreadCoinDisplay from './ThreadCoinDisplay';

interface Transaction {
  id: string;
  amount: number;
  type: 'EARN' | 'SPEND';
  reason: string;
  createdAt: string;
}

interface TransactionHistoryProps {
  transactions: Transaction[];
}

export default function TransactionHistory({ transactions }: TransactionHistoryProps) {
  const formatReason = (reason: string) => {
    return reason
      .split('_')
      .map(word => word.charAt(0) + word.slice(1).toLowerCase())
      .join(' ');
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md">
      <div className="p-4 border-b border-gray-200 dark:border-gray-700">
        <h2 className="text-lg font-semibold">Transaction History</h2>
      </div>
      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        {transactions.map((transaction) => (
          <div key={transaction.id} className="p-4 hover:bg-gray-50 dark:hover:bg-gray-700">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-full ${
                  transaction.type === 'EARN'
                    ? 'bg-green-100 text-green-600 dark:bg-green-900 dark:text-green-300'
                    : 'bg-red-100 text-red-600 dark:bg-red-900 dark:text-red-300'
                }`}>
                  {transaction.type === 'EARN' ? (
                    <FiArrowUp className="w-4 h-4" />
                  ) : (
                    <FiArrowDown className="w-4 h-4" />
                  )}
                </div>
                <div>
                  <p className="font-medium">
                    {formatReason(transaction.reason)}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {new Date(transaction.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
              <div className={`font-medium ${
                transaction.type === 'EARN'
                  ? 'text-green-600 dark:text-green-300'
                  : 'text-red-600 dark:text-red-300'
              }`}>
                {transaction.type === 'EARN' ? '+' : '-'}
                <ThreadCoinDisplay 
                  balance={Math.abs(transaction.amount)} 
                  size="sm" 
                  showLabel={false} 
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}