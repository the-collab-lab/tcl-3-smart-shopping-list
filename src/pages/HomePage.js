import React, { useContext, useState } from 'react';
import { getCurrentToken } from '../useListToken';
import List from './List';
import Welcome from '../components/Welcome';
import { ListContext } from '../listContext';

const HomePage = props => {
  const { fetchList } = useContext(ListContext);
  const [list] = useState(() => fetchList(getCurrentToken()));

  return <>{list.length > 0 ? <List /> : list && <Welcome />}</>;
};
// afar weld impel
export default HomePage;
