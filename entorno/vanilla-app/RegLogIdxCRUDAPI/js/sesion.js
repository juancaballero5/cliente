// archivo: sesion.js
"use strict";

async function guardarSesionActiva(nombreUsuario) {
  const db = await openDatabase();

  return new Promise((resolve, reject) => {
    const transaccion = db.transaction(["sesion"], "readwrite");
    const almacen = transaccion.objectStore("sesion");

    const sesionActiva = {
      clave: "usuarioActivo",
      valor: nombreUsuario
    };

    const solicitud = almacen.put(sesionActiva);

    solicitud.onsuccess = () => resolve(true);
    solicitud.onerror = (event) => reject(event);
  });
}

async function obtenerSesionActiva() {
  const db = await openDatabase();

  return new Promise((resolve, reject) => {
    const transaccion = db.transaction(["sesion"], "readonly");
    const almacen = transaccion.objectStore("sesion");

    const solicitud = almacen.get("usuarioActivo");

    solicitud.onsuccess = () => {
      if (solicitud.result && solicitud.result.valor) {
        resolve(solicitud.result.valor); // ← "admin", "jota", etc.
      } else {
        resolve(null);
      }
    };

    solicitud.onerror = (event) => {
      console.error("❌ Error al obtener sesión activa", event);
      reject(event);
    };
  });
}

async function borrarSesionActiva() {
  const db = await openDatabase();

  return new Promise((resolve, reject) => {
    const transaccion = db.transaction(["sesion"], "readwrite");
    const almacen = transaccion.objectStore("sesion");

    const solicitud = almacen.delete("usuarioActivo");

    solicitud.onsuccess = () => resolve(true);
    solicitud.onerror = (event) => reject(event);
  });
}