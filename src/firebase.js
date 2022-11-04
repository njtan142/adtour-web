import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from 'firebase/firestore';
import { getStorage } from "firebase/storage";



const firebaseConfig = {
  apiKey: "AIzaSyDYixkUXsYLXJKl3N5iuIKxd0K2qKK5CZg",
  authDomain: "thesis-app-52392.firebaseapp.com",
  databaseURL: "https://thesis-app-52392-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "thesis-app-52392",
  storageBucket: "thesis-app-52392.appspot.com",
  messagingSenderId: "591034588388",
  appId: "1:591034588388:web:e22460bbeedaa6b26720f1",
  measurementId: "G-6J6638L05F"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const firestore = getFirestore(app);
export const storage = getStorage(app);