import dayjs from 'dayjs';
import React, { useContext, useState } from 'react';
import { FirestoreCollection } from 'react-firestore';

import { ListContext } from '../listContext';
import useListToken, { getCurrentToken } from '../useListToken';
import NavTabs from '../components/NavTabs';
import Loading from '../components/Loading';
import normalizeName from '../lib/normalizeName';

import './List.css';

function isLessThan24hrs(datePurchased) {
  return dayjs().diff(dayjs(datePurchased), 'hours') <= 24;
}

//we are checking if the last date it was purchased is less than 24hrs using isLessThan24hrs function
function isChecked(lastDatePurchased) {
  return !!lastDatePurchased && isLessThan24hrs(lastDatePurchased);
}

const List = props => {
  const [filteredInput, setFilteredInput] = useState('');
  const { shoppingList, setShoppingList, purchaseItem } = useContext(
    ListContext,
  );
  const { token } = useListToken();

  function handlePurchasedChange(item) {
    // We don't want to uncheck ourselves. We should have a separate ticket for handling a mis-check
    // What would we set datePurchased to on an uncheck? Can't be null if we've purchased or our suggestions
    // are goofed. Maybe we live with that, or we could keep the most recent lastDatePurchased in case
    // of a mistake. For this ticket, let's keep it simple.
    if (!isChecked(item.lastDatePurchased)) {
      purchaseItem(item, Date.now());
    }
  }

  function handleFilterChange(event) {
    setFilteredInput(event.target.value);
  }

  //5. way to clear out the filter

  function filterListInput(name) {
    return normalizeName(name).includes(normalizeName(filteredInput));
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
          if (!isLoading) {
            setShoppingList(data);
          }
          return isLoading ? (
            // TODO: Make a display list function is listContext.js
            <Loading />
          ) : (
            <>
              <div className="listFilter">
                <input
                  type="search"
                  onChange={handleFilterChange}
                  value={filteredInput}
                ></input>
                <button onClick={() => setFilteredInput('')}>X</button>
              </div>
              <ul className="shopping-list">
                {shoppingList
                  .filter(item => filterListInput(item.name))
                  .map((item, index) => (
                    <li key={index}>
                      <label>
                        <input
                          type="checkbox"
                          checked={isChecked(item.lastDatePurchased)}
                          onChange={() => handlePurchasedChange(item)}
                          disabled={
                            isChecked(item.lastDatePurchased)
                              ? 'disabled'
                              : false
                          }
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
