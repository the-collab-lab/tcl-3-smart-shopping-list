import React, { useState, useEffect } from 'react';
import getToken from './lib/token';
import firebase from 'firebase/app';
import normalizeName from './lib/normalizeName';

const ListContext = React.createContext();

const ListContextProvider = props => {
  const initialToken = () => window.localStorage.getItem('token') || getToken();

  const [token] = useState(initialToken);
  const [name, setName] = useState('');

  const [shoppingList, setShoppingList] = useState([]);

  // getting the token from localStorage
  useEffect(() => {
    window.localStorage.setItem('token', token);
  }, [token]);

  // fetch the latest shopping list from the database and save to state
  const fetchList = token => {
    let db = firebase.firestore();
    let itemsRef = db.collection('items');
    let query = itemsRef.orderBy('name').where('token', '==', token);

    query
      .get()
      .then(function(querySnapshot) {
        const tempArray = [];
        querySnapshot.forEach(function(doc) {
          tempArray.push(doc.data());
        });
        setShoppingList(tempArray);
      })
      .catch(function(error) {
        console.error('Error getting shopping list ', error);
      });
  };

  function isDuplicate(name) {
    let normalizedName = normalizeName(name);
    let normalizedList = shoppingList.map(item => normalizeName(item.name));
    const isDupe = normalizedList.includes(normalizedName);
    return isDupe;
  }

  function addItem(name, nextExpectedPurchase) {
    if (!isDuplicate(name)) {
      let db = firebase.firestore();
      let itemsRef = db.collection('items');
      itemsRef.doc().set({ name, token, nextExpectedPurchase });
      fetchList(token);
      setName('');
    }
  }

  return (
    <ListContext.Provider
      value={{
        token,
        shoppingList,
        setShoppingList,
        fetchList,
        isDuplicate,
        addItem,
        name,
        setName,
      }}
    >
      {props.children}
    </ListContext.Provider>
  );
};
export { ListContextProvider, ListContext };
