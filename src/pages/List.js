import React, { useState } from 'react';
import { FirestoreCollection } from 'react-firestore';
import Loading from '../components/Loading';
import NavTabs from '../components/NavTabs';
import ErrorMessage from '../components/ErrorMessage';
import HomePageButton from '../components/HomePageButton';


const List = () => {
  const getStoredToken = () => window.localStorage.getItem('token');
  // const [data] = useState(data)
  return (
    <>
      <HomePageButton />

      <FirestoreCollection
        // Specify the path to the collection you're pulling data from
        path="items"
        // Sort the data
        sort="name"
        // Only fetch the items associated with the token saved in localStorage
        filter={['token', '==', getStoredToken()]}
        // isLoading = is a Boolean that represents the loading status for the firebase query. true until an initial payload from Firestore is received.
        // data = an Array containing all of the documents in the collection. Each item will contain an id along with the other data contained in the document.
        render={({ isLoading, data }) => {
          if (data.length === 0) {
            return <ErrorMessage />;
          }
          console.log('data:', data)
          
          return isLoading ? (
            <Loading />
          ) : (
            <ul>
              {/* {console.log('data: ', data)} */}
              {data.map(item => (
                <li key={item.id}>{item.name}</li>
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
