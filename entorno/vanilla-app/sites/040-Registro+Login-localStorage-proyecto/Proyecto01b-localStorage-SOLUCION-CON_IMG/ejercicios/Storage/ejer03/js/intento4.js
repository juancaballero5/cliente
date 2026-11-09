"use strict";

function fileToDataURL(file) {
  return new Promise((resolve, reject) => {
    const lector = new FileReader();
    lector.onload = () => resolve(lector.result);
    lector.onerror = () => reject("Error al leer el archivo");
    lector.readAsDataURL(file);
  });
}

tryIt4.addEventListener("click", async () => {
  limpiarResultado();

  const archivo = image.files[0];
  if (!archivo) {
    resultado.textContent = "Selecciona una imagen antes de guardar.";
    return;
  }

  const dataURL = await fileToDataURL(archivo);
  guardaFoto(dataURL);

  const guardado = leeFoto();

  const img = document.createElement("img");
  img.src = guardado;
  img.width = 120;

  resultado.innerHTML = "<p>Imagen guardada en Base64 (persiste tras recargar).</p>";
  resultado.appendChild(img);
});
