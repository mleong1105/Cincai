import * as firebase from "firebase";

const config = {
    apiKey: "AIzaSyD0uktBUNuNw2Fw5iPBZlahMNdllge5u84",
    authDomain: "expense-manager-1a71f.firebaseapp.com",
    databaseURL: "https://expense-manager-1a71f-default-rtdb.firebaseio.com",
    projectId: "expense-manager-1a71f",
    storageBucket: "expense-manager-1a71f.appspot.com",
    messagingSenderId: "106287348027",
    appId: "1:106287348027:web:318a7e4167ada8181adf1e",
    measurementId: "G-ZLTRMHBDPL"
};

if (!firebase.apps.length) {
    firebase.initializeApp(config);
}

const db = firebase.database();
const auth = firebase.auth();

export { auth, db };
