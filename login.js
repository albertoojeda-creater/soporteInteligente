function login() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const error = document.getElementById("error");

  // Usuario simulado (SaaS)
  const usuario = {
    email: "admin@soporte.com",
    password: "1234",
    rol: "admin"
  };

  if (email === usuario.email && password === usuario.password) {
    localStorage.setItem("usuario", JSON.stringify(usuario));
    window.location.href = "index.html";
  } else {
    error.textContent = "Credenciales incorrectas";
  }
}
