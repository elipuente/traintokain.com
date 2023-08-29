import WorkoutLikesSkeleton from './likes/WorkoutLikesSkeleton';

const CardHeader = () => (
  <div className='flex flex-row mb-4 justify-between items-center'>
    <div>
      <div className='h-5 w-24 mb-1 bg-gray-200 rounded-md animate-pulse' />
      <div className='h-4 w-28 bg-gray-200 rounded-md animate-pulse' />
    </div>
    <div className='flex flex-row gap-1'>
      <div className='h-7 w-16 px-3 py-1 bg-[dodgerblue] rounded-full animate-pulse' />
      <div className='h-7 w-16 px-3 py-1 bg-[orangered] rounded-full animate-pulse' />
    </div>
  </div>
);

const CardContent = () => (
  <div className='h-full'>
    <div className='h-6 w-11/12 mb-1 bg-gray-200 rounded-md animate-pulse' />
    <div className='h-6 w-9/12 mb-2 bg-gray-200 rounded-md animate-pulse' />
    <div className='h-96 w-full mb-2 bg-gray-200 rounded-md animate-pulse' />
  </div>
);

const CardFooter = () => (
  <div className='mt-2'>
    <WorkoutLikesSkeleton />
    <div className='h-3 w-16 mt-4 float-right bg-gray-200 rounded-md animate-pulse' />
  </div>
);

const WorkoutCardSkeleton = () => (
  <div className='flex flex-col justify-between rounded-xl shadow-xl bg-white p-4 h-full w-full max-w-md border gap-2'>
    <CardHeader />
    <CardContent />
    <CardFooter />
  </div>
);

export default WorkoutCardSkeleton;
