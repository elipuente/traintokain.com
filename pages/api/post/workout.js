import prisma from '../../../lib/prisma';
import cloudinary from '../../../lib/cloudinary';
import { authUser } from '../../../services/auth/auth-service';
import { unableToVerify, genericError } from '../helpers';

const calculateScore = ({ minutes, ppmValue }) =>
  Math.round(minutes * ppmValue);

const calculateTotalScore = (previousTotalScore, score) =>
  previousTotalScore + score;

const getLatestTotalScore = ({ id }) =>
  prisma.t2k_user.findUnique({
    where: {
      id,
    },
    select: {
      totalScore: true,
    },
  });

const saveWorkout = (user, workout, imageUrl) =>
  prisma.t2k_workout.create({
    data: {
      userId: user.id,
      date: new Date().toISOString(),
      description: workout.description,
      minutes: Number(workout.minutes),
      score: calculateScore(workout),
      type: workout.name,
      imageUrl,
    },
    select: {
      id: true,
      score: true,
      userId: true,
    },
  });

const updateUser = (user, totalScore) =>
  prisma.t2k_user.update({
    where: {
      id: user.id,
    },
    data: {
      totalScore,
    },
    select: {
      id: true,
      totalScore: true,
    },
  });

const rollbackWorkout = ({ id }) =>
  prisma.t2k_workout.delete({
    where: {
      id,
    },
  });

const handler = async (req, res) => {
  let latestTotalScore, savedWorkout, updatedUser, imageUrl;

  if (req.method !== 'POST') {
    return res.status(400).json({ error: true });
  }

  return res.status(500).json({
    error: true,
    message: 'Round One has ended.',
  });

  const { workout, encodedImage, user } = req.body;

  if (!authUser(user, req).verifiedUser) {
    return unableToVerify(res);
  }

  if (encodedImage) {
    try {
      ({ secure_url: imageUrl } = await cloudinary.v2.uploader.upload(
        encodedImage,
        {
          upload_preset: 't2k_fitness_challenge',
        }
      ));
    } catch (err) {
      console.error(
        `Error: An error occurred while uploading the file to cloudinary.`,
        err
      );

      return genericError(res);
    }
  }

  try {
    latestTotalScore = await getLatestTotalScore(user);
  } catch (err) {
    console.error(
      `Error: An error occurred while fetching latest score for user (userId: ${user.id}).`
    );

    return genericError(res);
  }

  try {
    savedWorkout = await saveWorkout(user, workout, imageUrl);
  } catch {
    console.error(
      `Error: An error occurred during the workout creation process for user (userId: ${user.id}).`
    );

    return genericError(res);
  }

  const totalScore = calculateTotalScore(
    latestTotalScore.totalScore,
    savedWorkout.score
  );

  try {
    updatedUser = await updateUser(user, totalScore);
  } catch (err) {
    console.error(
      `Error: Unable to update totalScore (totalScore: ${totalScore}) for user (userId: ${user.id}). Attempting to rollback record creation.`
    );

    const deleted = await rollbackWorkout(savedWorkout);

    if (!deleted) {
      console.error(
        `Error: Unable to rollback record creation. Workout Log and TotalScore for user (userId: ${user.id}) mismatched. Delete workout (workoutId: ${savedWorkout.id}) to fix.`
      );
      return res.status(500).json({
        error: true,
        message:
          'A critical error occurred. Workout log and total user score mismatch.',
      });
    }

    return genericError(res);
  }

  return res.status(200).json({
    success: true,
    error: false,
    updatedUser,
    addedWorkout: { id: savedWorkout.id },
  });
};

export const config = {
  api: {
    bodyParser: {
      sizeLimit: '4mb',
    },
  },
};

export default handler;
