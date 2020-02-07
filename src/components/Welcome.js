import React, { useState } from 'react';
import { Link } from 'react-router-dom';
// import '../pages/HomePage.css';
import { Button, Container } from 'semantic-ui-react';
import AppHeader from '../components/AppHeader';
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
          <Link to="/list">
            <Button size="massive" color="green">
              Create Shopping List
            </Button>
          </Link>

          <p>
            You can also
            <button
              style={{ display: 'inline' }}
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
    <Container textAlign="center">
      <AppHeader>Welcome to Your Smart Shopping List!</AppHeader>
      <NewListView />
    </Container>
  );
};

export default Welcome;
