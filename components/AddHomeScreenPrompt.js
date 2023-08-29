import Image from 'next/image';

import { AddAppIcon, ShareIcon } from '../icons';
import DrawerOverlay from './DrawerOverlay';

import appIcon from '../public/images/appIcon.png';

import { get, set } from '../utils/localstorage';

const getMobileOperatingSystem = () => {
  if (window.matchMedia('(display-mode: standalone)').matches) {
    return false;
  }

  if (/android/i.test(navigator.userAgent)) {
    return 'Android';
  }

  if (/iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream) {
    return 'iOS';
  }

  return false;
};

const setLocalStorageAndClose = () => {
  set('hideAddPrompt', true, { expiresIn: 4.32e8 }); // 5 days in ms
};

const AndroidInstructions = () => (
  <>
    <p>
      You should be prompted to install this app. When prompted, tap{' '}
      <span className='font-bold text-t2kTeal'>Install</span>.
    </p>
    <p className='my-2'>
      If you are not automatically prompted, try the following:
    </p>
    <ul className='list-decimal px-10'>
      <li className='list-item'>Open your browser&apos;s settings.</li>
      <li className='list-item'>
        Scroll down and tap{' '}
        <span className='font-semibold'>Add to Home screen</span>.
      </li>
      <li className='list-item'>
        Confirm by tapping <span className='font-semibold'>Add</span>.
      </li>
    </ul>
  </>
);

const IOSInstructions = () => (
  <ul className='list-decimal px-10'>
    <li className='list-item'>
      Tap the Share icon
      <ShareIcon className='ml-1 h-5 w-5 inline-block' />.
    </li>
    <li className='list-item'>
      Tap Add to Home Screen
      <AddAppIcon className='ml-1 h-4 w-4 inline-block' />.
    </li>
    <li className='list-item'>
      Finally, tap <span className='font-semibold text-blue-600'>Add</span>.
    </li>
  </ul>
);

const AddHomeScreenPrompt = () => {
  const hideAddPrompt = get('hideAddPrompt');
  const mobileOS = getMobileOperatingSystem();

  if (!mobileOS || hideAddPrompt) {
    return null;
  }

  return (
    <DrawerOverlay afterDismissed={() => setLocalStorageAndClose()} defaultOpen>
      <div className='flex flex-row justify-evenly items-center mb-4'>
        <Image
          height={48}
          width={48}
          alt='Train to Kain App Icon'
          draggable='false'
          placeholder='blur'
          src={appIcon}
        />
        <h2 className='text-gray-600 text-lg font-semibold'>
          Install our app on your {mobileOS === 'iOS' ? 'iPhone' : 'Android'}.
        </h2>
      </div>
      <p className='my-4'>
        Install Train to Kain on your home screen for quick and easy access when
        you&apos;re on the go.
      </p>
      {mobileOS === 'iOS' ? <IOSInstructions /> : <AndroidInstructions />}
      <p className='mt-4'>
        You can now find Train to Kain on your home screen or in your app
        drawer.
      </p>
    </DrawerOverlay>
  );
};

export default AddHomeScreenPrompt;
