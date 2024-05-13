import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getMessaging } from "firebase/messaging";

const firebaseConfig = {
  apiKey: "AIzaSyBJgXnOTnJb6043PmD5d3cmQt7o84Y6sLA",
  authDomain: "projectone-fcm.firebaseapp.com",
  databaseURL:
    "https://projectone-fcm-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "projectone-fcm",
  storageBucket: "projectone-fcm.appspot.com",
  messagingSenderId: "111158573365",
  appId: "1:111158573365:web:55435890e0f1476bd1f47c",
};

// Initialize Firebase
const firebase = initializeApp(firebaseConfig);

const firestore = getFirestore(firebase);

const messaging = await getMessaging(firebase);

export { firebase, firestore, messaging };
