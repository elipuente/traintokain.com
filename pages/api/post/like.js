import { unableToVerify } from '../helpers';
import { authUser } from '../../../services/auth/auth-service';
import {
  likeWorkout,
  unlikeWorkout,
} from '../../../services/workouts/like-service';

const handler = async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(400);
  }

  const { workoutId, likeId, user, intent } = req.body;

  if (!authUser(user, req).verifiedUser) {
    return unableToVerify(res);
  }

  if (intent === 'like') {
    return likeWorkout(workoutId, user.id, res);
  } else if (intent === 'unlike') {
    return unlikeWorkout(workoutId, likeId, res);
  }

  return res.status(400).json({
    error: true,
    message: 'No intent found.',
  });
};

export default handler;
