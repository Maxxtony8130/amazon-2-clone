import firebase from "firebase";

const firebaseConfig = {
    apiKey: "AIzaSyAYVNmLEYodcaAosv2MhpPhR_bBMcve2vc",
    authDomain: "fir-88105.firebaseapp.com",
    projectId: "fir-88105",
    storageBucket: "fir-88105.appspot.com",
    messagingSenderId: "1067656662754",
    appId: "1:1067656662754:web:e54766e66c03c200cf98bb",
    measurementId: "G-X5S9ZV8QFS"
  };

const app = !firebase.apps.length
    ? firebase.initializeApp(firebaseConfig)
    : firebase.app();

export const db = app.firestore();

// no analitycs

// go authentication
// enable google
// valid email
// web sdk configuration
// change .env
