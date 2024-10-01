// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAy4_JyqyxSGW7C-EkETpGZA8U3xTWm5vY",
  authDomain: "loginapp-aea2e.firebaseapp.com",
  projectId: "loginapp-aea2e",
  storageBucket: "loginapp-aea2e.appspot.com",
  messagingSenderId: "81758538831",
  appId: "1:81758538831:web:8a80bafb295ed587e6ee3a"
};

// Initialize Firebase
export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIREBASE_AUTH = getAuth(FIREBASE_APP);
export const FIREBASE_DB = getFirestore(FIREBASE_APP);