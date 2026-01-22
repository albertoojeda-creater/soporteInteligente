// login.js
import { auth, db } from "./firebase.js";
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword 
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { 
  doc, 
  setDoc 
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

// --- FUNCIÓN DE LOGIN ---
window.login = async function() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const error = document.getElementById("error");

  try {
    // 1. Iniciar sesión con Firebase Auth
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    
    // Si pasa, redirige
    window.location.href = "index.html";
    
  } catch (e) {
    console.error(e);
    if(e.code === 'auth/invalid-credential') {
        error.textContent = "Correo o contraseña incorrectos.";
    } else {
        error.textContent = "Error al iniciar sesión: " + e.message;
    }
  }
}

// --- FUNCIÓN DE REGISTRO ---
window.register = async function() {
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const error = document.getElementById("error");
  const success = document.getElementById("success");

  if (!name || !email || !password) {
    error.textContent = "Completa todos los campos";
    return;
  }

  try {
    // 1. Crear usuario en Authentication
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // 2. Guardar en Firestore (Colección 'users')
    // Usamos el UID de autenticación como ID del documento para mantener relación
    await setDoc(doc(db, "users", user.uid), {
      id: user.uid,
      name: name,
      email: email,
      password: password, // ⚠️ Guardando password como pidió el requerimiento
      rol: "usuario"
    });

    success.textContent = "Cuenta creada. Redirigiendo...";
    error.textContent = "";

    setTimeout(() => {
      window.location.href = "index.html"; // Ya entra logueado automáticamente
    }, 1500);

  } catch (e) {
    console.error(e);
    if (e.code === 'auth/email-already-in-use') {
        error.textContent = "Este correo ya está registrado.";
    } else {
        error.textContent = "Error: " + e.message;
    }
  }
}
