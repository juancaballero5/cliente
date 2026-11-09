"use strict";

const PATRON_USUARIO = /^[a-z][a-z0-9_]{2,15}$/;
const PATRON_PASSWORD = /^.{4,20}$/;
const PATRON_TELEFONO = /^[5-9]\d{8,9}$/;
const PATRON_EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PATRON_CP = /^\d{5}$/;
// AQUI DEBE IR CÓDIGO PARA GESTIONAR LA IMAGEN DEL USUARIO (IMAGEN POR DEFECTO)

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
// AQUI DEBE IR CÓDIGO PARA GESTIONAR LA IMAGEN DEL USUARIO

// AQUI DEBE IR CÓDIGO PARA GESTIONAR LA IMAGEN DEL USUARIO (FUNCION PARA CONVERTIR A BASE64)

formulario.addEventListener("submit", async (e) => {
  e.preventDefault();

  const nombreValor = nombre.value.trim();
  const usuarioValor = usuario.value.trim();
  const passwordValor = password.value.trim();
  const telefonoValor = telefono.value.trim();
  const emailValor = email.value.trim();
  const calleValor = calle.value.trim();
  const cpValor = cp.value.trim();
  const ciudadValor = ciudad.value.trim();
  const provinciaValor = provincia.value.trim();
  const archivo = imagen.files[0];

  if (!PATRON_USUARIO.test(usuarioValor)) {
    mensaje.textContent =
      "Usuario no válido (minúsculas, números o _; 3-16 caracteres; empieza por letra).";
    return;
  }

  if (!PATRON_PASSWORD.test(passwordValor)) {
    mensaje.textContent = "Contraseña no válida (entre 4 y 20 caracteres).";
    return;
  }

  if (leeUsuario(usuarioValor)) {
    mensaje.textContent = `El usuario "${usuarioValor}" ya está registrado.`;
    return;
  }

  if (telefonoValor && !PATRON_TELEFONO.test(telefonoValor)) {
    mensaje.textContent = "Teléfono no válido (9 o 10 dígitos; empieza por 5-9).";
    return;
  }

  if (emailValor && !PATRON_EMAIL.test(emailValor)) {
    mensaje.textContent = "Email no válido.";
    return;
  }

  if (cpValor && !PATRON_CP.test(cpValor)) {
    mensaje.textContent = "Código postal no válido (5 dígitos).";
    return;
  }

  // AQUI DEBE IR CÓDIGO PARA GESTIONAR LA IMAGEN DEL USUARIO (LLAMADA A CONVERTIR A BASE64)

  const user = {
    nombre: nombreValor,
    usuario: usuarioValor,
    password: passwordValor,
    telefono: telefonoValor || "5551234567",
    email: emailValor || "sin-email@ejemplo.com",
    direccion: {
      calle: calleValor || "Sin calle",
      cp: cpValor || "00000",
      ciudad: ciudadValor || "Sin ciudad",
      provincia: provinciaValor || "Sin provincia",
    },
    // AQUI DEBE IR CÓDIGO PARA GESTIONAR LA IMAGEN DEL USUARIO
  };

  guardaUsuario(user);
  mensaje.textContent = `Usuario "${usuarioValor}" registrado correctamente.`;
});
