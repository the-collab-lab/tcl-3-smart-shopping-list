// NOTE: import only the Firebase modules that you need in your app... except
// for the second line, which makes both the linter and react-firebase happy
import firebase from 'firebase/app';
import 'firebase/firestore';

// Config values for TCL-3
const config = {
    apiKey: "AIzaSyAL1ymvsgrfyGGcLBWQYYXqdixr0tPzuS8",
    authDomain: "tcl-3-smart-shopping-list.firebaseapp.com",
    databaseURL: "https://tcl-3-smart-shopping-list.firebaseio.com",
    projectId: "tcl-3-smart-shopping-list",
    storageBucket: "tcl-3-smart-shopping-list.appspot.com",
    messagingSenderId: "95252731516",
    appId: "1:95252731516:web:7e2b9f93b34ab1f8c25bf9"
};

// Initalize Firebase.
const fb = firebase.initializeApp(config);

export { fb };
