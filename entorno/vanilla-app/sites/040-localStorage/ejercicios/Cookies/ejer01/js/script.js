"use strict";

const mostrarBtn = document.getElementById("mostrarBtn");
const ocultarBtn = document.getElementById("ocultarBtn");
const mensaje = document.getElementById("mensaje");

mostrarBtn.addEventListener("click", () => {
    mensaje.style.display = "block";
});

ocultarBtn.addEventListener("click", () => {
    mensaje.style.display = "none";
});