'use server';
import { db } from '@/lib/db';
import { getUserById } from '@/lib/user';

export const likeBlog = async (blogId: string, userId: string) => {
  const blog = await db.blog.findUnique({
    where: { id: blogId },
  });

  if (!blog) return { error: 'Blog not found!' };

  const user = await getUserById(userId);
  if (!user) return { error: 'User not found!' };

  const like = await db.like.findUnique({
    where: {
      userId_blogId: { userId, blogId },
    },
  });

  if (like) {
    await db.like.delete({
      where: { id: like.id },
    });
    return { success: 'Unlikeped' };
  } else {
    await db.like.create({
      data: {
        userId,
        blogId,
      },
    });
    return { success: 'likeped' };
  }
};
