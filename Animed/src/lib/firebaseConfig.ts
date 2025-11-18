// src/lib/firebaseConfig.ts
import { initializeApp } from "firebase/app";
import { getAuth} from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBhxL-OwH2dhNGszolfiBUiaTXJuZGZuM0",
  authDomain: "animed-f1832.firebaseapp.com",
  projectId: "animed-f1832",
  storageBucket: "animed-f1832.firebasestorage.app",
  messagingSenderId: "727059255855",
  appId: "1:727059255855:web:1ef4957cc043d14d932cda",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const storage = getStorage(app);
