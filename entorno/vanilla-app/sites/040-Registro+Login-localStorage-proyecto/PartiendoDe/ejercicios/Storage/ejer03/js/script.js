"use strict";

const image = document.getElementById("image");
const tryIt1 = document.getElementById("tryIt1");
const tryIt2 = document.getElementById("tryIt2");
const tryIt3 = document.getElementById("tryIt3");
const tryIt4 = document.getElementById("tryIt4");
const resultado = document.getElementById("resultado");

lecturaAlCargar();

function limpiarResultado() {
  resultado.innerHTML = "";
  borraFotoEjercicio();
}

function lecturaAlCargar() {
  const guardado = leeFotoEjercicio();

  if (!guardado) {
    resultado.textContent = "No hay ninguna imagen guardada.";
    return;
  }

  const img = document.createElement("img");
  img.src = guardado;
  img.style.width = "120px";
  img.style.height = "auto";

  resultado.innerHTML = "<p>Intentando cargar la imagen guardada previamente:</p>";
  resultado.appendChild(img);
}


