function login() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const error = document.getElementById("error");

  const usuario = JSON.parse(localStorage.getItem("usuario"));

  if (!usuario || usuario.email !== email || usuario.password !== password) {
    error.textContent = "Credenciales incorrectas";
    return;
  }

  window.location.href = "index.html";
}

function register() {
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const success = document.getElementById("success");
  const error = document.getElementById("error");

  if (!name || !email || !password) {
    error.textContent = "Completa todos los campos";
    return;
  }

  localStorage.setItem("usuario", JSON.stringify({
    name,
    email,
    password,
    rol: "usuario"
  }));

  success.textContent = "Cuenta creada correctamente";
  error.textContent = "";

  setTimeout(() => {
    window.location.href = "login.html";
  }, 1500);
}
