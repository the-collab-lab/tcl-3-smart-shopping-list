import React, { useState, useEffect } from 'react';
import { withFirestore } from 'react-firestore';
import AddItemHeader from './AddItemHeader';
import getToken from '../lib/token';
import './AddItem.css';

const expectedPurchase = { soon: 7, kindOfSoon: 14, notSoon: 30 };

//Flash error message
const Flash = ({ message }) => <div className="flash">{message}</div>;

const AddItem = ({ firestore }) => {
  const [name, setName] = useState('');

  const [nextExpectedPurchase, setNextExpectedPurchase] = useState(0);

  const dismissError = () => {};

  const initialToken = () => window.localStorage.getItem('token') || getToken();
  const [token] = useState(initialToken);
  useEffect(() => {
    window.localStorage.setItem('token', token);
  }, [token]);

  const addItem = name => {
    firestore.collection('items').add({ name, token, nextExpectedPurchase });
  };

  // The state every time an event happens
  const handleChange = event => {
    setName(event.target.value);
  };

  const handleSelect = event => {
    setNextExpectedPurchase(parseInt(event.target.value, 10));
  };

  // Handle the click of the Add Item button on the form
  const handleSubmit = event => {
    event.preventDefault();
    addItem(name, token);
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
              value={expectedPurchase.kindOfSoon}
              checked={expectedPurchase.kindOfSoon === nextExpectedPurchase}
              onChange={handleSelect}
            />
            Kind of Soon
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

      <div className="flash">
        <button onClick={''}>✖</button>
      </div>
    </>
  );
};
// Wrap this component in the higher order component withFirestore to directly access the database
export default withFirestore(AddItem);
