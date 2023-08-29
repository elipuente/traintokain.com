import Container from '../components/Container';
import TextLink from '../components/TextLink';

const NotFound = () => (
  <Container>
    <div className='flex flex-col justify-center items-start max-w-2xl mx-auto my-16'>
      <h1 className='font-extrabold text-t2kTeal text-5xl sm:text-6xl md:text-7xl lowercase mb-4'>
        Page Not Found
      </h1>
      <p className='my-4 text-base text-gray-600'>
        The requested page could not be found. Try re-entering the URL or click
        the button below to return home.
      </p>
      <TextLink href={'/'} text={'Return Home'} />
    </div>
  </Container>
);

export default NotFound;
