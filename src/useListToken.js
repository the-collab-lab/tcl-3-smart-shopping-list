import { useState } from 'react';
import getToken from './lib/token';

const TOKEN_NAME = 'token';

export function getCurrentToken() {
  let token = window.localStorage.getItem(TOKEN_NAME);

  if (token) {
    return token;
  }
}

export function generateToken() {
  let token = getToken();
  window.localStorage.setItem(TOKEN_NAME, token);

  return token;
}

function useListToken() {
  const [token, setToken] = useState(getCurrentToken);

  const saveToken = token => {
    setToken(token);
    window.localStorage.setItem(TOKEN_NAME, token);
  };

  return {
    token,
    saveToken,
  };
}

export default useListToken;
