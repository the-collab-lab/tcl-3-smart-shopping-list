import React, { useState, useEffect } from 'react';
import getToken from './lib/token';

const ListContext = React.createContext();

const ListContextProvider = props => {
  const initialToken = () => window.localStorage.getItem('token') || getToken();

  const [token] = useState(initialToken);
  const [shoppingList, setShoppingList] = useState([]);
  useEffect(() => {
    window.localStorage.setItem('token', token);
  }, [token]);

  return (
    <ListContext.Provider value={{ token, shoppingList, setShoppingList }}>
      {props.children}
    </ListContext.Provider>
  );
};

export { ListContext, ListContextProvider };
