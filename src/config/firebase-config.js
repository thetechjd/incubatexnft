// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from '@firebase/firestore';
// import { getMessaging } from "firebase/messaging/sw";

// Stag Creds
const firebaseConfig = {
  apiKey: "AIzaSyCRgG3WQLtHk3v76GbSiO_Yodk03YeVUNA",
  authDomain: "incubatex-9a1c3.firebaseapp.com",
  projectId: "incubatex-9a1c3",
  storageBucket: "incubatex-9a1c3.appspot.com",
  messagingSenderId: "672493274226",
  appId: "1:672493274226:web:5d759b330f525e15852eeb",
  measurementId: "G-FZ569B73Y4"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
// const messaging = getMessaging(app);
