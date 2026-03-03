'use server';
import { db } from '@/lib/db';

export const getBlogsByUserId = async ({
  page = 1,
  limit = 5,
  userId,
}: {
  page: number;
  limit: number;
  userId: string;
}) => {
  const skip = (page - 1) * limit;

  try {
    const blogs = await db.blog.findMany({
      skip,
      take: limit,
      orderBy: { createdAt: 'desc' },
      where: {
        userId,
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            image: true,
          },
        },
        _count: {
          select: {
            likes: true,
            comments: true,
          },
        },
        likes: {
          where: {
            userId,
          },
          select: {
            id: true,
          },
        },
        bookmark: {
          where: {
            userId,
          },
          select: {
            id: true,
          },
        },
      },
    });
    const totalBlogCount = await db.blog.count({
      where: { userId },
    });
    const hasMore = totalBlogCount > page * limit;
    return { success: { blogs, hasMore } };
  } catch (error) {
    return { error: 'Erro ao Buscar Blogs!' };
  }
};
