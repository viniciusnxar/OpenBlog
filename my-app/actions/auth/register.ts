'use server';

import { db } from '@/lib/db';
import {
  generateEmailVerificationToken,
  sendEmailVerificationToken,
} from '@/lib/emailVerification';
import { getUserByEmail } from '@/lib/user';
import { RegisterSchema, RegisterSchemaType } from '@/schemas/RegisterSchema';
import bcrypt from 'bcryptjs';

export const signUp = async (values: RegisterSchemaType) => {
  const validateFields = RegisterSchema.safeParse(values);

  if (!validateFields.success) {
    return { error: 'Campo Invalido!' };
  }

  const { name, email, password } = validateFields.data;

  const user = await getUserByEmail(email);
  if (user) {
    return {
      error:
        'E-mail já está sendo utilizado por outra conta, tente um novo e-mail',
    };
  }

  const hashPassword = await bcrypt.hash(password, 10);
  await db.user.create({
    data: {
      name,
      email,
      password: hashPassword,
    },
  });
  const emailVerificationToken = await generateEmailVerificationToken(email);
  const { error } = await sendEmailVerificationToken(
    emailVerificationToken.email,
    emailVerificationToken.token,
  );
  if(error){ 
    return {error: 'Algo deu errado ao mandar o e-mail de verificaçao, tente logar novamente!'}
  }
  return { success: 'Confirme seu e-mail!' };
};
