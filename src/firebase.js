import * as firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyDWfckje5zES6WurjQ5xYMUgkjB0KBe2pY",
    authDomain: "to-do-list-314dd.firebaseapp.com",
    databaseURL: "https://to-do-list-314dd.firebaseio.com",
    projectId: "to-do-list-314dd",
    storageBucket: "to-do-list-314dd.appspot.com",
    messagingSenderId: "1027115589881",
    appId: "1:1027115589881:web:4d398ed92b520b69594228",
    measurementId: "G-NY807SHMYG"
}

firebase.initializeApp(firebaseConfig);

export const firestore = firebase.firestore();

export const provider = new firebase.auth.GoogleAuthProvider();

export default firebase;