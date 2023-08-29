import Container from '../components/Container';
import TextLink from '../components/TextLink';

const Unauthorized = () => (
  <Container title='401'>
    <div className='flex flex-col justify-center items-start max-w-2xl mx-auto my-16'>
      <h1 className='font-extrabold text-t2kTeal text-5xl sm:text-6xl md:text-7xl lowercase mb-4'>
        Unauthorized
      </h1>
      <p className='my-4 text-base text-gray-600'>
        You aren&apos;t allowed to view this page. Try signing in again or
        returning to the home page.
      </p>
      <div className='flex flex-row gap-4'>
        <TextLink href='/user/login' text='Sign In' />
        <TextLink href='/' text='Return Home' />
      </div>
    </div>
  </Container>
);

export default Unauthorized;
