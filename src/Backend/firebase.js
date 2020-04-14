const firebase = require('firebase/app');
require('firebase/firestore');
require('firebase/storage');

var firebaseConfig = {
    apiKey: "AIzaSyD045l6WAyhX313ggc5Ch0ZOtqgMq8B5Xg",
    authDomain: "dungeons-and-divs.firebaseapp.com",
    databaseURL: "https://dungeons-and-divs.firebaseio.com",
    projectId: "dungeons-and-divs",
    storageBucket: "dungeons-and-divs.appspot.com",
    messagingSenderId: "684439274757",
    appId: "1:684439274757:web:17942b897f1c4ce839a36c",
    measurementId: "G-5L5RTHWJMP"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
export default firebase;