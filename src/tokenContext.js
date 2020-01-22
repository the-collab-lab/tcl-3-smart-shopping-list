import React, { useState } from 'react';
import getToken from './lib/token';

const TokenContext = React.createContext();

const TokenContextProvider = props => {
  const initialToken = () => window.localStorage.getItem('token') || getToken();
  const [token, setToken] = useState(initialToken);

  const getLocalStorageToken = () => window.localStorage.getItem('token');
  const setLocalStorageToken = token => localStorage.setItem('token', token);

  return (
    <TokenContext.Provider
      value={{
        token,
        setToken,
        getLocalStorageToken,
        setLocalStorageToken,
      }}
    >
      {props.children}
    </TokenContext.Provider>
  );
};

export { TokenContextProvider as TokenProvider, TokenContext };
