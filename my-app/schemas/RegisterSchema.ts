import z from 'zod';

export const RegisterSchema = z
  .object({
    name: z
      .string()
      .min(4, { message: 'Nome de usuário deve ter mais de 4 caracteres' })
      .max(30, { message: 'Nome de usuário deve ter menos de 30 caracteres' }),
    email: z
      .string()
      .email({ message: 'E-mail invalido, tente utilizar um e-mail valido' }),
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

export type RegisterSchemaType = z.infer<typeof RegisterSchema>;
