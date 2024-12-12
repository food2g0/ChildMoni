import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDve017ciirTdPPD6f1N5sex2a6g7ozRPk",
  authDomain: "childmoni-55332.firebaseapp.com",
  projectId: "childmoni-55332",
  appId: "1:990020172278:android:098993a9d00309dc392fd7",
};

// Initialize Firebase only if it hasn't been initialized before
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);  // Firestore initialization
const auth = getAuth(app);  // Authentication initialization

export { db, auth };