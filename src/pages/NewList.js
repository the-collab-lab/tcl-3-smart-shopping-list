import React, { useState, useEffect } from 'react';
import getToken from '../lib/token';
import { Link } from 'react-router-dom';

/* 
TODO: 
A shopping list consists of a set of items associated with a user’s token. Tokens can be shared with other users to allow them to co-manage a given list. Creating a new list consists of the following:

  [x] Generate a new, unique token
  [x] Save the token to localStorage
  [x] Show the user the list view
*/

const NewList = () => {
  const initialToken = () => window.localStorage.getItem('token') || getToken();
  const [token] = useState(initialToken);
  useEffect(() => {
    window.localStorage.setItem('token', token);
  }, [token]);

  return (
    <>
      <h2>Shopping List</h2>

      <p>token: {token}</p>
      <p>(new list items will show here)</p>
      <Link to="/">Go Home</Link>
    </>
  );
};

export default NewList;
