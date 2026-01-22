'use server';

import { db } from '@/lib/db';
import { getUserByEmail } from '@/lib/user';

export const verifyEmail = async (token: string) => {
  const emailVerificationToken = await db.emailVerificationToken.findUnique({
    where: { token },
  });
  if (!emailVerificationToken)
    return { error: 'Token de verificaçao nao existe' };

  const isExpired = new Date(emailVerificationToken.expires) < new Date();

  if (isExpired) return { error: 'Token de verificaçao expirado' };

  const existingUser = await getUserByEmail(emailVerificationToken.email);

  if (!existingUser)
    return { error: 'Usuario nao existe em nosso Banco de dados!' };
  await db.user.update({
    where: { id: existingUser.id },
    data: { emailVerified: new Date(), email: emailVerificationToken.email },
  });
  return { success: 'Email Verificado!' };
};
