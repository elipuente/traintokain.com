import useSWR from 'swr';
import { useRouter } from 'next/router';
import { Tab } from '@headlessui/react';

import Container from '../components/Container';
import Errors from '../components/Errors';
import LeaderTable from '../components/leaderboard/LeaderTable';
import TextLink from '../components/TextLink';

import { disabledUsers } from '../data/disabledUsers';
import { roundOne } from '../data/leaderboardSnapshot';
import { fetcher } from '../utils/fetcher';
import { useUser } from '../utils/user';

const classNames = (...classes) => classes.filter(Boolean).join(' ');

const Leaderboard = () => {
  const router = useRouter();
  const { user, signedIn } = useUser();
  const { data, error } = useSWR('/api/standings', fetcher);

  if (!data) {
    return (
      <Container title='Loading Leaderboard'>
        <div className='flex flex-col md:px-12 my-12 h-full'>
          <h1 className='text-t2kTeal font-extrabold text-4xl tracking-tight sm:text-5xl md:text-6xl'>
            Leaderboard
          </h1>
          <div className='mt-3 animate-pulse h-4 sm:h-5 bg-gray-200 rounded-md sm:max-w-lg md:mt-5 lg:mx-0'></div>
          <div className='mt-2 animate-pulse h-4 sm:h-5 bg-gray-200 rounded-md sm:max-w-[14rem] md:text-xl lg:mx-0'></div>
          <div className='md:px-8 pb-12 md:pb-0'>
            <Tab.Group>
              <Tab.List className='flex flex-row items-center border-b-[1px] overflow-x-scroll md:overflow-hidden max-w-full no-scrollbar my-4 md:mt-10'>
                <Tab
                  className={({ selected }) =>
                    classNames(
                      'hover:bg-gray-200 rounded-sm p-4 hover:font-medium hover:border-black/75 transition-all min-w-fit px-9 md:px-10',
                      selected
                        ? 'font-medium border-b-2 border-black'
                        : 'text-gray-600'
                    )
                  }
                >
                  <div className='flex flex-row items-center justify-center gap-2'>
                    <div className='flex flex-row h-2 w-2'>
                      <span
                        className='relative inline-flex rounded-full h-2 w-2 bg-t2kTeal'
                        title='In Progress'
                      >
                        <span className='animate-slow-ping inline-flex h-2 w-2 rounded-full bg-t2kTeal/75'></span>
                      </span>
                    </div>
                    <div className='animate-pulse h-5 w-20 bg-gray-200 rounded-md'></div>
                  </div>
                </Tab>
                <Tab
                  className={({ selected }) =>
                    classNames(
                      'hover:bg-gray-200 rounded-sm p-4 hover:font-medium hover:border-black/75 transition-all min-w-fit px-9 md:px-10',
                      selected
                        ? 'font-medium border-b-2 border-black'
                        : 'text-gray-600'
                    )
                  }
                >
                  <div className='flex flex-row items-center justify-center gap-2'>
                    <div className='flex flex-row h-2 w-2'>
                      <span
                        className='relative inline-flex rounded-full h-2 w-2 bg-t2kTeal'
                        title='In Progress'
                      >
                        <span className='animate-slow-ping inline-flex h-2 w-2 rounded-full bg-t2kTeal/75'></span>
                      </span>
                    </div>
                    <div className='animate-pulse h-5 w-20 bg-gray-200 rounded-md'></div>
                  </div>
                </Tab>
              </Tab.List>
              <Tab.Panels>
                <Tab.Panel>
                  <LeaderTable />
                </Tab.Panel>
                <Tab.Panel>
                  <LeaderTable />
                </Tab.Panel>
              </Tab.Panels>
            </Tab.Group>
          </div>
        </div>
      </Container>
    );
  }

  if (error || data.error) {
    return <Errors path={router.asPath} />;
  }

  const userIsFirst = signedIn && data[0].id === user.id;
  const activeUsers = data.filter(({ id }) => !disabledUsers.includes(id));

  return (
    <Container title='Leaderboard'>
      <div className='flex flex-col md:px-12 my-12 h-full'>
        <h1 className='text-t2kTeal font-extrabold text-4xl tracking-tight sm:text-5xl md:text-6xl'>
          Leaderboard
        </h1>
        <p className='mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl md:mt-5 md:text-xl lg:mx-0'>
          Currently, {userIsFirst ? 'you are' : `${data[0].firstName} is`} in
          first place with a total score of {data[0].totalScore}.{' '}
          {signedIn ? (
            userIsFirst ? (
              'Nice job, keep it up by adding another workout!'
            ) : (
              'Try and catch up by adding another workout!'
            )
          ) : (
            <>
              {'Join the competition by '}
              <TextLink href={`/user/login`} text='signing in'></TextLink>
              {' and adding your workout.'}
            </>
          )}
        </p>
        <div className='md:px-8 pb-12 md:pb-0'>
          <Tab.Group defaultIndex={1}>
            <Tab.List className='flex flex-row items-center border-b-[1px] overflow-x-scroll md:overflow-hidden max-w-full no-scrollbar my-4 md:mt-10'>
              <Tab
                className={({ selected }) =>
                  classNames(
                    'hover:bg-gray-200 rounded-sm p-4 hover:font-medium hover:border-black/75 transition-all min-w-fit px-9 md:px-10',
                    selected
                      ? 'font-medium border-b-2 border-black'
                      : 'text-gray-600'
                  )
                }
              >
                <div className='flex flex-row items-center justify-center gap-2'>
                  <div className='flex flex-row h-2 w-2'>
                    <span
                      className='relative inline-flex rounded-full h-2 w-2 bg-gray-300'
                      title='Round Ended'
                    />
                  </div>
                  Round 1
                </div>
              </Tab>
              <Tab
                className={({ selected }) =>
                  classNames(
                    'hover:bg-gray-200 rounded-sm p-4 hover:font-medium hover:border-black/75 transition-all min-w-fit px-9 md:px-10',
                    selected
                      ? 'font-medium border-b-2 border-black'
                      : 'text-gray-600'
                  )
                }
              >
                <div className='flex flex-row items-center justify-center gap-2'>
                  <div className='flex flex-row h-2 w-2'>
                    <span
                      className='relative inline-flex rounded-full h-2 w-2 bg-t2kTeal'
                      title='In Progress'
                    >
                      <span className='animate-slow-ping inline-flex h-2 w-2 rounded-full bg-t2kTeal/75' />
                    </span>
                  </div>
                  Round 2
                </div>
              </Tab>
            </Tab.List>
            <Tab.Panels>
              <Tab.Panel>
                <LeaderTable data={roundOne} />
              </Tab.Panel>
              <Tab.Panel>
                <LeaderTable data={activeUsers} />
              </Tab.Panel>
            </Tab.Panels>
          </Tab.Group>
        </div>
      </div>
    </Container>
  );
};

export default Leaderboard;
