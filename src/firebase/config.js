// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBG-b3hV-tunw3r1L988lOKkYzxbR0DuIs",
  authDomain: "proyecto-react-v2-8715e.firebaseapp.com",
  projectId: "proyecto-react-v2-8715e",
  storageBucket: "proyecto-react-v2-8715e.firebasestorage.app",
  messagingSenderId: "1069289413364",
  appId: "1:1069289413364:web:bcde048ba641d76087dca1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export {db};