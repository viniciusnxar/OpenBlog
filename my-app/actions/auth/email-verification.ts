'use server';

import { db } from '@/lib/db';

export const verifyEmail = async (token: string) => {
  const emailVerificationToken = await db.emailVerificationToken.findUnique({
    where: { token },
  });

  if (!emailVerificationToken) {
    return { error: 'Token de verificação inexistente!' };
  }

  const isExpired = new Date(emailVerificationToken.expires) < new Date();
  if (isExpired) {
    return { error: 'Token de verificação expirado!' };
  }

  let existingUser = null;

  if (emailVerificationToken.userId) {
    existingUser = await db.user.findUnique({
      where: { id: emailVerificationToken.userId },
    });
  } else {
    existingUser = await db.user.findUnique({
      where: { email: emailVerificationToken.email },
    });
  }

  if (!existingUser) {
    return { error: 'Usuário não encontrado no sistema!' };
  }

  await db.user.update({
    where: { id: existingUser.id },
    data: {
      email: emailVerificationToken.email,
      emailVerified: new Date(),
    },
  });

  await db.emailVerificationToken.delete({
    where: { id: emailVerificationToken.id },
  });

  return { success: 'Email verificado e atualizado com sucesso!' };
};
