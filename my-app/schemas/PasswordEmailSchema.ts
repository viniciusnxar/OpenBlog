import z from 'zod';

export const PasswordEmailSchema = z.object({
  email: z
    .string()
    .email({ message: 'E-mail invalido, tente utilizar um e-mail valido' }),
});

export type PasswordEmailSchemaType = z.infer<typeof PasswordEmailSchema>;
