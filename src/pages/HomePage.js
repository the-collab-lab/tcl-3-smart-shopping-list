import React, { useContext, useState } from 'react';
import { getCurrentToken } from '../useListToken';
import List from './List';
import { ListContext } from '../listContext';
import JoinList from '../components/JoinList';

const HomePage = props => {
  const { fetchList } = useContext(ListContext);
  const [list] = useState(() => fetchList(getCurrentToken()));

  return <>{list.length > 0 ? <List /> : list && <JoinList />}</>;
};
// afar weld impel
export default HomePage;
