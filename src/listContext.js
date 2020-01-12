import React, { useState, useEffect } from 'react';
import getToken from './lib/token';
import firebase from 'firebase/app';

const ListContext = React.createContext();

const ListContextProvider = props => {
  const initialToken = () => window.localStorage.getItem('token') || getToken();

  const [token] = useState(initialToken);
  const [shoppingList, setShoppingList] = useState([]);

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
  return (
    <ListContext.Provider
      value={{ token, shoppingList, setShoppingList, fetchList }}
    >
      {props.children}
    </ListContext.Provider>
  );
};

export { ListContext, ListContextProvider };
