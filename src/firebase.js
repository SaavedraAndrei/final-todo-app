import firebase from "firebase";
const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyBRYUuKGr7-tjFjwAQJNFAYU-hudO3XZAg",
  authDomain: "final-todo-app.firebaseapp.com",
  projectId: "final-todo-app",
  storageBucket: "final-todo-app.appspot.com",
  messagingSenderId: "622333121004",
  appId: "1:622333121004:web:44cf6247ec149d3b6570c9",
  measurementId: "G-M4JN69KS8S",
});
const db = firebaseApp.firestore();
export default db;
