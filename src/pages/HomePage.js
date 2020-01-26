import React, { useContext, useEffect, useState } from 'react';

import { getCurrentToken } from '../useListToken';
import { ListContext } from '../listContext';
import List from './List';
import Welcome from '../components/Welcome';

const HomePage = () => {
  const { initializeList, shoppingList } = useContext(ListContext);

  const [existingList, setExistingList] = useState(
    initializeList(getCurrentToken()),
  );
  const confirmListStatus = React.useCallback(() => {
    setExistingList(shoppingList.length > 0);
  }, [shoppingList.length]);

  useEffect(() => {
    confirmListStatus();
    console.log('token from HomePage useEffect', getCurrentToken());
    console.log('existingList value from HomePage useEffect', existingList);
  }, [confirmListStatus, existingList]);

  return <>{existingList ? <List /> : <Welcome />}</>;
};
// afar weld impel
export default HomePage;
