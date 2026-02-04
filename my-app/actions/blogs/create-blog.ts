'use server';

import { db } from '@/lib/db';
import { getUserById } from '@/lib/user';
import { BlogSchema, BlogSchemaType } from '@/schemas/BlogSchema';

export const CreateBlog = async (values: BlogSchemaType) => {
  const vFields = BlogSchema.safeParse(values);

  if (!vFields.success) return { error: 'Campos Invalidos!!' };

  const { userID, isPublished } = vFields.data;

  const user = await getUserById(userID);

  if (!user) return { error: 'Usuario não existe no banco' };

  if (!isPublished && !user.emailVerified) {
    return { error: 'Entrada não autorizada, Verifique seu e-mail antes' };
  }
  //atençao
  await db.blog.create({
    data: {
      userId: vFields.data.userID,
      tittle: vFields.data.tittle,
      content: vFields.data.content,
      isPublished: vFields.data.isPublished,
      tags: vFields.data.tags,
      coverImage: vFields.data.coverImage,
    },
  });
  return { success: 'Blog Salvo!' };
};
