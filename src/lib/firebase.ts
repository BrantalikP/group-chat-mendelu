import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyC3ypColfv9tQ05c4QAyHTlcxZyrFTjbw4",
  authDomain: "mendelu-group-2.firebaseapp.com",
  projectId: "mendelu-group-2",
  storageBucket: "mendelu-group-2.firebasestorage.app",
  messagingSenderId: "308583334673",
  appId: "1:308583334673:web:40d3b2730292583fbfc2b0",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
