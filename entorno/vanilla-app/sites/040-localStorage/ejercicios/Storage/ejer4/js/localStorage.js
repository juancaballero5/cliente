"use strict";

const ALMACEN = "usuarios"; // { ana: { usuario, password }, admin: { ... } }

function guardaUsuario(user) { // jota: { nombre: Jose, usuario: jota, password: dejame, (resto de campos) }
    const usuarios = JSON.parse(localStorage.getItem(ALMACEN)) || {}; // { ... || (nada) }
    usuarios[user.usuario] = user;
    localStorage.setItem(ALMACEN, JSON.stringify(usuarios));
}

function leeUsuario(usuario) {
    const usuarios = JSON.parse(localStorage.getItem(ALMACEN)) || {}; // { ... || (nada) }
    return usuarios[usuario]; // undefined, si no lo encuentra
}

function leeUsuarios() {
    return JSON.parse(localStorage.getItem(ALMACEN)) || {};
}

function borraUsuario(usuario) {
    const usuarios = JSON.parse(localStorage.getItem(ALMACEN)) || {}; // { ... || (nada) }
    const user = usuarios[usuario];
    delete usuarios[usuario]; // no sé que devuelve si no lo encuentra
    localStorage.setItem(ALMACEN, JSON.stringify(usuarios));
    return user; // undefined, si no lo encuentra
}
