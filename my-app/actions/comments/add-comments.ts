import { getUserById } from '@/lib/user';
import { CommentSchema, CommentSchemaType } from '@/schemas/CommentsSchema';
import { getBlogById } from '../blogs/getBlogById';
import { db } from '@/lib/db';
import { revalidatePath } from 'next/cache';

export const addComment = async ({
  values,
  userId,
  blogId,
  parentId,
  repliedToUserId,
}: {
  values: CommentSchemaType;
  repliedToUserId?: string;
  blogId: string;
  parentId?: string;
  userId: string;
}) => {
  const vFields = CommentSchema.safeParse(values);
  if (!vFields.success) return { error: 'Invalid fields' };
  const { content } = vFields.data;
  const user = await getUserById(userId);

  if (!user) return { error: 'user not found!' };
  const blog = await getBlogById({ blogId });
  if (!blog) return { error: 'blog not found' };
  if (parentId) {
    const parentComment = await db.comment.findUnique({
      where: { id: parentId },
    });
    if (!parentComment) return { error: 'parent comment not found' };
    if (repliedToUserId) {
      const repliedToUser = getUserById(repliedToUserId);

      if (!repliedToUser) return { error: 'replying-to user not found!' };
    }
    await db.comment.create({
      data: {
        userId,
        blogId,
        parentId,
        repliedToUserId,
        content,
      },
    });
  }
  revalidatePath(`/blog/${blogId}`);
  return { success: 'Comentario feito!' };
};
