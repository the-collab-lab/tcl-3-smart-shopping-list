import React, { useContext } from 'react';
import NavTabs from '../components/NavTabs';
import { ListContext } from '../listContext';
import useListToken from '../useListToken';
import { FirestoreCollection } from 'react-firestore';
import Loading from '../components/Loading';
import ErrorMessage from '../components/ErrorMessage';
import HomePage from './HomePage';

const List = props => {
  const { shoppingList, setShoppingList } = useContext(ListContext);
  const { token } = useListToken();
  if (token === '') {
    return <HomePage />;
  } else {
    return (
      <>
        <FirestoreCollection
          // Specify the path to the collection you're pulling data from
          path="items"
          // Sort the data
          sort="name"
          // Only fetch the items associated with the token saved in localStorage
          filter={['token', '==', token]}
          // isLoading = is a Boolean that represents the loading status for the firebase query. true until an initial payload from Firestore is received.
          // data = an Array containing all of the documents in the collection. Each item will contain an id along with the other data contained in the document.
          render={({ isLoading, data }) => {
            if (!isLoading && data.length === 0) {
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
        <NavTabs />
      </>
    );
  }
};

export default List;
