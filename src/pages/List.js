import React, { useContext, useState } from 'react';
import normalizeName from '../lib/normalizeName';
import useListToken, { getCurrentToken } from '../useListToken';
import { FirestoreCollection } from 'react-firestore';
import { ListContext } from '../listContext';
import { Link } from 'react-router-dom';
import {
  Container,
  Loader,
  Dimmer,
  Input,
  Checkbox,
  Segment,
  Icon,
  Menu,
  List as ListUI,
} from 'semantic-ui-react';

import dayjs from 'dayjs';
import './List.css';
import NavTabs from '../components/NavTabs';

const List = props => {
  const { shoppingList, setShoppingList, addDatePurchased } = useContext(
    ListContext,
  );

  const [filteredInput, setFilteredInput] = useState('');

  const { token } = useListToken;

  const today = dayjs();

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
        filter={['token', '==', token || getCurrentToken() || 'no token set']}
        // isLoading = is a Boolean that represents the loading status for the firebase query. true until an initial payload from Firestore is received.
        // data = an Array containing all of the documents in the collection. Each item will contain an id along with the other data contained in the document.
        render={({ isLoading, data }) => {
          if (!isLoading) {
            setShoppingList(data);
          }
          return isLoading ? (
            <Dimmer active>
              <Loader />
            </Dimmer>
          ) : (
            <>
              <Segment textAlign="center">
                <Menu secondary>
                  <Menu.Item as={Link} name="Add an item" to="/add-item">
                    <Icon name="add" /> Add Item
                  </Menu.Item>
                </Menu>
                <Input
                  action={{
                    icon: 'erase',
                    content: 'clear',
                    onClick: () => setFilteredInput(''),
                  }}
                  className="list-filter"
                  placeholder="Filter list..."
                  type="search"
                  onChange={handleFilterChange}
                  value={filteredInput}
                  size="small"
                ></Input>
              </Segment>
              <Container>
                <ListUI relaxed className="list-container">
                  {shoppingList
                    .filter(item => filterListInput(item.name))
                    .map((item, index) => (
                      <ListUI.Item key={index} className="shopping-list">
                        <ListUI.Content>
                          <Checkbox
                            label={item.name}
                            checked={isChecked(item.lastDatePurchased)}
                            onChange={() => handlePurchasedChange(item)}
                            readOnly={isChecked(item.lastDatePurchased)}
                          />
                        </ListUI.Content>
                      </ListUI.Item>
                    ))}
                </ListUI>
              </Container>
              <NavTabs />
            </>
          );
        }}
      />
    </>
  );
};
export default List;
