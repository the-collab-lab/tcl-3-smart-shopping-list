import React, { useContext } from 'react';
import { FirestoreCollection } from 'react-firestore';
import Loading from '../components/Loading';
import NavTabs from '../components/NavTabs';
import ErrorMessage from '../components/ErrorMessage';
import HomePageButton from '../components/HomePageButton';
import { ListContext } from '../listContext';
import dayjs from 'dayjs';

const nowItem = new Date();
const today = dayjs(nowItem).format('HH:mm:ss');

// console.log('this is nowItem', nowItem);
// console.log('this is today', today);

const List = () => {
  const { setShoppingList, shoppingList } = useContext(ListContext);
  const getStoredToken = () => window.localStorage.getItem('token');

  const calculateIfPurchased = item => {
    // console.log(today);

    const dateOfPurchaseJS = item.lastPurchaseDate;

    console.log('this is date of purchaseJS', dateOfPurchaseJS);
    // console.log('this is item', dayjs(item.lastPurchaseDate).hour());

    // console.log(today.diff(dateOfPurchaseJS, 'hour'));

    if (today <= 24) {
      console.log('true');
    } else {
      console.log('false');
    }
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
                <div key={index} className={calculateIfPurchased(item)}>
                  <label>
                    <input type="checkbox"></input>
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
