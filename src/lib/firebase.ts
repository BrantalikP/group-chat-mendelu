import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAlGw4dZC0arJRbYgfdK1in9CW7tx8DxhM",
  authDomain: "groupchattest-1d7b5.firebaseapp.com",
  projectId: "groupchattest-1d7b5",
  storageBucket: "groupchattest-1d7b5.firebasestorage.app",
  messagingSenderId: "235834548791",
  appId: "1:235834548791:web:d34b945a25cbd5424155b2",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
