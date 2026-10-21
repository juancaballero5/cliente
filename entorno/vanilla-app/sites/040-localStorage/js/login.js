"use strict"

const formLogin = document.getElementById("formLogin");
const mensaje = document.getElementById("mensaje");

formLogin.addEventListener("submit", (e) => {
	e.preventDefault();

	const usuario = document.getElementById("usuario").value.trim();
	const password = document.getElementById("password").value.trim();
	
	const ficha = leeCuenta(usuario);

	if (ficha === null) {
		mensaje.textContent = `La cuenta "${usuario}" no existe.`;
		return;
	}

	if (ficha.password !== password) {
		mensaje.textContent = "La contraseña es incorrecta.";
		return;
	}

	guardaSesion({ usuario: ficha.usuario, fecha: new Date().toISOString() });

	mensaje.textContent = `Bienvenido, ${ficha.usuario}. Redirigiendo...`;
	setTimeout(() => {
		window.location.href = "index.html";
	}, 1500);

});