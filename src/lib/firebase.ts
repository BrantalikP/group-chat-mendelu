import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBu7KWN3pdEJl7OS2GB5V0cnCyp4Rm2GSQ",
  authDomain: "svetik-10007.firebaseapp.com",
  projectId: "svetik-10007",
  storageBucket: "svetik-10007.firebasestorage.app",
  messagingSenderId: "219006782323",
  appId: "1:219006782323:web:702ad271f324c8a3dd5306",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
