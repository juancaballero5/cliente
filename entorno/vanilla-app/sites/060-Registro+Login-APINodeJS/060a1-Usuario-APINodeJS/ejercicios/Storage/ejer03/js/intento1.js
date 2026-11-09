"use strict";

tryIt1.addEventListener("click", () => {
  limpiarResultado();

  const ruta = image.value.trim();
  if (!ruta) {
    resultado.textContent = "Selecciona una imagen antes de guardar.";
    return;
  }

  guardaFotoEjercicio(ruta);

  const guardado = leeFotoEjercicio();

  const img = document.createElement("img");
  img.src = guardado;
  img.width = 120;

  resultado.innerHTML = `<p>Guardada la ruta: ${ruta}</p>`;
  resultado.appendChild(img);
});
