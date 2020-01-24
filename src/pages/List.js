import React, { useState, useContext } from 'react';
import { FirestoreCollection } from 'react-firestore';
import Loading from '../components/Loading';
import NavTabs from '../components/NavTabs';
import ErrorMessage from '../components/ErrorMessage';
import HomePageButton from '../components/HomePageButton';
import Checkmark from './Checkmark';
import { ListContext } from '../listContext';
import dayjs from 'dayjs';

const currentTime = new Date();
const today = dayjs(currentTime);

// console.log('this is nowItem', nowItem);
console.log('this is today', today);

const List = () => {
  const { setShoppingList, shoppingList, addItem } = useContext(ListContext);
  const getStoredToken = () => window.localStorage.getItem('token');

  // const [check, setChecked] = useState();

  // const calculateIfPurchased = item => {
  //   console.log('this is item', item);

  //   const dateOfPurchaseJS = parseInt(item.lastPurchaseDate);

  //   console.log('this is date of purchaseJS', dateOfPurchaseJS);

  //   if (dateOfPurchaseJS <= 24) {
  //     console.log('true');
  //   } else {
  //     console.log('false');
  //   }
  // };

  // const updateDB = data => {

  // }

  const isLessThan24hrs = item => {
    //This variable will grab the items date it was purchased

    const purchaseDateCalc = dayjs()(item.last_purchase_date);

    if ((today.diff(purchaseDateCalc), 'hour' <= 24)) {
      console.log('true');
      //checked
    } else {
      console.log('false');
      //setChecked
    }
  };

  // console.log('comparing times is true or false?', comparePurchaseTime(dayjs().format('{2020} 01-22 15:32:45')))
  // console.log('comparing times is true or false?', comparePurchaseTime(dayjs().isBefore(dayjs())))

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
                  <label>
                    {/* <input type="checkbox"></input> */}
                    {isLessThan24hrs(item.last_purchase_date) ? (
                      <Checkmark />
                    ) : null}

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
