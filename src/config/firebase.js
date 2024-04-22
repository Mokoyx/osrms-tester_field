import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import {getDatabase} from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyBT97Yi-3IsYdMIsuaCgkfuAb5oliR2Rks",
  authDomain: "osmr-63f79.firebaseapp.com",
  databaseURL: "https://osmr-63f79-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "osmr-63f79",
  storageBucket: "osmr-63f79.appspot.com",
  messagingSenderId: "720520302044",
  appId: "1:720520302044:web:6974e6a0390a619d1f1319"
};
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const rtdb = getDatabase(app);

