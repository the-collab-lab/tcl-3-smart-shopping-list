import React, { useContext, useEffect } from 'react';

import useListToken from '../useListToken';
import { ListContext } from '../listContext';
import List from './List';
import Welcome from '../components/Welcome';

const HomePage = () => {
  const { saveToken, token } = useListToken();
  const { fetchList, validToken } = useContext(ListContext);

  useEffect(() => {
    fetchList(token);
    if (validToken(token)) {
      saveToken(token);
    }
  }, [validToken, token, fetchList, saveToken]);

  return <>{validToken(token) ? <List /> : <Welcome />}</>;
};

export default HomePage;
