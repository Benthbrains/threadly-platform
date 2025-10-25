'use client';

import { useState } from 'react';
import { FiImage, FiLink, FiType } from 'react-icons/fi';

const PostTypes = {
  TEXT: 'text',
  IMAGE: 'image',
  LINK: 'link',
} as const;

type PostType = typeof PostTypes[keyof typeof PostTypes];

export default function CreatePostPage() {
  const [postType, setPostType] = useState<PostType>(PostTypes.TEXT);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [selectedCommunity, setSelectedCommunity] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [link, setLink] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement post creation logic
    const postData = {
      type: postType,
      title,
      content: postType === PostTypes.TEXT ? content : postType === PostTypes.IMAGE ? imageUrl : link,
      communityId: selectedCommunity,
    };
    console.log('Creating post:', postData);
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-3xl font-bold mb-6">Create a Post</h1>

      {/* Community Selection */}
      <div className="mb-6">
        <select
          value={selectedCommunity}
          onChange={(e) => setSelectedCommunity(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg dark:border-gray-600 dark:bg-gray-700"
          required
        >
          <option value="">Choose a community</option>
          <option value="1">r/HistoryFacts</option>
          <option value="2">r/ArtificialIntelligence</option>
          <option value="3">r/TechInnovation</option>
        </select>
      </div>

      {/* Post Type Selection */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md mb-6">
        <div className="flex border-b border-gray-200 dark:border-gray-700">
          <button
            onClick={() => setPostType(PostTypes.TEXT)}
            className={`flex items-center px-6 py-3 ${
              postType === PostTypes.TEXT
                ? 'border-b-2 border-primary-500 text-primary-500'
                : 'text-gray-500'
            }`}
          >
            <FiType className="mr-2" />
            Text
          </button>
          <button
            onClick={() => setPostType(PostTypes.IMAGE)}
            className={`flex items-center px-6 py-3 ${
              postType === PostTypes.IMAGE
                ? 'border-b-2 border-primary-500 text-primary-500'
                : 'text-gray-500'
            }`}
          >
            <FiImage className="mr-2" />
            Image
          </button>
          <button
            onClick={() => setPostType(PostTypes.LINK)}
            className={`flex items-center px-6 py-3 ${
              postType === PostTypes.LINK
                ? 'border-b-2 border-primary-500 text-primary-500'
                : 'text-gray-500'
            }`}
          >
            <FiLink className="mr-2" />
            Link
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6">
          <div className="mb-4">
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Title"
              className="w-full p-3 border border-gray-300 rounded-lg dark:border-gray-600 dark:bg-gray-700"
              required
            />
          </div>

          {postType === PostTypes.TEXT && (
            <div className="mb-4">
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Text (optional)"
                className="w-full p-3 border border-gray-300 rounded-lg dark:border-gray-600 dark:bg-gray-700"
                rows={8}
              />
            </div>
          )}

          {postType === PostTypes.IMAGE && (
            <div className="mb-4">
              <input
                type="url"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                placeholder="Image URL"
                className="w-full p-3 border border-gray-300 rounded-lg dark:border-gray-600 dark:bg-gray-700"
                required
              />
            </div>
          )}

          {postType === PostTypes.LINK && (
            <div className="mb-4">
              <input
                type="url"
                value={link}
                onChange={(e) => setLink(e.target.value)}
                placeholder="URL"
                className="w-full p-3 border border-gray-300 rounded-lg dark:border-gray-600 dark:bg-gray-700"
                required
              />
            </div>
          )}

          <div className="flex justify-end gap-4">
            <button
              type="button"
              className="px-6 py-2 text-gray-600 hover:text-gray-800 dark:text-gray-300"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-primary-500 text-white rounded-md hover:bg-primary-600"
            >
              Post
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}