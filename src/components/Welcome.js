import React, { useState } from 'react';
import { Link } from 'react-router-dom';
// import '../pages/HomePage.css';
import JoinList from '../components/JoinList';

const JoinListView = props => {
  return (
    <div className="join-view">
      <JoinList />
      <p>
        You can also <Link to="/add-item">create a new shopping list</Link>
      </p>
    </div>
  );
};
const NewListView = props => {
  const [joinViewVisible, setJoinViewVisible] = useState(false);

  return (
    <>
      {!joinViewVisible && (
        <div className="new-list-view">
          <p>Tap "Create Shopping List" to get started</p>

          <Link to="/list">
            <button className="cta-button">Create Shopping List</button>
          </Link>

          <p>
            You can also{' '}
            <button
              className="borderless-button"
              onClick={() => setJoinViewVisible(true)}
            >
              join an existing shopping list
            </button>
          </p>
        </div>
      )}
      {joinViewVisible && <JoinListView />}
    </>
  );
};

const Welcome = props => {
  return (
    <main className="flex-container">
      <div>
        <h1>Welcome to Your Smart Shopping List!</h1>
        <NewListView />
      </div>
    </main>
  );
};

export default Welcome;
