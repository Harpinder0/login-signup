import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';


const firebaseConfig = {
    apiKey: "AIzaSyAM0-yWMEFeNHMfqE2iOpBrDwS9VoMaba4",
    authDomain: "firstcreateporject.firebaseapp.com",
    projectId: "firstcreateporject",
    storageBucket: "firstcreateporject.appspot.com",
    messagingSenderId: "188168699991",
    appId: "1:188168699991:web:0815a60aec4782e5cba312"
  };

let db = null;

export const initializeFirebase = () => {
    const app = initializeApp(firebaseConfig);
    db = getFirestore(app)
}

export const getDB = () => {
    return db;
}
  