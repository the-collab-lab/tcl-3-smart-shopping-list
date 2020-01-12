import React, { useState, useEffect } from 'react';
import { withFirestore } from 'react-firestore';
import AddItemHeader from './AddItemHeader';
import getToken from '../lib/token';
import './AddItem.css';
import ItemError from './ItemError';

const expectedPurchase = { soon: 7, kindOfSoon: 14, notSoon: 30 };

const AddItem = ({ firestore }) => {
  const [name, setName] = useState('');
  const [nextExpectedPurchase, setNextExpectedPurchase] = useState(0);
  const [duplicate, setDuplicate] = useState(false);

  const initialToken = () => window.localStorage.getItem('token') || getToken();
  const [token] = useState(initialToken);
  useEffect(() => {
    window.localStorage.setItem('token', token);
  }, [token]);

  // const addItem = name => {
  //   firestore.collection('items').add({ name, token, nextExpectedPurchase });
  // };

  //normalized function
  const normalizeName = name => {
    name = name.toLowerCase().trim();
    let normalizedName = '';
    let symbol = `.,;:!?"`;
    for (let i = 0; i < name.length; i++) {
      if (!symbol.includes(name[i])) {
        normalizedName += name.slice(i, i + 1);
      }
    }
    return normalizedName;
  };

  const addItem = (normalizedName, token, nextExpectedPurchase) => {
    // firestore
    //   .collection('items')
    // .doc(name)
    // .doc(name)
    // .set({ name: '' });

    //set doc ID = to item name
    //Nikema: I'm grabbing the database wrong and I don't know what it is could you take a look?
    const itemsDocRef = firestore
      .collection('items')
      // .doc(name)
      // .collection('items')
      .doc(normalizedName);

    // is there an existing doc ID that is equal to the new name?
    itemsDocRef.get().then(docSnapshot => {
      if (docSnapshot.exists) {
        //giving it sometime before it refreshes
        let timeWindowBeforeRefresh = 3000;
        itemsDocRef.onSnapshot(doc => {
          setDuplicate(true);
          setTimeout(function() {
            setDuplicate(false);
          }, timeWindowBeforeRefresh);
        });
      } else {
        // itemsDocRef.set({
        //   name: name,
        //   nextExpectedPurchase: nextExpectedPurchase,
        // });
        // return firestore.collection('items').add({ name, token, nextExpectedPurchase })
        itemsDocRef.set({ name, token, nextExpectedPurchase });
        setName('');
      }
    });
  };

  // The state every time an event happens
  const handleChange = event => {
    setName(event.target.value);
  };

  const handleSelect = event => {
    setNextExpectedPurchase(parseInt(event.target.value, 10));
  };

  // const handleSubmit = event => {
  //   event.preventDefault();

  //   addItem(name, token);
  //   setName('');
  // };

  const handleSubmit = event => {
    event.preventDefault();
    let normalizedName = normalizeName(name);
    addItem(normalizedName, token, nextExpectedPurchase);
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
