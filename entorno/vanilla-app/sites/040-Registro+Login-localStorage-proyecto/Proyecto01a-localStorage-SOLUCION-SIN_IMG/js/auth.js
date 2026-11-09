"use strict";

const ALMACEN_USUARIOS = "usuarios"; // { jota: { nombre, usuario, password, ... }, ... }

function guardaUsuario(user) { // jota: { nombre: Jose, usuario: jota, password: dejame, (resto de campos) }
  const usuarios = JSON.parse(localStorage.getItem(ALMACEN_USUARIOS)) || {}; // { ... || (nada) }
  usuarios[user.usuario] = user;
  localStorage.setItem(ALMACEN_USUARIOS, JSON.stringify(usuarios));
}

function leeUsuario(usuario) {
  const usuarios = JSON.parse(localStorage.getItem(ALMACEN_USUARIOS)) || {}; // { ... || (nada) }
  return usuarios[usuario]; // undefined, si no lo encuentra
}

function leeUsuarios() {
  return JSON.parse(localStorage.getItem(ALMACEN_USUARIOS)) || {};
}

function borraUsuario(usuario) {
  const usuarios = JSON.parse(localStorage.getItem(ALMACEN_USUARIOS)) || {}; // { ... || (nada) }
  const user = usuarios[usuario];
  delete usuarios[usuario]; // no sé que devuelve si no lo encuentra
  localStorage.setItem(ALMACEN_USUARIOS, JSON.stringify(usuarios));
  return user; // undefined, si no lo encuentra
}

const ALMACEN_SESION = "sesion"; // { usuario: "ana" }

function guardaSesion(usuarioSesion) {
  const sesion = JSON.parse(localStorage.getItem(ALMACEN_SESION)) || {}; // { ... || (nada) }
  sesion['usuario'] = usuarioSesion;
  localStorage.setItem(ALMACEN_SESION, JSON.stringify(sesion));
}

function leeSesion() {
  const sesion = JSON.parse(localStorage.getItem(ALMACEN_SESION)) || {}; // { ... || (nada) }
  return sesion['usuario']; // undefined, si no lo encuentra
}

function borraSesion() {
  const sesion = JSON.parse(localStorage.getItem(ALMACEN_SESION)) || {}; // { ... || (nada) }
  const usuario = sesion['usuario'];
  delete sesion['usuario']; // no sé que devuelve si no lo encuentra
  localStorage.setItem(ALMACEN_SESION, JSON.stringify(sesion));
  return usuario; // undefined, si no lo encuentra
}

