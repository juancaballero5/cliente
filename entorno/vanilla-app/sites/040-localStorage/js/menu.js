"use strict";

const HOME = "/040-localStorage/";

const haySesion = getCookie("loggedIn") === "true";
const usuarioMenu = getCookie("usuario");

const enlacesPrivados = document.querySelectorAll(".enlacePrivado");
const enlacesPublicos = document.querySelectorAll(".enlacePublico");
const nombreUsuario = document.getElementById("nombreUsuario");
const gestionUsuarios = document.getElementById("gestionUsuarios");
const cerrarSesion = document.getElementById("cerrarSesion");

if (haySesion) {
	enlacesPrivados.forEach((enlacePrivado) => {
		enlacePrivado.style.display = "";
	})
	enlacesPublicos.forEach((enlacePublico) => {
		enlacePublico.style.display = "none";
	})
	nombreUsuario.textContent = usuarioMenu;
	gestionUsuarios.style.display = usuarioMenu === "admin" ? "" : "none";
} else {
	enlacesPrivados.forEach((enlacePrivado) => {
		enlacePrivado.style.display = "none";
	})
	enlacesPublicos.forEach((enlacePublico) => {
		enlacePublico.style.display = "";
	})
}

cerrarSesion.addEventListener("click", (e) => {
	e.preventDefault();
	deleteCookie("usuario");
	deleteCookie("loggedIn");
	window.location.href = `${HOME}index.html`;
})
