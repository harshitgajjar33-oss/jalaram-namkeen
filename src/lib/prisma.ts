import { PrismaClient } from '@prisma/client'
import path from 'path'

const prismaClientSingleton = () => {
  // Solve 'Unable to open database file' on Netlify
  const dbPath = process.env.NODE_ENV === 'production'
    ? `file:${path.resolve(process.cwd(), 'prisma/dev.db')}`
    : undefined;

  return new PrismaClient({
    datasources: dbPath ? { db: { url: dbPath } } : undefined,
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
