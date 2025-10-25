'use client';

import { useState } from 'react';

export default function CreateCommunityModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [communityData, setCommunityData] = useState({
    name: '',
    description: '',
    type: 'public',
    category: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement community creation logic
    console.log('Creating community:', communityData);
    setIsOpen(false);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg max-w-md w-full">
        <div className="p-6">
          <h2 className="text-2xl font-bold mb-4">Create a Community</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Name</label>
              <div className="flex">
                <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 dark:bg-gray-700 dark:border-gray-600">
                  r/
                </span>
                <input
                  type="text"
                  value={communityData.name}
                  onChange={(e) => setCommunityData({ ...communityData, name: e.target.value })}
                  className="flex-1 rounded-r-md border border-gray-300 dark:border-gray-600 dark:bg-gray-700 px-3 py-2"
                  placeholder="community_name"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Description</label>
              <textarea
                value={communityData.description}
                onChange={(e) => setCommunityData({ ...communityData, description: e.target.value })}
                className="w-full rounded-md border border-gray-300 dark:border-gray-600 dark:bg-gray-700 px-3 py-2"
                rows={4}
                placeholder="What's your community about?"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Community Type</label>
              <select
                value={communityData.type}
                onChange={(e) => setCommunityData({ ...communityData, type: e.target.value })}
                className="w-full rounded-md border border-gray-300 dark:border-gray-600 dark:bg-gray-700 px-3 py-2"
              >
                <option value="public">Public</option>
                <option value="restricted">Restricted</option>
                <option value="private">Private</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Category</label>
              <select
                value={communityData.category}
                onChange={(e) => setCommunityData({ ...communityData, category: e.target.value })}
                className="w-full rounded-md border border-gray-300 dark:border-gray-600 dark:bg-gray-700 px-3 py-2"
                required
              >
                <option value="">Select a category</option>
                <option value="history">History</option>
                <option value="technology">Technology</option>
                <option value="science">Science</option>
                <option value="politics">Politics</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div className="flex justify-end space-x-4 mt-6">
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="px-4 py-2 text-gray-600 hover:text-gray-800 dark:text-gray-300 dark:hover:text-white"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-primary-500 text-white rounded-md hover:bg-primary-600"
              >
                Create Community
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}