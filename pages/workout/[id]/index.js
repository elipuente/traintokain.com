import useSWR, { useSWRConfig } from 'swr';
import { useRouter } from 'next/router';

import Container from '../../../components/Container';
import Errors from '../../../components/Errors';
import WorkoutCard from '../../../components/workouts/WorkoutCard';
import WorkoutCardSkeleton from '../../../components/workouts/WorkoutCardSkeleton';
import WorkoutError from '../../../components/workouts/WorkoutError';

import { fetcher } from '../../../utils/fetcher';

const Workout = () => {
  const router = useRouter();
  const { id } = router.query;

  const { data, error } = useSWR(`/api/workout/${id}`, fetcher);

  if (!data) {
    return (
      <Container title={`Loading Workout`}>
        <div className='flex flex-col items-center my-10 md:m-8 h-auto'>
          <WorkoutCardSkeleton />
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
    workout: {
      user: { firstName },
    },
    workout,
  } = data;

  return (
    <Container title={`${firstName}'s ${workout.type} Workout`}>
      <div className='flex flex-col items-center my-10 md:m-8 h-auto'>
        <WorkoutCard workout={workout} user={workout.user} linkToWorkouts />
      </div>
    </Container>
  );
};

export default Workout;
