'use server';
import { auth } from '@/auth';
import { db } from '@/lib/db';
import { getUserById } from '@/lib/user';
import {
  EditProfileSchema,
  EditProfileSchemaType,
} from '@/schemas/EditProfileSchema';

export const editUser = async (
  values: EditProfileSchemaType,
  userId: string,
) => {
  const vFields = EditProfileSchema.safeParse(values);

  if (!vFields.success) return { error: 'campo invalido' };

  const session = await auth();

  if (session?.user.userId !== userId) return { error: 'Sem Autorizaçao!' };

  const user = await getUserById(userId);

  if (!user) return { error: 'Usuario nao existe!' };

  await db.user.update({
    where: { id: userId },
    data: {
      ...vFields.data,
    },
  });

  return { success: 'Perfil de usuario atualizado!' };
};
