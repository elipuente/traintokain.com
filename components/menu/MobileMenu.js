import NavIconContainer from './NavIconContainer';

const MobileMenu = ({ links }) => (
  <div className='md:hidden flex flex-row gap-2 items-center justify-center flex-1 fixed bottom-0 bg-white pwa:pb-6 pb-2 w-full border-t-gray-300/75 border-t-[0.75px]'>
    {links.map((link, index) => (
      <NavIconContainer link={link} key={index} />
    ))}
  </div>
);

export default MobileMenu;
