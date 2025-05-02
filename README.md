## **Prior to the workshop, the config file will be shared with you—no need to create a new Firebase project.**

## **1️⃣ Create a Firebase Project**

1. Go to [https://console.firebase.google.com](https://console.firebase.google.com/)
2. Create a new project — name it for example: GroupChatApp
3. In the left menu: **Firestore Database** ➜ **Create Database**
   - Start in test mode ✅ (we’ll set up security later)
   - Select region (e.g. europe-west1)

---

### **2️⃣ Add a Web App (for Expo)**

1. Click the gear icon ➜ **Project Settings**
2. Scroll down ➜ **Add App** ➜ **Web**
3. App nickname, for example: ExpoApp
4. Get the config:

```tsx
const firebaseConfig = {
  apiKey: "...",
  authDomain: "...",
  projectId: "...",
  storageBucket: "...",
  messagingSenderId: "...",
  appId: "...",
};
```

   **3️⃣ Enable Firebase Storage (required to implement Image support)**

   1.	In the left menu, go to Storage
   2.	Click Get started
   3.	Choose a location (same as Firestore, e.g. europe-west1) ✅
   4.	Start in test mode ✅ (you can restrict access later in Rules)
   5.	Done — Firebase Storage is now ready to use! 🚀