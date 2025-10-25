'use client';

import { useState } from 'react';
import { FiFilter, FiRefreshCw } from 'react-icons/fi';
import NewsCard from '@/components/NewsCard';

const CATEGORIES = ['All', 'Tech', 'Science', 'World', 'Health', 'Sports'];

// Sample news data
const SAMPLE_NEWS = [
  {
    id: '1',
    title: 'New AI Breakthrough in Climate Research',
    summary: 'Scientists use advanced AI models to predict climate patterns with unprecedented accuracy.',
    content: 'Extended article content here...',
    category: 'Tech',
    source: 'TechDaily',
    url: 'https://example.com/news/1',
    imageUrl: 'https://picsum.photos/800/400',
    createdAt: new Date().toISOString(),
    votes: 42,
    commentCount: 15,
  },
  // Add more sample articles...
];

export default function LiveNewsPage() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState('latest');
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    // TODO: Implement real-time news fetch
    setTimeout(() => {
      setIsRefreshing(false);
    }, 1000);
  };

  const filteredNews = selectedCategory === 'All'
    ? SAMPLE_NEWS
    : SAMPLE_NEWS.filter(article => article.category === selectedCategory);

  const sortedNews = [...filteredNews].sort((a, b) => {
    if (sortBy === 'latest') {
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    }
    return b.votes - a.votes;
  });

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Live News</h1>
          <button
            onClick={handleRefresh}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg bg-primary-500 text-white hover:bg-primary-600 ${
              isRefreshing ? 'opacity-75 cursor-wait' : ''
            }`}
            disabled={isRefreshing}
          >
            <FiRefreshCw className={`w-5 h-5 ${isRefreshing ? 'animate-spin' : ''}`} />
            Refresh Feed
          </button>
        </div>

        {/* Filters */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 mb-6">
          <div className="flex flex-col md:flex-row md:items-center gap-4">
            {/* Categories */}
            <div className="flex flex-wrap gap-2 flex-1">
              {CATEGORIES.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-full text-sm font-medium ${
                    selectedCategory === category
                      ? 'bg-primary-500 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>

            {/* Sort */}
            <div className="flex items-center gap-2">
              <FiFilter className="w-5 h-5 text-gray-500" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-gray-100 dark:bg-gray-700 rounded-lg px-3 py-2"
              >
                <option value="latest">Latest</option>
                <option value="popular">Most Popular</option>
              </select>
            </div>
          </div>
        </div>

        {/* News Grid */}
        <div className="grid gap-6">
          {sortedNews.map((article) => (
            <NewsCard key={article.id} article={article} />
          ))}
        </div>
      </div>
    </div>
  );
}