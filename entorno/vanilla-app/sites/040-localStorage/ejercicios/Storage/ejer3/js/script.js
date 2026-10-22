"use strict" ;

const tryIt1 = document.getElementById("tryIt1");
const tryIt2 = document.getElementById("tryIt2");
const tryIt3 = document.getElementById("tryIt3");
const tryIt4 = document.getElementById("tryIt4");
const resultado = document.getElementById("resultado");
const image = document.getElementById("image");

// Intento 1 (FALLIDO)
tryIt1.addEventListener("click", () => {

     // Limpiamos el html y el localStorage
     resultado.innerHTML = "";
     localStorage.removeItem("imagen");

     const ruta = image.ariaValueMax.trim();
     localStorage.setItem("imagen", ruta);

     // Recuperamos la ruta del localStorage y creamos la imagen
     const rutaImagen = localStorage.getItem("imagen");
     const imagen = document.createElement("img");

     // Le damos los atributos a imagen
     imagen.src = rutaImagen ;
     imagen.width = 120;

     // Muestro el mensaje con la ruta dada y la recuperada y insertamos la imagen
     resultado.innerHTML = `<p>Se ha guardado la ruta: ${ruta}, y se ha recuperado la ruta: ${rutaImagen}`;
     resultado.appendChild(imagen);
});

tryIt2.addEventListener("click", () => {
     // Limpiamos el html y el localStorage
     resultado.innerHTML = "";
     localStorage.removeItem("imagen");

     const ruta = image.ariaValueMax.trim();
     localStorage.setItem("imagen", ruta);

     // Recuperamos la ruta del localStorage y creamos la imagen
     const rutaImagen = localStorage.getItem("imagen");
     const imagen = document.createElement("img");

     // Le damos los atributos a imagen
     imagen.src = rutaImagen ;
     imagen.width = 120;

     // Muestro el mensaje con la ruta dada y la recuperada y insertamos la imagen
     resultado.innerHTML = `<p>Se ha guardado la ruta: ${ruta}, y se ha recuperado la ruta: ${rutaImagen}`;
     resultado.appendChild(imagen);
});

function mostrarImagen() {
     const rutaTemporalImagen = localStorage.getItem("imagen");
     const archivo = image.files[0];
     const urlTemporal = URL.createObjectURL(archivo);
     localStorage.setItem("imagen", urlTemporal);

     const imagen = document.createElement("img");
     imagen.src = rutaTemporalImagen;
     imagen.width = 120;

     resultado.innerHTML = `<p>Se ha guardado la ruta temporal: ${urlTemporal}, y se ha recuperado el archivo : ${rutaTemporalImagen}<p>`;
     resultado.appendChild(imagen);
}

tryIt3.addEventListener("click", () => {
     resultado.innerHTML = ``;
     localStorage.removeItem("imagen");

     const archivo = image.files[0];
     const urlTemporal = URL.createObjectURL(archivo);
     localStorage.setItem("imagen", urlTemporal);

     const rutaTemporalImagen = localStorage.getItem("imagen");
     
     const imagen = document.createElement("img");
     imagen.src = rutaTemporalImagen;
     imagen.width = 120;

     resultado.innerHTML = `<p>Se ha guardado la ruta temporal: ${urlTemporal}, y se ha recuperado el archivo : ${rutaTemporalImagen}<p>`;
     resultado.appendChild(imagen);
});