"use strict";

const ALMACEN_USUARIOS = "usuarios"; // { jota: { nombre, usuario, password, ... }, ... }

function guardaUsuarioStorage(user) { // jota: { nombre: Jose, usuario: jota, password: dejame, (resto de campos) }
  const usuarios = JSON.parse(localStorage.getItem(ALMACEN_USUARIOS)) || {}; // { ... || (nada) }
  usuarios[user.usuario] = user;
  localStorage.setItem(ALMACEN_USUARIOS, JSON.stringify(usuarios));
}

function leeUsuarioStorage(usuario) {
  const usuarios = JSON.parse(localStorage.getItem(ALMACEN_USUARIOS)) || {}; // { ... || (nada) }
  return usuarios[usuario]; // undefined, si no lo encuentra
}

function leeUsuariosStorage() {
  return JSON.parse(localStorage.getItem(ALMACEN_USUARIOS)) || {};
}

function borraUsuarioStorage(usuario) {
  const usuarios = JSON.parse(localStorage.getItem(ALMACEN_USUARIOS)) || {}; // { ... || (nada) }
  const user = usuarios[usuario];
  delete usuarios[usuario]; // no sé que devuelve si no lo encuentra
  localStorage.setItem(ALMACEN_USUARIOS, JSON.stringify(usuarios));
  return user; // undefined, si no lo encuentra
}

const ALMACEN_SESION = "sesion"; // { usuario: "ana" }

function guardaSesionStorage(usuarioSesion) {
  const sesion = JSON.parse(localStorage.getItem(ALMACEN_SESION)) || {}; // { ... || (nada) }
  sesion['usuario'] = usuarioSesion;
  localStorage.setItem(ALMACEN_SESION, JSON.stringify(sesion));
}

function leeSesionStorage() {
  const sesion = JSON.parse(localStorage.getItem(ALMACEN_SESION)) || {}; // { ... || (nada) }
  return sesion['usuario']; // undefined, si no lo encuentra
}

function borraSesionStorage() {
  const sesion = JSON.parse(localStorage.getItem(ALMACEN_SESION)) || {}; // { ... || (nada) }
  const usuario = sesion['usuario'];
  delete sesion['usuario']; // no sé que devuelve si no lo encuentra
  localStorage.setItem(ALMACEN_SESION, JSON.stringify(sesion));
  return usuario; // undefined, si no lo encuentra
}

