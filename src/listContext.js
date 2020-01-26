import React, { useState } from 'react';
import normalizeName from './lib/normalizeName';
import { withFirestore } from 'react-firestore';
import useListToken from './useListToken';

const ListContext = React.createContext();
// const dummyList = ['eggs', 'tomatoes', 'pink', 'purple'];
const ListContextProvider = props => {
  const { saveToken } = useListToken();
  const { firestore } = props;
  const itemsRef = firestore.collection('items');

  const [name, setName] = useState('');
  const [shoppingList, setShoppingList] = useState([]);

  const initializeList = token => {
    return validToken(token);
  };
  // fetch the latest shopping list from the database and save to state
  const fetchList = token => {
    let query = itemsRef.orderBy('name').where('token', '==', token);
    // const tempArray = dummyList;
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
    if (fetchList(token).length > 0) {
      console.log('here from validToken()', token);

      return true;
    }
    let filteredByToken = shoppingList.filter(item => item.token === token);
    return filteredByToken.length > 0;
    // return true;
  };

  const addItem = (name, nextExpectedPurchase, token) => {
    // so we can add a first item to a first list

    if (!isDuplicate(name)) {
      if (!validToken(token)) {
        saveToken(token);
        itemsRef.add({ name, token, nextExpectedPurchase });
        console.log('from addItem() new list token', token);
        fetchList(token);
        console.log('here from addItem() new list', shoppingList);
        setName('');
        return;
      }
      itemsRef.add({ name, token, nextExpectedPurchase });
      fetchList(token);
      console.log('here from addItem()', shoppingList);
      setName('');
    }
  };

  //we use .set to add the time the item was purchased to an already existing document we search for the item.id
  const addDatePurchased = (item, lastDatePurchased) => {
    itemsRef.doc(item.id).set({ ...item, lastDatePurchased });
  };

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
        initializeList,
        addDatePurchased,
      }}
    >
      {props.children}
    </ListContext.Provider>
  );
};

const ListContextProviderWithFirestore = withFirestore(ListContextProvider);
export { ListContextProviderWithFirestore, ListContext };
