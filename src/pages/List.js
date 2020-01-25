import React, { useState, useContext } from 'react';
import { FirestoreCollection } from 'react-firestore';
import Loading from '../components/Loading';
import NavTabs from '../components/NavTabs';
import ErrorMessage from '../components/ErrorMessage';
import HomePageButton from '../components/HomePageButton';
// import Checkmark from './Checkmark';
import { ListContext } from '../listContext';
import dayjs from 'dayjs';

const currentTime = new Date();
const today = dayjs(currentTime);

const isLessThan24hrs = purchased_date => {
  let purchaseDateCalc = dayjs(purchased_date);
  return today.diff(purchaseDateCalc), 'hour' <= 24;
};

// console.log('this is nowItem', nowItem);
// console.log('this is today', today);

const List = () => {
  const { setShoppingList, shoppingList, addTime } = useContext(ListContext);
  const getStoredToken = () => window.localStorage.getItem('token');

  /*
  Still need to figure out:
    1. When box is check it will add `today`
    2. When box is check for more than 24hrs it becomes unchecked



  */

  const [check, setChecked] = useState('');

  const handleSelect = event => {
    event.preventDefault();
    setChecked(isLessThan24hrs(event.target.value));
  };

  const handleSubmit = event => {
    event.preventDefault();
    addTime(check);
    console.log('is this check working', check);
  };

  return (
    <>
      <HomePageButton />

      <FirestoreCollection
        // Specify the path to the collection you're pulling data from
        path="items"
        // Sort the data
        sort="name"
        // Only fetch the items associated with the token saved in localStorage
        filter={['token', '==', getStoredToken()]}
        // isLoading = is a Boolean that represents the loading status for the firebase query. true until an initial payload from Firestore is received.
        // data = an Array containing all of the documents in the collection. Each item will contain an id along with the other data contained in the document.
        render={({ isLoading, data }) => {
          if (!isLoading && data.length === 0) {
            localStorage.setItem('token', '');
            return <ErrorMessage />;
          }

          return isLoading ? (
            <Loading />
          ) : (
            <div>
              {/* need to add checkbox input here */}
              {setShoppingList(data)}
              {shoppingList.map((item, index) => (
                <div key={index}>
                  <label onChange={handleSubmit}>
                    {/* <input type="checkbox"></input> */}
                    {isLessThan24hrs(item.lastPurchaseDate) ? (
                      <input
                        type="checkbox"
                        id={today}
                        checked={today === check}
                        value={today}
                        onChange={handleSelect}
                      />
                    ) : (
                      <input type="checkbox" />
                    )}
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
