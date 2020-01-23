import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../pages/HomePage.css';
import useListToken from '../useListToken';

const JoinList = () => {
  const { token, saveToken } = useListToken();
  useEffect(() => {
    saveToken(token);
  }, [saveToken, token]);

  const handleChange = event => {
    saveToken(event.target.value);
  };

  // token to use: jimmy torn jolt, conner oaken liz

  const handleSubmit = event => {
    event.preventDefault();
    console.log('the join token inside of console.log:', token);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>Need to join a list?</label>

        <input
          value={token}
          placeholder="Add token here"
          type="text"
          onChange={handleChange}
        />
        <Link to="/list">
          <input type="submit" value="Grab Your List" />
        </Link>
      </form>
    </div>
  );
};

export default JoinList;
