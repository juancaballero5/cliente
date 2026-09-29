"use strict";

// URL de nuestra API en Docker (el navegador habla con el puerto del host)
const API = "http://localhost:3000/accesoDB";

const mensaje = document.getElementById("mensaje");

function leerFormulario() {
  return {
    username: document.getElementById("username").value.trim(),
    password: document.getElementById("password").value.trim(),
    nombre: document.getElementById("nombre").value.trim(),
  };
}

function mostrar(texto) {
  mensaje.textContent = texto;
}

// Registrar: POST /accesoDB/grabar
async function registrar() {
  const datos = leerFormulario();

  if (!datos.username || !datos.password || !datos.nombre) {
    mostrar("Faltan usuario, contraseña o nombre.");
    return;
  }

  try {
    const res = await fetch(API + "/grabar", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(datos),
    });
    const json = await res.json();

    if (json.ok) {
      mostrar("Registrado correctamente. Ya puedes hacer login.");
    } else {
      mostrar("No se pudo registrar: " + (json.mensaje || "error"));
    }
  } catch (error) {
    mostrar("No hay conexión con la API. ¿Está levantado nodejs-api?");
  }
}

// Login: POST /accesoDB/leer
async function login() {
  const datos = leerFormulario();

  if (!datos.username || !datos.password) {
    mostrar("Faltan usuario o contraseña.");
    return;
  }

  try {
    const res = await fetch(API + "/leer", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: datos.username,
        password: datos.password,
      }),
    });
    const json = await res.json();

    if (json.ok) {
      // El token es solo un ejemplo de clase (no es seguridad real)
      mostrar(
        "Login OK\n" +
          "Nombre: " + json.usuario.nombre + "\n" +
          "Token (ejemplo): " + json.token
      );
    } else {
      mostrar("Login fallido: " + (json.mensaje || "error"));
    }
  } catch (error) {
    mostrar("No hay conexión con la API. ¿Está levantado nodejs-api?");
  }
}

document.getElementById("btnRegistrar").addEventListener("click", registrar);
document.getElementById("btnLogin").addEventListener("click", login);
