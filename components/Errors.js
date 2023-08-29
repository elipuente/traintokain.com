import Container from './Container';
import TextLink from './TextLink';

const Errors = ({ path }) => (
  <Container title='Error'>
    <div className='flex justify-center items-center text-center'>
      <p>
        An error occurred. Please
        <TextLink href={path} text=' refresh ' />
        the page to continue...
      </p>
    </div>
  </Container>
);

export default Errors;
