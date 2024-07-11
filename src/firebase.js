// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage} from "firebase/storage";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyA0e0LzwwhNtWmKuYXrEc_hNxq0D_5SPiQ",
    authDomain: "chatapp-ab972.firebaseapp.com",
    projectId: "chatapp-ab972",
    storageBucket: "chatapp-ab972.appspot.com",
    messagingSenderId: "31635183340",
    appId: "1:31635183340:web:db56c9958fa7fe2bb537c9"
  };

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(); // Pass the 'app' instance to getAuth
export const storage = getStorage();
export const db = getFirestore(app);