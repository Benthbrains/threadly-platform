import CommunityCard from '@/components/CommunityCard';

// This will be replaced with actual data from the database
const sampleCommunities = [
  {
    name: 'HistoryFacts',
    description: 'Share and discuss fascinating historical facts and stories.',
    memberCount: 1234,
  },
  {
    name: 'ArtificialIntelligence',
    description: 'Latest news, discussions, and tips about AI technology.',
    memberCount: 5678,
  },
  {
    name: 'TechInnovation',
    description: 'Exploring cutting-edge technology and innovation.',
    memberCount: 3456,
  },
  {
    name: 'ScienceNews',
    description: 'Breaking news and discussions about scientific discoveries.',
    memberCount: 7890,
  }
];

export default function CommunitiesPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Search and Filter Section */}
      <div className="mb-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex-1">
            <input
              type="search"
              placeholder="Search communities..."
              className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700"
            />
          </div>
          <div className="flex gap-4">
            <select className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700">
              <option value="all">All Categories</option>
              <option value="history">History</option>
              <option value="technology">Technology</option>
              <option value="science">Science</option>
              <option value="politics">Politics</option>
            </select>
            <select className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700">
              <option value="popular">Most Popular</option>
              <option value="new">Newest</option>
              <option value="active">Most Active</option>
            </select>
          </div>
        </div>
      </div>

      {/* Featured Communities */}
      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Featured Communities</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {sampleCommunities.slice(0, 2).map((community) => (
            <CommunityCard
              key={community.name}
              {...community}
              onJoinClick={() => console.log(`Join ${community.name}`)}
            />
          ))}
        </div>
      </section>

      {/* All Communities */}
      <section>
        <h2 className="text-2xl font-bold mb-4">All Communities</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {sampleCommunities.map((community) => (
            <CommunityCard
              key={community.name}
              {...community}
              onJoinClick={() => console.log(`Join ${community.name}`)}
            />
          ))}
        </div>
      </section>

      {/* Create Community Button */}
      <div className="fixed bottom-6 right-6">
        <button className="bg-primary-500 text-white px-6 py-3 rounded-full shadow-lg hover:bg-primary-600 flex items-center">
          <span className="mr-2">+</span>
          Create Community
        </button>
      </div>
    </div>
  );
}