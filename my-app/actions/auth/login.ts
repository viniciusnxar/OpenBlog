'use server';

import { signIn } from '@/auth';
import { getUserByEmail } from '@/lib/user';
import { LOGIN_REDIRECT } from '@/route';
import { LoginSchema, LoginSchemaType } from '@/schemas/LoginSchema';
import { AuthError } from 'next-auth';

export const login = async (values: LoginSchemaType) => {
  const validateFields = LoginSchema.safeParse(values);

  if (!validateFields.success) {
    return { error: 'Campos inválidos!' };
  }

  const { email, password } = validateFields.data;

  const user = await getUserByEmail(email);

  // Verifica se o usuário existe
  if (!user) {
    return { error: 'Credenciais inválidas!' };
  }

  // Verifica se o usuário TEM senha (para autenticação por credenciais)
  if (!user.password) {
    return { error: 'Este usuário não possui senha cadastrada' };
  }

  // Verifica se o email foi verificado
  if (!user.emailVerified) {
    return { error: 'E-mail não verificado. Verifique sua caixa de entrada.' };
  }

  try {
    await signIn('credentials', {
      email,
      password,
      redirectTo: LOGIN_REDIRECT,
    });
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return { error: 'Credenciais inválidas!' };
        default:
          return { error: 'Algo deu errado' };
      }
    }

    // Para outros tipos de erro
    console.error('Login error:', error);
    return { error: 'Falha no login' };
  }
};
