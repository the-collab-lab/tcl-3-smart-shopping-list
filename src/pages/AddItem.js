import React, { useState, useContext } from 'react';
import { withFirestore } from 'react-firestore';
import AddItemHeader from './AddItemHeader';
import './AddItem.css';
import normalizeName from '../lib/normalizeName';
import ItemError from './ItemError';
import { ListContext } from '../listContext';

const expectedPurchase = { soon: 7, kindOfSoon: 14, notSoon: 30 };

const AddItem = ({ firestore }) => {
  const { token, setShoppingList, shoppingList, fetchList } = useContext(
    ListContext,
  );

  const [name, setName] = useState('');
  const [nextExpectedPurchase, setNextExpectedPurchase] = useState(0);
  const [duplicate, setDuplicate] = useState(false);

  const addItem = () => {
    if (!duplicate) {
      firestore.collection('items').add({ name, token, nextExpectedPurchase });
    }
  };

  // The state every time an event happens
  const handleChange = event => {
    setName(event.target.value);
  };

  const handleSelect = event => {
    setNextExpectedPurchase(parseInt(event.target.value, 10));
  };
  const checkForDuplicates = name => {
    if (shoppingList.length === 0) {
      fetchList(token);
    }
    let normalizedName = normalizeName(name);
    let normalizedList = shoppingList.map(item => normalizeName(item.name));
    console.log('Shopping List', shoppingList);
    console.log('Normalized List', normalizedList);
    console.log('Normalized Name', normalizedName);
    // const isDuplicate = normalizedList.includes(normalizedName);
    const found = normalizedList.find(item => item === normalizedName);
    // if (normalizedList.filter(item => item === normalizedName))

    console.log('found', found);

    setDuplicate(found);
    return found;
  };

  const handleSubmit = event => {
    event.preventDefault();
    if (checkForDuplicates(name)) {
      return;
    }
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

      {duplicate ? <ItemError /> : null}
    </>
  );
};
// Wrap this component in the higher order component withFirestore to directly access the database
export default withFirestore(AddItem);
