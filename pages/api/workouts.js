import prisma from '../../lib/prisma';
import { genericError } from './helpers';

const verifyUser = (id) =>
  prisma.t2k_user.findUnique({
    where: {
      id,
    },
    select: {
      firstName: true,
      lastName: true,
      totalScore: true,
    },
  });

const getAllWorkoutsForUser = (id) =>
  prisma.t2k_workout.findMany({
    where: {
      user: {
        id,
      },
    },
    orderBy: {
      date: 'desc',
    },
  });

const getWorkouts = (limit) =>
  prisma.t2k_workout.findMany({
    include: {
      user: {
        select: {
          firstName: true,
          lastName: true,
        },
      },
    },
    orderBy: {
      date: 'desc',
    },
    take: limit,
  });

const handler = async (req, res) => {
  let workouts;
  const { user: id, limit } = req.query;

  if (!id) {
    return res
      .status(500)
      .json({ error: true, message: 'No user information provided.' });
  }

  if (id === 'all') {
    try {
      workouts = await getWorkouts(parseInt(limit) ?? 1);
    } catch (err) {
      console.error(
        `Error: An error occurred while fetching the latest 10 workouts.`,
        err
      );

      return genericError(res);
    }

    return res.status(200).json({ workouts });
  }

  const user = await verifyUser(id);

  if (!user) {
    return res.status(404).json({ error: true, message: 'User not found.' });
  }

  workouts = await getAllWorkoutsForUser(id);

  return res.status(200).json({ user, workouts });
};

export default handler;
