'use server';

import { signIn } from '@/auth';
import { getUserByEmail } from '@/lib/user';
import { LOGIN_REDIRECT } from '@/route';
import { LoginSchema, LoginSchemaType } from '@/schemas/LoginSchema';
import { AuthError } from 'next-auth';

export const login = async (values: LoginSchemaType) => {
  const validateFields = LoginSchema.safeParse(values);

  if (!validateFields.success) {
    return { error: 'Campo Invalido!' };
  }

  const { email, password } = validateFields.data;

  const user = await getUserByEmail(email);
  if (!user || !email || !password || user.password) {
    return {
      error:
        'E-mail já está sendo utilizado por outra conta, tente um novo e-mail',
    };
  }
  if (!user.emailVerified) {
    return { error: 'E-mail nao verificado no sistema ' };
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
          return { error: 'credemnciais invalidas!' };
        default:
          return { error: 'Algo deu errado' };
      }
    }
  }
};
