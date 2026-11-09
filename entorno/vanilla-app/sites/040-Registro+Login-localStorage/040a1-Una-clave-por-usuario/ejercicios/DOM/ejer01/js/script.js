"use strict";

const asignaF = document.getElementById("asignaF");
const defineF = document.getElementById("defineF");
const escucha = document.getElementById("escucha");
const enLlamada = document.getElementById("enLlamada");
const Farrow = document.getElementById("Farrow");
const variableE = document.getElementById("variableE");
const resultado = document.getElementById("resultado");

// Se asigna una función con nombre directamente a la propiedad del evento en el
// objeto del DOM
asignaF.onclick = mostrarAsingarF;

function mostrarAsingarF() {
  console.log("Asignando una función");
  resultado.textContent = "¡Has pulsado el botón correctamente!";
}

// Definiendo la función directamente sin asignarle un nombre global
defineF.onclick = function () {
  console.log("Definiendo función directamente");
  resultado.textContent = "¡Has pulsado el botón correctamente!";
};

// Estándar moderno. addEventListener permite vincular múltiples escuchadores al
// mismo evento sin sobrescribir los anteriores
escucha.addEventListener("click", mostrarEscucha);

function mostrarEscucha() {
  console.log("Estandar Moderno. Multiples escuchadores, que no manejadores");
  resultado.textContent = "¡Has pulsado el botón correctamente!";
}

// Definiendo la función dentro de la llamada en lugar de referenciar una
// función externa
enLlamada.addEventListener("click", function () {
  console.log("Función en la llamada");
  resultado.textContent = "¡Has pulsado el botón correctamente!";
});

// Es la forma más moderna y común en el desarrollo actual con JavaScript (ES6+)
Farrow.addEventListener("click", () => {
  console.log(this);
  console.log("Funciones arrow");
  resultado.textContent = "¡Has pulsado el botón correctamente!";
});

// Accediendo al botón a través del evento en una arrow function
variableE.addEventListener("click", (e) => {
  console.log(e);
  console.log("Usando la variable de evento (e)");
  e.currentTarget.textContent = "¡Cambiado!";
  resultado.textContent = "¡Has pulsado el botón correctamente!";
});
