import React, { useState } from 'react';
import { withFirestore } from 'react-firestore';
import AddItemHeader from './AddItemHeader';

const AddItem = ({ firestore }) => {
  const [name, setName] = useState('');

  // Send the new item to Firebase
  const addItem = name => {
    firestore.collection('items').add({ name });
  };

  // The state every time an event happens
  const handleChange = event => {
    setName(event.target.value);
  };

  // Handle the click of the Add Item button on the form
  const handleSubmit = event => {
    event.preventDefault();
    addItem(name);
    setName('');
  };

  // const updateDatabase = data => {
  //   DataTransferItemList.DocRef.doc(data.id).update({
  //     estimated_next_purchase: data.estimated_next_purchase
  //   })
  // }

  /*
    const updateDatabase = data => {
    itemsDocRef.doc(data.id).update({
      numberOfDays: data.numberOfDays,
      dateOfPurchase: data.dateOfPurchase,
      numberOfPurchases: data.numberOfPurchases,
    });

    some how we need to add token to this area but not sure how to do it

    maybe I can start with the inputs for creating a radio button? is that what it's called
  };
  
  
  */

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

        <div className="radio">
          <label>
            <input type="radio" value="7" checked={true} />
            Soon
          </label>
        </div>
        <div className="radio">
          <label>
            <input type="radio" value="14" />
            Kind of Soon
          </label>
        </div>
        <div className="radio">
          <label>
            <input type="radio" value="30" />
            Not Soon
          </label>
        </div>
      </form>
    </>
  );
};
// Wrap this component in the higher order component withFirestore to directly access the database
export default withFirestore(AddItem);
