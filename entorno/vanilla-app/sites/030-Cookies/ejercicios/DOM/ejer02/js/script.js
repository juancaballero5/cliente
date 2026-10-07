"use strict";

const botonClase = document.getElementById("btnClase");
const botonEtiqueta = document.getElementById("btnEtiqueta");

botonClase.onclick = resaltarParrafos;
botonEtiqueta.onclick = resaltarTitulos;

function resaltarParrafos() {
    const parrafos = document.getElementsByClassName("texto");
    for (let i = 0; i < parrafos.length; i++) {
        parrafos[i].style.backgroundColor = "#ffffcc";
        parrafos[i].style.border = "1px solid #ccc";
        parrafos[i].style.padding = "5px";
    }
}

function resaltarTitulos() {
    const titulos = document.getElementsByTagName("h2");
    for (let i = 0; i < titulos.length; i++) {
        titulos[i].style.color = "darkred";
        titulos[i].style.textDecoration = "underline";
        titulos[i].style.textDecorationThickness = "4px";
    }
}
