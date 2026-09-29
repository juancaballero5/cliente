"use strict";

// Captura de elementos
const dimension = document.getElementById("dimension");
const inferior = document.getElementById("inferior");
const superior = document.getElementById("superior");
const matrizA = document.getElementById("matrizA");
const matrizB = document.getElementById("matrizB");
const matrizC = document.getElementById("matrizC");

// Eventos principales
document.getElementById("valores").addEventListener("click", valoresAleatorios);
document.getElementById("genera").addEventListener("click", generarMatrices);

document.getElementById("suma").addEventListener("click", () => {
    mostrarResultado(sumarMatrices(window._matrizA, window._matrizB));
});
document.getElementById("resta").addEventListener("click", () => {
    mostrarResultado(restarMatrices(window._matrizA, window._matrizB));
});
document.getElementById("multiplica").addEventListener("click", () => {
    mostrarResultado(multiplicarMatrices(window._matrizA, window._matrizB));
});

// Función para generar valores aleatorios
function valoresAleatorios() {
    dimension.value = aleatorio(2, 5);       // Tamaños moderados
    inferior.value = aleatorio(-10, 0);
    superior.value = aleatorio(1, 10);
}

// Genera y muestra las matrices
function generarMatrices() {
    const n = parseInt(dimension.value);
    const min = parseInt(inferior.value);
    const max = parseInt(superior.value);
    console.log(n, min, max);

    window._matrizA = rellena(generaMatriz(n), min, max);
    window._matrizB = rellena(generaMatriz(n), min, max);

    matrizA.replaceChildren(mostrarMatriz(window._matrizA));
    matrizB.replaceChildren(mostrarMatriz(window._matrizB));
    matrizC.innerHTML = "";
}

// Muestra el resultado de la operación
function mostrarResultado(matrizR) {
    matrizC.replaceChildren(mostrarMatriz(matrizR));
}

document.getElementById("aleatorio").addEventListener("click", empezar);
document.getElementById("parar").addEventListener("click", parar);
document.getElementById("rapido").addEventListener("click", masRapido);
document.getElementById("lento").addEventListener("click", masLento);
