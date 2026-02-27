'use client';
import { cn } from '@/lib/utils';
import { CommentWithUser } from './ListComments';
import { Dispatch, SetStateAction, useState } from 'react';
import { FaRegThumbsUp, FaThumbsUp } from 'react-icons/fa6';
import { MdDeleteOutline } from 'react-icons/md';
import { BsReply } from 'react-icons/bs';
import { FaRegComment } from 'react-icons/fa';
import { useSession } from 'next-auth/react';
import { deleteComment } from '@/actions/comments/delete-comments';
import toast from 'react-hot-toast';
import { likeComment } from '@/actions/comments/like-comment';

interface CommentReactionsProps {
  comment: CommentWithUser;
  setShowForm: Dispatch<SetStateAction<boolean>>;
  setShowReplies?: Dispatch<SetStateAction<boolean>>;
  isReply?: boolean;
}

const CommentReactions = ({
  comment,
  setShowForm,
  setShowReplies,
  isReply,
}: CommentReactionsProps) => {
  const session = useSession();
  const userId = session.data?.user.userId;
  const [likeCount, setLikeCount] = useState(comment._count.likes);
  const [userHasLiked, setUserHasLiked] = useState(!!comment.likes.length);

  const handleReply = () => {
    setShowForm((prev) => !prev);
  };

  const handleShowReplies = () => {
    if (setShowReplies) {
      setShowReplies((prev) => !prev);
    }
  };

  const handleDelete = async () => {
    if (userId) {
      const res = await deleteComment(comment.id);
      if (res.success) {
        toast.success(res.success);
      }
    }
  };

  const handleLike = async () => {
    if (!userId) return;
    setLikeCount((prevCount) => (userHasLiked ? prevCount - 1 : prevCount + 1));
    setUserHasLiked((prevState) => !prevState);

    await likeComment(comment.id, userId);
  };

  return (
    <div
      className={cn(
        'flex justify-between items-center w-full text-sm mt-2 gap-4',
        isReply && 'justify-start ml-2',
      )}
    >
      <div className='flex items-center gap-4'>
        <span
          onClick={handleLike}
          className='flex items-center gap-1 cursor-pointer'
        >
          {userHasLiked ? (
            <FaThumbsUp size={20} />
          ) : (
            <FaRegThumbsUp size={20} />
          )}{' '}
          {likeCount}
        </span>
        {!isReply && (
          <span
            onClick={handleShowReplies}
            className='flex items-center gap-1
        cursor-pointer'
          >
            <FaRegComment size={20} /> Replies {comment._count.replies}
          </span>
        )}
      </div>
      <div className='flex items-center'>
        <span
          onClick={handleReply}
          className='flex items-center gap-1 cursor-pointer mr-4'
        >
          <BsReply size={20} />
          Reply
        </span>
        {userId === comment.userId && (
          <span onClick={handleDelete} className='cursor-pointer'>
            <MdDeleteOutline size={20} />
          </span>
        )}
      </div>
    </div>
  );
};

export default CommentReactions;
