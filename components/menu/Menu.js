import NavIconContainer from './NavIconContainer';

const Menu = ({ links }) => (
  <div className='hidden md:flex md:flex-row md:gap-3 items-center justify-end md:flex-1 lg:w-0'>
    {links.map((link, index) => (
      <NavIconContainer link={link} key={index} />
    ))}
  </div>
);

export default Menu;
