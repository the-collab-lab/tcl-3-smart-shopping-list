import React, { useContext, useState, useEffect } from 'react';
import useListToken, { getCurrentToken } from '../useListToken';
import List from './List';
import Welcome from '../components/Welcome';
import { ListContext } from '../listContext';

const HomePage = props => {
  const { fetchList } = useContext(ListContext);
  const [list] = useState(() => fetchList(getCurrentToken()));
  const { token, saveToken } = useListToken();

  useEffect(() => {
    saveToken(getCurrentToken());
    console.log('token from HomePage', token);
  }, [saveToken, token]);

  return <>{list.length > 0 ? <List /> : list && <Welcome />}</>;
};
// afar weld impel
export default HomePage;
