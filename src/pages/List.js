import dayjs from 'dayjs';
import React, { useContext, useState } from 'react';
import normalizeName from '../lib/normalizeName';
import useListToken, { getCurrentToken } from '../useListToken';
import { FirestoreCollection } from 'react-firestore';
import { ListContext } from '../listContext';
import { Link } from 'react-router-dom';
import AppHeader from '../components/AppHeader';
import {
  Container,
  Loader,
  Dimmer,
  Input,
  Accordion,
  Checkbox,
  Segment,
  Icon,
  Menu,
  Responsive,
  Button,
  List as ListUI,
  Divider,
} from 'semantic-ui-react';

import NavTabs from '../components/NavTabs';

const List = props => {
  const {
    shoppingList,
    setShoppingList,
    deleteItem,
    purchaseItem,
  } = useContext(ListContext);

  const [filteredInput, setFilteredInput] = useState('');

  const { token } = useListToken;

  const today = dayjs();

  const [accordionState, setAccordionState] = useState(-1);

  const handleClick = index => {
    const activeIndex = accordionState;
    const newIndex = activeIndex === index ? -1 : index;
    setAccordionState(newIndex);
  };
  function setBackgroundColor(nextExpectedPurchase) {
    const colorCode = {
      SOON: 'green',
      KIND_OF_SOON: 'orange',
      NOT_SOON: 'red',
    };

    if (nextExpectedPurchase <= 7) {
      return colorCode.SOON;
    } else if (nextExpectedPurchase <= 14) {
      return colorCode.KIND_OF_SOON;
    } else if (nextExpectedPurchase <= 30) {
      return colorCode.NOT_SOON;
    } else {
      return 'white';
    }
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
      <AppHeader>Smart Shopping List</AppHeader>
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
              <Container>
                <Responsive as={Menu} stackable maxWidth={584}>
                  <Menu.Item>
                    <Button
                      fluid
                      size="large"
                      color="blue"
                      floated="right"
                      as={Link}
                      name="Add an item"
                      to="/add-item"
                    >
                      {' '}
                      <Icon name="add" /> Add Item
                    </Button>
                  </Menu.Item>
                  <Menu.Item>
                    <Input
                      action={{
                        icon: 'erase',
                        onClick: () => setFilteredInput(''),
                      }}
                      className="list-filter"
                      placeholder="Filter list..."
                      type="search"
                      onChange={handleFilterChange}
                      value={filteredInput}
                      size="large"
                      icon="filter"
                      iconPosition="left"
                    ></Input>
                  </Menu.Item>
                </Responsive>
                <Responsive as={Segment} minWidth={585} textAlign="left">
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
                    size="large"
                    icon="filter"
                    iconPosition="left"
                  ></Input>
                  <Button
                    size="large"
                    color="blue"
                    floated="right"
                    as={Link}
                    name="Add an item"
                    to="/add-item"
                  >
                    <Icon name="add" /> Add Item
                  </Button>
                </Responsive>

                <ListUI
                  relaxed
                  className="list-container"
                  style={{ paddingBottom: 50 }}
                >
                  {shoppingList
                    .filter(item => filterListInput(item.name))
                    .map((item, index, array) => (
                      <ListUI.Item key={index} className="shopping-list">
                        <ListUI.Content
                          style={{
                            border: `thin solid ${setBackgroundColor(
                              item.nextExpectedPurchase,
                            )}`,
                          }}
                        >
                          <Checkbox
                            label={item.name}
                            checked={isChecked(item.lastDatePurchased)}
                            onChange={() => handlePurchasedChange(item)}
                            readOnly={isChecked(item.lastDatePurchased)}
                          />
                          <Accordion>
                            <Accordion.Title
                              active={accordionState === index}
                              index={index}
                              onClick={() => handleClick(index)}
                            >
                              <Icon name="dropdown" />
                              Details
                            </Accordion.Title>
                            <Accordion.Content
                              active={accordionState === index}
                            >
                              <ListUI>
                                <ListUI.Item>
                                  <ListUI.Content>
                                    Number of Purchases:
                                  </ListUI.Content>
                                </ListUI.Item>
                                <ListUI.Item>
                                  <ListUI.Content>
                                    Last Purchase:
                                  </ListUI.Content>
                                </ListUI.Item>
                                <ListUI.Item>
                                  <ListUI.Content>
                                    Next Purchase:
                                  </ListUI.Content>
                                </ListUI.Item>
                                <Divider />
                                <ListUI.Item>
                                  <ListUI.Content>
                                    <Button
                                      color="red"
                                      size="small"
                                      floated="right"
                                      onClick={() => {
                                        deleteItem(item);
                                        array.splice(index, 1);
                                        setAccordionState(-1);
                                      }}
                                    >
                                      <Icon name="delete" />
                                      delete
                                    </Button>
                                  </ListUI.Content>
                                </ListUI.Item>
                              </ListUI>
                            </Accordion.Content>
                          </Accordion>
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
