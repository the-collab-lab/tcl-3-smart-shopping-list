import React, { useState } from 'react';
import getToken from './lib/token';

let TokenContext;
const { Consumer } = (TokenContext = React.createContext());

const TokenContextProvider = props => {
  const initialToken = () => window.localStorage.getItem('token') || getToken();
  const [token, setToken] = useState(initialToken);

  return (
    <TokenContext.Provider
      value={{
        token,
      }}
    >
      {props.children}
    </TokenContext.Provider>
  );
};

export {
  TokenContextProvider as TokenProvider,
  Consumer as TokenConsumer,
  TokenContext,
};
