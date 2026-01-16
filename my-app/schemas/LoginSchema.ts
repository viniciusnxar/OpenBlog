import z from 'zod';

export const LoginSchema = z.object({
  email: z
    .string()
    .email({ message: 'E-mail invalido, tente utilizar um e-mail valido' }),
  password: z
    .string()
    .min(6, { message: 'Senha deve ser 6 ou mais caracteres' }),
});

export type LoginSchemaType = z.infer<typeof LoginSchema>;
