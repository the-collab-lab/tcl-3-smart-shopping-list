import React from 'react';
import ReactDOM from 'react-dom';
import { FirestoreProvider } from 'react-firestore';
import { fb as firebase } from './lib/firebase.js';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';
import { ListContextProvider } from './listContext';

ReactDOM.render(
  <FirestoreProvider firebase={firebase}>
    <Router>
      <ListContextProvider>
        <App />
      </ListContextProvider>
    </Router>
  </FirestoreProvider>,
  document.getElementById('root'),
);
