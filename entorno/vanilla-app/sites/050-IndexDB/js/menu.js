"use strict";

const RAIZ = new URL("../", document.currentScript.src);

// PORTADA, LOGIN y FOTO_DEFECTO: fuera de la función (ver nota abajo)

// Fuera de la función, con let: las leen rutas.js y usuarios.js
let sesion = null;
let esAdmin = false;

const enlacesPrivados = document.querySelectorAll(".enlacePrivado");
const enlacesPublicos = document.querySelectorAll(".enlacePublico");
const nombreUsuario = document.getElementById("nombreUsuario");
const gestionUsuarios = document.getElementById("gestionUsuarios");
const cerrarSesion = document.getElementById("cerrarSesion");

nombreUsuario.addEventListener("click", (e) => {
	e.preventDefault();
});

async function pintaMenu() {
	const filas = await leeSesionesDB();
	sesion = filas[0] || null;
	esAdmin = sesion ? sesion.usuario === "admin" : false;

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

	cerrarSesion.addEventListener("click", async (e) => {
		e.preventDefault();
		await borraSesionDB(sesion.usuario);
		window.location.href = PORTADA;
	});
}

// Se arranca una sola vez; rutas.js esperará esta promesa
const menuListo = pintaMenu();