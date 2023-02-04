// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"
import { getAnalytics } from "firebase/analytics";
import { getDatabase, ref, push } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDjCsfs6peBjaM-dcrqeCXiwMvHqj6Xi9c",
  authDomain: "hackviolet-2023.firebaseapp.com",
  databaseURL: "https://hackviolet-2023-default-rtdb.firebaseio.com",
  projectId: "hackviolet-2023",
  storageBucket: "hackviolet-2023.appspot.com",
  messagingSenderId: "16834181310",
  appId: "1:16834181310:web:8ed32f6101b7b47b9c46ef",
  measurementId: "G-5HY2F0B1F1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// initialise database
const db = getDatabase();

const userRef = ref(db, "users");

export const addNewUser = (name, email) => {
  console.log("adding new user")
  push(userRef, {
    id: 2,
    name: name,
    email: email,
    carbon_score: 0
  }).then(()=>console.log("added user!!!"))
}

export const auth = getAuth(app);
export default app;