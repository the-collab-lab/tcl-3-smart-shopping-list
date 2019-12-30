import React, { useState } from 'react';
import { withFirestore } from 'react-firestore';
import getToken from 'lib/get-token';

function CreateNewList({ firestore, onCreateList }) {
  const [name, setName] = useState('');

  async function handleSubmit(e) {
    e.preventDefault();
    const token = getToken();
    localStorage.setItem('tcl-list-token', JSON.stringify({ token, name }));
    onCreateList(token);
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>Create a New List</h2>
      <label>
        List Name
        <input
          onChange={e => setName(e.target.value)}
          placeholder="ex. avocados"
          value={name}
        />
      </label>
      <button type="submit">Create List</button>
    </form>
  );
}

export default withFirestore(CreateNewList);
