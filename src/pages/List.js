import React, { useContext, useState } from 'react';
import NavTabs from '../components/NavTabs';
import Loading from '../components/Loading';
import normalizeName from '../lib/normalizeName';
import useListToken, { getCurrentToken } from '../useListToken';
import { FirestoreCollection } from 'react-firestore';
import { ListContext } from '../listContext';
import dayjs from 'dayjs';
import './List.css';

const List = props => {
  const { shoppingList, setShoppingList, addDatePurchased } = useContext(
    ListContext,
  );

  const { token } = useListToken;

  const today = dayjs();

  // let normalize = normalizeName();

  const [filteredInput, setFilteredInput] = useState('');

  function handleFilterChange(event) {
    setFilteredInput(event.target.value);
  }

  function isLessThan24hrs(datePurchased) {
    let purchaseDateCalc = dayjs(datePurchased);
    return today.diff(purchaseDateCalc, 'hour') <= 24;
  }

  //when an item has been created but not yet purchased.
  function isChecked(lastDatePurchased) {
    return !!lastDatePurchased && isLessThan24hrs(lastDatePurchased);
  }

  //we are adding the item.id as well as the date purchased when clicking on the checkbox
  function handlePurchasedChange(item) {
    const datePurchased = item.lastDatePurchased ? null : Date.now();
    addDatePurchased(item, datePurchased);
  }

  //5. way to clear out the filter
  function handleFilterClearClick(event) {
    event.preventDefault();
    setFilteredInput('');
  }

  return (
    <>
      <FirestoreCollection
        // Specify the path to the collection you're pulling data from
        path="items"
        // Sort the data
        sort="name"
        // Only fetch the items associated with the token saved in localStorage
        filter={['token', '==', token || getCurrentToken() || 'no token set']}
        // isLoading = is a Boolean that represents the loading status for the firebase query. true until an initial payload from Firestore is received.
        // data = an Array containing all of the documents in the collection. Each item will contain an id along with the other data contained in the document.
        render={({ isLoading, data }) => {
          // if (!isLoading && data.length === 0) {
          //   return <ErrorMessage />;
          // }
          if (!isLoading) {
            setShoppingList(data);
          }
          return isLoading ? (
            <Loading />
          ) : (
            <>
              <div className="listFilter">
                <input
                  type="search"
                  className=""
                  onChange={handleFilterChange}
                  value={filteredInput}
                ></input>
                <button
                  className=""
                  onClick={handleFilterClearClick}
                  value={filteredInput}
                >
                  X
                </button>
              </div>
              <ul className="shopping-list">
                {shoppingList
                  .filter(
                    item =>
                      item.name.slice(0, filteredInput.length) == filteredInput,
                  )
                  .map((item, index) => (
                    <li key={index}>
                      <label>
                        <input
                          type="checkbox"
                          //checked is a reflection of a field on the item. it shouldn't be local state. you should be able to have something like checked={isChecked(item.lastDatePurchased)} .
                          checked={isChecked(item.lastDatePurchased)}
                          onChange={() => handlePurchasedChange(item)}
                        />
                        {item.name}
                      </label>
                    </li>
                  ))}
              </ul>
            </>
          );
        }}
      />
      <NavTabs />
    </>
  );
};
export default List;
