import { z } from 'zod';
export const BlogSchema = z.object({
  userID: z.string(),
  title: z
    .string()
    .min(10, {
      message: 'Titulo muito curto, deve ter pelo menos 10 caracteres',
    })
    .max(150, { message: 'Ttitulo deve ter no maximo 150 caracteres' }),
  content: z
    .string()
    .min(10, { message: 'Conteudo está muito curto, minimo de 10 caracteres' }),
  coverImage: z.string().optional(),
  isPublished: z.boolean(),
  tags: z.array(z.string()),
});

export type BlogSchemaType = z.infer<typeof BlogSchema>;
