import React, { useState, useInput } from 'react';
import { withFirestore } from 'react-firestore';
import AddItemHeader from './AddItemHeader';

const AddItem = ({ firestore }) => {
  const [name, setName] = useState('');

  const [data] = useState({ soon: 7, very_soon: 14, not_soon: 30 });

  const [nextExpectedPurchase, setNextExpectedPurchase] = useInput('');

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
        <div>
          <input
            type="radio"
            id={data.soon}
            value={data.soon}
            checked={data.soon === nextExpectedPurchase}
            onChange={setNextExpectedPurchase}
          />
          <label>Soon</label>
        </div>
        <div>
          <input
            type="radio"
            id={data.very_soon}
            value={data.very_soon}
            checked={data.very_soon === nextExpectedPurchase}
            onChange={setNextExpectedPurchase}
          />
          <label>Very Soon</label>
        </div>
        <div>
          <input
            type="radio"
            id={data.not_soon}
            value={data.not_soon}
            checked={data.not_soon === nextExpectedPurchase}
            onChange={setNextExpectedPurchase}
          />
          <label>Not Soon</label>
        </div>
      </form>
    </>
  );
};
// Wrap this component in the higher order component withFirestore to directly access the database
export default withFirestore(AddItem);
