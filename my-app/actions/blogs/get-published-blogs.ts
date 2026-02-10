'use server';

import { db } from '@/lib/db';

export const getPublishedBlogs = async ({
  page = 1,
  limit = 5,
  searchObject,
}: {
  page: number;
  limit: number;
  searchObject: { tag: string; title: string };
}) => {
  const skip = (page - 1) * limit;
  const { tag, title } = searchObject;

  try {
    const blogs = await db.blog.findMany({
      skip,
      take: limit,
      orderBy: { createdAt: 'desc' },
      where: {
        title: { contains: title, mode: 'insensitive' },
        isPublished: true,
        ...(tag ? { tags: { has: tag } } : {}),
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            image: true,
          },
        },
      },
    });
    const totalBlogCount = await db.blog.count({
      where: {
        title: {
          contains: title,
          mode: 'insensitive',
        },
        isPublished: true,
        ...(tag ? { tags: { has: tag } } : {}),
      },
    });
    const hasMore = totalBlogCount > page * limit;
    return { success: { blogs, hasMore } };
  } catch (error) {
    return { error: 'Erro ao Buscar Blogs!' };
  }
};
