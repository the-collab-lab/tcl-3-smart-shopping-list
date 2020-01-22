import React, { useState, useContext, useEffect } from 'react';
import './HomePage.css';
import NavTabs from '../components/NavTabs';
import JoinList from '../components/JoinList';
import HiddenButton from '../components/HiddenButton';
import { TokenContext } from '../tokenContext';
import { ListContext } from '../listContext';
import List from './List';

const HomePage = () => {
  const { setToken, getLocalStorageToken, token } = useContext(TokenContext);
  const { fetchList, validToken } = useContext(ListContext);
  const [joinFieldVisible, setJoinFieldVisible] = useState(false);
  useEffect(() => {
    fetchList(token);
    if (validToken(getLocalStorageToken)) {
      setToken(getLocalStorageToken);
    }
    console.log('token state from useEffect:', token);
  }, [getLocalStorageToken, setToken, validToken, token, fetchList]);
  const triggerJoinListState = () => setJoinFieldVisible(true);

  return (
    <>
      {validToken(getLocalStorageToken()) ? (
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
