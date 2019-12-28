import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import AddItem from './pages/AddItem';
import List from './pages/List';
import HomePage from './pages/HomePage';

export default function AppRouter() {
  return (
    <>
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={List} />
          <Route path="/add-item" component={AddItem} />
          <Route path="/home" component={HomePage} />
        </Switch>
      </BrowserRouter>
    </>
  );
}
