import React, { useState } from 'react';
import './HomePage.css';
import NavTabs from '../components/NavTabs';
import JoinList from '../components/JoinList';
import HiddenButton from '../components/HiddenButton';

const HomePage = () => {
  const [joinFieldVisible, setJoinFieldVisible] = useState(false);

  const triggerJoinListState = () => setJoinFieldVisible(true);

  return (
    <div className="whole-page">
      <h1>Here's our homepage! Go to your list or add an item below.</h1>
      <NavTabs />
      {!joinFieldVisible && <HiddenButton joinList={triggerJoinListState} />}

      {joinFieldVisible && <JoinList />}
    </div>
  );
};

export default HomePage;
