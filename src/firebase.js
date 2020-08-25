import firebase from "firebase";
const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyDZcmyP1pdDNZ_ZbA62EEmG0FWYqIMgvHk",
  authDomain: "instagram-clone-react-261f4.firebaseapp.com",
  databaseURL: "https://instagram-clone-react-261f4.firebaseio.com",
  projectId: "instagram-clone-react-261f4",
  storageBucket: "instagram-clone-react-261f4.appspot.com",
  messagingSenderId: "95510425443",
  appId: "1:95510425443:web:b84ceaac1f2f2f42bbad56",
  measurementId: "G-X68BY3WFJ0",
});

const db = firebaseApp.firestore();
const auth = firebase.auth();
const storage = firebase.storage();

export { db, auth, storage };
