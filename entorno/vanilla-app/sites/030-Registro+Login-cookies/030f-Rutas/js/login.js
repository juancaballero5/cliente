"use strict";

const formulario = document.getElementById("formLogin");
const mensaje = document.getElementById("mensaje");

function credencialCorrecta(login) {
  const usuario = leeUsuario(login.clave);
  if (usuario === null) return false;
  return usuario.valor === login.valor;
}

formulario.addEventListener("submit", (e) => {
  e.preventDefault();

  const usuario = document.getElementById("usuario").value.trim();
  const password = document.getElementById("password").value.trim();

  const login = {
    clave: usuario,
    valor: password
  };
  if (!credencialCorrecta(login)) {
    mensaje.textContent = "Usuario o contraseña incorrectos.";
    return;
  }

  const sesion = {
    clave: "usuario",
    valor: usuario
  };
  guardaSesion(sesion, "");

  mensaje.textContent = `Bienvenido, ${usuario}. Redirigiendo...`;
  setTimeout(() => {
    window.location.href = PORTADA;
  }, 1500);
});
