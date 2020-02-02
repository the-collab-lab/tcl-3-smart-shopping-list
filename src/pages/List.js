import React, { useContext } from 'react';
import NavTabs from '../components/NavTabs';
import { ListContext } from '../listContext';
import useListToken from '../useListToken';
import { FirestoreCollection } from 'react-firestore';
import Loading from '../components/Loading';
import ErrorMessage from '../components/ErrorMessage';
import HomePageButton from '../components/HomePageButton';
import calculateEstimate from '../lib/estimates.js';
import latestInterval from '../lib/estimates.js';
import dayjs from 'dayjs';
import './List.css';

const today = dayjs();

function isLessThan24hrs(datePurchased) {
  let purchaseDateCalc = dayjs(datePurchased);
  return today.diff(purchaseDateCalc, 'hour') <= 24;
}

const List = props => {
  const {
    shoppingList,
    setShoppingList,
    addDatePurchased,
    addCalculatedEstimate,
  } = useContext(ListContext);
  const { token } = useListToken();

  //we are checking if the last date it was purchased is less than 24hrs using isLessThan24hrs function
  function isChecked(lastDatePurchased) {
    return !!lastDatePurchased && isLessThan24hrs(lastDatePurchased);
  }
  // let count = 1;
  //we are adding the item.id as well as the date purchased when clicking on the checkbox
  function handlePurchasedChange(item) {
    const datePurchased = item.lastDatePurchased ? null : Date.now();
    const numberOfPurchases = item.numberOfPurchases
      ? item.numberOfPurchases + 1
      : 1;
    console.log('Item before:', item);
    addDatePurchased(item, datePurchased, numberOfPurchases);

    let lastEstimate = item.nextExpectedPurchase
      ? item.nextExpectedPurchase
      : 14;
    console.log('lastEstimate:', lastEstimate);
    console.log('numberOfPurchases:', numberOfPurchases);
    const calculatedEstimate = calculateEstimate(
      lastEstimate,
      latestInterval,
      numberOfPurchases,
    );
    console.log('the calculateEstimate ran:', calculatedEstimate);
    addCalculatedEstimate(item, calculatedEstimate);
    console.log('Item after:', item);
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

          if (!isLoading) {
            setShoppingList(data);
          }

          return isLoading ? (
            // TODO: Make a display list function is listContext.js
            <Loading />
          ) : (
            <ul className="shopping-list">
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
