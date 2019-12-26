import React from 'react';
import { Route, Switch } from 'react-router';
import AddItem from './pages/AddItem';
import List from './pages/List';
import NewList from './pages/NewList';

export default function AppRouter() {
  return (
    <>
      <Switch>
        <Route exact path="/" component={List} />
        <Route path="/add-item" component={AddItem} />
        <Route path="/new-list" component={NewList} />
      </Switch>
    </>
  );
}
