"use strict";

function cargarFormulario(raw) {
    nombre.value = `${raw.name.first.trim()} ${raw.name.last.trim()}`;
    usuario.value = raw.login.username.trim();
    password.value = "dejameya"; // por defecto 'dejameya'
    ciudad.value = `${raw.location.city.trim()} (${raw.location.country.trim()})`;

    // AÑADIR, Imagen: limpiamos el <input type="file"> y guardamos la URL de la API
    imagen.value = null;                       // no se puede prefijar un <input type="file">
    imagenURL.value = raw.picture?.large || "";   // URL de la API
    window.imagenBlobTemporal = null;             // anulamos cualquier File previo

    mensaje.textContent = "🔎 Revisa los datos cargados y pulsa Guardar.";
}
