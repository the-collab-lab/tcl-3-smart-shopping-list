import React, { useState, useContext } from 'react';
import AddItemHeader from './AddItemHeader';
import './AddItem.css';
import ItemError from './ItemError';
import { ListContext } from '../listContext';
import useListToken from '../useListToken';

const expectedPurchase = { soon: 7, kindOfSoon: 14, notSoon: 30 };

const AddItem = () => {
  const { token } = useListToken();
  const { isDuplicate, addItem, name, setName } = useContext(ListContext);

  const [error, setError] = useState(false);
  const [nextExpectedPurchase, setNextExpectedPurchase] = useState(0);

  const handleChange = event => {
    setName(event.target.value);
    setError(isDuplicate(event.target.value));
  };

  const handleSelect = event => {
    setNextExpectedPurchase(parseInt(event.target.value, 10));
  };

  const handleSubmit = event => {
    event.preventDefault();
    setError(isDuplicate(name));
    addItem(name, nextExpectedPurchase, token);
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

      {error && name && <ItemError name={name} />}
    </>
  );
};

export default AddItem;

//MJ: testing to make sure that I pulled the branch correctly.
