import Link from 'next/link';
import Image from 'next/image';

import { Drawer } from 'vaul';
import { useState } from 'react';

import cassieRyanBoat from '../public/images/cassieRyanBoat.webp';

import Container from '../components/Container';
import AddHomeScreenPrompt from '../components/AddHomeScreenPrompt';
import RecentWorkouts from '../components/workouts/RecentWorkouts';
import { useUser } from '../utils/user';

const Home = () => {
  const { user, signedIn } = useUser();
  const [loading, setLoading] = useState(true);

  return (
    <Container>
      <div className='lg:text-left my-12 max-w-screen-2xl self-center'>
        <div className='flex flex-col-reverse lg:flex-row sm:justify-between mb-24 md:gap-24'>
          <div>
            <h1 className='mt-12 sm:my-6 text-4xl tracking-tight font-extrabold  sm:text-5xl md:text-6xl'>
              <span className='block'>Join the</span>{' '}
              <span className='block text-t2kTeal'>Competition</span>
            </h1>
            <p className='my-3 text-gray-500 sm:mt-5 text-lg sm:max-w-md sm:mx-auto md:mt-5 md:text-xl lg:mx-0'>
              {signedIn
                ? `Welcome back, ${user.firstName}! Your current score is ${
                    user.totalScore
                  }. ${
                    user.totalScore
                      ? "Let's get those points up by adding another workout."
                      : 'Get started by adding a workout!'
                  }`
                : 'Welcome to the Train to Kain Fitness Competition. Sign in to start competing.'}
            </p>
            <div className='mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start'>
              <div className='rounded-md shadow'>
                {signedIn ? (
                  <Drawer.Trigger asChild>
                    <a className='w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-t2kTeal hover:bg-teal-500 md:py-4 md:text-lg md:px-10 cursor-pointer'>
                      Add a workout
                    </a>
                  </Drawer.Trigger>
                ) : (
                  <Link
                    className='w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-t2kTeal hover:bg-teal-500 md:py-4 md:text-lg md:px-10'
                    href='/user/login'
                  >
                    Sign in
                  </Link>
                )}
              </div>
              <div className='mt-3 sm:mt-0 sm:ml-3'>
                <Link
                  className='w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-teal-700 bg-teal-100 hover:bg-teal-200 md:py-4 md:text-lg md:px-10'
                  href='/leaderboard'
                >
                  View Leaderboard
                </Link>
              </div>
            </div>
          </div>
          <div className='flex flex-row self-center justify-center'>
            <div className='h-[492px] w-[375px] t2k-gradient rounded-2xl absolute self-center justify-center'></div>
            <Image
              height='auto'
              width={350}
              placeholder='blur'
              className={`duration-700 ease-in-out rounded-lg ${
                loading
                  ? 'scale-110 blur-2xl grayscale'
                  : 'scale-100 blur-0 grayscale-0'
              }`}
              onLoadingComplete={() => setLoading(false)}
              src={cassieRyanBoat}
              alt={'Cassie and Ryan'}
            />
          </div>
        </div>
        <RecentWorkouts limit={20} />
      </div>
      <AddHomeScreenPrompt />
    </Container>
  );
};

export default Home;
