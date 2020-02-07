import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import '../pages/HomePage.css';
import useListToken from '../useListToken';
import AppHeader from './AppHeader';
import { Link } from 'react-router-dom';
import {
  Input,
  Button,
  Segment,
  Divider,
  Container,
  Responsive,
} from 'semantic-ui-react';

const JoinList = () => {
  const { saveToken } = useListToken();
  const history = useHistory();

  const [joinToken, setJoinToken] = useState('');
  // const [loading, setLoading] = useState();

  const handleChange = event => {
    setJoinToken(event.target.value);
  };

  const handleSubmit = event => {
    // setLoading(true);
    event.preventDefault();
    saveToken(joinToken);
    // joinToken && setLoading(false);

    return joinToken && history.push('/list');
  };

  // token to use: jimmy torn jolt, conner oaken liz

  return (
    <Container textAlign="center">
      <AppHeader>Welcome to Your Smart Shopping List!</AppHeader>
      <Segment basic textAlign="center">
        <form onSubmit={handleSubmit} className="form-flex-container">
          <p>
            Need to join a list? Enter your share code below, then tap "Grab
            Your List"
          </p>

          <Responsive
            as={Input}
            minWidth={432}
            action={{ color: 'blue', content: 'Grab Your List' }}
            size="large"
            icon="list"
            iconPosition="left"
            placeholder="Enter share code"
            onChange={handleChange}
          />
          <Responsive maxWidth={431}>
            <Input
              size="large"
              icon="list"
              iconPosition="left"
              placeholder="Enter share code"
              onChange={handleChange}
            />
            <Button
              style={{ margin: '1em' }}
              className="grab-list-button"
              size="large"
              color="blue"
              type="submit"
            >
              Grab Your List
            </Button>
          </Responsive>

          <Divider horizontal>Or</Divider>

          <Button
            as={Link}
            to="/add-item"
            size="large"
            color="teal"
            content="Create a New Shopping List"
            icon="add"
            labelPosition="left"
          />
        </form>
      </Segment>
      {/* {loading && <p>Fetching your list...</p>} */}
    </Container>
  );
};

export default JoinList;
