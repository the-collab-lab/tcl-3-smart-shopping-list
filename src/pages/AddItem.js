import React, { useState } from 'react';
import { withFirestore } from 'react-firestore';
import { Link } from 'react-router-dom';
import AddItemHeader from './AddItemHeader';

const AddItem = ({ firestore }) => {
  const [name, setName] = useState('');

  // Send the new item to Firebase
  const addItem = name => {
    firestore.collection('items').add({ name });
  };

  // The state every time an event happens
  const handleChange = event => {
    setName(event.target.value);
  };

  // Handle the click of the Add Item button on the form
  const handleSubmit = event => {
    event.preventDefault();
    addItem(name);
    setName('');
  };

  return (
    <>
      <AddItemHeader />
      <Link to="/">Go back to list</Link>
      <form onSubmit={handleSubmit}>
        <label>
          Add Item:
          <input
            value={name}
            placeholder="apples"
            type="text"
            onChange={handleChange}
          />
        </label>
        <input type="submit" value="Add Item" />
      </form>
    </>
  );
};
// Wrap this component in the higher order component withFirestore to directly access the database
export default withFirestore(AddItem);
