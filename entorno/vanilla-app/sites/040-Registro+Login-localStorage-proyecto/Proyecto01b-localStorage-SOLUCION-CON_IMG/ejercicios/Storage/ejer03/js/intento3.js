"use strict";

tryIt3.addEventListener("click", () => {
  limpiarResultado();

  const archivo = image.files[0];
  if (!archivo) {
    resultado.textContent = "Selecciona una imagen antes de guardar.";
    return;
  }

  const urlTemporal = URL.createObjectURL(archivo);
  guardaFoto(urlTemporal);

  const guardado = leeFoto();

  const img = document.createElement("img");
  img.src = guardado;
  img.width = 120;

  resultado.innerHTML = `<p>Guardada URL temporal: ${urlTemporal}</p>`;
  resultado.appendChild(img);
});
