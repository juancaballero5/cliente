"use strict";

const ALMACEN_EJERCICIO = "040a4-Usuarios-imagen-Base64"; // { ana: { usuario, password }, admin: { ... } }

function guardaUsuarioEjercicio(user) { // jota: { nombre: Jose, usuario: jota, password: dejame, (resto de campos) }
  const usuarios = JSON.parse(localStorage.getItem(ALMACEN_EJERCICIO)) || {}; // { ... || (nada) }
  usuarios[user.usuario] = user;
  localStorage.setItem(ALMACEN_EJERCICIO, JSON.stringify(usuarios));
}

function leeUsuarioEjercicio(usuario) {
  const usuarios = JSON.parse(localStorage.getItem(ALMACEN_EJERCICIO)) || {}; // { ... || (nada) }
  return usuarios[usuario]; // undefined, si no lo encuentra
}

function leeUsuariosEjercicio() {
  return JSON.parse(localStorage.getItem(ALMACEN_EJERCICIO)) || {};
}

function borraUsuarioEjercicio(usuario) {
  const usuarios = JSON.parse(localStorage.getItem(ALMACEN_EJERCICIO)) || {}; // { ... || (nada) }
  const user = usuarios[usuario];
  delete usuarios[usuario]; // no sé que devuelve si no lo encuentra
  localStorage.setItem(ALMACEN_EJERCICIO, JSON.stringify(usuarios));
  return user; // undefined, si no lo encuentra
}
