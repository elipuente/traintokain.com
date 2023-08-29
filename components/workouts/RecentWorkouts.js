import useSWR from 'swr';

import WorkoutCard from './WorkoutCard';
import WorkoutCardSkeleton from './WorkoutCardSkeleton';

import { fetcher } from '../../utils/fetcher';

const RecentWorkouts = ({ limit }) => {
  let workouts;
  const { data, error } = useSWR(
    `/api/workouts?user=all&limit=${limit}`,
    fetcher,
    { refreshInterval: 30_000 }
  );

  if (!data) {
    return (
      <div className='mb-20'>
        <h2 className='text-4xl tracking-tight font-extrabold text-gray-600 sm:text-5xl'>
          Recent Workouts
        </h2>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-4 mt-6 justify-items-center'>
          {[...Array(limit)].map((_, index) => (
            <WorkoutCardSkeleton key={index} />
          ))}
        </div>
      </div>
    );
  }

  if (error || data?.error) {
    return null;
  }

  workouts = data?.workouts.map((workout, index) => (
    <WorkoutCard
      workout={workout}
      user={workout.user}
      linkToWorkouts={true}
      key={workout.id}
    />
  ));

  return (
    <div className='mb-20'>
      <h2 className='text-4xl tracking-tight font-extrabold text-gray-600 sm:text-5xl'>
        Recent Workouts
      </h2>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-4 mt-6 justify-items-center'>
        {workouts}
      </div>
    </div>
  );
};

export default RecentWorkouts;
