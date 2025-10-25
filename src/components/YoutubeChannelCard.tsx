interface YoutubeChannelCardProps {
  channelId: string;
  name: string;
  description: string;
  type: 'history' | 'ai_tips';
  url: string;
}

export default function YoutubeChannelCard({
  channelId,
  name,
  description,
  type,
  url,
}: YoutubeChannelCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md dark:bg-gray-800 overflow-hidden">
      <div className="aspect-video w-full">
        <iframe
          width="100%"
          height="100%"
          src={`https://www.youtube.com/embed/?listType=user_uploads&list=${channelId}`}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>
      <div className="p-4">
        <h3 className="text-xl font-semibold mb-2">{name}</h3>
        <p className="text-gray-600 dark:text-gray-300 mb-3">{description}</p>
        <div className="flex items-center justify-between">
          <span className="inline-block bg-primary-100 text-primary-800 text-sm px-3 py-1 rounded-full">
            {type === 'history' ? 'History Channel' : 'AI Tips Channel'}
          </span>
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary-600 hover:text-primary-700 dark:text-primary-400"
          >
            Visit Channel →
          </a>
        </div>
      </div>
    </div>
  );
}