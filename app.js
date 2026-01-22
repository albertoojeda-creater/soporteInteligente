let tickets = [];

// LOGOUT
function logout() {
  localStorage.removeItem("usuario");
  window.location.href = "login.html";
}

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
