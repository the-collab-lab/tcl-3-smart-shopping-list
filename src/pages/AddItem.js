import React, { useState, useContext } from 'react';
import './AddItem.css';
import ItemError from './ItemError';
import { ListContext } from '../listContext';
import useListToken from '../useListToken';
import AppHeader from '../components/AppHeader';
import NavTabs from '../components/NavTabs';
import {
  Input,
  Segment,
  Container,
  Button,
  Radio,
  List,
  Divider,
} from 'semantic-ui-react';

const expectedPurchase = { soon: 7, kindOfSoon: 14, notSoon: 30 };

const AddItem = () => {
  const { token } = useListToken();
  const { isDuplicate, addItem, name, setName, fetchList } = useContext(
    ListContext,
  );
  const [list] = useState(() => fetchList(token));
  const [error, setError] = useState(false);
  const [nextExpectedPurchase, setNextExpectedPurchase] = useState(0);

  const handleChange = event => {
    setName(event.target.value);
    setError(isDuplicate(event.target.value));
  };

  const handleSelect = event => {
    setNextExpectedPurchase(parseInt(event.target.value, 10));
  };

  const handleSubmit = event => {
    event.preventDefault();
    setError(isDuplicate(name));
    addItem(name, nextExpectedPurchase, token);
  };

  return (
    <>
      <AppHeader showBackArrow={true}>Add Item to List</AppHeader>

      <Container textAlign="center">
        <Segment>
          <div>
            <form onSubmit={handleSubmit}>
              <Input
                disabled={!list ? 'disabled' : null}
                value={name}
                size="large"
                placeholder="Name of Item"
                type="text"
                onChange={handleChange}
              />
              {error && name && <ItemError name={name} />}
              <p>{`How soon do you expect to buy this item again?`}</p>
              <List horizontal relaxed>
                <List.Item>
                  <List.Content>
                    <label>
                      <Radio
                        id={expectedPurchase.soon}
                        value={expectedPurchase.soon}
                        checked={expectedPurchase.soon === nextExpectedPurchase}
                        onChange={handleSelect}
                      />
                      Soon
                    </label>
                  </List.Content>
                </List.Item>
                <List.Item>
                  <List.Content>
                    <label>
                      <Radio
                        id={expectedPurchase.kindOfSoon}
                        value={expectedPurchase.kindOfSoon}
                        checked={
                          expectedPurchase.kindOfSoon === nextExpectedPurchase
                        }
                        onChange={handleSelect}
                      />
                      Kind of Soon
                    </label>
                  </List.Content>
                </List.Item>
                <List.Item>
                  <List.Content>
                    <label>
                      <Radio
                        id={expectedPurchase.notSoon}
                        value={expectedPurchase.notSoon}
                        checked={
                          expectedPurchase.notSoon === nextExpectedPurchase
                        }
                        onChange={handleSelect}
                      />
                      Not Soon
                    </label>
                  </List.Content>
                </List.Item>
              </List>
              <Divider hidden />

              <Button
                color="green"
                size="large"
                type="submit"
                value="Add Item"
              >{`Add ${name} to List`}</Button>
            </form>
          </div>
        </Segment>
      </Container>

      <NavTabs />
    </>
  );
};

export default AddItem;
