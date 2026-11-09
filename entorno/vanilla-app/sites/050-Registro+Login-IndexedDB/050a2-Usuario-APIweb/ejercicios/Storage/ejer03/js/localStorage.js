"use strict";

const ALMACEN_EJERCICIO = "040a3-Imagen-FileReader";

function guardaFotoEjercicio(valor) {
  localStorage.setItem(ALMACEN_EJERCICIO, valor);
}

function leeFotoEjercicio() {
  return localStorage.getItem(ALMACEN_EJERCICIO);
}

function borraFotoEjercicio() {
  localStorage.removeItem(ALMACEN_EJERCICIO);
}
