import React, { useState, useContext, useEffect } from 'react';
import { withFirestore } from 'react-firestore';
import AddItemHeader from './AddItemHeader';
import './AddItem.css';
import ItemError from './ItemError';
import { ListContext } from '../listContext';

const expectedPurchase = { soon: 7, kindOfSoon: 14, notSoon: 30 };

const AddItem = ({ firestore }) => {
  const {
    token,
    duplicate,
    setDuplicate,
    checkForDuplicates,
    shoppingList,
    fetchList,
    toggleShow,
    error,
    setError,
  } = useContext(ListContext);

  const [name, setName] = useState('');
  const [nextExpectedPurchase, setNextExpectedPurchase] = useState(0);

  useEffect(() => {
    if (shoppingList.length === 0) {
      fetchList(token);
    }
    if (error) {
      setTimeout(() => {
        setError(false);
      }, 2000);
    }
  }, [duplicate, error, fetchList, setError, shoppingList, token]);

  const addItem = () => {
    if (!checkForDuplicates(name)) {
      firestore.collection('items').add({ name, token, nextExpectedPurchase });
      fetchList(token);
      setDuplicate(false);
      setName('');
    }
  };

  // The state every time an event happens
  const handleChange = event => {
    setName(event.target.value);
  };

  const handleSelect = event => {
    setNextExpectedPurchase(parseInt(event.target.value, 10));
  };

  const handleSubmit = event => {
    event.preventDefault();
    addItem();
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

      {error ? (
        <ItemError className={toggleShow(true)} />
      ) : (
        <ItemError className={toggleShow(false)} />
      )}
    </>
  );
};
// Wrap this component in the higher order component withFirestore to directly access the database
export default withFirestore(AddItem);
