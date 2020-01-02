import React from 'react';
import { FirestoreCollection } from 'react-firestore';
import Loading from '../components/Loading';
import NavTabs from '../components/NavTabs';
// import firebase from 'firebase/app';

const List = () => {
  // TODO: Get the token saved in local storage and use it to filter the list
  const getStoredToken = () => window.localStorage.getItem('token');
  return (
    <>
      <FirestoreCollection
        // Specify the path to the collection you're pulling data from
        path="items"
        // Sort the data
        sort="name"
        filter={['token', '==', getStoredToken()]}
        // isLoading = is a Boolean that represents the loading status for the firebase query. true until an initial payload from Firestore is received.
        // data = an Array containing all of the documents in the collection. Each item will contain an id along with the other data contained in the document.
        render={({ isLoading, data }) => {
          return isLoading ? (
            <Loading />
          ) : (
            <ul>
              {data.map(item => (
                <li key={item.id}>
                  {item.name} -- token: {item.token}
                </li>
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
