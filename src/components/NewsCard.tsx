'use client';

import Image from 'next/image';
import Link from 'next/link';
import { FiThumbsUp, FiMessageSquare, FiShare2, FiExternalLink } from 'react-icons/fi';
import { formatDistanceToNow } from 'date-fns';

interface NewsArticle {
  id: string;
  title: string;
  summary: string;
  content: string;
  category: string;
  source: string;
  url: string;
  imageUrl: string;
  createdAt: string;
  votes: number;
  commentCount: number;
}

interface NewsCardProps {
  article: NewsArticle;
}

export default function NewsCard({ article }: NewsCardProps) {
  const handleVote = async () => {
    // TODO: Implement voting functionality
    console.log('Vote clicked for article:', article.id);
  };

  const handleComment = () => {
    // TODO: Implement comment functionality
    console.log('Comment clicked for article:', article.id);
  };

  const handleShare = async () => {
    try {
      await navigator.share({
        title: article.title,
        text: article.summary,
        url: article.url,
      });
    } catch (error) {
      console.error('Error sharing:', error);
    }
  };

  return (
    <article className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
      <div className="flex flex-col md:flex-row">
        {/* Image */}
        <div className="md:w-1/3 relative h-48 md:h-auto">
          <Image
            src={article.imageUrl}
            alt={article.title}
            fill
            className="object-cover"
          />
        </div>

        {/* Content */}
        <div className="flex-1 p-6">
          <div className="flex flex-col h-full">
            {/* Header */}
            <div className="mb-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-primary-500">
                  {article.category}
                </span>
                <span className="text-sm text-gray-500">
                  {formatDistanceToNow(new Date(article.createdAt))} ago
                </span>
              </div>
              <h2 className="text-xl font-bold mb-2">{article.title}</h2>
              <p className="text-gray-600 dark:text-gray-300">{article.summary}</p>
            </div>

            {/* Source and Actions */}
            <div className="mt-auto">
              <div className="flex items-center justify-between">
                {/* Source */}
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-500">Source:</span>
                  <Link
                    href={article.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm font-medium text-primary-500 hover:text-primary-600 flex items-center gap-1"
                  >
                    {article.source}
                    <FiExternalLink className="w-4 h-4" />
                  </Link>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-4">
                  <button
                    onClick={handleVote}
                    className="flex items-center gap-1 text-gray-500 hover:text-primary-500"
                  >
                    <FiThumbsUp className="w-5 h-5" />
                    <span>{article.votes}</span>
                  </button>
                  <button
                    onClick={handleComment}
                    className="flex items-center gap-1 text-gray-500 hover:text-primary-500"
                  >
                    <FiMessageSquare className="w-5 h-5" />
                    <span>{article.commentCount}</span>
                  </button>
                  <button
                    onClick={handleShare}
                    className="text-gray-500 hover:text-primary-500"
                  >
                    <FiShare2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}