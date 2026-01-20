import 'dotenv/config';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '@/prisma/generated/prisma/client';

const connectionString = `${process.env.DATABASE_URL}`;

const adapter = new PrismaPg({ connectionString });
const db = new PrismaClient({ adapter });

export { db };

declare global {
  var prisma: PrismaClient | undefined;
}

if (process.env.NODE_ENV !== 'production') globalThis.prisma = db;
