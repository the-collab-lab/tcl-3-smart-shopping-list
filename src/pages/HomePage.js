import React, { useState, useContext, useEffect } from 'react';
import './HomePage.css';
import NavTabs from '../components/NavTabs';
import JoinList from '../components/JoinList';
import HiddenButton from '../components/HiddenButton';
import useListToken from '../useListToken';
import { ListContext } from '../listContext';
import List from './List';

const HomePage = () => {
  const { saveToken, token } = useListToken();
  const { fetchList, validToken } = useContext(ListContext);
  const [joinFieldVisible, setJoinFieldVisible] = useState(false);

  useEffect(() => {
    fetchList(token);
    if (validToken(token)) {
      saveToken(token);
    }
  }, [validToken, token, fetchList, saveToken]);

  const triggerJoinListState = () => setJoinFieldVisible(true);

  return (
    <>
      {validToken(token) ? (
        <List showBackButton={false} />
      ) : (
        <div className="whole-page">
          <h1>Here's our homepage! Go to your list or add an item below.</h1>
          <NavTabs />
          {!joinFieldVisible && (
            <HiddenButton joinList={triggerJoinListState} />
          )}
          {joinFieldVisible && <JoinList />}
        </div>
      )}
    </>
  );
};

export default HomePage;
