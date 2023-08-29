import Link from 'next/link';

import { Drawer } from 'vaul';

const classNames = (...classes) => classes.filter(Boolean).join(' ');

const NavIconContainer = ({ link }) => {
  if (link.disabled) {
    return (
      <div
        className='flex flex-col text-gray-400 fill-gray-400 text-xs cursor-not-allowed transition md:hover:bg-gray-200 w-[4.5rem] h-16 py-2 rounded-lg items-center'
        aria-disabled
      >
        <link.icon className='flex-shrink-0 h-6 w-6' />
        <p className='break-word text-center text-[xx-small] leading-none uppercase [font-variant: all-small-caps] pt-2'>
          {link.name}
        </p>
      </div>
    );
  }

  if (link.addWorkoutDrawer) {
    return (
      <Drawer.Trigger asChild>
        <div
          className={classNames(
            link.isActive
              ? 'text-t2kTeal fill-t2kTeal md:hover:text-teal-500 md:hover:fill-teal-500'
              : 'text-gray-800 fill-gray-800 md:hover:text-t2kTeal md:hover:fill-t2kTeal',
            'flex flex-col transition md:hover:bg-gray-200 w-[4.5rem] h-16 py-2 rounded-lg items-center cursor-pointer'
          )}
        >
          <link.icon className='flex-shrink-0 h-6 w-6' fill={link.isActive} />
          <p className='break-word text-center text-[xx-small] leading-none uppercase [font-variant: all-small-caps] pt-2 align-middle justify-items-center'>
            {link.name}
          </p>
        </div>
      </Drawer.Trigger>
    );
  }

  return (
    <Link
      className={classNames(
        link.isActive
          ? 'text-t2kTeal fill-t2kTeal md:hover:text-teal-500 md:hover:fill-teal-500'
          : 'text-gray-800 fill-gray-800 md:hover:text-t2kTeal md:hover:fill-t2kTeal',
        'flex flex-col transition md:hover:bg-gray-200 w-[4.5rem] h-16 py-2 rounded-lg items-center'
      )}
      href={link.href}
    >
      <link.icon className='flex-shrink-0 h-6 w-6' fill={link.isActive} />
      <p className='break-word text-center text-[xx-small] leading-none uppercase [font-variant: all-small-caps] pt-2 align-middle justify-items-center'>
        {link.name}
      </p>
    </Link>
  );
};

export default NavIconContainer;
