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

  const fetchList = token => {
    var db = firebase.firestore();
    let itemsRef = db.collection('items');
    let query = itemsRef.orderBy('name').where('token', '==', token);

    query
      .get()
      .then(function(querySnapshot) {
        const tempArray = [];
        querySnapshot.forEach(function(doc) {
          // doc.data() is never undefined for query doc snapshots
          tempArray.push(doc.data());
        });
        setShoppingList(tempArray);
      })
      .catch(function(error) {
        console.log('Error getting documents: ', error);
      });
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
    console.log('Was the item found?', normalizedList.includes(normalizedName));
    const found = normalizedList.includes(normalizedName);
    setDuplicate(found);
    setError(found);
    console.log('From checkForDuplicates(): duplicate?', duplicate);
    return found;
  };
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
