import React, { useContext, useState, useEffect } from 'react';
import useListToken, { getCurrentToken } from '../useListToken';
import List from './List';
import JoinList from './JoinList';
import { ListContext } from '../listContext';

const HomePage = props => {
  const { token, saveToken } = useListToken();
  const { fetchList } = useContext(ListContext);
  const [list] = useState(() => fetchList(getCurrentToken()));

  useEffect(() => {
    saveToken(token);
  }, [saveToken, token]);

  return <>{list.length > 0 ? <List /> : list && <JoinList />}</>;
};
export default HomePage;
