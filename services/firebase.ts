// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyAjxDcOZXEbfDw5l4W0Cnkk2bIrguDAj6g',
  authDomain: "viteflix-v2.firebaseapp.com",
  projectId: 'viteflix-v2',
  storageBucket: 'viteflix-v2.appspot.com',
  messagingSenderId:'179194005355',
  appId: '1:179194005355:web:0c475da33123a239656e2e'
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const  auth = getAuth(app);
export const db = getFirestore(app) 
export const storage = getStorage(app) 
