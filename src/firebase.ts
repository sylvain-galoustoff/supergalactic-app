// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBWvPOYoz8XRWBRQpe9hJNfvF8phM16NjU",
  authDomain: "sgsuite-ddec4.firebaseapp.com",
  projectId: "sgsuite-ddec4",
  storageBucket: "sgsuite-ddec4.appspot.com",
  messagingSenderId: "752505235879",
  appId: "1:752505235879:web:f977a67fca64c1529f2e82",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export default app;
