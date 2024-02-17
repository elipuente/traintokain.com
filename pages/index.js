import Link from 'next/link';
import Image from 'next/image';
import confetti from 'canvas-confetti';

import { Drawer } from 'vaul';
import { useEffect, useState } from 'react';

import cassieRyanBoat from '../public/images/cassieRyanBoat.webp';

import Container from '../components/Container';
import AddHomeScreenPrompt from '../components/AddHomeScreenPrompt';
import RecentWorkouts from '../components/workouts/RecentWorkouts';
import { getRemainingDays, isSessionOver } from '../utils/session';
import { useUser } from '../utils/user';

const launchConfetti = (secretConfetti) => {
  const addSecretConfetti = (secretConfetti) =>
    secretConfetti
      ? {
          scalar: 1.25,
          colors: ['#009B3A', '#FED100', '#000000'],
        }
      : {};

  const launch = (particleRatio, opts) => {
    confetti({
      ...opts,
      angle: 80,
      origin: {
        x: 0,
        y: 1,
      },
      particleCount: Math.floor(200 * particleRatio),
      ...addSecretConfetti(secretConfetti),
    });
    confetti({
      ...opts,
      angle: 100,
      origin: {
        x: 1,
        y: 1,
      },
      particleCount: Math.floor(200 * particleRatio),
      ...addSecretConfetti(secretConfetti),
    });
  };

  launch(0.25, {
    spread: 26,
    startVelocity: 55,
  });
  launch(0.2, {
    spread: 60,
  });
  launch(0.35, {
    spread: 100,
    decay: 0.91,
    scalar: 0.8,
  });
  launch(0.1, {
    spread: 120,
    startVelocity: 25,
    decay: 0.92,
    scalar: 1.2,
  });
  launch(0.1, {
    spread: 120,
    startVelocity: 45,
  });
};

const getRandomJamaicanSaying = () => {
  const randomSayings = [
    'Wah Gwaan?',
    'Yah Mon!',
    'Mi Soon Come',
    'Big Tings',
    'Weh Yuh Ah Seh?',
    'Boonoonoonoos',
    'Small Up Yuhself',
    'Mi Irie',
    'Weh Yuh Deh Pon?',
    'Dead Wid Laugh',
    'Inna Di Morrows',
    'Inner Luv',
    'Blabba Mout',
    'Big Mon Tings',
  ];
  const randomIndex = Math.floor(Math.random() * (randomSayings.length - 1));

  return randomSayings[randomIndex];
};

const Home = () => {
  const { user, signedIn } = useUser();
  const [loading, setLoading] = useState(true);
  const [count, setCount] = useState(0);
  const [saying, setSaying] = useState('Yah Mon!');

  useEffect(() => {
    if (count === 0) {
      launchConfetti();
    }
  }, [count]);

  const handleConfettiLaunch = () => {
    if (count === 4) {
      confetti.reset();
    }

    const shouldLaunchSecretConfetti = count >= 4;

    launchConfetti(shouldLaunchSecretConfetti);
    count < 5 ? setCount(count + 1) : setSaying(getRandomJamaicanSaying());
  };

  const remainingDays = getRemainingDays();

  return (
    <Container>
      <div className='lg:text-left my-12 max-w-screen-2xl self-center'>
        <div className='flex flex-col-reverse lg:flex-row sm:justify-between mb-24 md:gap-24'>
          <div>
            <h1 className='mt-12 sm:my-6 text-4xl tracking-tight font-extrabold  sm:text-5xl md:text-6xl'>
              <span className='block'>Join the</span>{' '}
              <span className='block text-t2kTeal'>Competition</span>
            </h1>
            {isSessionOver() ? (
              <button
                className='mt-4 text-t2kTeal sm:mt-5 text-lg sm:max-w-md sm:mx-auto md:text-xl lg:mx-0 font-semibold text-left cursor-pointer text-balance'
                onClick={() => handleConfettiLaunch()}
                type='button'
              >
                {count > 4
                  ? `🇯🇲 ${saying} 🇯🇲`
                  : 'Congrats to Kami for winning the competition! 🎉'}
              </button>
            ) : null}
            <p className='my-4 text-gray-500 text-lg sm:max-w-md sm:mx-auto md:text-xl lg:mx-0 text-balance'>
              {isSessionOver()
                ? `Thanks for competing in the Train to Kain Fitness Competition. See ya in Jamaica! 🇯🇲`
                : signedIn
                ? `Welcome back, ${user.firstName}! Your current score is ${
                    user.totalScore
                  }. ${
                    user.totalScore
                      ? "Let's get those points up by adding another workout."
                      : 'Get started by adding a workout!'
                  }`
                : 'Welcome to the Train to Kain Fitness Competition. Sign in to start competing.'}{' '}
              {remainingDays > 1 ? (
                <span className='font-semibold'>{`Only ${remainingDays} days left to Train to Kain.`}</span>
              ) : remainingDays === 1 ? (
                <span className='font-semibold'>
                  Today is the last day of Train to Kain. Make it count!
                </span>
              ) : null}
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
                loading ? 'blur-2xl grayscale' : 'blur-0 grayscale-0'
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
