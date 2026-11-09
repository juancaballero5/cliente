"use strict";

// URL de nuestra API en Docker (el navegador habla con el puerto del host)
const API = "http://localhost:3000/accesoDB";

const mensaje = document.getElementById("mensaje");

function leerFormulario() {
  return {
    usuario: document.getElementById("username").value.trim(),
    password: document.getElementById("password").value.trim(),
    nombre: document.getElementById("nombre").value.trim(),
  };
}

function mostrar(texto) {
  mensaje.textContent = texto;
}

// Registrar: POST /accesoDB/usuarios/grabar. Si el usuario ya existe, se sustituye.
async function registrar() {
  const datos = leerFormulario();

  if (!datos.usuario || !datos.password || !datos.nombre) {
    mostrar("Faltan usuario, contraseña o nombre.");
    return;
  }

  try {
    const res = await fetch(API + "/usuarios/grabar", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(datos),
    });
    const json = await res.json();

    if (res.ok && json.ok) {
      mostrar("Guardado correctamente. Ya puedes hacer login.");
    } else {
      mostrar("No se pudo guardar: " + (json.mensaje || "error"));
    }
  } catch (error) {
    mostrar("No hay conexión con la API. ¿Está levantado nodejs-api?");
  }
}

// Login: GET /accesoDB/usuarios/leer/:usuario y la contraseña se compara aquí.
async function login() {
  const datos = leerFormulario();

  if (!datos.usuario || !datos.password) {
    mostrar("Faltan usuario o contraseña.");
    return;
  }

  try {
    const res = await fetch(API + "/usuarios/leer/" + encodeURIComponent(datos.usuario));
    const json = await res.json();

    if (!res.ok) {
      mostrar("Login fallido: " + (json.mensaje || "error"));
      return;
    }

    if (json.password !== datos.password) {
      mostrar("Login fallido: contraseña incorrecta");
      return;
    }

    mostrar("Login OK\nNombre: " + json.nombre);
  } catch (error) {
    mostrar("No hay conexión con la API. ¿Está levantado nodejs-api?");
  }
}

document.getElementById("btnRegistrar").addEventListener("click", registrar);
document.getElementById("btnLogin").addEventListener("click", login);
