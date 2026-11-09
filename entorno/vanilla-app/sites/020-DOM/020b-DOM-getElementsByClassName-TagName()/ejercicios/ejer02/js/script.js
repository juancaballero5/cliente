"use strict";

const botonClase = document.getElementById("btnClase");
const botonEtiqueta = document.getElementById("btnEtiqueta");

botonClase.addEventListener("click", () => {
  const parrafos = document.getElementsByClassName("texto");
  console.log(parrafos); // es una Collección y no es iterable
  /*   for (let i = 0; i < parrafos.length; i++) {
      parrafos[i].style.backgroundColor = "#ffffcc";
      parrafos[i].style.border = "1px solid #ccc";
      parrafos[i].style.padding = "5px";
    } */
  // Con Array.from()
  /*   Array.from(parrafos).forEach(parrafo => {
      parrafo.style.backgroundColor = "#ffffcc";
      parrafo.style.border = "1px solid #ccc";
      parrafo.style.padding = "5px";
    }); */
  // O con el operador spread ([...])
  [...parrafos].forEach(parrafo => {
    parrafo.style.backgroundColor = "#ffffcc";
    parrafo.style.border = "1px solid #ccc";
    parrafo.style.padding = "5px";
  });
});

botonEtiqueta.addEventListener("click", () => {
  const titulos = document.getElementsByTagName("h2");
  console.log(titulos); // es una Collección y no es iterable
  /*   for (let i = 0; i < titulos.length; i++) {
      titulos[i].style.color = "darkred";
      titulos[i].style.textDecoration = "underline";
    } */
  // Con Array.from()
  /*   Array.from(titulos).forEach(titulo => {
      titulo.style.color = "darkred";
      titulo.style.textDecoration = "underline";
    }); */
  // O con el operador spread ([...])
  [...titulos].forEach(titulo => {
    titulo.style.color = "darkred";
    titulo.style.textDecoration = "underline";
  });
});
