"use strict";

/** Guarda un usuario: la clave es user.usuario; el valor es el objeto en JSON. */
function guardarUsuarioPorClave(user) {
  localStorage.setItem(user.usuario, JSON.stringify(user));
}

/** Devuelve los usuarios guardados (1 clave = 1 usuario). */
function leerUsuariosPorClave() {
  const usuarios = [];

  for (let i = 0; i < localStorage.length; i++) {
    const clave = localStorage.key(i);
    const valor = localStorage.getItem(clave);
    try {
      const user = JSON.parse(valor);
      if (!user || typeof user !== "object" || typeof user.usuario !== "string") {
        continue;
      }
      usuarios.push(user);
    } catch {
      // El valor no es un JSON válido; se ignora esta clave.
    }
  }

  return usuarios;
}

/** Devuelve el objeto usuario de esa clave, o null si no existe / no es JSON válido. */
function getUsuarioPorClave(clave) {
  const valor = localStorage.getItem(clave);
  if (!valor) {
    return null;
  }
  try {
    const user = JSON.parse(valor);
    if (!user || typeof user !== "object" || typeof user.usuario !== "string") {
      return null;
    }
    return user;
  } catch {
    return null;
  }
}

/** Borra la entrada cuya clave es el nombre de usuario. */
function borrarUsuarioPorClave(usuario) {
  const user = getUsuarioPorClave(usuario);
  if (user) {
    localStorage.removeItem(usuario);
  }
  return user;
}
