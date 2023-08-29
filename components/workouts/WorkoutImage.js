import Image from 'next/image';
import { useState } from 'react';

const WorkoutImage = ({ workout }) => {
  const [imageLoading, setImageLoading] = useState(true);

  return (
    <div
      className={`aspect-w-3 aspect-h-4 overflow-hidden rounded-lg transition mt-2 ${
        imageLoading ? 'bg-gray-200' : 'bg-gray-800'
      }`}
    >
      <Image
        alt={`${workout.type} workout picture taken on ${workout.date}`}
        src={workout.imageUrl}
        layout='fill'
        objectFit='contain'
        draggable={false}
        className={`duration-500 ease-in-out rounded-lg ${
          imageLoading
            ? 'scale-110 blur-2xl grayscale'
            : 'scale-100 blur-0 grayscale-0'
        }`}
        onLoadingComplete={() => setImageLoading(false)}
      />
    </div>
  );
};

export default WorkoutImage;
