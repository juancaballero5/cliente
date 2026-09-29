"use strict";

const cargarAPI = document.getElementById("cargarAPI");
const formUsuario = document.getElementById("formUsuario");
const nombre = document.getElementById("nombre");
const usuario = document.getElementById("usuario");
const password = document.getElementById("password");
const ciudad = document.getElementById("ciudad");       // AÑADIR
const imagenURL = document.getElementById("imagenURL"); // AÑADIR, (hidden)
const imagen = document.getElementById("imagen");
const mensaje = document.getElementById("mensaje");
const tabla = document.getElementById("tablaUsuarios").querySelector("tbody");

// AÑADIR: buffer temporal para conservar el File/Blob al editar
window.imagenBlobTemporal = null;

document.addEventListener("DOMContentLoaded", async () => {
  await mostrar();
});

// AÑADIR: Conectar el botón para cargar usuario aleatorio desde la API
cargarAPI.addEventListener("click", async () => {
  cargarAPI.disabled = true;
  mensaje.textContent = "⏳ Consultando la API...";
  try {
    const data = await datosAPI(1); // por ahora 1
    const raw = data?.results?.[0];
    if (!raw) throw new Error("Respuesta sin resultados");
    cargarFormulario(raw); // ← solo cargamos inputs, NO guardamos
    console.log("RandomUser →", raw);
    mensaje.textContent = "✅ Datos cargados en el formulario.";

  } catch (err) {
    console.error(err);
    mensaje.textContent = "❌ Error al obtener datos de la API.";
  } finally {
    cargarAPI.disabled = false;
  }
});

// Priorizar imagen local sobre la URL (evitar “doble imagen”)
imagen.addEventListener("change", () => {
  if (imagen.files && imagen.files[0]) {
    imagenURL.value = "";               // prioriza el archivo local
    window.imagenBlobTemporal = null;   // tampoco conservamos el File anterior
  }
});


// Envío del formulario
formUsuario.addEventListener("submit", async (e) => {
  e.preventDefault();

  const nombreVal = nombre.value.trim();
  const usuarioVal = usuario.value.trim();
  const passwordVal = password.value;
  // AÑADIR, prioridad: nuevo File → temporal → null
  const imagenVal = imagen.files[0] || (window.imagenBlobTemporal || null);

  if (!nombreVal || !usuarioVal || !passwordVal) {
    mensaje.textContent = "⚠️ Todos los campos son obligatorios.";
    return;
  }

  const existente = await obtenerUsuario(usuarioVal);
  if (existente) {
    mensaje.textContent = "⚠️ El usuario ya existe.";
    return;
  }

  const usuarioObj = {
    nombre: nombreVal,
    usuario: usuarioVal,
    password: passwordVal,
    ciudad: ciudad.value.trim(),        // AÑADIR
    imagen: imagenVal,                  // AÑADIR, File si eligen archivo manualmente
    imagenURL: imagenURL.value || "",   // AÑADIR, URL si vino de la API
  };

  const ok = await guardarUsuario(usuarioObj);
  if (ok) {
    mensaje.textContent = "✅ Usuario guardado correctamente.";
    formUsuario.reset();
    await mostrar();
    // AÑADIR, tras guardar OK, limpia el temporal:
    window.imagenBlobTemporal = null;
  } else {
    mensaje.textContent = "❌ Error al guardar el usuario.";
  }
});

