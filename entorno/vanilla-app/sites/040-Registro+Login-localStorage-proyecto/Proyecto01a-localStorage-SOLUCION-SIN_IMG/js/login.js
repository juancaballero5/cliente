"use strict";

const formulario = document.getElementById("formLogin");
const mensaje = document.getElementById("mensaje");

function credencialCorrecta(usuario, password) {
  const user = leeUsuario(usuario);
  if (!user) return false;
  return user.password === password;
}

formulario.addEventListener("submit", (e) => {
  e.preventDefault();

  const usuario = document.getElementById("usuario").value.trim();
  const password = document.getElementById("password").value.trim();

  if (!credencialCorrecta(usuario, password)) {
    mensaje.textContent = "Usuario o contraseña incorrectos.";
    return;
  }
  guardaSesion(usuario);

  mensaje.textContent = `Bienvenido, ${usuario}. Redirigiendo...`;
  setTimeout(() => {
    window.location.href = "./index.html";
  }, 1500);
});
