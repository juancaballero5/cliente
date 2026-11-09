"use strict";

const PATRON_USUARIO = /^[a-z][a-z0-9_]{2,15}$/;
const PATRON_PASSWORD = /^.{4,20}$/;
const PATRON_TELEFONO = /^[5-9]\d{8,9}$/;
const PATRON_EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const formulario = document.getElementById("formulario");
const nombre = document.getElementById("nombre");
const usuario = document.getElementById("usuario");
const password = document.getElementById("password");
const telefono = document.getElementById("telefono");
const email = document.getElementById("email");
const guardar = document.getElementById("guardar");
const leer = document.getElementById("leer");
const borrar = document.getElementById("borrar");
const resultado = document.getElementById("resultado");

formulario.addEventListener("submit", (event) => {
  event.preventDefault();
});

listarUsuarios();

guardar.addEventListener("click", () => {
  if (!PATRON_USUARIO.test(usuario.value.trim())) {
    resultado.textContent =
      "Usuario no válido (minúsculas, números o _; 3-16 caracteres; empieza por letra).";
    return;
  }

  if (!PATRON_PASSWORD.test(password.value.trim())) {
    resultado.textContent = "Contraseña no válida (entre 4 y 20 caracteres).";
    return;
  }

  if (telefono.value.trim() && !PATRON_TELEFONO.test(telefono.value.trim())) {
    resultado.textContent = "Teléfono no válido (9 dígitos; empieza por 6-9).";
    return;
  }

  if (email.value.trim() && !PATRON_EMAIL.test(email.value.trim())) {
    resultado.textContent = "Email no válido.";
    return;
  }

  const user = {
    nombre: nombre.value.trim(),
    usuario: usuario.value.trim(),
    password: password.value.trim(),
    telefono: telefono.value.trim() || "5551234567",
    email: email.value.trim() || "sin-email@ejemplo.com",
  };

  guardaUsuarioEjercicio(user);
  listarUsuarios();
});

leer.addEventListener("click", () => {
  let mensaje = "📦 El valor del usuario es:<br>";
  const user = leeUsuarioEjercicio(usuario.value.trim());
  if (!user) {
    resultado.innerHTML = mensaje + "⚠️ No existe el usuario.";
  } else {
    resultado.innerHTML = mensaje + `👤 <b>${user.nombre}</b> ${user.usuario} - ${user.telefono}<br>`;
  }
  setTimeout(() => {
    listarUsuarios();
  }, 1500);
});

borrar.addEventListener("click", () => {
  const user = leeUsuarioEjercicio(usuario.value.trim());
  if (!user) {
    resultado.innerHTML = "⚠️ No existe el usuario.";
  } else {
    borraUsuarioEjercicio(user.usuario);
    resultado.innerHTML = `El usuario <b>${user.usuario}</b> ha sido borrado.`;
  }
  setTimeout(() => {
    listarUsuarios();
  }, 1500);
});

function listarUsuarios() {
  let listado = "Usuarios guardados (1 clave = todos):<br>";
  const usuarios = Object.values(leeUsuariosEjercicio());
  if (usuarios.length === 0) {
    resultado.innerHTML = listado + "No hay usuarios guardados.";
  } else {
    usuarios.forEach((user) => {
      listado += `<b>${user.nombre}</b> ${user.usuario} - ${user.telefono} - ${user.email}<br>`;
    });
    resultado.innerHTML = listado;
  }
}
