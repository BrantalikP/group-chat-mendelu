import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAEdPjEvfjlM2vrpXptB8SnqjtODGIbqz0",
  authDomain: "mendelu-group1.firebaseapp.com",
  projectId: "mendelu-group1",
  storageBucket: "mendelu-group1.firebasestorage.app",
  messagingSenderId: "112234797394",
  appId: "1:112234797394:web:86bf6d50efd81f006f828b",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
