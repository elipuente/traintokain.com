import { createContext, useContext, useState } from 'react';
import { getAccessToken, decodeAccessToken } from './token';

export const userContext = createContext();

export function ProvideUser({ children }) {
  const user = useProvideUser();

  return <userContext.Provider value={user}>{children}</userContext.Provider>;
}

export const useUser = () => useContext(userContext);

const useProvideUser = () => {
  let userData = '';
  const token = getAccessToken();

  if (token) {
    userData = decodeAccessToken(token);
  }

  const [user, setUser] = useState(userData);

  const signedIn = Boolean(user);

  return {
    user,
    setUser,
    signedIn,
  };
};
