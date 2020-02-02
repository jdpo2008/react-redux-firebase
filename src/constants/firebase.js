import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyDOT2zjW6jmjL_SyJo1GMeXiiQvr4X4y1Y",
    authDomain: "react-app-142ae.firebaseapp.com",
    databaseURL: "https://react-app-142ae.firebaseio.com",
    projectId: "react-app-142ae",
    storageBucket: "react-app-142ae.appspot.com",
    messagingSenderId: "439052396866",
    appId: "1:439052396866:web:ff6c2d8da46429c03300db",
    measurementId: "G-361HB3EH3S"
};

export const fb = firebase.initializeApp(firebaseConfig);
export const db  = firebase.firestore();
export const auth = firebase.auth();

//export const msg = firebase.messaging();

