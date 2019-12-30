import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter } from 'react-router-dom';

import firebase from '@firebase/app';
import '@firebase/firestore';
import { FirestoreProvider } from 'react-firestore';

const config = {
  apiKey: 'AIzaSyAL1ymvsgrfyGGcLBWQYYXqdixr0tPzuS8',
  projectId: 'tcl-3-smart-shopping-list',
};

firebase.initializeApp(config);

function Root() {
  return (
    <FirestoreProvider firebase={firebase}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </FirestoreProvider>
  );
}

ReactDOM.render(<Root />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
