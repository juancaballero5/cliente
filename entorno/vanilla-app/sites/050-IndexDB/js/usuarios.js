"use strict";

const PATRON_USUARIO = /^[a-z][a-z0-9_]{2,15}$/;
const PATRON_PASSWORD = /^.{4,20}$/;
const PATRON_TELEFONO = /^[5-9]\d{8,9}$/;
const PATRON_EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PATRON_CP = /^\d{5}$/;

const formRegistro = document.getElementById("formRegistro");
const usuario = document.getElementById("usuario");
const password = document.getElementById("password");
const mensaje = document.getElementById("mensaje");
const nombre = document.getElementById("nombre");
const telefono = document.getElementById("telefono");
const email = document.getElementById("email");
const calle = document.getElementById("calle");
const cp = document.getElementById("cp");
const ciudad = document.getElementById("ciudad");
const provincia = document.getElementById("provincia");
const imagen = document.getElementById("imagen");
const vistaPrevia = document.getElementById("vistaPrevia");
const tbody = document.querySelector("#tablaUsuarios tbody");

let imagenAnterior = "";

async function mensajeValidacion(usuarioValor, passwordValor, telefonoValor, emailValor, cpValor, usuarioAnterior) {
	if (!PATRON_USUARIO.test(usuarioValor)) {
		return "Usuario no válido (minúsculas, números o _; 3-16 caracteres; empieza por letra).";
	}

	if (!PATRON_PASSWORD.test(passwordValor)) {
		return "Contraseña no válida (entre 4 y 20 caracteres).";
	}

	if (usuarioValor != usuarioAnterior && await leeUsuarioDB(usuarioValor)) {
		return `El usuario "${usuarioValor}" ya está registrado.`;
	}

	if (telefonoValor && !PATRON_TELEFONO.test(telefonoValor)) {
		return "Teléfono no válido (9 o 10 dígitos; empieza por 5-9).";
	}

	if (emailValor && !PATRON_EMAIL.test(emailValor)) {
		return "Email no válido.";
	}

	if (cpValor && !PATRON_CP.test(cpValor)) {
		return "Código postal no válido (5 dígitos).";
	}

	return "";
}


function usuarioGuardar(nombreValor, usuarioValor, passwordValor, telefonoValor, emailValor, calleValor, cpValor, ciudadValor, provinciaValor, imagenValor) {
	return {
		nombre: nombreValor,
		usuario: usuarioValor,
		password: passwordValor,
		telefono: telefonoValor || "5551234567",
		email: emailValor || "sin-email@ejemplo.com",
		direccion: {
			calle: calleValor || "Sin calle",
			cp: cpValor || "00000",
			ciudad: ciudadValor || "Sin ciudad",
			provincia: provinciaValor || "Sin provincia",
		},
		imagen: imagenValor,
	};
}

listarUsuarios();

formRegistro.addEventListener("submit", async (e) => {
	e.preventDefault();

	const aviso = await mensajeValidacion(
		usuario.value.trim(),
		password.value.trim(),
		telefono.value.trim(),
		email.value.trim(),
		cp.value.trim(),
		""
	);

	if (aviso) {
		mensaje.textContent = aviso;
		return;
	}

	const dataURL = imagen.files[0] || (imagenAnterior || FOTO_DEFECTO);

	const user = usuarioGuardar(
		nombre.value.trim(),
		usuario.value.trim(),
		password.value.trim(),
		telefono.value.trim(),
		email.value.trim(),
		calle.value.trim(),
		cp.value.trim(),
		ciudad.value.trim(),
		provincia.value.trim(),
		dataURL
	);

	await guardaUsuarioDB(user);

	imagen.value = "";
	imagenAnterior = ""
	vistaPrevia.removeAttribute("src");
	vistaPrevia.hidden = true;

	mensaje.textContent = `Usuario "${user.usuario}" registrado correctamente.`;
	await listarUsuarios();

});

async function listarUsuarios() {
	const usuarios = await leeUsuariosDB();
	tbody.textContent = "";

	if (usuarios.length === 0) {
		const tr = document.createElement("tr");
		const td = document.createElement("td");
		td.colSpan = 3;
		td.textContent = "No hay usuarios registrados.";
		tr.appendChild(td);
		tbody.appendChild(tr);
		return;
	}

	usuarios.forEach((user) => {
		const tr = document.createElement("tr");

		const tdImagen = document.createElement("td");
		const foto = user.imagen ||  FOTO_DEFECTO;
		const imagen = document.createElement("img");
		imagen.src = typeof foto === "string" ? foto : URL.createObjectURL(foto);
		imagen.alt = user.usuario;
		tdImagen.appendChild(imagen);

		const tdAcciones = document.createElement("td");

		const btnEditar = document.createElement("button");
		btnEditar.type = "button";
		btnEditar.textContent = "Editar";
		btnEditar.addEventListener("click", () => editarUsuario(user));

		const btnBorrar = document.createElement("button");
		btnBorrar.type = "button";
		btnBorrar.textContent = "Borrar";
		btnBorrar.addEventListener("click", () => borrarUsuario(user));

		tdAcciones.appendChild(btnEditar);
		tdAcciones.appendChild(document.createTextNode(" "));
		tdAcciones.appendChild(btnBorrar);

		tr.appendChild(tdImagen);
		tr.appendChild(crearCelda(user.nombre));
		tr.appendChild(crearCelda(user.usuario));
		tr.appendChild(crearCelda(user.password));
		tr.appendChild(crearCelda(user.telefono));
		tr.appendChild(crearCelda(user.email));
		tr.appendChild(crearCelda(user.direccion.calle));
		tr.appendChild(crearCelda(user.direccion.cp));
		tr.appendChild(crearCelda(user.direccion.ciudad));
		tr.appendChild(crearCelda(user.direccion.provincia));
		tr.appendChild(tdAcciones);
		tbody.appendChild(tr);
	});
}


function crearCelda(contenido) {
	const td = document.createElement("td");
	td.textContent = contenido || "";
	return td;
}

function editarUsuario(user) {
	if (user.usuario == sesion.usuario) {
		mensaje.innerHTML = `El usuario: "${user.usuario}" tiene la sesión abierta.<br>No se puede editar`;
		setTimeout(() => {
			mensaje.textContent = "";
		}, 1500);
		return;
	}

	let fila;
	tbody.querySelectorAll("tr").forEach((tr) => {
		if (tr.children[2] && tr.children[2].textContent == user.usuario) fila = tr;
	});

	const archivo = document.createElement("input");
	archivo.type = "file";
	archivo.accept = "image/*";
	fila.children[0].appendChild(archivo);

	for (let i = 1; i < fila.children.length - 1; i++) {
		const campo = document.createElement("input");
		campo.value = fila.children[i].textContent;
		fila.children[i].textContent = "";
		fila.children[i].appendChild(campo);
	}

	const acciones = fila.children[fila.children.length - 1];
	acciones.textContent = "";

	const btnGrabar = document.createElement("button");
	btnGrabar.type = "button";
	btnGrabar.textContent = "Grabar";
	btnGrabar.addEventListener("click", () => grabarFila(user, fila));
	acciones.appendChild(btnGrabar);
}

async function grabarFila(user, fila) {
	const campos = [];
	for (let i = 1; i < fila.children.length - 1; i++) {
		campos.push(fila.children[i].querySelector("input"));
	}

	const aviso = await mensajeValidacion(
		campos[1].value.trim(),
		campos[2].value.trim(),
		campos[3].value.trim(),
		campos[4].value.trim(),
		campos[6].value.trim(),
		user.usuario
	);
	if (aviso) {
		mensaje.textContent = aviso;
		return;
	}

	const archivo = fila.children[0].querySelector("input");
	const imagenValor = archivo.files[0] || user.imagen;

	const actualizado = usuarioGuardar(
		campos[0].value.trim(),
		campos[1].value.trim(),
		campos[2].value.trim(),
		campos[3].value.trim(),
		campos[4].value.trim(),
		campos[5].value.trim(),
		campos[6].value.trim(),
		campos[7].value.trim(),
		campos[8].value.trim(),
		imagenValor
	);

	if (actualizado.usuario != user.usuario) {
		await borraUsuarioDB(user.usuario);
	}
	await guardaUsuarioDB(actualizado);
	mensaje.textContent = `Usuario "${actualizado.usuario}" actualizado.`;
	await listarUsuarios();
}

async function borrarUsuario(user) {
	if (user.usuario == sesion.usuario) {
		mensaje.innerHTML = `El usuario: "${user.usuario}" tiene la sesión abierta.<br>No se puede borrar`;
		setTimeout(() => {
			mensaje.textContent = "";
		}, 1500);
		return;
	} else {
		await borraUsuarioDB(user.usuario);
		mensaje.textContent = `Usuario "${user.usuario}" borrado.`;
		await listarUsuarios();
	}
}

