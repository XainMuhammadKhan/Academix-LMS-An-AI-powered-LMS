// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "academix-9cd70.firebaseapp.com",
  projectId: "academix-9cd70",
  storageBucket: "academix-9cd70.firebasestorage.app",
  messagingSenderId: "689072989452",
  appId: "1:689072989452:web:d17ec780063b792c09d529",
  measurementId: "G-FX956J74TK"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider };