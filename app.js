// app.js
import { auth } from "./firebase.js";
import { onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

let tickets = [];

// VERIFICAR SESIÓN (Protección de ruta)
onAuthStateChanged(auth, (user) => {
  if (user) {
    // Usuario logueado
    document.getElementById("userName").textContent = user.email;
    // Aquí podrías cargar tickets desde Firestore si quisieras en el futuro
  } else {
    // No hay usuario, pa' fuera
    window.location.href = "login.html";
  }
});

// LOGOUT
window.logout = function() {
  signOut(auth).then(() => {
    window.location.href = "login.html";
  }).catch((error) => {
    console.error("Error al salir", error);
  });
}

// ... (El resto de tus funciones crearTicket, mostrarTickets, enviarMensaje quedan igual por ahora)
// Nota: crearTicket y demás deben estar disponibles globalmente si las llamas con onclick en HTML:
window.crearTicket = crearTicket;
window.enviarMensaje = enviarMensaje;

// CREAR TICKET
function crearTicket() {
  const nombre = document.getElementById("nombre");
  const problema = document.getElementById("problema");

  if (!nombre.value || !problema.value) {
    alert("Completa todos los campos");
    return;
  }

  const ticket = {
    id: tickets.length + 1,
    nombre: nombre.value,
    problema: problema.value,
    estado: "Abierto"
  };

  tickets.push(ticket);
  mostrarTickets();

  nombre.value = "";
  problema.value = "";
}

// MOSTRAR TICKETS
function mostrarTickets() {
  const lista = document.getElementById("listaTickets");
  lista.innerHTML = "";

  tickets.forEach(t => {
    lista.innerHTML += `
      <li>
        🎫 <strong>#${t.id}</strong> - ${t.problema}
        <span class="estado">${t.estado}</span>
      </li>
    `;
  });
}

// CHAT
function enviarMensaje() {
  const input = document.getElementById("mensaje");
  const chat = document.getElementById("chat");

  if (!input.value) return;

  const mensaje = input.value.toLowerCase();
  chat.innerHTML += `<p><strong>Tú:</strong> ${mensaje}</p>`;

  let respuesta = "Un técnico revisará tu caso.";

  if (mensaje.includes("error")) {
    respuesta = "Parece un error del sistema. Intenta reiniciar.";
  } else if (mensaje.includes("contraseña")) {
    respuesta = "Puedes recuperar tu contraseña desde el login.";
  } else if (mensaje.includes("pago")) {
    respuesta = "Los pagos se reflejan en 24 horas.";
  }

  chat.innerHTML += `<p><strong>Soporte:</strong> ${respuesta}</p>`;
  chat.scrollTop = chat.scrollHeight;
  input.value = "";
}
