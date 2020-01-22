import React, { useState, useContext } from 'react';
import normalizeName from './lib/normalizeName';
import { withFirestore, FirestoreCollection } from 'react-firestore';
import { TokenContext } from './tokenContext';
import Loading from './components/Loading';
import ErrorMessage from './components/ErrorMessage';

const ListContext = React.createContext();

const ListContextProvider = props => {
  const {
    token,
    setToken,
    initialToken,
    getLocalStorageToken,
    setLocalStorageToken,
  } = useContext(TokenContext);
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

  function displayList(token) {
    return (
      <FirestoreCollection
        // Specify the path to the collection you're pulling data from
        path="items"
        // Sort the data
        sort="name"
        // Only fetch the items associated with the token saved in localStorage
        filter={['token', '==', token || getLocalStorageToken()]}
        // isLoading = is a Boolean that represents the loading status for the firebase query. true until an initial payload from Firestore is received.
        // data = an Array containing all of the documents in the collection. Each item will contain an id along with the other data contained in the document.
        render={({ isLoading, data }) => {
          if (!isLoading && data.length === 0) {
            // If a list wasn't found create a new token in case the user adds an item. That way a new list will be created

            // Not working. TODO: Maybe make a function that clears the token in storage and generates a new one?

            setLocalStorageToken(initialToken());
            setToken(getLocalStorageToken());
            return <ErrorMessage />;
          }

          return isLoading ? (
            // TODO: Make a display list function is listContext.js
            <Loading />
          ) : (
            <ul>
              {setShoppingList(data)}
              {shoppingList.map((item, index) => (
                <li key={index}>{item.name}</li>
              ))}
            </ul>
          );
        }}
      />
    );
  }

  return (
    <ListContext.Provider
      value={{
        token,
        displayList,
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
