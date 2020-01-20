import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../pages/HomePage.css';
import { db } from '../lib/firebase.js';
// import { withFirestore } from 'react-firestore';

const JoinList = () => {
  const [userJoinToken, setUserJoinToken] = useState(
    localStorage.getItem('token') || '',
  );

  const getJoinToken = () => window.localStorage.getItem('token');
  const [joinToken] = useState(getJoinToken);

  const [submittedToken, setSubmittedToken] = useState('');

  useEffect(() => {
    window.localStorage.setItem('token', userJoinToken);
  }, [userJoinToken]);

  console.log('the join token added to localStorage:', joinToken);
  const handleChange = event => {
    setUserJoinToken(event.target.value);
  };

  // token to use: jimmy torn jolt, conner oaken liz

  const handleSubmit = event => {
    event.preventDefault();
    localStorage.setItem('token', userJoinToken);
    console.log('the join token inside of console.log:', userJoinToken);
    setSubmittedToken(userJoinToken);
    setUserJoinToken('');
  };

  db.collection('items')
    .where('token', '==', submittedToken)
    .get()
    .then(function(querySnapshot) {
      querySnapshot.forEach(function(doc) {
        console.log(doc.id, ' => ', doc.data());
      });
    })
    .catch(function(error) {
      console.log('Error getting list: ', error);
    });

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
        <Link to="/list">
          <input type="submit" value="Grab Your List" />
        </Link>
      </form>
    </div>
  );
};

export default JoinList;
