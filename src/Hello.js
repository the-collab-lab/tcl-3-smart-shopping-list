import React, { useState } from 'react';
import { withFirestore } from 'react-firestore';

const Help = data => {
  console.log({ data });
  return null;
};

function capitalize(s) {
  return s.slice(0).toUpperCase() + s.slice(1);
}

function Hello({ firestore }) {
  const [item, setItem] = useState('');

  function submitForm(e) {
    e.preventDefault();
    const fRef = firestore.collection('steve-test');
    fRef.add({ id: item, name: capitalize(item), createAt: Date.now() });
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

export default withFirestore(Hello);
