"use strict";

const paginaPrivada = document.body.classList.contains("paginaPrivada");
const paginaAdmin = document.body.classList.contains("paginaAdmin");

if (paginaPrivada && !sesion) {
  window.location.replace(LOGIN);
} else if (paginaAdmin && !esAdmin) {
  window.location.replace(PORTADA);
}
