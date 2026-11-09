"use strict";

const PATRON_USUARIO = /^[a-z][a-z0-9_]{2,15}$/;
const PATRON_PASSWORD = /^.{4,20}$/;
const PATRON_TELEFONO = /^[5-9]\d{8,9}$/;
const PATRON_EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PATRON_CP = /^\d{5}$/;
const FOTO_DEFECTO = "/040-Registro+Login-localStorage/040e-Sesion-admin+usuarios/img/user.png";

const formulario = document.getElementById("formRegistro");
const mensaje = document.getElementById("mensaje");
const nombre = document.getElementById("nombre");
const usuario = document.getElementById("usuario");
const password = document.getElementById("password");
const telefono = document.getElementById("telefono");
const email = document.getElementById("email");
const calle = document.getElementById("calle");
const cp = document.getElementById("cp");
const ciudad = document.getElementById("ciudad");
const provincia = document.getElementById("provincia");
const imagen = document.getElementById("imagen");
const vistaPrevia = document.getElementById("vistaPrevia");
const tbody = document.querySelector("#tablaUsuarios tbody");
let imagenGuardada = "";

function fileToDataURL(file) {
  return new Promise((resolve, reject) => {
    const lector = new FileReader();
    lector.onload = () => resolve(lector.result);
    lector.onerror = () => reject("Error al leer el archivo");
    lector.readAsDataURL(file);
  });
}

listarUsuarios();

formulario.addEventListener("submit", async (e) => {
  e.preventDefault();

  const nombreValor = nombre.value.trim();
  const usuarioValor = usuario.value.trim();
  const passwordValor = password.value.trim();
  const telefonoValor = telefono.value.trim();
  const emailValor = email.value.trim();
  const calleValor = calle.value.trim();
  const cpValor = cp.value.trim();
  const ciudadValor = ciudad.value.trim();
  const provinciaValor = provincia.value.trim();
  const archivo = imagen.files[0];

  if (!PATRON_USUARIO.test(usuarioValor)) {
    mensaje.textContent =
      "Usuario no válido (minúsculas, números o _; 3-16 caracteres; empieza por letra).";
    return;
  }

  if (!PATRON_PASSWORD.test(passwordValor)) {
    mensaje.textContent = "Contraseña no válida (entre 4 y 20 caracteres).";
    return;
  }

  if (leeUsuario(usuarioValor)) {
    mensaje.textContent = `El usuario "${usuarioValor}" ya está registrado.`;
    return;
  }

  if (telefonoValor && !PATRON_TELEFONO.test(telefonoValor)) {
    mensaje.textContent = "Teléfono no válido (9 o 10 dígitos; empieza por 5-9).";
    return;
  }

  if (emailValor && !PATRON_EMAIL.test(emailValor)) {
    mensaje.textContent = "Email no válido.";
    return;
  }

  if (cpValor && !PATRON_CP.test(cpValor)) {
    mensaje.textContent = "Código postal no válido (5 dígitos).";
    return;
  }

  const dataURL = archivo ? await fileToDataURL(archivo) : (imagenGuardada || FOTO_DEFECTO);

  const user = {
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
    imagen: dataURL,
  };

  guardaUsuario(user);
  imagenGuardada = "";
  imagen.value = "";
  vistaPrevia.hidden = true;
  vistaPrevia.removeAttribute("src");
  mensaje.textContent = `Usuario "${usuarioValor}" registrado correctamente.`;
  listarUsuarios();
});

function listarUsuarios() {
  pintarTabla(Object.values(leeUsuarios()));
}

function pintarTabla(usuarios) {
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

  usuarios.forEach((cuenta) => {
    const tr = document.createElement("tr");

    const tdUsuario = document.createElement("td");
    tdUsuario.textContent = cuenta.usuario;

    const tdPassword = document.createElement("td");
    tdPassword.textContent = cuenta.password;

    const tdAcciones = document.createElement("td");

    const btnEditar = document.createElement("button");
    btnEditar.type = "button";
    btnEditar.textContent = "Editar";
    btnEditar.addEventListener("click", () => editarUsuario(cuenta));

    const btnBorrar = document.createElement("button");
    btnBorrar.type = "button";
    btnBorrar.textContent = "Borrar";
    btnBorrar.addEventListener("click", () => borrarUsuario(cuenta));

    tdAcciones.appendChild(btnEditar);
    tdAcciones.appendChild(document.createTextNode(" "));
    tdAcciones.appendChild(btnBorrar);

    tr.appendChild(tdUsuario);
    tr.appendChild(tdPassword);
    tr.appendChild(tdAcciones);
    tbody.appendChild(tr);
  });
}

function editarUsuario(user) {
  const dir = user.direccion || {};
  nombre.value = user.nombre || "";
  usuario.value = user.usuario;
  password.value = user.password || "";
  telefono.value = user.telefono || "";
  email.value = user.email || "";
  calle.value = dir.calle || "";
  cp.value = dir.cp || "";
  ciudad.value = dir.ciudad || "";
  provincia.value = dir.provincia || "";
  imagen.value = "";
  imagenGuardada = user.imagen || "";
  if (imagenGuardada) {
    vistaPrevia.src = imagenGuardada;
    vistaPrevia.hidden = false;
  } else {
    vistaPrevia.hidden = true;
    vistaPrevia.removeAttribute("src");
  }
  borraUsuario(user.usuario);
  mensaje.innerHTML = `Usuario "${user.usuario}" cargado para actualizar.<br>Pulsa Registrar cuando termines.`;
  listarUsuarios();
}

function borrarUsuario(user) {
  if (!window.confirm(`¿Borrar al usuario "${user.usuario}"?`)) {
    return;
  }
  borraUsuario(user.usuario);
  mensaje.textContent = `Usuario "${user.usuario}" borrado.`;
  listarUsuarios();
}
