'use server';
import { db } from '@/lib/db';
import { getUserById } from '@/lib/user';

export const likeComment = async (commentId: string, userId: string) => {
  const comment = await db.comment.findUnique({
    where: { id: commentId },
  });

  if (!comment) return { error: 'Comentario not found!' };

  const user = await getUserById(userId);
  if (!user) return { error: 'User not found!' };

  const like = await db.commentLike.findUnique({
    where: {
      userId_commentId: { userId, commentId },
    },
  });

  if (like) {
    await db.commentLike.delete({
      where: { id: like.id },
    });
    return { success: 'Unlikeped' };
  } else {
    await db.commentLike.create({
      data: {
        userId,
        commentId,
      },
    });
    return { success: 'likeped' };
  }
};
