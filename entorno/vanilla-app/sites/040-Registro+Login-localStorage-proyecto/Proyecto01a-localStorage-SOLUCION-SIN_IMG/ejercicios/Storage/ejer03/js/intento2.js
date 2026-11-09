"use strict";

tryIt2.addEventListener("click", () => {
  limpiarResultado();

  const archivo = image.files[0];
  if (!archivo) {
    resultado.textContent = "Selecciona una imagen antes de guardar.";
    return;
  }

  guardaFoto(archivo);

  const guardado = leeFoto();

  const img = document.createElement("img");
  img.src = guardado;
  img.width = 120;

  resultado.innerHTML = `<p>Guardado el objeto File: ${archivo}</p>`;
  resultado.appendChild(img);
});
