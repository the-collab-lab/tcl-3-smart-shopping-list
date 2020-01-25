import React, { useContext } from 'react';

import useListToken from '../useListToken';
import { ListContext } from '../listContext';
import List from './List';
import Welcome from '../components/Welcome';

const HomePage = () => {
  const { token } = useListToken();
  const { validToken } = useContext(ListContext);

  return <>{validToken(token) ? <List /> : <Welcome />}</>;
};
// afar weld impel
export default HomePage;
