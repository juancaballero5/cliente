"use strict";

const formRegistro = document.getElementById("formRegistro");
const mensaje = document.getElementById("mensaje");

formRegistro.addEventListener("submit", (e) => {
	e.preventDefault();

	const usuario = document.getElementById("usuario").value.trim();
	const password = document.getElementById("password").value.trim();

	if (usuario === "" || password === "") {
		mensaje.textContent = "Rellena usuario y contraseña.";
		return;
	}

	if (leeCuenta(usuario) !== null) {
		mensaje.textContent = `El usuario "${usuario}" ya está registrado. No se ha guardado nada, porque guardar otra vez sustituiría su ficha.`;
		return;
	}

	guardaCuenta({ usuario: usuario, password: password });
	mensaje.textContent = `Usuario "${usuario}" registrado correctamente.`;
});