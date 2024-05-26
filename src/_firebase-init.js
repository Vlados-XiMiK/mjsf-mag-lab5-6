import * as firebase from "firebase/app";
import "firebase/firestore";
import 'firebase/auth';
// Set the configuration for your app
// TODO: Replace with your app's config object
var firebaseConfig = {
  apiKey: "AIzaSyCsPzqkpm5nKkNAr-_DAQWk2vuXZyP9ygk",
  authDomain: "todolist-a09cd.firebaseapp.com",
  projectId: "todolist-a09cd",
  storageBucket: "todolist-a09cd.appspot.com",
  messagingSenderId: "598524576614",
  appId: "1:598524576614:web:ecd110ed3d2cde2291fea7",
  measurementId: "G-GR4PWDCBDJ"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase;
