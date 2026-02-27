'use server';

import { db } from '@/lib/db';
import { revalidatePath } from 'next/cache';

export const deleteComment = async (commentId: string, userId: string) => {
  const comment = await db.comment.findUnique({ where: { id: commentId } });

  if (!comment) return { error: 'Comentario não encontrado' };

  if (comment.userId !== userId) return { error: 'unauthorized!' };

  await db.comment.delete({
    where: { id: comment.id },
  });

  revalidatePath(`/blog/details/${comment.blogId}`);

  return { success: 'Comentario Deletado!' };
};
