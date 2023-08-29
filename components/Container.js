import Head from 'next/head';

import { useRouter } from 'next/router';
import { useState } from 'react';

import {
  AddWorkoutIcon,
  HomeIcon,
  LeaderboardIcon,
  PersonIcon,
  PreviousWorkoutsIcon,
} from '../icons';

import AddWorkoutDrawer from './workouts/add-workout/AddWorkoutDrawer';
import MobileMenu from './menu/MobileMenu';
import Header from './Header';
import Footer from './Footer';

import { useUser } from '../utils/user';

const Container = (props) => {
  const { children, ...customMeta } = props;
  const [addWorkoutActive, setAddWorkoutActive] = useState(false);
  const { user, signedIn } = useUser();
  const router = useRouter();

  const links = [
    {
      disabled: false,
      href: '/',
      icon: HomeIcon,
      isActive: router.asPath === '/' && !addWorkoutActive,
      name: 'Home',
    },
    {
      description: 'See the current standings.',
      disabled: false,
      href: '/leaderboard',
      icon: LeaderboardIcon,
      isActive: router.asPath === '/leaderboard' && !addWorkoutActive,
      name: 'Leaderboard',
    },
    {
      addWorkoutDrawer: true,
      name: 'Add Workout',
      description: 'Add a workout to increase your score.',
      icon: AddWorkoutIcon,
      isActive: addWorkoutActive,
      disabled: !signedIn,
    },
    {
      name: 'Previous Workouts',
      href: signedIn ? `/user/${user.id}/workouts` : '',
      icon: PreviousWorkoutsIcon,
      isActive:
        router.asPath === `/user/${user?.id}/workouts` && !addWorkoutActive,
      disabled: !signedIn,
    },
    {
      name: signedIn ? 'Sign Out' : 'Sign In',
      href: signedIn ? `/user/logout` : '/user/login',
      icon: PersonIcon,
      isActive: router.asPath === '/user/login' && !addWorkoutActive,
      disabled: false,
    },
  ];

  const meta = {
    title: addWorkoutActive ? 'Add Workout' : '',
    description:
      'The Train to Kain Fitness Competition is a friendly fitness competition between guests of the Shadlow-Kain wedding.',
    type: 'website',
    ...customMeta,
  };

  return (
    <div className='flex flex-col h-screen text-black'>
      <Head>
        <title>
          {meta.title ? meta.title + ' |' : ''} Train to Kain Fitness
          Competition
        </title>
        <meta name='robots' content='follow, index' />
        <meta name='apple-mobile-web-app-capable' content='yes' />
        <meta
          name='theme-color'
          media='(prefers-color-scheme: dark)'
          content='#000000'
        />
        <meta
          name='theme-color'
          media='(prefers-color-scheme: light)'
          content='#FFF'
        />
        <meta content={meta.description} name='description' />
        <link href='/favicons/favicon.ico' rel='shortcut icon' />
        <link
          rel='icon'
          type='image/png'
          sizes='384x384'
          href='/favicons/icons/icon-384x384.png'
        />
        <link
          rel='icon'
          type='image/png'
          sizes='192x192'
          href='/favicons/icons/icon-192x192.png'
        />
        <link href='/manifest.json' rel='manifest' />
        <link
          href='/favicons/apple-touch-icon.png'
          rel='apple-touch-icon'
          sizes='200x200'
        />
        <meta
          property='og:url'
          content={`https://traintokain.com${router.asPath}`}
        />
        <link
          rel='canonical'
          href={`https://traintokain.com${router.asPath}`}
        />
        <meta property='og:type' content={meta.type} />
        <meta
          property='og:site_name'
          content='Train to Kain Fitness Competition'
        />
        <meta property='og:description' content={meta.description} />
        <meta property='og:title' content={meta.title} />
        <meta name='twitter:card' content='summary_large_image' />
        <meta name='twitter:title' content={meta.title} />
        <meta name='twitter:description' content={meta.description} />
      </Head>

      <AddWorkoutDrawer
        addWorkoutActive={addWorkoutActive}
        setAddWorkoutActive={setAddWorkoutActive}
      >
        <Header links={links} />
        <main className='flex flex-col flex-grow justify-center px-5 sm:px-10'>
          {children}
        </main>
        <Footer />
        <MobileMenu links={links} />
      </AddWorkoutDrawer>
    </div>
  );
};

export default Container;
