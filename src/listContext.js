import React, { useState, useContext } from 'react';
import normalizeName from './lib/normalizeName';
import { withFirestore } from 'react-firestore';
import { TokenContext } from './tokenContext';

const ListContext = React.createContext();

const ListContextProvider = props => {
  const { token } = useContext(TokenContext);
  const { firestore } = props;
  const itemsRef = firestore.collection('items');

  const [name, setName] = useState('');
  const [shoppingList, setShoppingList] = useState([]);

  // fetch the latest shopping list from the database and save to state
  const fetchList = token => {
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
      itemsRef.add({ name, token, nextExpectedPurchase });
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

const ListContextProviderWithFirestore = withFirestore(ListContextProvider);
export { ListContextProviderWithFirestore, ListContext };
