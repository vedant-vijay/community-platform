import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBIuxoXAiHwpDMV-bVraVgm344gi2564m4",
  authDomain: "project1-46df2.firebaseapp.com",
  projectId: "project1-46df2",
  storageBucket: "project1-46df2.appspot.com",
  messagingSenderId: "1030833113456",
  appId: "1:1030833113456:web:your-app-id"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export default app;
