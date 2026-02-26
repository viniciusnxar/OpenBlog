'use client';

import { getComments } from '@/actions/comments/get-coments';
import { useEffect, useState, useTransition } from 'react';
import { CommentWithUser } from './ListComments';
import ReplyCard from './ReplyCard';

const ListReplies = ({
  comment,
  userId,
}: {
  comment: CommentWithUser;
  userId?: string;
}) => {
  const [replies, setReplies] = useState<CommentWithUser[]>([]);
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | undefined>();

  useEffect(() => {
    startTransition(() => {
      getComments(comment.blogId, comment.id, userId).then((res) => {
        if (res.error) {
          setError(res.error);
        }

        if (res.success) {
          setReplies(res.success.comments);
        }
      });
    });
  }, [comment, userId]);

  return (
    <div className='text-sm'>
      {isPending && <p className='animate-pulse py-2'>Loading replies...</p>}
      {error && <p className='text-rose-500'>{error}</p>}
      {!isPending &&
        !error &&
        replies.map((reply) => <ReplyCard key={reply.id} reply={reply} />)}
    </div>
  );
};

export default ListReplies;
