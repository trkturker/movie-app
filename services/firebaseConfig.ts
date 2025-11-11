// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAIHlDt9q5WNFUtBvj26iWBBm9Ci5BTe6M",
  authDomain: "auth-b9f83.firebaseapp.com",
  projectId: "auth-b9f83",
  storageBucket: "auth-b9f83.firebasestorage.app",
  messagingSenderId: "496921008671",
  appId: "1:496921008671:web:92d37f622fb4c8612c932a",
  measurementId: "G-G8D8DLEMRP"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);