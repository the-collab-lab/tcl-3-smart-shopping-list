import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../pages/HomePage.css';
import JoinList from '../components/JoinList';
import HiddenButton from '../components/HiddenButton';

const Welcome = props => {
  const [joinFieldVisible, setJoinFieldVisible] = useState(false);

  const triggerJoinListState = () => setJoinFieldVisible(true);
  return (
    <div className="whole-page">
      <h1>Welcome to Your Smart Shopping List!</h1>
      <p>
        Enter your share code below. Then tap "Join Shopping List" to get
        started
      </p>

      {!joinFieldVisible && <HiddenButton joinList={triggerJoinListState} />}
      {joinFieldVisible && <JoinList />}
      <p>
        You can also <Link to="/add-item">create a new shopping list</Link>
      </p>
    </div>
  );
};

export default Welcome;
