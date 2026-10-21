"use strict";

const boton = document.getElementById("boton");
const resultado = document.getElementById("resultado");

boton.addEventListener('click', () => {
    console.log(boton);
})

boton.onclick = mostrar;
function mostrar() {
    resultado.textContent = "¡Has pulsado el botón correctamente!";
}

