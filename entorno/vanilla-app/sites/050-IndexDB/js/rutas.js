"use strict";

const LOGIN = "/040-Registro+Login-localStorage/040g-Rutas+ExtraUsuarios/login.html";

const paginaPrivada = document.body.classList.contains("paginaPrivada");
const paginaAdmin = document.body.classList.contains("paginaAdmin");

if (paginaPrivada && !haySesion) {
     window.location.replace(LOGIN);
} else if (paginaAdmin && !esAdmin) {
     window.location.replace(PORTADA);
}
