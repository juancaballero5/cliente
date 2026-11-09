"use strict";

const RAIZ = new URL("../", document.currentScript.src);
const PORTADA = new URL("index.html", RAIZ).pathname;
const LOGIN = new URL("login.html", RAIZ).pathname;
const FOTO_DEFECTO = new URL("./img/user.png", RAIZ).pathname;

const sesion = leeSesionStorage();
const esAdmin = sesion ? sesion.usuario == "admin" : false;

const enlacesPrivados = document.querySelectorAll(".enlacePrivado");
const enlacesPublicos = document.querySelectorAll(".enlacePublico");
const nombreUsuario = document.getElementById("nombreUsuario");
const gestionUsuarios = document.getElementById("gestionUsuarios");
const cerrarSesion = document.getElementById("cerrarSesion");

if (sesion) {
  enlacesPrivados.forEach((el) => {
    el.style.display = "";
  });
  enlacesPublicos.forEach((el) => {
    el.style.display = "none";
  });
  nombreUsuario.textContent = sesion.usuario;
  gestionUsuarios.style.display = esAdmin ? "" : "none";
  const fotoPerfil = document.querySelector(".header-profile img");
  const imagen = sesion.imagen || FOTO_DEFECTO;
  fotoPerfil.src = typeof imagen === "string" ? imagen : URL.createObjectURL(imagen);
  fotoPerfil.alt = sesion.nombre;
} else {
  enlacesPrivados.forEach((el) => {
    el.style.display = "none";
  });
  enlacesPublicos.forEach((el) => {
    el.style.display = "";
  });
}

nombreUsuario.addEventListener("click", (e) => {
  e.preventDefault();
});

cerrarSesion.addEventListener("click", (e) => {
  e.preventDefault();
  borraSesionStorage();
  window.location.href = PORTADA;
});
