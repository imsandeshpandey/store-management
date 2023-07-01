import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyBt_rXHnS5cWrpbUgcXEUGCSIyN0fxISQI',
  authDomain: 'store-management-a5381.firebaseapp.com',
  projectId: 'store-management-a5381',
  storageBucket: 'store-management-a5381.appspot.com',
  messagingSenderId: '967139115355',
  appId: '1:967139115355:web:8b20d94eb782375f871a7e',
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);

export { app, db, auth, storage };
//cmt
