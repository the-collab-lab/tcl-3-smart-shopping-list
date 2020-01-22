import React, { useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import '../pages/HomePage.css';
import { db } from '../lib/firebase.js';
import { TokenContext } from '../tokenContext';

const JoinList = () => {
  const { token, setToken, setLocalStorageToken } = useContext(TokenContext);

  useEffect(() => {
    setLocalStorageToken(token);
  }, [setLocalStorageToken, token]);

  console.log('the join token added to localStorage:', token);
  const handleChange = event => {
    setToken(event.target.value);
    setLocalStorageToken(event.target.value);
  };

  // token to use: jimmy torn jolt, conner oaken liz

  const handleSubmit = event => {
    event.preventDefault();

    console.log('the join token inside of console.log:', token);
  };

  db.collection('items')
    .where('token', '==', token)
    .get()
    .then(function(querySnapshot) {
      querySnapshot.forEach(function(doc) {});
    })
    .catch(function(error) {
      console.log('Error getting list: ', error);
    });

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
