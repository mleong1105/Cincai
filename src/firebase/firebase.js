import * as firebase from "firebase";

const config = {
    apiKey: `${process.env.REACT_APP_FIREBASE_API_KEY}`,
    authDomain: "cincai-6420a.firebaseapp.com",
    databaseURL: "https://cincai-6420a-default-rtdb.firebaseio.com",
    projectId: "cincai-6420a",
    storageBucket: "cincai-6420a.appspot.com",
    messagingSenderId: "758815636583",
    appId: "1:758815636583:web:9198c515f3a632575768c2",
    measurementId: "G-1L4BQJ0PXW"
};

if (!firebase.apps.length) {
    firebase.initializeApp(config);
}

const db = firebase.database();
const auth = firebase.auth();

export { auth, db };
