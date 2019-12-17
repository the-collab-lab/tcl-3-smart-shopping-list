import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Hello from './hello';
import App from './App';

export default function AppRouter() {
  return (
    <>
      <Switch>
        <Route exact path="/" />
        <Route path="/hello" component={Hello} />
      </Switch>
    </>
  );
}
