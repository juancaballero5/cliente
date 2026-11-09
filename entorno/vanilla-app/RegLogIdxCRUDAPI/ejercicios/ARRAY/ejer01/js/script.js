"use strict"

const dimension = document.getElementById("dimension");

const generar = document.getElementById("generar");
const sumar = document.getElementById("sumar");
const restar = document.getElementById("restar");
const multiplicar = document.getElementById("multiplicar");

const salidaMA = document.getElementById("salidaMA");
const salidaMB = document.getElementById("salidaMB");
const salidaR = document.getElementById("salidaR");
let matrizA = [];
let matrizB = [];

generar.addEventListener("click", function () {
    matrizA = generaMatriz(parseInt(dimension.value));
    matrizA = rellena(matrizA);
/*     salidaMA.innerHTML = "";
    salidaMA.innerHTML = mostrarMatriz(matrizA); */
    salidaMA.replaceChildren(mostrarMatriz(matrizA));

    matrizB = generaMatriz(parseInt(dimension.value));
    matrizB = rellena(matrizB);
/*     salidaMB.innerHTML = "";
    salidaMB.innerHTML = mostrarMatriz(matrizB); */
    salidaMB.replaceChildren(mostrarMatriz(matrizB));
});

sumar.addEventListener("click", function () {
    let matrizR = sumarMatrices(matrizA, matrizB);
/*     salidaR.innerHTML = "";
    salidaR.innerHTML = mostrarMatriz(matrizR); */
    salidaR.replaceChildren(mostrarMatriz(matrizR));
});

restar.addEventListener("click", function () {
    let matrizR = restarMatrices(matrizA, matrizB);
/*     salidaR.innerHTML = "";
    salidaR.innerHTML = mostrarMatriz(matrizR); */
    salidaR.replaceChildren(mostrarMatriz(matrizR));
})

multiplicar.addEventListener("click", function () {
    let matrizR = multiplicarMatrices(matrizA, matrizB);
/*     salidaR.innerHTML = "";
    salidaR.innerHTML = mostrarMatriz(matrizR); */
    salidaR.replaceChildren(mostrarMatriz(matrizR));
})