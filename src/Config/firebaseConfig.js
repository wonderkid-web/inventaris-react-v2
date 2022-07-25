import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA-syOyENqSGAQ61aURZ7C6iLuuMelSKdQ",
  authDomain: "inventaris-3098b.firebaseapp.com",
  projectId: "inventaris-3098b",
  storageBucket: "inventaris-3098b.appspot.com",
  messagingSenderId: "553118789516",
  appId: "1:553118789516:web:7da40cd28876a00156f0a9",
  measurementId: "G-BQBNPV9R1L"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)