import firebase from 'firebase';
require('@firebase/firestore');

const firebaseConfig = {
    apiKey: "AIzaSyCELFXbiFq0qKDzS9XyhbN43S2ELm2lexM",
    authDomain: "story-hub-ba224.firebaseapp.com",
    projectId: "story-hub-ba224",
    storageBucket: "story-hub-ba224.appspot.com",
    messagingSenderId: "123858129838",
    appId: "1:123858129838:web:97148d8c039da0b48aee3f"
  };

firebase.initializeApp(firebaseConfig);

export default firebase.firestore();
