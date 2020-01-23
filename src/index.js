import React from 'react';
import ReactDOM from 'react-dom';
import { FirestoreProvider } from 'react-firestore';
import { fb as firebase } from './lib/firebase.js';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';
import { TokenProvider } from './tokenContext';
import { ListContextProviderWithFirestore } from './listContext';

ReactDOM.render(
  <FirestoreProvider firebase={firebase}>
    <Router>
      <TokenProvider>
        <ListContextProviderWithFirestore>
          <App />
        </ListContextProviderWithFirestore>
      </TokenProvider>
    </Router>
  </FirestoreProvider>,
  document.getElementById('root'),
);
