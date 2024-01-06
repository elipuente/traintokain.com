import { Drawer } from 'vaul';
import { useRouter } from 'next/router';
import { useState } from 'react';

import AddWorkoutForm from './AddWorkoutForm';

import { useUser } from '../../../utils/user';

const AddWorkoutDrawer = ({
  children,
  addWorkoutActive,
  setAddWorkoutActive,
}) => {
  const { user, signedIn } = useUser();
  const [closeWorkoutDrawer, setCloseWorkoutDrawer] = useState(false);
  const router = useRouter();

  if (addWorkoutActive && !signedIn) {
    router.push('/user/login');
  }

  return (
    <Drawer.Root
      closeThreshold={0.45}
      dismissible
      onOpenChange={() => setAddWorkoutActive(!addWorkoutActive)}
      open={!closeWorkoutDrawer && addWorkoutActive}
    >
      {children}
      <Drawer.Portal>
        <Drawer.Overlay className='fixed inset-0 bg-black/40' />
        <Drawer.Content className='bg-slate-800 flex flex-col rounded-t-xl mt-24 fixed bottom-0 left-0 right-0 h-[97%] md:h-[90%]'>
          <div className='p-4 bg-gradient-to-t from-slate-800 from-5% via-cyan-950 via-25% to-t2kTeal to-70% rounded-t-xl flex-1 pb-8'>
            <div className='mx-auto w-12 h-1.5 flex-shrink-0 rounded-full bg-zinc-300 mb-8' />
            <div className='flex flex-col max-w-3xl mx-auto'>
              <div className='flex flex-row justify-around items-center'>
                <h1 className='text-white font-bold text-2xl md:text-3xl tracking-tight'>
                  Add Workout
                </h1>
                <p className='text-base text-gray-200 sm:max-w-xl md:text-xl lg:mx-0'>
                  Your current score is {user?.totalScore}
                </p>
              </div>
              <div className='max-w-2xl w-full self-center'>
                <AddWorkoutForm
                  setCloseWorkoutDrawer={setCloseWorkoutDrawer}
                  setAddWorkoutActive={setAddWorkoutActive}
                  sessionEnded
                />
              </div>
            </div>
          </div>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
};

export default AddWorkoutDrawer;
