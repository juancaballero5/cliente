"use strict";

const PATRON_USUARIO = /^[a-z][a-z0-9_]{2,15}$/;
const PATRON_PASSWORD = /^.{4,20}$/;
const PATRON_TELEFONO = /^[5-9]\d{8,9}$/;
const PATRON_EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PATRON_CP = /^\d{5}$/;

const formulario = document.getElementById("formRegistro");
const mensaje = document.getElementById("mensaje");
const nombre = document.getElementById("nombre");
const usuario = document.getElementById("usuario");
const password = document.getElementById("password");
const telefono = document.getElementById("telefono");
const email = document.getElementById("email");
const calle = document.getElementById("calle");
const cp = document.getElementById("cp");
const ciudad = document.getElementById("ciudad");
const provincia = document.getElementById("provincia");
const imagen = document.getElementById("imagen");

formulario.addEventListener("submit", async (e) => {
  e.preventDefault();

  if (!PATRON_USUARIO.test(usuario.value.trim())) {
    mensaje.textContent =
      "Usuario no válido (minúsculas, números o _; 3-16 caracteres; empieza por letra).";
    return;
  }

  if (!PATRON_PASSWORD.test(password.value.trim())) {
    mensaje.textContent = "Contraseña no válida (entre 4 y 20 caracteres).";
    return;
  }

  const usuarioGuardado = await leeUsuarioIDX(usuario.value.trim());
  if (usuarioGuardado) {
    mensaje.textContent = `El usuario "${usuario.value.trim()}" ya está registrado.`;
    return;
  }

  if (telefono.value.trim() && !PATRON_TELEFONO.test(telefono.value.trim())) {
    mensaje.textContent = "Teléfono no válido (9 dígitos; empieza por 6-9).";
    return;
  }

  if (email.value.trim() && !PATRON_EMAIL.test(email.value.trim())) {
    mensaje.textContent = "Email no válido.";
    return;
  }

  if (cp.value.trim() && !PATRON_CP.test(cp.value.trim())) {
    mensaje.textContent = "Código postal no válido (5 dígitos).";
    return;
  }

  const user = {
    nombre: nombre.value.trim(),
    usuario: usuario.value.trim(),
    password: password.value.trim(),
    telefono: telefono.value.trim() || "5551234567",
    email: email.value.trim() || "sin-email@ejemplo.com",
    direccion: {
      calle: calle.value.trim() || "Sin calle",
      cp: cp.value.trim() || "00000",
      ciudad: ciudad.value.trim() || "Sin ciudad",
      provincia: provincia.value.trim() || "Sin provincia",
    },
    imagen: imagen.files[0] ? imagen.files[0] : FOTO_DEFECTO,
  };

  await guardaUsuarioIDX(user);

  mensaje.textContent = `Usuario "${user.usuario}" registrado correctamente.`;
});
