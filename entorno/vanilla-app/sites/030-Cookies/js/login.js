"use strict"

const formLogin = document.getElementById("formLogin");
const mensaje = document.getElementById("mensaje");

const CLAVES_RESERVADAS = ["usuario", "loggedIn"];

formLogin.addEventListener("submit", (e) => {
	e.preventDefault();

	const usuario = document.getElementById("usuario").value.trim();
	const password = document.getElementById("password").value.trim();

	if (CLAVES_RESERVADAS.includes(usuario)) {
		mensaje.textContent = `No puedes registrarte con el nombre "${usuario}" (está reservado).`;
		return;
	}

	if (credencialCorrecta(usuario, password)) {
		setCookie(`usuario=${usuario}; path=/; secure, samesite=Strict`);
		setCookie(`loggedIn=true; path=/; secure, samesite=Strict`);

		mensaje.textContent = `Bienvenido, ${usuario}. Redirigiendo...`;
		setTimeout(() => {
			window.location.href = "index.html";
		}, 1500);
	} else {
		mensaje.textContent = `El usuario o contraseña son incorrectos`;
	}

});

function credencialCorrecta(usuario, password) {
	return getCookie(usuario) === password;
}
