import React from 'react';
import { FirestoreCollection } from 'react-firestore';
import { Link } from 'react-router-dom';
import Loading from '../components/Loading';

const List = () => {
  return (
    <>
      <Link to="/add-item">Click here to add an item</Link>
      <FirestoreCollection
        // Specify the path to the collection you're pulling data from
        path="items"
        // Sort the data
        sort="name"
        // isLoading = is a Boolean that represents the loading status for the firebase query. true until an initial payload from Firestore is received.
        // data = an Array containing all of the documents in the collection. Each item will contain an id along with the other data contained in the document.
        render={({ isLoading, data }) => {
          return isLoading ? (
            <Loading />
          ) : (
            <ul>
              {data.map(item => (
                <li key={item.id}>{item.name}</li>
              ))}
            </ul>
          );
        }}
      />
    </>
  );
};

export default List;
