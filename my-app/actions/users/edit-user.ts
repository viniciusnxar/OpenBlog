'use server';
import { auth } from '@/auth';
import { db } from '@/lib/db';
import {
  generateEmailVerificationToken,
  sendEmailVerificationToken,
} from '@/lib/emailVerification';
import { getUserByEmail, getUserById } from '@/lib/user';
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

  const { email, ...rest } = vFields.data;

  if (email && email !== user.email) {
    const existingUser = await getUserByEmail(email);

    if (existingUser) {
      return { error: 'Email já em uso!' };
    }

    await db.user.update({
      where: { id: userId },
      data: {
        ...rest,
      },
    });

    const verificationToken = await generateEmailVerificationToken(
      email,
      userId,
    );

    const { error } = await sendEmailVerificationToken(
      verificationToken.email,
      verificationToken.token,
    );

    if (error) {
      console.error('Erro no envio do e-mail:', error);
      return {
        error: 'Erro ao enviar e-mail de confirmação! Tente novamente.',
      };
    }

    return {
      success:
        'Dados salvos! Confira seu novo e-mail para confirmar a alteração.',
    };
  } else {
    await db.user.update({
      where: { id: userId },
      data: {
        ...vFields.data,
      },
    });

    return { success: 'Perfil atualizado com sucesso!' };
  }
};
