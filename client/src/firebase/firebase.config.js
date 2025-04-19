// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA5Iw3LruDdl0RUc9psTHirxeY4dbMPU1c",
  authDomain: "bookstore-31aa7.firebaseapp.com",
  projectId: "bookstore-31aa7",
  storageBucket: "bookstore-31aa7.firebasestorage.app",
  messagingSenderId: "567802275519",
  appId: "1:567802275519:web:d1bbfad3d9058633af080a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth=getAuth(app)
