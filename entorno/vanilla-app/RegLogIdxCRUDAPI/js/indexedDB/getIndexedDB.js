// archivo: getIndexedDB.js
"use strict";

async function obtenerUsuario(nombreUsuario) {
  const db = await openDatabase();

  return new Promise((resolve, reject) => {
    const transaccion = db.transaction(["usuarios"], "readonly");
    const almacen = transaccion.objectStore("usuarios");

    const solicitud = almacen.get(nombreUsuario);

    solicitud.onsuccess = () => {
      resolve(solicitud.result || null);
    };

    solicitud.onerror = (event) => {
      console.error("❌ Error al obtener el usuario", event);
      reject(event);
    };
  });
}

async function obtenerTodosUsuarios() {
  const db = await openDatabase();

  return new Promise((resolve, reject) => {
    const transaccion = db.transaction(["usuarios"], "readonly");
    const almacen = transaccion.objectStore("usuarios");

    const solicitud = almacen.getAll();

    solicitud.onsuccess = () => {
      resolve(solicitud.result);
    };

    solicitud.onerror = (event) => {
      console.error("❌ Error al obtener todos los usuarios", event);
      reject(event);
    };
  });
}
