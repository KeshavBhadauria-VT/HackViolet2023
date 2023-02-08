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
  apiKey: "",
  authDomain: "",
  databaseURL: "",
  projectId: "",
  storageBucket: "",
  messagingSenderId: "",
  appId: "",
  measurementId: ""
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
  setDoc(lampRef, {Model: model, Name: name, State: "off", lamp_ref_id: id, carbon: Math.random() * 10}, {merge: true});

  const userRef = doc(db, "users", user);

  await updateDoc(userRef, {
    Plugs: arrayUnion(lampRef)
  });

  console.log("lamp added");


  //create a new lamp object.


}


export const auth = getAuth(app);
export default app;
