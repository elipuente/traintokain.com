import Link from 'next/link';
import { Popover } from '@headlessui/react';

import { TrainToKain } from '../icons';
import Menu from './menu/Menu';

const Header = ({ links }) => {
  return (
    <Popover className='relative bg-white shadow-md'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6'>
        <div className='flex justify-center items-center pt-1 pb-2 md:py-4 md:justify-end md:space-x-10'>
          <div className='flex justify-center md:justify-start lg:w-0 lg:flex-1'>
            <Link href='/'>
              <div className='w-48 md:w-64'>
                <TrainToKain className='block' />
              </div>
            </Link>
          </div>

          <Menu links={links} />
        </div>
      </div>
    </Popover>
  );
};

export default Header;
