// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDjCsfs6peBjaM-dcrqeCXiwMvHqj6Xi9c",
  authDomain: "hackviolet-2023.firebaseapp.com",
  projectId: "hackviolet-2023",
  storageBucket: "hackviolet-2023.appspot.com",
  messagingSenderId: "16834181310",
  appId: "1:16834181310:web:8ed32f6101b7b47b9c46ef",
  measurementId: "G-5HY2F0B1F1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export default app;