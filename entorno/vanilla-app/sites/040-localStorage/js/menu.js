"use strict";

const HOME = "/040-localStorage/";

const sesion = leeSesion();

const enlacesPrivados = document.querySelectorAll(".enlacePrivado");
const enlacesPublicos = document.querySelectorAll(".enlacePublico");
const nombreUsuario = document.getElementById("nombreUsuario");
const gestionUsuarios = document.getElementById("gestionUsuarios");
const cerrarSesion = document.getElementById("cerrarSesion");

if (sesion) {
	enlacesPrivados.forEach((enlacePrivado) => {
		enlacePrivado.style.display = "";
	})
	enlacesPublicos.forEach((enlacePublico) => {
		enlacePublico.style.display = "none";
	})
	nombreUsuario.textContent = sesion.usuario;
	gestionUsuarios.style.display = sesion.usuario === "admin" ? "" : "none";
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
	borraSesion();
	window.location.href = `${HOME}index.html`;
})
