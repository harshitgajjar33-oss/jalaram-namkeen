import { PrismaClient } from '@prisma/client'

// In serverless environments like Netlify, relative paths for SQLite can be problematic.
// However, Prisma usually handles the 'file:./dev.db' relative to the schema.prisma file.
// If DATABASE_URL is set in .env as 'file:./prisma/dev.db', it's relative to project root.

const prismaClientSingleton = () => {
  return new PrismaClient({
    log: ['error', 'warn'],
  })
}

type PrismaClientSingleton = ReturnType<typeof prismaClientSingleton>

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClientSingleton | undefined
}

const prisma = globalForPrisma.prisma ?? prismaClientSingleton()

export default prisma

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma
