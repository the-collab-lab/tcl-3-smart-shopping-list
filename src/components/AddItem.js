import React, { useState } from 'react';
import { withFirestore } from 'react-firestore';

function capitalize(s) {
  return s.slice(0, 1).toUpperCase() + s.slice(1);
}

function AddItem({ firestore, token }) {
  const [item, setItem] = useState('');

  function submitForm(e) {
    e.preventDefault();
    const fRef = firestore.collection(token);
    fRef.add({ id: item, name: capitalize(item), createAt: Date.now() });
    setItem('');
  }

  return (
    <form onSubmit={submitForm}>
      <input
        type="text"
        placeholder="What do you want?"
        value={item}
        onChange={e => setItem(e.target.value)}
      />
      <button type="submit">Submit</button>
    </form>
  );
}

export default withFirestore(AddItem);
