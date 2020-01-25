import { useState } from 'react';
import getToken from './lib/token';

const TOKEN_NAME = 'token';

export function getCurrentToken() {
  return window.localStorage.getItem(TOKEN_NAME) || getToken();
}

function useListToken() {
  const [token, setToken] = useState(getCurrentToken);

  const saveToken = token => {
    setToken(token);
    localStorage.setItem(TOKEN_NAME, token);
  };

  return {
    token,
    saveToken,
  };
}

export default useListToken;
