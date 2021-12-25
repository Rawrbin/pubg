import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyAAk01ozzCthX4MXm1m7m9lKMmWegkWQic",
    authDomain: "pubg-470d0.firebaseapp.com",
    databaseURL: "https://pubg-470d0-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "pubg-470d0",
    storageBucket: "pubg-470d0.appspot.com",
    messagingSenderId: "908591269306",
    appId: "1:908591269306:web:95e58207b97c1726bbc983",
    measurementId: "G-74G3X3L6HS"
};

firebase.initializeApp(firebaseConfig);

export default firebase;