'use server';

import {
  generatePasswordResetToken,
  sendPasswordResetEmail,
} from '@/lib/passwordResetToken';
import { getUserByEmail } from '@/lib/user';
import {
  PasswordEmailSchema,
  PasswordEmailSchemaType,
} from '@/schemas/PasswordEmailSchema';

export const passwordEmail = async (values: PasswordEmailSchemaType) => {
  const validatedFields = PasswordEmailSchema.safeParse(values);
  if (!validatedFields.success) {
    return { error: 'email invalido' };
  }
  const { email } = validatedFields.data;
  const user = await getUserByEmail(email);
  if (!user || !user.email) {
    return { error: 'email invalido!' };
  }
  const passwordResetToken = await generatePasswordResetToken(email);
  const { error } = await sendPasswordResetEmail(
    passwordResetToken.email,
    passwordResetToken.token,
  );
  if (error) {
    return { error: 'Algo deu errado ao mandar o e-mail de reset de senha!' };
  }
  return { success: 'Link para reset de senha enviado por email!' };
};
