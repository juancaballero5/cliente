"use strict";

const formulario = document.getElementById("formRegistro");
const mensaje = document.getElementById("mensaje");

formulario.addEventListener("submit", (e) => {
  e.preventDefault();

  const usuario = document.getElementById("usuario").value.trim();
  const password = document.getElementById("password").value.trim();

  if (usuario.includes(";") || usuario.includes("=") || password.includes(";") || password.includes("=")) {
    mensaje.textContent = "El usuario y la contraseña no pueden llevar ; ni =.";
    return;
  }

  if (usuario === "usuario") {
    mensaje.textContent = `No puedes registrarte con el nombre "${usuario}" (está reservado).`;
    return;
  }

  if (leeUsuario(usuario) !== null) {
    mensaje.textContent = `El usuario "${usuario}" ya está registrado.`;
    return;
  }

  const dato = {
    clave: usuario,
    valor: password
  };

  if (leeUsuario(dato.clave)) {
    mensaje.textContent = `El usuario "${usuario}" ya existe.`;
    return;
  }
  guardaUsuario(dato, "");

  mensaje.textContent = `Usuario "${usuario}" registrado correctamente.`;
});
