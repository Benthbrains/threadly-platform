'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import VoteButtons from './VoteButtons';
import CommentSection from './CommentSection';
import { FiMessageSquare, FiShare2, FiBookmark } from 'react-icons/fi';

interface PostProps {
  post: {
    id: string;
    title: string;
    content: string;
    type: 'text' | 'image' | 'link';
    author: {
      name: string;
      image?: string;
    };
    community: {
      name: string;
    };
    createdAt: string;
    votes: number;
    commentCount: number;
  };
  showComments?: boolean;
}

export default function Post({ post, showComments = false }: PostProps) {
  const [isCommentsVisible, setIsCommentsVisible] = useState(showComments);
  const [isSaved, setIsSaved] = useState(false);

  const handleShare = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      // TODO: Show toast notification
      console.log('Link copied to clipboard');
    } catch (err) {
      console.error('Failed to copy link:', err);
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md">
      <div className="flex">
        {/* Vote Buttons */}
        <div className="p-2 bg-gray-50 dark:bg-gray-900 rounded-l-lg">
          <VoteButtons postId={post.id} initialVotes={post.votes} />
        </div>

        {/* Post Content */}
        <div className="flex-1 p-4">
          {/* Post Header */}
          <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
            <Link href={`/r/${post.community.name}`} className="hover:text-primary-500">
              r/{post.community.name}
            </Link>
            <span>•</span>
            <span>Posted by</span>
            <Link href={`/u/${post.author.name}`} className="hover:text-primary-500">
              u/{post.author.name}
            </Link>
            <span>•</span>
            <span>{new Date(post.createdAt).toLocaleDateString()}</span>
          </div>

          {/* Post Title */}
          <h2 className="text-xl font-semibold mb-2">{post.title}</h2>

          {/* Post Content */}
          <div className="mb-4">
            {post.type === 'text' && <p className="text-gray-800 dark:text-gray-200">{post.content}</p>}
            {post.type === 'image' && (
              <div className="relative aspect-video">
                <Image
                  src={post.content}
                  alt={post.title}
                  fill
                  className="object-cover rounded-md"
                />
              </div>
            )}
            {post.type === 'link' && (
              <a
                href={post.content}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary-500 hover:underline break-all"
              >
                {post.content}
              </a>
            )}
          </div>

          {/* Post Actions */}
          <div className="flex items-center gap-4 text-gray-500">
            <button
              onClick={() => setIsCommentsVisible(!isCommentsVisible)}
              className="flex items-center gap-1 hover:text-gray-700"
            >
              <FiMessageSquare />
              {post.commentCount} Comments
            </button>
            <button
              onClick={handleShare}
              className="flex items-center gap-1 hover:text-gray-700"
            >
              <FiShare2 />
              Share
            </button>
            <button
              onClick={() => setIsSaved(!isSaved)}
              className={`flex items-center gap-1 ${
                isSaved ? 'text-primary-500' : 'hover:text-gray-700'
              }`}
            >
              <FiBookmark />
              {isSaved ? 'Saved' : 'Save'}
            </button>
          </div>
        </div>
      </div>

      {/* Comments Section */}
      {isCommentsVisible && (
        <div className="border-t border-gray-200 dark:border-gray-700 p-4">
          <CommentSection postId={post.id} />
        </div>
      )}
    </div>
  );
}