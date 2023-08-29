import Container from '../../components/Container';
import SignInForm from '../../components/SignInForm';

const Login = () => {
  return (
    <Container title={'Sign In'}>
      <div className='flex flex-wrap flex-row items-start justify-center py-12 md:px-4 bg-gradient-to-tr from-t2kGray via-teal-400 to-t2kTeal w-screen -ml-5 md:-ml-10 md:min-h-full min-h-[calc(100vh-56px)] pwa:min-h-[calc(100vh-56px)]'>
        <SignInForm />
      </div>
    </Container>
  );
};

export default Login;
