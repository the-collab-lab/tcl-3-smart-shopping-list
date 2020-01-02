import React from 'react';
import { FirestoreCollection } from 'react-firestore';
import { Link } from 'react-router-dom';
import Loading from '../components/Loading';
// import firebase from 'firebase/app';

const List = () => {
  // var db = firebase.firestore();
  // let itemsRef = db.collection('items');
  // let query = itemsRef.orderBy('name').where('token', '==', 'baron flew gibby');

  // query
  //   .get()
  //   .then(function(querySnapshot) {
  //     querySnapshot.forEach(function(doc) {
  //       // doc.data() is never undefined for query doc snapshots
  //       console.log(doc.id, ' => ', doc.data());
  //     });
  //   })
  //   .catch(function(error) {
  //     console.log('Error getting documents: ', error);
  //   });
  return (
    <>
      <Link to="/add-item">Click here to add an item</Link>
      <br />
      <Link to="/new-list">New List</Link>

      <FirestoreCollection
        // Specify the path to the collection you're pulling data from
        path="items"
        // Sort the data
        sort="name"
        filter={['token', '==', 'baron flew gibby']}
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
    </>
  );
};

export default List;
