"use strict"

const formRegistro = document.getElementById("formRegistro");
const mensaje = document.getElementById("mensaje");

const CLAVES_RESERVADAS = ["usuario", "loggedIn"];

formRegistro.addEventListener("submit", (e) => {
	e.preventDefault();

	const usuario = document.getElementById("usuario").value.trim();
	const password = document.getElementById("password").value.trim();

	if (CLAVES_RESERVADAS.includes(usuario)) {
		mensaje.textContent = `No puedes registrarte con el nombre "${usuario}" (está reservado).`;
		return;
	}

	if (getCookie(usuario) != null) {
		mensaje.textContent = `El usuario "${usuario}" ya está registrado.`;
		return;
	}

	setCookie(`${usuario}=${password}; path=/; secure; samesite=Strict`);
	mensaje.textContent = `Usuario "${usuario}" registrado correctamente.`;

});
