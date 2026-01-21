import Credentials from 'next-auth/providers/credentials';
import type { NextAuthConfig } from 'next-auth';
import { LoginSchema } from './schemas/LoginSchema';
import { getUserByEmail } from './lib/user';
import bcrypt from 'bcryptjs';

// Notice this is only an object, not a full Auth.js instance
export default {
  providers: [
    Credentials({
      async authorize(credentials) {
        const validateFields = LoginSchema.safeParse(credentials);
        if (validateFields.success) {
          const { email, password } = validateFields.data;
          const user = await getUserByEmail(email);

          if (!user || !user.password) return null;

          const isCorrectPassword = await bcrypt.compare(
            password,
            user.password,
          );
          if (isCorrectPassword) return user;
        }

        return null;
      },
    }),
  ],
} satisfies NextAuthConfig;
