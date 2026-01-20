import { PrismaClient } from '@prisma/client/extension';

export const db = new PrismaClient();

declare global {
  var prisma: PrismaClient | undefined;
}

if (process.env.NODE_ENV !== 'production') globalThis.prisma = db;
