import React, { useContext } from 'react';
import { FirestoreCollection } from 'react-firestore';
import Loading from '../components/Loading';
import NavTabs from '../components/NavTabs';
import ErrorMessage from '../components/ErrorMessage';
import HomePageButton from '../components/HomePageButton';
import { ListContext } from '../listContext';
import { TokenContext } from '../tokenContext';

const List = () => {
  const { token, getLocalStorageToken, setLocalStorageToken } = useContext(
    TokenContext,
  );
  const { setShoppingList, shoppingList } = useContext(ListContext);

  return (
    <>
      <HomePageButton />

      <FirestoreCollection
        // Specify the path to the collection you're pulling data from
        path="items"
        // Sort the data
        sort="name"
        // Only fetch the items associated with the token saved in localStorage
        filter={['token', '==', token || getLocalStorageToken]}
        // isLoading = is a Boolean that represents the loading status for the firebase query. true until an initial payload from Firestore is received.
        // data = an Array containing all of the documents in the collection. Each item will contain an id along with the other data contained in the document.
        render={({ isLoading, data }) => {
          if (!isLoading && data.length === 0) {
            setLocalStorageToken(token);
            return <ErrorMessage />;
          }

          return isLoading ? (
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
};

export default List;
