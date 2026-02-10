'use server';

import { db } from '@/lib/db';
import { getUserById } from '@/lib/user';
import { BlogSchema, BlogSchemaType } from '@/schemas/BlogSchema';

export const editBlog = async (values: BlogSchemaType, blogId: string) => {
  const vFields = BlogSchema.safeParse(values);

  if (!vFields.success) return { error: 'Invalid Fields!' };

  const { userId, isPublished } = vFields.data;

  const user = await getUserById(userId);

  if (!user) return { error: 'Usuario não existe no banco' };

  if (!isPublished && !user.emailVerified) {
    return { error: 'Entrada não autorizada, Verifique seu e-mail antes' };
  }

  const blog = await db.blog.findUnique({
    where: { id: blogId },
  });

  if (!blog) return { error: 'Blog not found!' };

  await db.blog.update({
    where: { id: blogId },
    data: { ...vFields.data },
  });

  return { success: 'Blog Updated' };
};
