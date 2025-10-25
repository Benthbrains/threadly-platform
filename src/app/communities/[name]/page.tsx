import Link from 'next/link';

export default function CommunityPage({ params }: { params: { name: string } }) {
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Community Header */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-6">
        <h1 className="text-3xl font-bold mb-2">r/{params.name}</h1>
        <p className="text-gray-600 dark:text-gray-300 mb-4">
          Community description will be loaded from the database.
        </p>
        <div className="flex items-center gap-4">
          <button className="bg-primary-500 text-white px-4 py-2 rounded-full hover:bg-primary-600">
            Join Community
          </button>
          <div className="text-sm text-gray-500 dark:text-gray-400">
            <span className="mr-4">1.2k members</span>
            <span>100 online</span>
          </div>
        </div>
      </div>

      {/* Content Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2">
          {/* Create Post Card */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 mb-6">
            <Link href="/create-post" className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-700"></div>
              <input
                type="text"
                placeholder="Create a post"
                className="flex-1 bg-gray-100 dark:bg-gray-700 px-4 py-2 rounded-lg cursor-pointer"
                readOnly
              />
            </Link>
          </div>

          {/* Posts List */}
          <div className="space-y-4">
            {[1, 2, 3].map((post) => (
              <div key={post} className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4">
                <h2 className="text-xl font-semibold mb-2">Sample Post Title {post}</h2>
                <p className="text-gray-600 dark:text-gray-300">
                  This is a sample post content. Real posts will be loaded from the database.
                </p>
                <div className="flex items-center gap-4 mt-4 text-sm text-gray-500">
                  <button className="hover:text-primary-500">↑ Upvote</button>
                  <span>42 points</span>
                  <button className="hover:text-primary-500">↓ Downvote</button>
                  <button className="hover:text-primary-500">💬 24 Comments</button>
                  <button className="hover:text-primary-500">Share</button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* About Community */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4">
            <h3 className="text-lg font-semibold mb-3">About Community</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Detailed description and rules of the community will be displayed here.
            </p>
            <div className="border-t dark:border-gray-700 pt-4">
              <div className="flex justify-between mb-2">
                <span>Created</span>
                <span>Oct 25, 2025</span>
              </div>
              <div className="flex justify-between">
                <span>Members</span>
                <span>1.2k</span>
              </div>
            </div>
          </div>

          {/* Community Rules */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4">
            <h3 className="text-lg font-semibold mb-3">Community Rules</h3>
            <ol className="list-decimal list-inside space-y-2 text-gray-600 dark:text-gray-300">
              <li>Be respectful and civil</li>
              <li>No spam or self-promotion</li>
              <li>Post relevant content only</li>
            </ol>
          </div>

          {/* Moderators */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4">
            <h3 className="text-lg font-semibold mb-3">Moderators</h3>
            <button className="text-primary-500 hover:text-primary-600">
              Message the mods
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}