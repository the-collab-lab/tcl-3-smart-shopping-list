import React, { useState } from 'react';
import normalizeName from './lib/normalizeName';
import { withFirestore } from 'react-firestore';
import useListToken from './useListToken';

const ListContext = React.createContext();

const ListContextProvider = props => {
  const { token, saveToken } = useListToken();
  const { firestore } = props;
  const itemsRef = firestore.collection('items');

  const [name, setName] = useState('');
  const [shoppingList, setShoppingList] = useState([]);

  // fetch the latest shopping list from the database and save to state
  const fetchList = token => {
    let query = itemsRef.orderBy('name').where('token', '==', token);
    const tempArray = [];
    query
      .get()
      .then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
          tempArray.push(doc.data());
        });
        setShoppingList(tempArray);
      })
      .catch(function(error) {
        console.error('Error getting shopping list ', error);
      });
    return tempArray;
  };

  const isDuplicate = name => {
    let normalizedName = normalizeName(name);
    let normalizedList = shoppingList.map(item => normalizeName(item.name));
    const isDupe = normalizedList.includes(normalizedName);
    return isDupe;
  };
  const validToken = token => {
    let filteredByToken = shoppingList.filter(item => item.token === token);
    return filteredByToken.length > 0;
  };

  const addItem = (name, nextExpectedPurchase) => {
    if (!isDuplicate(name)) {
      // so we can add a first item to a first list
      if (!validToken(token)) {
        saveToken(token);
      }
      itemsRef.add({ name, token, nextExpectedPurchase });
      fetchList(token);
      setName('');
    }
  };

  function addTime(data) {
    itemsRef.doc('lastPurchaseDate').set(data);
  }

  return (
    <ListContext.Provider
      value={{
        validToken,
        shoppingList,
        setShoppingList,
        fetchList,
        isDuplicate,
        addItem,
        name,
        setName,
        addTime,
      }}
    >
      {props.children}
    </ListContext.Provider>
  );
};

const ListContextProviderWithFirestore = withFirestore(ListContextProvider);
export { ListContextProviderWithFirestore, ListContext };
