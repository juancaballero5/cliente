"use strict";

const FOTO = "fotoUsuario";

function guardaFoto(valor) {
  localStorage.setItem(FOTO, valor);
}

function leeFoto() {
  return localStorage.getItem(FOTO);
}

function borraFoto() {
  localStorage.removeItem(FOTO);
}
