import { PrismaClient } from '@prisma/client';
import { genericError } from '../helpers';

const prisma = new PrismaClient();

const getWorkoutById = (id) =>
  prisma.t2k_workout.findUnique({
    where: {
      id,
    },
    include: {
      user: {
        select: {
          firstName: true,
          lastName: true,
        },
      },
    },
  });

const handler = async (req, res) => {
  let workout;

  const { id } = req.query;

  if (!id) {
    return res
      .status(400)
      .json({ error: true, message: 'Please provide a workout ID.' });
  }

  if (
    !/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/.test(id)
  ) {
    return res
      .status(400)
      .json({
        error: true,
        message: 'The workoutId you provided is in an incorrect format.',
      });
  }

  try {
    workout = await getWorkoutById(id);

    if (!workout) {
      return res.status(404).json({
        error: true,
        message: `Workout not found for workoutId: ${id}`,
      });
    }
  } catch (error) {
    console.error(`Error: An error occurred while fetching workout ${id}`);

    return genericError(res);
  }

  return res.status(200).json({ workout });
};

export default handler;
