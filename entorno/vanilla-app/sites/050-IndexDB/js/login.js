"use strict"

const formLogin = document.getElementById("formLogin");
const mensaje = document.getElementById("mensaje");

async function loginCorrecto(usuario, password) {
	const user = await leeUsuarioDB(usuario);
	if (!user) {
		return false
	}

	return user.password === password;
}

formLogin.addEventListener("submit", async (e) => {
	e.preventDefault();

	const usuario = document.getElementById("usuario").value.trim();
	const password = document.getElementById("password").value.trim();
	
	if (!(await loginCorrecto(usuario, password))) {
		mensaje.textContent = `Usuario o contraseña incorrecta.`;
		return;
	}

	const ficha = await leeUsuarioDB(usuario);
	await guardaSesionDB(ficha);

	mensaje.textContent = `Bienvenido, ${usuario}. Redirigiendo...`;
	setTimeout(() => {
		window.location.href = "index.html";
	}, 1500);

});