import { useRouter } from 'next/router';
import { Fragment, useState } from 'react';
import { useForm } from 'react-hook-form';

import { Listbox, Transition } from '@headlessui/react';
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/24/solid';

import LoadingSpinner from '../../LoadingSpinner';
import { useUser } from '../../../utils/user';
import { getAccessToken } from '../../../utils/token';
import { workoutTypes } from '../../../data/workoutTypes';
import AddImage from './AddImage';

const classNames = (...classes) => classes.filter(Boolean).join(' ');

const AddWorkoutForm = ({
  sessionEnded,
  setCloseWorkoutDrawer,
  setAddWorkoutActive,
}) => {
  const router = useRouter();
  const { user, setUser } = useUser();
  const { register, handleSubmit } = useForm();
  const accessToken = getAccessToken();

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [encodedImage, setEncodedImage] = useState('');
  const [selectedWorkout, setSelectedWorkout] = useState('');

  const handleAddWorkoutRequest = async ({ minutes, description }) => {
    setError('');
    if (!selectedWorkout) {
      setError('Please select a workout.');

      return;
    }

    if (selectedWorkout.name === 'HIIT' && minutes > 60) {
      setError('HIIT workouts should take less than one hour.');

      return;
    }

    setLoading(true);

    const res = await fetch('/api/post/workout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({
        workout: { ...selectedWorkout, minutes, description },
        encodedImage,
        user,
      }),
    });

    const data = await res.json();

    if (data?.error) {
      setError(data.message);
      setLoading(false);
    }

    if (data?.success) {
      setUser({
        ...user,
        totalScore: data.updatedUser.totalScore,
      });

      setCloseWorkoutDrawer(true);
      setAddWorkoutActive(false);

      if (router.asPath.includes(`/user/${user.id}/workouts`)) {
        router.reload();
      }

      router.push(
        `/user/${user.id}/workouts?highlightWorkout=${data.addedWorkout.id}`
      );
    }
  };

  return (
    <div className='bg-white rounded-md shadow-md mt-6'>
      <div className='mb-6 p-4'>
        <form
          className='mt-8 space-y-4'
          onSubmit={handleSubmit(handleAddWorkoutRequest)}
          method='POST'
        >
          <div className='rounded-md shadow-sm'>
            <div className='flex flex-row justify-between'>
              <label htmlFor='first-name' className='sr-only'>
                Workout Type
              </label>
              <Listbox value={selectedWorkout} onChange={setSelectedWorkout}>
                {({ open }) => (
                  <>
                    <div className='relative w-[65%]'>
                      <Listbox.Button
                        className={classNames(
                          !selectedWorkout?.name && 'text-gray-500',
                          'relative w-full bg-white border border-gray-300 rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-teal-500 focus:border-teal-500 sm:text-sm'
                        )}
                      >
                        <span className='flex items-center'>
                          <span className='ml-3 block truncate' placeholder=''>
                            {selectedWorkout?.name ?? 'Select Workout'}
                          </span>
                        </span>
                        <span className='ml-3 absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none'>
                          <ChevronUpDownIcon
                            className='h-5 w-5 text-gray-400'
                            aria-hidden='true'
                          />
                        </span>
                      </Listbox.Button>

                      <Transition
                        show={open}
                        as={Fragment}
                        enter='transition ease-in duration-100'
                        enterFrom='opacity-0'
                        enterTo='opacity-100'
                        leave='transition ease-in duration-100'
                        leaveFrom='opacity-100'
                        leaveTo='opacity-0'
                      >
                        <Listbox.Options
                          className='absolute z-10 mt-1 w-[75vw] max-h-56 sm:w-full bg-white shadow-lg rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm'
                          aria-required='true'
                        >
                          {workoutTypes.map((workout) => (
                            <Listbox.Option
                              key={workout.name}
                              className={({ active }) =>
                                classNames(
                                  active
                                    ? 'text-white bg-t2kTeal'
                                    : 'text-gray-900',
                                  'cursor-default select-none relative py-2 pl-3 pr-9'
                                )
                              }
                              value={workout}
                            >
                              {({ selected, active }) => (
                                <>
                                  <div className='flex items-center'>
                                    <span
                                      className={classNames(
                                        selected
                                          ? 'font-semibold'
                                          : 'font-normal',
                                        'ml-3 block truncate'
                                      )}
                                    >
                                      {workout.name}
                                    </span>
                                  </div>

                                  {selected ? (
                                    <span
                                      className={classNames(
                                        active ? 'text-white' : 'text-t2kTeal',
                                        'absolute inset-y-0 right-0 flex items-center pr-4'
                                      )}
                                    >
                                      <CheckIcon
                                        className='h-5 w-5'
                                        aria-hidden='true'
                                      />
                                    </span>
                                  ) : null}
                                </>
                              )}
                            </Listbox.Option>
                          ))}
                        </Listbox.Options>
                      </Transition>
                    </div>
                  </>
                )}
              </Listbox>

              <label htmlFor='minutes' className='sr-only'>
                Minutes
              </label>
              <input
                id='minutes'
                name='minutes'
                type='number'
                required
                hidden
                min={1}
                max={240}
                minLength={1}
                maxLength={3}
                className='appearance-none relative block px-3 py-2 border border-gray-300 placeholder-gray-500  focus:outline-none focus:ring-teal-500 focus:border-teal-500 focus:z-10 sm:text-sm mb-2 rounded-md w-[32%]'
                placeholder='Minutes'
                onInput={(input) =>
                  (input.target.value = input.target.value.replace(
                    /[^0-9]/g,
                    ''
                  ))
                }
                {...register('minutes', {
                  required: true,
                  max: 240,
                  min: 1,
                  maxLength: 3,
                })}
              />
            </div>
            <div>
              <label htmlFor='description' className='sr-only'>
                Workout Description
              </label>
              <textarea
                id='description'
                name='description'
                type='text'
                maxLength={280}
                className='appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 rounded-b-md focus:outline-none focus:ring-teal-500 focus:border-teal-500 focus:z-10 sm:text-sm rounded-md'
                placeholder='Description'
                {...register('description', { maxLength: 280 })}
              />
            </div>
          </div>
          {selectedWorkout.name === 'HIIT' && (
            <p className='text-xs'>
              HIIT workouts are meant to be short, high intensity workouts, and
              are weighted appropriately.
            </p>
          )}
          <p className='text-red-400 text-sm font-semibold'>{error}</p>
          <div className='flex justify-between'>
            <AddImage setEncodedImage={setEncodedImage} loading={loading} />
            <button
              type='submit'
              disabled={loading || sessionEnded}
              className={`group relative flex justify-end py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-t2kTeal hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500
                ${
                  sessionEnded &&
                  'bg-gray-600 hover:bg-gray-700 focus:ring-gray-500 cursor-not-allowed'
                }`}
            >
              <span className='absolute inset-y-0 flex items-center pl-3'></span>
              {loading ? (
                <>
                  <LoadingSpinner color='text-white' /> {'Adding Workout...'}
                </>
              ) : sessionEnded ? (
                'Session Ended'
              ) : (
                'Add Workout'
              )}
            </button>
          </div>
          {Math.random() > 0.9 && !!encodedImage && (
            <p className='text-xs'>Try adding a picture to your workout!</p>
          )}
        </form>
      </div>
    </div>
  );
};

export default AddWorkoutForm;
