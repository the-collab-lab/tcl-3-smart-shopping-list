import React, { useState, useEffect } from 'react';
import '../pages/HomePage.css';

const JoinList = () => {
  const [userJoinToken, setUserJoinToken] = useState('');

  const getJoinToken = () => window.localStorage.getItem('token');
  const [joinToken] = useState(getJoinToken);

  useEffect(() => {
    window.localStorage.setItem('token', joinToken);
  }, [joinToken]);
  console.log('the join token added to localStorage:', joinToken);
  const handleChange = event => {
    setUserJoinToken(event.target.value);
  };

  // token to use:  low stone iambic, "kelp bruce puny"

  const handleSubmit = event => {
    event.preventDefault();
    window.localStorage.setItem('token', userJoinToken);
    console.log('the join token inside of console.log:', userJoinToken);
    setUserJoinToken('');
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>Need to join a list?</label>

        <input
          value={userJoinToken}
          placeholder="Add token here"
          type="text"
          onChange={handleChange}
        />

        <input type="submit" value="Grab Your List" />
      </form>
    </div>
  );
};

export default JoinList;
