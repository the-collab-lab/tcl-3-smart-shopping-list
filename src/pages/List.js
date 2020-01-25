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
  return today.diff(purchaseDateCalc), 'hour' <= 24;
};

const List = props => {
  const { shoppingList, setShoppingList, addTime } = useContext(ListContext);
  const { token } = useListToken();

  /*
  Still need to figure out:
    1. When box is check it will add `today`
    2. When box is check for more than 24hrs it becomes unchecked



  */
  function isChecked(lastDatePurchased) {
    return !!lastDatePurchased && isLessThan24hrs(lastDatePurchased);
  }

  function handlePurchasedChange(item) {
    const datePurchased = item.lastDatePurchased ? null : Date.now();
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
            <div className="itemList">
              {/* need to add checkbox input here */}
              {setShoppingList(data)}
              {shoppingList.map((item, index) => (
                <div key={index}>
                  <label>
                    {/* <input type="checkbox"></input> */}
                    {/* {isLessThan24hrs(check) ? (
                      <input
                        type="checkbox"
                        id={item.id}
                        checked={check === item.lastPurchaseDate}
                        value={today === check}
                        onChange={() => handleSelect(item)}
                      />
                    ) : (
                      <input type="checkbox" />
                    )} */}
                    <input
                      type="checkbox"
                      //checked is a reflection of a field on the item. it shouldn’t be local state. you should be able to have something like checked={isChecked(item.lastDatePurchased)} .
                      checked={isChecked(item.lastDatePurchased)}
                      onChange={() => handlePurchasedChange(item)}
                    />
                    {item.name}
                  </label>
                </div>
              ))}
            </div>
          );
        }}
      />
      <NavTabs />
    </>
  );
};

export default List;
