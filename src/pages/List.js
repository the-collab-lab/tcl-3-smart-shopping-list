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
  let purchaseDateCalc = dayjs(datePurchased);
  return today.diff(purchaseDateCalc, 'hour') <= 24;
}

const List = props => {
  const { shoppingList, setShoppingList, purchaseItem } = useContext(
    ListContext,
  );
  const { token } = useListToken();

  //we are checking if the last date it was purchased is less than 24hrs using isLessThan24hrs function
  function isChecked(lastDatePurchased) {
    return !!lastDatePurchased && isLessThan24hrs(lastDatePurchased);
  }

  function handlePurchasedChange(item) {
    // We don't want to uncheck ourselves. We should have a separate ticket for handling a mis-check
    // What would we set datePurchased to on an uncheck? Can't be null if we've purchased or our suggestions
    // are goofed. Maybe we live with that, or we could keep the most recent lastDatePurchased in case
    // of a mistake. For this ticket, let's keep it simple.
    if (!isChecked(item.lastDatePurchased)) {
      purchaseItem(item, Date.now());
    }
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
