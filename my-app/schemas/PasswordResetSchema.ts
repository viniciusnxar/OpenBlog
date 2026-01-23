import z from 'zod';

export const PasswordResetSchema = z
  .object({
    password: z
      .string()
      .min(6, { message: 'Senha deve ser 6 ou mais caracteres' }),
    confirmPassword: z.string(),
  })
  .refine(
    (values) => {
      return values.password === values.confirmPassword;
    },
    {
      message: 'As senhas não conferem, confirme a senha novamente',
      path: ['confirmPassword'],
    },
  );

export type PasswordResetSchemaType = z.infer<typeof PasswordResetSchema>;
