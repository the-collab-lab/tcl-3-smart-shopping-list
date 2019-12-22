import React from 'react';
import ReactDOM from 'react-dom';
import { FirestoreProvider } from 'react-firestore';
import { fb as firebase } from './lib/firebase.js';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';

ReactDOM.render(
  <FirestoreProvider firebase={firebase}>
    <Router>
      <App />
    </Router>
  </FirestoreProvider>,
  document.getElementById('root'),
);
