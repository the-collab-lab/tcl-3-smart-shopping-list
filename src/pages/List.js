import React from 'react';
import { FirestoreCollection } from 'react-firestore';
import Loading from '../components/Loading';

const List = () => {
  return (
    <section>
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
            <main>
              <ul>
                {data.map(item => (
                  <li key={item.id}>{item.name}</li>
                ))}
              </ul>
            </main>
          );
        }}
      />
    </section>
  );
};

export default List;
