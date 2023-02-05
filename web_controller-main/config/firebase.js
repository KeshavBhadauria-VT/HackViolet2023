// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"
import { getAnalytics } from "firebase/analytics";
import { getDatabase, ref, push } from "firebase/database";
import { getFirestore, doc, setDoc, collection, addDoc, updateDoc, arrayUnion, arrayRemove } from "firebase/firestore";

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


export const db = getFirestore(app);
// initialise database





export const addNewUser = async(name, email, imageLink) => {
  console.log("adding new user")

  if (imageLink === "") {
    imageLink = "https://whatifgaming.com/wp-content/uploads/2021/10/download-2.jpg";
  }

  //setDoc (doc(database, collection, ID), {information})
  await setDoc(doc(db, "users", email),{
    Name: name,
    Plugs: [],
    Friends: [],
    email: email,
    Image: imageLink
  })
}

export const addNewLamp = async(id, model, name, user) => {

  console.log("adding new lamp to....");

  const lampRef = doc(db, 'switches', id);
  setDoc(lampRef, {Model: model, Name: name, State: "off"}, {merge: true});

  const userRef = doc(db, "users", user);

  await updateDoc(userRef, {
    Plugs: arrayUnion(lampRef)
  });

  console.log("lamp added");


  //create a new lamp object.


}


export const auth = getAuth(app);
export default app;