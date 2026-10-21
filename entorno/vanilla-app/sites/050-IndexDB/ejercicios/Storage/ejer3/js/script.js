"use strict";

const image = document.getElementById("image");
const tryIt1 = document.getElementById("tryIt1");
const tryIt2 = document.getElementById("tryIt2");
const tryIt3 = document.getElementById("tryIt3");
const tryIt4 = document.getElementById("tryIt4");
const resultado = document.getElementById("resultado");

tryIt1.addEventListener("click", () =>{

     resultado.innerHTML= "";
     localStorage.removeItem("fotoUsuario");

     console.log(image.value.trim());
     const ruta = image.value.trim();
     localStorage.setItem("fotoUsuario",ruta);
     const recuperaImagen = localStorage.getItem("fotoUsuario");

     const img = document.createElement("img");

     img.src = recuperaImagen;
     img.width = 120;

     resultado.innerHTML = `<p>Guardada la ruta: ${ruta}</p>`;
     resultado.appendChild(img);
});

tryIt2.addEventListener("click", () => {
     resultado.innerHTML= "";
     localStorage.removeItem("fotoUsuario");

     const archivo = image.file[0];
     localStorage.setItem("fotoUsuario", archivo);
     const recuperaImagen = localStorage.getItem("fotoUsuario");

     const img = document.createElement("img");

     img.src = recuperaImagen;
     img.width = 120;

     resultado.innerHTML = `<p>Guardado el archivo: ${archivo}</p>`;
     resultado.appendChild(img);
});

tryIt3.addEventListener("click", () => {
     resultado.innerHTML= "";
     localStorage.removeItem("fotoUsuario");

     const archivo = image.file[0];
     const urlTemporal = URL.createObjectURL(archivo);
     localStorage.setItem("fotoUsuario", archivo);
     const recuperaImagen = localStorage.getItem("fotoUsuario");

     const img = document.createElement("img");

     img.src = recuperaImagen;
     img.width = 120;

     resultado.innerHTML = `<p>Guardada la ruta: ${urlTemporal}</p>`;
     resultado.appendChild(img);
});

tryIt3.addEventListener("click", async () => {
     resultado.innerHTML= "";
     localStorage.removeItem("fotoUsuario");

     const archivo = image.file[0];
     const dataURL = await fileToDataURL(archivo);

     localStorage.setItem("fotoUsuario", dataURL);
     const recuperaImagen = localStorage.getItem("fotoUsuario");

     const img = document.createElement("img");

     img.src = recuperaImagen;
     img.width = 120;

     resultado.innerHTML = `<p>Guardada la ruta: ${dataURL}</p>`;
     resultado.appendChild(img);
});

function fileToDataURL(file) {
     return new Promise((resolve, reject) => {
          const lector = new FileReader();
          lector.onload = () => resolve(lector.result);
          lector.onerror = () => reject("Error al leer el archivo");
          lector.readAsDataURL(file);
     })
}