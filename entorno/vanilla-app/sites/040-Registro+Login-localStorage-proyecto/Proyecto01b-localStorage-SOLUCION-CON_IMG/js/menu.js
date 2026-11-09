"use strict";

const PORTADA = "/040-Registro+Login-localStorage/040e-Sesion-admin+usuarios/index.html";

const usuarioSesion = leeSesion();
const haySesion = Boolean(usuarioSesion);
const esAdmin = usuarioSesion === "admin";

const enlacesPrivados = document.querySelectorAll(".enlacePrivado");
const enlacesPublicos = document.querySelectorAll(".enlacePublico");
const nombreUsuario = document.getElementById("nombreUsuario");
const cerrarSesion = document.getElementById("cerrarSesion");
const gestionUsuarios = document.getElementById("gestionUsuarios");

if (haySesion) {
  enlacesPrivados.forEach((el) => {
    el.style.display = "";
  });
  enlacesPublicos.forEach((el) => {
    el.style.display = "none";
  });
  if (usuarioSesion) {
    nombreUsuario.textContent = usuarioSesion;
    const fotoPerfil = document.querySelector(".header-profile img");
    const usuario = leeUsuario(usuarioSesion);
    fotoPerfil.src = usuario.imagen;
    fotoPerfil.alt = usuario.nombre;
  }
} else {
  enlacesPrivados.forEach((el) => {
    el.style.display = "none";
  });
  enlacesPublicos.forEach((el) => {
    el.style.display = "";
  });
}

gestionUsuarios.style.display = esAdmin ? "" : "none";

nombreUsuario.addEventListener("click", (e) => {
  e.preventDefault();
});

cerrarSesion.addEventListener("click", (e) => {
  e.preventDefault();
  borraSesion();
  window.location.href = PORTADA;
});
