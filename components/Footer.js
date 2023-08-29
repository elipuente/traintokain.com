const Footer = () => {
  return (
    <footer className='hidden md:flex justify-center p-6 pt-0'>
      <div className='w-full'>
        <hr className='border-1 border-black mb-8' />
        <div className='flex flex-row justify-center sm:justify-end sm:mr-6'>
          <p className='mr-2'>Train To Kain | {new Date().getFullYear()}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
