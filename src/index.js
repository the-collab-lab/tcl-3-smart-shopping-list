import React from 'react';
import { FirestoreProvider } from 'react-firestore';
import { fb as firebase } from './lib/firebase.js';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';
import { ListContextProviderWithFirestore } from './listContext';
import 'semantic-ui-less/semantic.less';
import { createRoot } from 'react-dom/client';

const container = document.getElementById('root');
const root = createRoot(container);
root.render(
  <FirestoreProvider firebase={firebase}>
    <Router>
      <ListContextProviderWithFirestore>
        <App />
      </ListContextProviderWithFirestore>
    </Router>
  </FirestoreProvider>,
);
