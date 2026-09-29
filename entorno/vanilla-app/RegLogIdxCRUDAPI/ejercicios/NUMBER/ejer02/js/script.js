"use strict"

const num1 = document.getElementById("num1"); // NÚMERO

const toBinario = document.getElementById("toBinario"); // BOTONES
const toOctal = document.getElementById("toOctal");
const toHexa = document.getElementById("toHexa");

const bases = document.getElementById("bases"); // RESULTADO

// FUNCIONES PARA CONVERTIR DE DECIMAL A BASES
toBinario.addEventListener("click", function (event) {
    bases.innerHTML = parseInt(num1.value).toString(2);
});

toOctal.addEventListener("click", function (event) {
    bases.innerHTML = parseInt(num1.value).toString(8);
});

toHexa.addEventListener("click", function (event) {
    bases.innerHTML = parseInt(num1.value).toString(16);
});

// -------------------*******-------------------
const copiar = document.getElementById("copiar");

// BOTÓN COPIAR
copiar.addEventListener("click", function (event) {
    num2.value = bases.innerHTML;
});
// -------------------*******-------------------

const num2 = document.getElementById("num2"); // NÚMERO

const fromBinario = document.getElementById("fromBinario"); // BOTONES
const fromOctal = document.getElementById("fromOctal");
const fromHexa = document.getElementById("fromHexa");

const decimal = document.getElementById("decimal"); // RESULTADO

// FUNCIONES PARA CONVERTIR DE BASES A DECIMAL
fromBinario.addEventListener("click", function (event) {
    decimal.innerHTML = parseInt(num2.value, 2);
});

fromOctal.addEventListener("click", function (event) {
    decimal.innerHTML = parseInt(num2.value, 8);
});

fromHexa.addEventListener("click", function (event) {
    decimal.innerHTML = parseInt(num2.value, 16);
});