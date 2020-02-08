import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import AddItem from './pages/AddItem';
import List from './pages/List';
import HomePage from './pages/HomePage';
import ListSort from './pages/ListSorted';

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route path="/add-item" component={AddItem} />
        <Route path="/list/" component={List} />
        <Route path="/list-sort" component={ListSort} />>
      </Switch>
    </BrowserRouter>
  );
}
