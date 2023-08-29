import Image from 'next/image';
import Link from 'next/link';

import { useRouter } from 'next/router';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

import { useUser } from '../utils/user';
import { setAccessToken } from '../utils/token';
import LoadingSpinner from './LoadingSpinner';

import appIcon from '../public/images/appIcon.png';

const SignInForm = () => {
  const router = useRouter();
  const { register, handleSubmit } = useForm();

  const { user, setUser } = useUser();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  if (user) {
    const { firstName } = user;
    return (
      <div className='md:max-w-md flex flex-col justify-center bg-white rounded-md shadow-md md:px-10'>
        <div className='max-w-md p-4'>
          <div>
            <h2 className='mt-6 text-center text-2xl'>
              {`Hi ${firstName} 👋`}
            </h2>
            <h2 className='mt-4 text-center text-2xl text-gray-500'>
              {`You're already signed in.`}
            </h2>
          </div>
          <div className='flex justify-end mt-12'>
            <Link href='/user/logout' passHref>
              <button className='group relative flex justify-end py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-t2kTeal hover:bg-teal-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500'>
                <span className='absolute inset-y-0 flex items-center pl-3'></span>
                Sign out
              </button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const handleSignInRequest = async ({ first, last, number }) => {
    setError('');
    setLoading(true);
    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        first,
        last,
        number,
      }),
    }).then((data) => data.json());

    if (res?.accessToken) {
      setUser(res.user);
      setAccessToken(res.accessToken);
      setLoading(false);
      router.push('/leaderboard');
    } else {
      setLoading(false);
      setError(res.message);
    }
  };

  return (
    <div className='md:max-w-md flex flex-col justify-center bg-white rounded-md shadow-md mx-4'>
      <div className='max-w-md p-4'>
        <div className='flex flex-col items-center gap-4'>
          <Image
            height={48}
            width={48}
            alt='Train to Kain App Icon'
            draggable='false'
            placeholder='blur'
            src={appIcon}
          />
          <h2 className='text-center text-xl font-medium'>
            Sign in to Train to Kain
          </h2>
        </div>
        <form
          className='mt-8 space-y-4'
          onSubmit={handleSubmit(handleSignInRequest)}
          method='POST'
        >
          <input type='hidden' name='remember' defaultValue='true' />
          <div className='rounded-md shadow-sm'>
            <div className='flex flex-row justify-between'>
              <label htmlFor='first-name' className='sr-only'>
                First Name
              </label>
              <input
                id='first-name'
                name='first'
                type='first'
                autoComplete='given-name'
                required
                className='appearance-none relative block px-3 py-2 border border-gray-300 placeholder-gray-500  focus:outline-none focus:ring-teal-500 focus:border-teal-500 focus:z-10 sm:text-sm mb-2 rounded-md w-[49%]'
                placeholder='First name'
                {...register('first', { required: true })}
              />
              <label htmlFor='last-name' className='sr-only'>
                Last Name
              </label>
              <input
                id='last-name'
                name='last'
                type='last'
                autoComplete='family-name'
                required
                className='appearance-none relative block px-3 py-2 border border-gray-300 placeholder-gray-500  focus:outline-none focus:ring-teal-500 focus:border-teal-500 focus:z-10 sm:text-sm mb-2 rounded-md w-[49%]'
                placeholder='Last name'
                {...register('last', {
                  required: true,
                })}
              />
            </div>
            <div>
              <label htmlFor='phone' className='sr-only'>
                Phone Number
              </label>
              <input
                id='phone'
                name='phone'
                type='tel'
                autoComplete='tel-national'
                minLength={10}
                maxLength={10}
                required
                className='appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500  rounded-b-md focus:outline-none focus:ring-teal-500 focus:border-teal-500 focus:z-10 sm:text-sm rounded-md'
                placeholder='Phone Number'
                onInput={(input) =>
                  (input.target.value = input.target.value.replace(
                    /[^0-9]/g,
                    ''
                  ))
                }
                {...register('number', {
                  required: true,
                })}
              />
            </div>
          </div>
          <div className='flex justify-between items-end'>
            <p className='text-red-400 text-sm font-semibold'>{error}</p>
            <button
              type='submit'
              disabled={loading}
              className='group relative flex justify-end py-2 px-4 border border-transparent text-base font-medium rounded-md text-white bg-t2kTeal hover:bg-teal-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500'
            >
              <span className='absolute inset-y-0 flex items-center pl-3'></span>
              {loading ? (
                <>
                  <LoadingSpinner color='text-white' /> {'Signing in...'}
                </>
              ) : (
                'Sign in'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignInForm;
