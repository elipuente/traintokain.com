import { HeartIcon } from '../../../icons';

const WorkoutLikesSkeleton = () => (
  <div className='flex flex-row items-center animate-pulse mt-6'>
    <HeartIcon className='flex-shrink-0 h-4 w-4 mr-1' />
    <div className='flex flex-row font-bold h-4 bg-gray-200 animate-pulse w-64 rounded-md' />
  </div>
);

export default WorkoutLikesSkeleton;
