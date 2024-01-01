import { useEffect, useState } from 'react';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';

import '../styles/global.css';

import {
  decodeAccessToken,
  getAccessToken,
  setAccessToken,
} from '../utils/token';
import { ProvideUser } from '../utils/user';

import Loading from '../components/Loading';

const getWithinOneMinuteExpiration = (exp) => exp * 1000 - 60000;

const FitnessCompetition = ({ Component, pageProps }) => {
  const [loading, setLoading] = useState(true);
  const accessToken = getAccessToken();

  useEffect(() => {
    fetch('/api/auth/refresh_token', { method: 'POST' }).then(async (res) => {
      const data = await res.json();

      setAccessToken(data?.accessToken);
      setLoading(false);
    });
  });

  useEffect(() => {
    if (accessToken) {
      const { exp } = decodeAccessToken(accessToken);

      if (new Date() >= getWithinOneMinuteExpiration(exp)) {
        fetch('/api/auth/refresh_token', { method: 'POST' }).then(
          async (res) => {
            const data = await res.json();

            setAccessToken(data?.accessToken);
          }
        );
      }
      setLoading(false);
    }
  }, [accessToken]);

  if (loading) {
    return <Loading text='Loading Train To Kain...' />;
  }

  return (
    <ProvideUser>
      <Component {...pageProps} />
      <Analytics />
      <SpeedInsights />
    </ProvideUser>
  );
};

export default FitnessCompetition;
