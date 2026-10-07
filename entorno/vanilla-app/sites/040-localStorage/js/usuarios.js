"use strict;"

const CLAVES_RESERVADAS = ["usuario", "loggedIn"];

const formRegistro = document.getElementById("formRegistro");
const usuario = document.getElementById("usuario");
const password = document.getElementById("password");
const mensaje = document.getElementById("mensaje");
const tbody = document.querySelector("#tablaUsuarios tbody");

function esAdmin() {
	return getCookie("loggedIn") === "true" && getCookie("usuario") === "admin";
}

if (!esAdmin()) {
	window.location.href = "./login.html";
} else {
	pintarTabla();
}

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
	pintarTabla();
});

function obtenerUsuarios() {
	const users = [];
	let usuarios = document.cookie.split("; ");
	usuarios.forEach((usuario) => {
		const [clave, valor] = usuario.split("=");
		if (!(CLAVES_RESERVADAS.includes(clave))) {
			users.push({ usuario: clave, password: valor });
		}
	});
	return users;
}

function pintarTabla() {
	const users = obtenerUsuarios();
	tbody.innerHTML = "";

	users.forEach((user) => {
		const tr = document.createElement("tr");

		const tdUsuario = document.createElement("td");
		tdUsuario.textContent = user.usuario;

		const tdPassword = document.createElement("td");
		tdPassword.textContent = user.password;

		const tdAcciones = document.createElement("td");

		const btnEditar = document.createElement("button");
		btnEditar.textContent = "Editar";
		btnEditar.addEventListener("click", () => {
			usuario.value = user.usuario;
			password.value = user.password;
			deleteCookie(user.usuario);
			pintarTabla();
		});

		const btnBorrar = document.createElement("button");
		btnBorrar.textContent = "Borrar";
		btnBorrar.addEventListener("click", () => {
			deleteCookie(user.usuario);
			pintarTabla();
		});

		tdAcciones.appendChild(btnBorrar);
		tdAcciones.appendChild(btnEditar);

		tr.appendChild(tdUsuario);
		tr.appendChild(tdPassword);
		tr.appendChild(tdAcciones);

		tbody.appendChild(tr);
	});
}
