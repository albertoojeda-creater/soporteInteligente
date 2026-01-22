let tickets = [];

// LOGOUT
function logout() {
  localStorage.removeItem("usuario");
  window.location.href = "login.html";
}

// CREAR TICKET
function crearTicket() {
  const nombre = document.getElementById("nombre").value;
  const problema = document.getElementById("problema").value;

  if (!nombre || !problema) {
    alert("Completa todos los campos");
    return;
  }

  const ticket = {
    id: tickets.length + 1,
    nombre,
    problema,
    estado: "Abierto"
  };

  tickets.push(ticket);
  mostrarTickets();
}

// MOSTRAR TICKETS
function mostrarTickets() {
  const lista = document.getElementById("listaTickets");
  lista.innerHTML = "";

  tickets.forEach(t => {
    lista.innerHTML += `
      <li>🎫 #${t.id} - ${t.problema} 
      <strong>(${t.estado})</strong></li>
    `;
  });
}

// CHAT INTELIGENTE
function enviarMensaje() {
  const mensaje = document.getElementById("mensaje").value.toLowerCase();
  const chat = document.getElementById("chat");

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
  document.getElementById("mensaje").value = "";
}
