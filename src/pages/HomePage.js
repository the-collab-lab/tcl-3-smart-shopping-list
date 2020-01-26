import React, { useContext, useEffect, useState } from 'react';

import { getCurrentToken } from '../useListToken';
import { ListContext } from '../listContext';
import List from './List';
import Welcome from '../components/Welcome';
import Loading from '../components/Loading';

const HomePage = () => {
  const { initializeList, shoppingList } = useContext(ListContext);
  const [loading, setLoading] = useState(true);

  const [existingList, setExistingList] = useState(
    initializeList(getCurrentToken()),
  );
  const confirmListStatus = React.useCallback(
    bool => {
      setExistingList(shoppingList.length > 0);
      setLoading(false);
    },
    [shoppingList.length],
  );

  useEffect(() => {
    confirmListStatus();
    console.log('token from useEffect', getCurrentToken());
    console.log('existingList value from useEffect', existingList);
  }, [confirmListStatus, existingList]);

  return (
    <>
      {loading && <Loading />}
      {existingList ? <List /> : !loading && !existingList && <Welcome />}
    </>
  );
};
// afar weld impel
export default HomePage;
