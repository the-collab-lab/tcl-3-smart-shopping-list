import React from 'react';
import ReactDOM from 'react-dom';
import { FirestoreProvider } from 'react-firestore';
import { fb as firebase } from './lib/firebase.js';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';
import { ListContextProviderWithFirestore } from './listContext';
import 'semantic-ui-less/semantic.less';

ReactDOM.render(
  <FirestoreProvider firebase={firebase}>
    <Router>
      <ListContextProviderWithFirestore>
        <App />
      </ListContextProviderWithFirestore>
    </Router>
  </FirestoreProvider>,
  document.getElementById('root'),
);
