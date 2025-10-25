'use client';

import { useUser } from '@/contexts/UserContext';
import ThreadCoinDisplay from '@/components/ThreadCoinDisplay';

export default function HomePage() {
  const { user } = useUser();

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="md:col-span-2">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-6">
            <h1 className="text-3xl font-bold mb-4">Welcome to Threadly</h1>
            {user ? (
              <div>
                <p className="text-lg mb-4">Welcome back, {user.name}!</p>
                <div className="flex items-center gap-4">
                  <ThreadCoinDisplay balance={user.threadCoins} />
                </div>
              </div>
            ) : (
              <p className="text-lg">Please sign in to start participating in discussions.</p>
            )}
          </div>

          {/* Hot Posts */}
          <div className="space-y-4">
            <h2 className="text-2xl font-bold mb-4">Hot Posts</h2>
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white p-4 rounded-lg shadow dark:bg-gray-800">
                <h3 className="text-lg font-semibold">Sample Post Title {i}</h3>
                <p className="text-gray-600 dark:text-gray-300 mt-2">
                  This is a sample post content. Replace with actual content from your database.
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Trending Communities */}
          <div className="bg-white p-4 rounded-lg shadow dark:bg-gray-800">
            <h3 className="text-lg font-semibold mb-3">Trending Communities</h3>
            <ul className="space-y-2">
              {['Technology', 'Science', 'Gaming'].map((community) => (
                <li key={community} className="hover:text-primary-600">
                  r/{community}
                </li>
              ))}
            </ul>
          </div>

          {/* Featured Authors */}
          <div className="bg-white p-4 rounded-lg shadow dark:bg-gray-800">
            <h3 className="text-lg font-semibold mb-3">Featured Authors</h3>
            <ul className="space-y-2">
              {['JohnDoe', 'JaneSmith', 'TechGuru'].map((author) => (
                <li key={author} className="hover:text-primary-600">
                  @{author}
                </li>
              ))}
            </ul>
          </div>

          {/* Top Politicians */}
          <div className="bg-white p-4 rounded-lg shadow dark:bg-gray-800">
            <h3 className="text-lg font-semibold mb-3">Top Politicians</h3>
            <ul className="space-y-2">
              {['Politician1', 'Politician2', 'Politician3'].map((politician) => (
                <li key={politician} className="hover:text-primary-600">
                  {politician}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
}