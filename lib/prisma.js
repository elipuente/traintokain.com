import { PrismaClient } from '@prisma/client';

export default process.env.NODE_ENV === 'production'
  ? new PrismaClient()
  : (global.prisma = global.prisma || new PrismaClient());
