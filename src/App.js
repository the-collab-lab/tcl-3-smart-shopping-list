import React from 'react';
import { Switch, Route } from 'react-router-dom';

import './App.css';
import Home from 'pages/Home';

function App() {
  return (
    <main>
      <Switch>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </main>
  );
}

export default App;
