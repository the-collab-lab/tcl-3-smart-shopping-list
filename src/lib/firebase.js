// NOTE: import only the Firebase modules that you need in your app... except
// for the second line, which makes both the linter and react-firebase happy
import firebase from 'firebase/app';
import 'firebase/firestore';

// Config values for TCL-3
const config = {
  apiKey: 'AIzaSyC4mabxU43sKhLopSYNV44FXChZXd0Is3g',
  authDomain: 'tcl-3-shopping-list.firebaseapp.com',
  projectId: 'tcl-3-shopping-list',
  storageBucket: 'tcl-3-shopping-list.appspot.com',
  messagingSenderId: '676317813970',
  appId: '1:676317813970:web:da5cb6d28221d4d519a10b',
  measurementId: 'G-2RHNVJPMYH',
};

// Initalize Firebase.
const fb = firebase.initializeApp(config);
const db = firebase.firestore();

export { fb, db };
