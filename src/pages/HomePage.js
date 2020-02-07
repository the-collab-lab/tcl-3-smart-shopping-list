import React, { useContext, useState, useEffect } from 'react';
import useListToken, { getCurrentToken } from '../useListToken';
import List from './List';
import JoinList from '../components/JoinList';
import { ListContext } from '../listContext';

const HomePage = props => {
  const { token, saveToken } = useListToken();
  const { fetchList } = useContext(ListContext);
  const [list] = useState(() => fetchList(getCurrentToken()));

  useEffect(() => {
    saveToken(token);
    console.log('token from HomePage', token);
  }, [saveToken, token]);

  return <>{list.length > 0 ? <List /> : list && <JoinList />}</>;
};
// afar weld impel
export default HomePage;
