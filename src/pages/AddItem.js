import React, { useState } from 'react';
import { withFirestore } from 'react-firestore';
import AddItemHeader from './AddItemHeader';

const expectedPurchase = { soon: 7, verySoon: 14, notSoon: 30 };

const AddItem = ({ firestore }) => {
  const [name, setName] = useState('');
  // Try to keep your types consistent. If the setter always sets a number,
  // then initialize with a number
  const [nextExpectedPurchase, setNextExpectedPurchase] = useState(0);

  // Send the new item to Firebase
  const addItem = () => {
    const doc = firestore.collection('items').doc(name);
    doc.set({ name, nextExpectedPurchase });
  };

  // The state every time an event happens
  const handleChange = event => {
    setName(event.target.value);
  };

  // Value returns as a string. We need to be sure to send a number.
  const handleSelect = event => {
    setNextExpectedPurchase(parseInt(event.target.value, 10));
  };

  // Handle the click of the Add Item button on the form
  const handleSubmit = event => {
    event.preventDefault();
    addItem();
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
          {/* Good habit to wrap inputs with the label.
              This way, clicking the label also selects the input. 
              If you wanted, this could be its own component.
              Or we could use <select> instead of radio buttons. */}
          <label>
            <input
              type="radio"
              id={expectedPurchase.soon}
              value={expectedPurchase.soon}
              checked={expectedPurchase.soon === nextExpectedPurchase}
              onChange={handleSelect}
            />
            Soon
          </label>
        </div>
        <div>
          <label>
            <input
              type="radio"
              id={expectedPurchase.verySoon}
              value={expectedPurchase.verySoon}
              checked={expectedPurchase.verySoon === nextExpectedPurchase}
              onChange={handleSelect}
            />
            Very Soon
          </label>
        </div>
        <div>
          <label>
            <input
              type="radio"
              id={expectedPurchase.notSoon}
              value={expectedPurchase.notSoon}
              checked={expectedPurchase.notSoon === nextExpectedPurchase}
              onChange={handleSelect}
            />
            Not Soon
          </label>
        </div>
      </form>
    </>
  );
};
// Wrap this component in the higher order component withFirestore to directly access the database
export default withFirestore(AddItem);
