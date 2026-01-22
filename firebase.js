// firebase.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";


const firebaseConfig = {
  apiKey: "AIzaSyCojltGC0Vu6zA5hRqwpJN3hdqIRgSdm6g",
  authDomain: "soporte-saas.firebaseapp.com",
  projectId: "soporte-saas",
  storageBucket: "soporte-saas.firebasestorage.app",
  messagingSenderId: "480741802626",
  appId: "1:480741802626:web:5d1238ac058c52583daa9b",
  measurementId: "G-J7H9HF1YRK"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);


export { auth, db };