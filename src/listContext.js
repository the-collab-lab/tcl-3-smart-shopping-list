import React, { useState, useEffect } from 'react';
import getToken from './lib/token';
import firebase from 'firebase/app';
import normalizeName from './lib/normalizeName';

const ListContext = React.createContext();

const ListContextProvider = props => {
  const initialToken = () => window.localStorage.getItem('token') || getToken();

  const [token] = useState(initialToken);
  const [shoppingList, setShoppingList] = useState([]);
  const [duplicate, setDuplicate] = useState();
  const [error, setError] = useState(false);

  // getting the token from localStorage
  useEffect(() => {
    window.localStorage.setItem('token', token);
  }, [token]);

  // fetch the latest shopping list from the database and save to state
  const fetchList = token => {
    var db = firebase.firestore();
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
        console.log('Error getting documents: ', error);
      });
  };

  const checkForDuplicates = name => {
    let normalizedName = normalizeName(name);
    let normalizedList = shoppingList.map(item => normalizeName(item.name));
    const found = normalizedList.includes(normalizedName);
    setDuplicate(found);
    setError(found);
    return found;
  };
  // Tell the ItemError component to show the error message when we enter a duplicate item
  function toggleShow(isError) {
    setError(isError);
    return isError ? 'show' : 'hide';
  }

  return (
    <ListContext.Provider
      value={{
        token,
        shoppingList,
        setShoppingList,
        setDuplicate,
        duplicate,
        fetchList,
        checkForDuplicates,
        toggleShow,
        error,
        setError,
      }}
    >
      {props.children}
    </ListContext.Provider>
  );
};

export { ListContext, ListContextProvider };
