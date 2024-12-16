// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCbCjH-tqi1Whe2IDCoTF9COqUxJX3KMhQ",
  authDomain: "movie-box-636d6.firebaseapp.com",
  projectId: "movie-box-636d6",
  storageBucket: "movie-box-636d6.firebasestorage.app",
  messagingSenderId: "218388009224",
  appId: "1:218388009224:web:093879e8034cb6fbfedcbd",
  measurementId: "G-N07QJ45PDT",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
/* eslint-disable-next-line no-unused-vars */
const analytics = getAnalytics(app);

export const auth = getAuth();
