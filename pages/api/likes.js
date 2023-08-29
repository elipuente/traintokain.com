import prisma from '../../lib/prisma';

const getWorkoutLikesByWorkoutId = (id) =>
  prisma.t2k_workout_like.findMany({
    where: {
      workoutId: id,
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
  let likes;
  const { workoutId: id } = req.query;

  if (!id) {
    return res.status(500).json({
      error: true,
      message: 'No workout information provided',
    });
  }

  try {
    likes = await getWorkoutLikesByWorkoutId(id);
  } catch (err) {
    console.error(
      `Error: An error occurred while retrieving likes for workout (workoutId: ${id})`,
      err
    );

    res.status(500).json({
      error: true,
      message: 'Failed to get likes for workout.',
      err,
    });
  }

  return res.status(200).json({
    likes,
  });
};

export default handler;
