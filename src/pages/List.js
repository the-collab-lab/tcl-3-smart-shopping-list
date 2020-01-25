import React, { useContext } from 'react';
import NavTabs from '../components/NavTabs';
import { ListContext } from '../listContext';
import useListToken from '../useListToken';
import { FirestoreCollection } from 'react-firestore';
import Loading from '../components/Loading';
import ErrorMessage from '../components/ErrorMessage';
import dayjs from 'dayjs';

import './List.css';

const today = dayjs();

function isLessThan24hrs(datePurchased) {
  const purchaseDateCalc = dayjs(datePurchased);
  return today.diff(purchaseDateCalc, 'hour') <= 24;
}

const List = props => {
  const { shoppingList, setShoppingList, addDatePurchased } = useContext(
    ListContext,
  );
  const { token } = useListToken();

  function isChecked(lastDatePurchased) {
    return !!lastDatePurchased && isLessThan24hrs(lastDatePurchased);
  }

  function handlePurchasedChange(item) {
    const datePurchased = item.lastDatePurchased ? null : Date.now();
    addDatePurchased(item, datePurchased);
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

          // TODO: We shouldn't be setting state here. FirebaseCollection knows when there's an update
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
