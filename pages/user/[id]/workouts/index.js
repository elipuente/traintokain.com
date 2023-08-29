import useSWR from 'swr';

import { Drawer } from 'vaul';
import { useRouter } from 'next/router';

import Container from '../../../../components/Container';
import Errors from '../../../../components/Errors';
import WorkoutCard from '../../../../components/workouts/WorkoutCard';
import WorkoutCardSkeleton from '../../../../components/workouts/WorkoutCardSkeleton';
import WorkoutError from '../../../../components/workouts/WorkoutError';
import { fetcher } from '../../../../utils/fetcher';
import { useUser } from '../../../../utils/user';

const Workouts = () => {
  const router = useRouter();
  const { user, signedIn } = useUser();

  const { id, highlightWorkout } = router.query;

  const isSignedInUser = signedIn && id === user.id;
  const { data, error } = useSWR(`/api/workouts?user=${id}`, fetcher);

  if (!data) {
    return (
      <Container title={`Loading Workouts`}>
        <div className='flex flex-col md:px-12 my-12 h-full mb-24 pwa:mb-28 md:mb-12'>
          <div className='text-left justify-start'>
            <h1 className='text-t2kTeal font-extrabold text-4xl tracking-tight sm:text-5xl md:text-6xl'>
              {isSignedInUser ? (
                'Your'
              ) : (
                <div className='inline-block h-10 md:h-14 bg-gray-300 w-56 animate-pulse rounded-lg'></div>
              )}{' '}
              Workouts
            </h1>
            <h1 className='font-semibold block text-2xl'>Current Score:</h1>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6'>
              {[...Array(6)].map((_, index) => (
                <WorkoutCardSkeleton key={index} />
              ))}
            </div>
          </div>
        </div>
      </Container>
    );
  }

  if (error) {
    return <Errors path={router.asPath} />;
  }

  if (data.error) {
    return <WorkoutError error={data.message} />;
  }

  const {
    user: { firstName, totalScore },
    workouts,
  } = data;

  return (
    <Container title={`${firstName}'s Workouts`}>
      <div className='flex flex-col md:px-12 my-12 h-full mb-24 pwa:mb-28 md:mb-12'>
        <div className='text-left justify-start'>
          <h1 className='text-t2kTeal font-extrabold text-4xl tracking-tight sm:text-5xl md:text-6xl'>
            {isSignedInUser ? 'Your' : `${firstName}'s`} Workouts
          </h1>
          <h2 className='font-semibold block text-2xl'>
            Current Score: {totalScore}
          </h2>
          {workouts.length ? (
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6'>
              {workouts.map((workout, index) => (
                <WorkoutCard
                  workout={workout}
                  user={data.user}
                  highlightWorkout={highlightWorkout === workout.id}
                  key={index}
                />
              ))}
            </div>
          ) : isSignedInUser ? (
            <p className='mt-6'>
              You don&apos;t have any workouts yet. Get started by{' '}
              <Drawer.Trigger>
                <a className='text-t2kTeal hover:text-teal-600 transition cursor-pointer'>
                  adding a workout
                </a>
                .
              </Drawer.Trigger>
            </p>
          ) : (
            <p className='mt-6'>
              {firstName} doesn&apos;t have any workouts yet.
            </p>
          )}
        </div>
      </div>
    </Container>
  );
};

export default Workouts;
