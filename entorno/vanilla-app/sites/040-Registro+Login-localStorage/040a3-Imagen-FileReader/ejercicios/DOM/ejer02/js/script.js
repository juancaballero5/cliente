"use strict";

const botonClase = document.getElementById("btnClase");
const botonEtiqueta = document.getElementById("btnEtiqueta");

botonClase.addEventListener("click", () => {
  const parrafos = document.getElementsByClassName("texto");
  for (let i = 0; i < parrafos.length; i++) {
    parrafos[i].style.backgroundColor = "#ffffcc";
    parrafos[i].style.border = "1px solid #ccc";
    parrafos[i].style.padding = "5px";
  }
});

botonEtiqueta.addEventListener("click", () => {
  const titulos = document.getElementsByTagName("h2");
  for (let i = 0; i < titulos.length; i++) {
    titulos[i].style.color = "darkred";
    titulos[i].style.textDecoration = "underline";
  }
});
