import React, { useState } from 'react';
import { withFirestore } from 'react-firestore';

import CreateNewList from 'components/CreateNewList';
import ShoppingList from 'components/ShoppingList';

function Hello({ firestore }) {
  const [token, setToken] = useState(localStorage.getItem('tcl-list-token'));

  return token ? (
    <ShoppingList token={token} />
  ) : (
    <CreateNewList onCreateList={token => setToken(token)} />
  );
}

export default withFirestore(Hello);
