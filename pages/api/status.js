import prisma from '../../lib/prisma';

const STATUS = {
  OK: 'ok',
  DEGRADED: 'degraded',
  OUTAGE: 'outage',
};

const checkDb = async () => !!prisma.$queryRaw`SELECT 1`;

const handler = async (_, res) => {
  const dbAvailable = await checkDb();

  res.status(200).json({
    status: dbAvailable ? STATUS.OK : STATUS.DEGRADED,
    environment: process.env.NODE_ENV,
    db: dbAvailable ? STATUS.OK : STATUS.OUTAGE,
  });
};

export default handler;
