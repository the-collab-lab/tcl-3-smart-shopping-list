import React, { useState, useContext } from 'react';
import NavTabs from '../components/NavTabs';
import { ListContext } from '../listContext';
import useListToken from '../useListToken';
import { FirestoreCollection } from 'react-firestore';
import Loading from '../components/Loading';
import ErrorMessage from '../components/ErrorMessage';
import './List.css';

import HomePageButton from '../components/HomePageButton';
// import Checkmark from './Checkmark';
import dayjs from 'dayjs';

/*
you have the item in list, so you can pass the whole item here: https://github.com/the-collab-lab/tcl-3-smart-shopping-list/blob/mj-mr-mark-an-item-purchased/src/pages/List.js#L81. that item can then be passed down so you’ll have the ID
be sure to pass the whole item to set. it does an entire replace. think something like set({…oldItemData, newField: newData})
checked is a reflection of a field on the item. it shouldn’t be local state. you should be able to have something like checked={isChecked(item.lastDatePurchased)} . then you can make your date comparison in that function
src/pages/List.js:81
*/

// const currentTime = Date.now(); no longer being used since we are comparing with Date.now()?
const today = dayjs();

const isLessThan24hrs = purchased_date => {
  let purchaseDateCalc = dayjs(purchased_date);
  console.log('is it calculating', purchaseDateCalc);
  return today.diff(purchaseDateCalc), 'hour' <= 24;
};

const List = props => {
  const { shoppingList, setShoppingList, addTime } = useContext(ListContext);
  const { token } = useListToken();

  function isChecked(lastDatePurchased) {
    return !!lastDatePurchased && isLessThan24hrs(lastDatePurchased);
  }

  function handlePurchasedChange(item) {
    const datePurchased = item.lastDatePurchased ? null : Date.now();
    console.log('date purchased', datePurchased);
    addTime(item, datePurchased);
  }

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
            <ul className="shopping-list">
              {setShoppingList(data)}
              {shoppingList.map((item, index) => (
                <li key={index}>
                  <label>
                    <input
                      type="checkbox"
                      //checked is a reflection of a field on the item. it shouldn’t be local state. you should be able to have something like checked={isChecked(item.lastDatePurchased)} .
                      checked={isChecked(item.lastDatePurchased)}
                      onChange={() => handlePurchasedChange(item)}
                    />
                    {item.name}
                  </label>
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
