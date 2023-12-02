import Link from 'next/link';
import { Drawer } from 'vaul';

import { HeartIcon } from '../../../icons';

const LikesDrawer = ({ likes, text }) => (
  <Drawer.Root dismissible closeThreshold={0.4}>
    <Drawer.Trigger asChild>
      <a className='cursor-pointer'>{text}</a>
    </Drawer.Trigger>
    <Drawer.Portal>
      <Drawer.Overlay className='fixed inset-0 bg-black/40' />
      <Drawer.Content className='bg-zinc-100 flex flex-col rounded-t-xl mt-24 fixed bottom-0 left-0 right-0 max-h-[85%]'>
        <div className='p-4 bg-white rounded-t-xl flex-1 pb-8 overflow-y-scroll no-scrollbar'>
          <div className='mx-auto w-12 h-1.5 flex-shrink-0 rounded-full bg-zinc-300 mb-8' />
          <div className='max-w-md mx-auto mb-8'>
            <div className='flex flex-row items-center justify-between'>
              <div className='flex flex-row items-center gap-2'>
                <HeartIcon
                  className='h-5 w-5 fill-heartRed'
                  fill
                  aria-hidden='true'
                />
                <p className='font-medium'>Liked by</p>
              </div>
              {likes?.length > 1 ? `${likes.length} likes` : '1 like'}
            </div>
            <div className='h-0.5 w-full bg-zinc-300 rounded-full my-4' />
            <div className='flex flex-col gap-6 mx-4'>
              {likes?.map(({ user, userId }) => (
                <div
                  className='flex flex-row justify-between items-center'
                  key={userId}
                >
                  <p>
                    {user.firstName} {user.lastName}
                  </p>
                  <Link
                    className='ml-8 whitespace-nowrap inline-flex items-center justify-center px-2 py-2 border border-transparent rounded-md shadow-sm text-xs font-medium text-white bg-t2kTeal hover:bg-teal-500'
                    href={`/user/${userId}/workouts`}
                  >
                    <Drawer.Close>View Workouts</Drawer.Close>
                  </Link>
                </div>
              ))}
            </div>
          </div>
          <div className='block fixed h-14 bottom-0 left-0 right-0 z-50 bg-gradient-to-t from-white' />
        </div>
      </Drawer.Content>
    </Drawer.Portal>
  </Drawer.Root>
);

export default LikesDrawer;
