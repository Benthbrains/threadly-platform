import YoutubeChannelCard from '@/components/YoutubeChannelCard';

const channels = [
  {
    channelId: '@crazyhistoryfacts-b9y',
    name: 'Crazy History Facts',
    description: 'Discover fascinating history facts and stories that you won\'t find in textbooks.',
    type: 'history' as const,
    url: 'https://www.youtube.com/@crazyhistoryfacts-b9y'
  },
  {
    channelId: '@MyMoments-c2y',
    name: 'My Moments',
    description: 'Tips and insights about AI and technology to help you stay ahead.',
    type: 'ai_tips' as const,
    url: 'https://www.youtube.com/@MyMoments-c2y'
  }
];

export default function AuthorPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-4">About Ben</h1>
          <p className="text-lg text-gray-700 dark:text-gray-300">
            Ben is a curious and creative 7th grader who loves learning about science, history, music, and languages. 
            He's passionate about building projects like EuroShop and CoachCash, always looking for smart, innovative ideas.
          </p>
        </div>

        <h2 className="text-2xl font-semibold mb-6">My YouTube Channels</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {channels.map((channel) => (
            <YoutubeChannelCard key={channel.channelId} {...channel} />
          ))}
        </div>

        <div className="mt-8">
          <h2 className="text-2xl font-semibold mb-4">Latest Activity</h2>
          <div className="bg-white rounded-lg shadow-md dark:bg-gray-800 p-6">
            <h3 className="text-xl font-semibold mb-4">Recent Posts</h3>
            {/* Placeholder for recent posts */}
            <p className="text-gray-600 dark:text-gray-300">Loading recent posts...</p>
          </div>
        </div>
      </div>
    </div>
  )
}