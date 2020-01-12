import React, { useState, useEffect } from 'react';
import { withFirestore } from 'react-firestore';
import AddItemHeader from './AddItemHeader';
import getToken from '../lib/token';

const AddItem = ({ firestore }) => {
  const [name, setName] = useState('');

  const initialToken = () => window.localStorage.getItem('token') || getToken();
  const [token] = useState(initialToken);
  // const[ redirect, setRedirect ] = useState(false)
  useEffect(() => {
    window.localStorage.setItem('token', token);
  }, [token]);

  console.log('token:', token);

  // var query = firestore.collection('items').where('token', '==', token);
  // console.log(query)
  // Send the new item to Firebase
  const addItem = name => {
    firestore.collection('items').add({ name, token, nextExpectedPurchase });
    firestore.collection('items').add({ name, token });
    //const addItem = name => {
    //firestore.collection('items').add({ name, token });
  };

  // The state every time an event happens
  const handleChange = event => {
    setName(event.target.value);
  };

  // Handle the click of the Add Item button on the form
  const handleSubmit = event => {
    event.preventDefault();
    addItem(name, token);
    setName('');
    // isSubmitted;
  };

  // if (this.state.submitted === true) {
  //   return <Redirect to="/" />;
  // }

  return (
    <>
      <AddItemHeader />

      <form onSubmit={handleSubmit}>
        <label>
          Add Item:
          <input
            value={name}
            placeholder="apples"
            type="text"
            onChange={handleChange}
          />
        </label>
        <input type="submit" value="Add Item" />
      </form>
    </>
  );
};
// Wrap this component in the higher order component withFirestore to directly access the database
export default withFirestore(AddItem);
