import React, { useContext, useState } from 'react';
import NavTabs from '../components/NavTabs';
// import Loading from '../components/Loading';
// import ErrorMessage from '../components/ErrorMessage';
import { getCurrentToken } from '../useListToken';
import { ListContext } from '../listContext';
import dayjs from 'dayjs';
import './List.css';
import normalizeName from '../lib/normalizeName';

const List = props => {
  const {
    fetchList,
    addDatePurchased,
    shoppingList,
    setShoppingList,
  } = useContext(ListContext);
  const today = dayjs();

  const [filteredInput, setFilteredInput] = useState('');
  const [list] = useState(() => fetchList(getCurrentToken()));

  //1. useState to filter input

  /*

  2. Filter Function

  const filterAr = ar => {
  return ar.filter(
    item =>
      item.id.slice(0, filteredInput.length) === filteredInput,
  );
};

*/

  function handleFilterChange(event) {
    setFilteredInput(event.target.value);
    setShoppingList(
      list.filter(item =>
        item.name.includes(normalizeName(event.target.value)),
      ),
    );
  }

  function isLessThan24hrs(datePurchased) {
    let purchaseDateCalc = dayjs(datePurchased);
    return today.diff(purchaseDateCalc, 'hour') <= 24;
  }
  //when an item has been created but not yet purchased.
  function isChecked(lastDatePurchased) {
    console.log(!!lastDatePurchased && isLessThan24hrs(lastDatePurchased));
    return !!lastDatePurchased && isLessThan24hrs(lastDatePurchased);
  }
  const toggleChecked = (e, name) => {
    setShoppingList(shoppingList);
    console.log('checkbox clicked');
  };

  //we are adding the item.id as well as the date purchased when clicking on the checkbox
  function handlePurchasedChange(event, item) {
    const datePurchased = item.lastDatePurchased ? null : Date.now();
    addDatePurchased(item, datePurchased);
    toggleChecked(event, item.name);
    console.log(event, item.name);
    return event;
  }

  //4. handleFilterChange: update the state when filter input changes

  //5. way to clear out the filter
  function handleFilterClearClick(event) {
    event.preventDefault();
    setFilteredInput('');
    setShoppingList(list);
  }

  return (
    <>
      {/* filter feature: includes a handleChange and an onClick() to clear text: Add a X or clear field button*/}
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
          x
        </button>
      </div>

      <ul className="shopping-list">
        {shoppingList.map((item, index) => (
          <li key={index}>
            <label>
              <input
                type="checkbox"
                //checked is a reflection of a field on the item. it shouldn’t be local state. you should be able to have something like checked={isChecked(item.lastDatePurchased)} .
                name={`${item.name}-checkbox`}
                checked={isChecked(item.lastDatePurchased) ? 'checked' : null}
                onChange={event => handlePurchasedChange(event, item)}
              />

              {item.name}
            </label>
          </li>
        ))}
      </ul>

      <NavTabs />
    </>
  );
};

export default List;
