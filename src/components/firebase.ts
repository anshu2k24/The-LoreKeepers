import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, serverTimestamp, onSnapshot, query, orderBy , doc, updateDoc, arrayUnion,deleteDoc} from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyDWMsdaCeNlbHSIzgKo4xn--Y8kYFt7zA4",
    authDomain: "studyai-8678a.firebaseapp.com",
    projectId: "studyai-8678a",
    storageBucket: "studyai-8678a.firebasestorage.app",
    messagingSenderId: "247902361153",
    appId: "1:247902361153:web:13490db71216d7435558c0",
    measurementId: "G-Y1LN1DQ9Y5"
  };

const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const db = getFirestore(app);


export { app, auth, db, collection, addDoc, serverTimestamp, onSnapshot, query, deleteDoc,orderBy, doc, updateDoc, arrayUnion,};
// db, collection, addDoc, serverTimestamp, onSnapshot, query, orderBy, doc, updateDoc, arrayUnion
