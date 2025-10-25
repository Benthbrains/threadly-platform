'use client';

import { useState } from 'react';
import VoteButtons from './VoteButtons';
import { FiMessageSquare, FiShare2, FiMoreHorizontal } from 'react-icons/fi';

interface Comment {
  id: string;
  content: string;
  author: {
    name: string;
    image?: string;
  };
  createdAt: string;
  votes: number;
  replies: Comment[];
}

interface CommentSectionProps {
  postId: string;
  initialComments?: Comment[];
}

export default function CommentSection({ postId, initialComments = [] }: CommentSectionProps) {
  const [comments, setComments] = useState<Comment[]>(initialComments);
  const [newComment, setNewComment] = useState('');
  const [replyingTo, setReplyingTo] = useState<string | null>(null);

  const handleSubmitComment = async (e: React.FormEvent, parentId?: string) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    // Create new comment object
    const comment: Comment = {
      id: Date.now().toString(),
      content: newComment,
      author: {
        name: 'Current User', // This should come from auth context
        image: '/placeholder-avatar.png',
      },
      createdAt: new Date().toISOString(),
      votes: 0,
      replies: [],
    };

    // TODO: Implement API call to save comment
    try {
      // const response = await fetch('/api/comments', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ postId, content: newComment, parentId }),
      // });

      if (parentId) {
        // Add reply to parent comment
        setComments(comments.map(c => 
          c.id === parentId 
            ? { ...c, replies: [...c.replies, comment] }
            : c
        ));
      } else {
        // Add new top-level comment
        setComments([...comments, comment]);
      }
      
      setNewComment('');
      setReplyingTo(null);
    } catch (error) {
      console.error('Error posting comment:', error);
    }
  };

  const CommentComponent = ({ comment, level = 0 }: { comment: Comment; level?: number }) => (
    <div className={`${level > 0 ? 'ml-8 border-l-2 border-gray-200 dark:border-gray-700 pl-4' : ''}`}>
      <div className="flex gap-4 mb-4">
        <VoteButtons postId={comment.id} initialVotes={comment.votes} />
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <span className="font-medium">{comment.author.name}</span>
            <span className="text-gray-500 text-sm">
              {new Date(comment.createdAt).toLocaleDateString()}
            </span>
          </div>
          <p className="text-gray-800 dark:text-gray-200 mb-2">{comment.content}</p>
          <div className="flex items-center gap-4 text-sm text-gray-500">
            <button
              onClick={() => setReplyingTo(replyingTo === comment.id ? null : comment.id)}
              className="flex items-center gap-1 hover:text-gray-700"
            >
              <FiMessageSquare />
              Reply
            </button>
            <button className="flex items-center gap-1 hover:text-gray-700">
              <FiShare2 />
              Share
            </button>
            <button className="hover:text-gray-700">
              <FiMoreHorizontal />
            </button>
          </div>

          {replyingTo === comment.id && (
            <form onSubmit={(e) => handleSubmitComment(e, comment.id)} className="mt-4">
              <textarea
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="What are your thoughts?"
                className="w-full p-3 border border-gray-300 rounded-lg dark:border-gray-600 dark:bg-gray-700 min-h-[100px]"
                required
              />
              <div className="flex justify-end gap-2 mt-2">
                <button
                  type="button"
                  onClick={() => setReplyingTo(null)}
                  className="px-4 py-2 text-gray-600 hover:text-gray-800"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-primary-500 text-white rounded-md hover:bg-primary-600"
                >
                  Reply
                </button>
              </div>
            </form>
          )}

          {comment.replies.length > 0 && (
            <div className="mt-4">
              {comment.replies.map((reply) => (
                <CommentComponent key={reply.id} comment={reply} level={level + 1} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <div className="mt-6">
      <h2 className="text-xl font-bold mb-4">Comments</h2>
      
      {/* Comment Form */}
      <form onSubmit={(e) => handleSubmitComment(e)} className="mb-6">
        <textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="What are your thoughts?"
          className="w-full p-3 border border-gray-300 rounded-lg dark:border-gray-600 dark:bg-gray-700 min-h-[100px]"
          required
        />
        <div className="flex justify-end mt-2">
          <button
            type="submit"
            className="px-6 py-2 bg-primary-500 text-white rounded-md hover:bg-primary-600"
          >
            Comment
          </button>
        </div>
      </form>

      {/* Comments List */}
      <div className="space-y-6">
        {comments.map((comment) => (
          <CommentComponent key={comment.id} comment={comment} />
        ))}
      </div>
    </div>
  );
}