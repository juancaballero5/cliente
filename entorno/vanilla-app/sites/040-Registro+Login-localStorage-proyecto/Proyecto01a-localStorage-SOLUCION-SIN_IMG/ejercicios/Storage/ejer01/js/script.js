"use strict";

const PATRON_USUARIO = /^[a-z][a-z0-9_]{2,15}$/;
const PATRON_PASSWORD = /^.{4,20}$/;
const PATRON_TELEFONO = /^[6-9]\d{8}$/;

const nombre = document.getElementById("nombre");
const usuario = document.getElementById("usuario");
const password = document.getElementById("password");
const telefono = document.getElementById("telefono");
const guardar = document.getElementById("guardar");
const leer = document.getElementById("leer");
const borrar = document.getElementById("borrar");
const resultado = document.getElementById("resultado");

listarUsuarios();

guardar.addEventListener("click", () => {
  const nombreValor = nombre.value.trim();
  const usuarioValor = usuario.value.trim();
  const passwordValor = password.value.trim();
  const telefonoValor = telefono.value.trim();

  if (!PATRON_USUARIO.test(usuarioValor)) {
    resultado.textContent =
      "Usuario no válido (minúsculas, números o _; 3-16 caracteres; empieza por letra).";
    return;
  }

  if (!PATRON_PASSWORD.test(passwordValor)) {
    resultado.textContent = "Contraseña no válida (entre 4 y 20 caracteres).";
    return;
  }

  if (telefonoValor && !PATRON_TELEFONO.test(telefonoValor)) {
    resultado.textContent = "Teléfono no válido (9 dígitos; empieza por 6-9).";
    return;
  }

  const user = {
    nombre: nombreValor,
    usuario: usuarioValor,
    password: passwordValor,
    telefono: telefonoValor || "5551234567",
  };

  guardarUsuarioPorClave(user);
  listarUsuarios();
});

leer.addEventListener("click", () => {
  const clave = usuario.value.trim();
  if (!clave) {
    resultado.textContent = "Escribe el usuario que quieres leer.";
  } else {
    const user = getUsuarioPorClave(clave);
    if (user) {
      resultado.innerHTML =
        `<b>${user.nombre}</b> ${user.usuario} - ${user.telefono}<br>`;
    } else {
      resultado.textContent = "No existe ese usuario.";
    }
  }
  setTimeout(() => {
    listarUsuarios();
  }, 1500);
});

borrar.addEventListener("click", () => {
  const clave = usuario.value.trim();
  if (!clave) {
    resultado.textContent = "Escribe el usuario que quieres borrar.";
  } else {
    const user = borrarUsuarioPorClave(clave);
    if (user) {
      resultado.innerHTML = `Usuario "<b>${user.usuario}</b>" borrado.`;
    } else {
      resultado.textContent = "No existe ese usuario.";
    }
  }
  setTimeout(() => {
    listarUsuarios();
  }, 1500);
});

function listarUsuarios() {
  let listado = "Usuarios guardados (1 clave = 1 usuario):<br>";
  const usuarios = leerUsuariosPorClave();
  if (usuarios.length === 0) {
    resultado.innerHTML = listado + "No hay usuarios guardados.";
  } else {
    usuarios.forEach((user) => {
      listado += `<b>${user.nombre}</b> ${user.usuario} - ${user.telefono}<br>`;
    });
    resultado.innerHTML = listado;
  }
}
