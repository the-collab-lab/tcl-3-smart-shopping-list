// NOTE: import only the Firebase modules that you need in your app... except
// for the second line, which makes both the linter and react-firebase happy
import firebase from 'firebase/app';
import 'firebase/firestore';

// Config values for TCL-3
const config = {
  apiKey: 'AIzaSyBEobCBH0WCIi1pfEGbGhToeLFoVzvssys',
  authDomain: 'tcl-3-smart-shopping-lis-bded2.firebaseapp.com',
  projectId: 'tcl-3-smart-shopping-lis-bded2',
  storageBucket: 'tcl-3-smart-shopping-lis-bded2.appspot.com',
  messagingSenderId: '429959602992',
  appId: '1:429959602992:web:f3b630a09acd9b80819ef5',
  measurementId: 'G-7DJDCHPFPR',
};

// Initalize Firebase.
const fb = firebase.initializeApp(config);
const db = firebase.firestore();

export { fb, db };
