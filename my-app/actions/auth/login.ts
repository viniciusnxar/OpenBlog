'use server';

import { signIn } from '@/auth';
import {
  generateEmailVerificationToken,
  sendEmailVerificationToken,
} from '@/lib/emailVerification';
import { getUserByEmail } from '@/lib/user';
import { LOGIN_REDIRECT } from '@/routes';
import { LoginSchema, LoginSchemaType } from '@/schemas/LoginSchema';
import { AuthError } from 'next-auth';

export const login = async (values: LoginSchemaType) => {
  const validateFields = LoginSchema.safeParse(values);

  if (!validateFields.success) {
    return { error: 'Campo Invalido!' };
  }

  const { email, password } = validateFields.data;

  const user = await getUserByEmail(email);
  if (!user) {
    return {
      error: 'user invalido',
    };
  }
  if (!email) {
    return {
      error: 'email invalido',
    };
  }
  if (!password) {
    return {
      error: 'password invalido',
    };
  }
  if (!user.password) {
    return {
      error: 'user.password invalido',
    };
  }
  if (!user.emailVerified) {
    const emailVerificationToken = await generateEmailVerificationToken(
      user.email,
    );

    const { error } = await sendEmailVerificationToken(
      emailVerificationToken.email,
      emailVerificationToken.token,
    );
    if (error) {
      return {
        error:
          'Algo deu errado ao mandar o e-mail de verificaçao, tente logar novamente!',
      };
    }
    return { success: 'Confirme seu e-mail!' };
  }
  try {
    await signIn('credentials', {
      email,
      password,
    });
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return { error: 'credenciais invalidas!' };
        default:
          return { error: 'Algo deu errado' };
      }
    }
  }
};
