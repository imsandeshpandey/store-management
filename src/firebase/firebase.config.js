import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// Your web app's Firebase configuration
const { REACT_APP_FIREBASE_API, REACT_APP_FIREBASE_MESSAGING_SENDER_ID, REACT_APP_FIREBASE_APP_ID } =
  process.env;
const firebaseConfig = {
  apiKey: REACT_APP_FIREBASE_API,
  authDomain: 'store-management-a5381.firebaseapp.com',
  projectId: 'store-management-a5381',
  storageBucket: 'store-management-a5381.appspot.com',
  messagingSenderId: REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: REACT_APP_FIREBASE_APP_ID,
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
export { app, db, auth };
