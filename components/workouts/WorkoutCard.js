import Link from 'next/link';

import { ClockIcon, FireIcon } from '../../icons';
import WorkoutImage from './WorkoutImage';
import WorkoutLikes from './likes/WorkoutLikes';

const formatDate = (date) =>
  new Date(date).toLocaleDateString('en-US', {
    month: 'short',
    day: '2-digit',
    year: 'numeric',
  });

const CardHeader = ({ linkToWorkouts, user, workout }) => (
  <div className='flex flex-row text-xl mb-2 justify-between items-center'>
    <div>
      {linkToWorkouts ? (
        <Link
          className='text-sm font-medium'
          href={`/user/${workout.userId}/workouts?highlightWorkout=${workout.id}`}
        >
          {`${user.firstName} ${user.lastName}`}
        </Link>
      ) : (
        <p className='text-base font-medium'>{`${user.firstName} ${user.lastName}`}</p>
      )}
      <p className='text-xs font-semibold text-t2kTeal leading-none [font-variant: all-small-caps] uppercase'>
        {workout.type}
      </p>
    </div>
    <WorkoutTimePoints workout={workout} />
  </div>
);

const CardContent = ({ workout }) => (
  <div className='h-full'>
    <p className='text-gray-700 text-base'>{workout.description}</p>
    {workout.imageUrl && <WorkoutImage workout={workout} />}
  </div>
);

const CardFooter = ({ workout }) => (
  <div className='mt-2'>
    <WorkoutLikes totalLikes={workout.totalLikes} workoutId={workout.id} />
    <WorkoutDate date={workout.date} />
  </div>
);

const WorkoutRecentAddPing = () => (
  <span className='flex flex-row h-3 w-3 self-end -mt-5 ml-5 -mr-5 absolute'>
    <span className='animate-ping absolute inline-flex h-3 w-3 rounded-full bg-t2kTeal/75'></span>
    <span
      className='relative inline-flex rounded-full h-3 w-3 bg-t2kTeal'
      title='Recently added workout! 🎉'
    ></span>
  </span>
);

const WorkoutDate = ({ date }) => {
  return (
    <div className='text-[xx-small] uppercase text-gray-400 text-right'>
      {formatDate(date)}
    </div>
  );
};

const WorkoutTimePoints = ({ workout }) => (
  <div className='flex flex-row text-center text-white fill-white gap-1'>
    <div className='flex items-center bg-[dodgerblue] rounded-full px-3 py-1 text-sm font-semibold'>
      <ClockIcon className='flex-shrink-0 h-4 w-4 mr-2' aria-hidden='true' />{' '}
      {workout.minutes}
    </div>
    <div className='flex items-center bg-[orangered] rounded-full px-3 py-1 text-sm font-semibold'>
      <FireIcon className='flex-shrink-0 h-4 w-4 mr-2' aria-hidden='true' />{' '}
      {workout.score}
    </div>
  </div>
);

const WorkoutCard = ({ workout, user, highlightWorkout, linkToWorkouts }) => (
  <div
    className={`flex flex-col justify-between rounded-xl shadow-xl bg-white p-4 h-full w-full max-w-md border gap-2 ${
      highlightWorkout && 'border-t2kTeal'
    }`}
  >
    {highlightWorkout && <WorkoutRecentAddPing />}

    <CardHeader linkToWorkouts={linkToWorkouts} workout={workout} user={user} />
    <CardContent workout={workout} />
    <CardFooter workout={workout} />
  </div>
);

export default WorkoutCard;
