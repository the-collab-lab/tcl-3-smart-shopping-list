import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Hello from './hello';
import HelloAgain from './HelloAgain';
// import App from './App';

export default function AppRouter() {
  return (
    <>
      <Switch>
        <Route exact path="/" component={Hello} />
        <Route path="/hello-again" component={HelloAgain} />
      </Switch>
    </>
  );
}
