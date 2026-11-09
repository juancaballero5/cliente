"use strict";

const paginaPrivada = document.body.classList.contains("paginaPrivada");
const paginaAdmin = document.body.classList.contains("paginaAdmin");

async function comprobarRuta() {
  await menuPreparado;

  if (paginaPrivada && !sesion) {
    window.location.replace(LOGIN);
  } else if (paginaAdmin && !esAdmin) {
    window.location.replace(PORTADA);
  }
}

comprobarRuta();
