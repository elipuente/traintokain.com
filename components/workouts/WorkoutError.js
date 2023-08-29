import Container from '../Container';
import TextLink from '../TextLink';

const WorkoutError = ({ error }) => (
  <Container title='User Not Found'>
    <div className='flex flex-col justify-center items-start max-w-2xl mx-auto my-16'>
      <h1 className='font-extrabold text-t2kTeal text-5xl sm:text-6xl md:text-7xl lowercase mb-4'>
        User Not Found
      </h1>
      <p className='my-4 text-base text-gray-600'>
        An error occurred. The user cannot be found. Message: {error}
      </p>
      <TextLink href={'/leaderboard'} text={'Back to Leaderboard'} />
    </div>
  </Container>
);

export default WorkoutError;
