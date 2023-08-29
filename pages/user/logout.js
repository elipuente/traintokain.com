import { useRouter } from 'next/router';
import { useEffect } from 'react';

import Loading from '../../components/Loading';
import { clearAccessToken } from '../../utils/token';
import { useUser } from '../../utils/user';

const Logout = () => {
  const { setUser } = useUser();
  const router = useRouter();

  useEffect(() => {
    fetch('/api/auth/logout')
      .then(async (res) => {
        const data = await res.json();

        if (data.signedOut) {
          clearAccessToken();
          setUser(null);
        }
      })
      .then(() => router.push('/user/login'));
  });

  return <Loading text={'Logging out...'} />;
};

export default Logout;
