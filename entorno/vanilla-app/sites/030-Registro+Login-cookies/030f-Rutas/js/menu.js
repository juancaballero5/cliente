"use strict";

const RAIZ = new URL("../", document.currentScript.src);
const PORTADA = new URL("index.html", RAIZ).pathname;
const LOGIN = new URL("login.html", RAIZ).pathname;

const sesion = leeSesion();
const esAdmin = sesion ? sesion.valor == "admin" : false;

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
  nombreUsuario.textContent = sesion.valor;
  gestionUsuarios.style.display = esAdmin ? "" : "none";
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
  borraSesion();
  window.location.href = PORTADA;
});
