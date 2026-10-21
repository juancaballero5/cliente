"use strict";

const formRegistro = document.getElementById("formRegistro");
const usuario = document.getElementById("usuario");
const password = document.getElementById("password");
const mensaje = document.getElementById("mensaje");
const tbody = document.querySelector("#tablaUsuarios tbody");

let editando = null;

function esAdmin() {
	const sesion = leeSesion();
	return sesion !== null && sesion.usuario === "admin";
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

	if (usuario === "" || password === "") {
		mensaje.textContent = "Rellena usuario y contraseña.";
		return;
	}

	if (editando === null && leeCuenta(usuario) !== null) {
		mensaje.textContent = `El usuario "${usuario}" ya está registrado.`;
		return;
	}

	if (editando !== null && editando !== usuario) {
		borraCuenta(editando);
	}

	guardaCuenta({ usuario: usuario, password: password });
	mensaje.textContent = editando === null
		? `Usuario "${usuario}" registrado correctamente.`
		: `Usuario "${usuario}" actualizado correctamente.`;

	editando = null;
	formRegistro.reset();
	pintarTabla();
});

function pintarTabla() {
	const users = Object.values(leeCuentas());
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
			editando = user.usuario;
			mensaje.textContent = `Editando "${user.usuario}". Guarda para confirmar.`;
		});

		const btnBorrar = document.createElement("button");
		btnBorrar.textContent = "Borrar";
		btnBorrar.addEventListener("click", () => {
			const borrada = borraCuenta(user.usuario);

			if (borrada === null) {
				mensaje.textContent = `El usuario "${user.usuario}" ya no existe.`;
			} else {
				const sesion = leeSesion();
				if (sesion !== null && sesion.usuario === borrada.usuario) {
					borraSesion();
					window.location.href = "./index.html";
					return;
				}
				mensaje.textContent = `Usuario "${borrada.usuario}" borrado.`;
			}
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
