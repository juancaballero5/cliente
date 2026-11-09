// archivo: setIndexedDB.js
"use strict";

async function guardarUsuario(usuarioObj) {
  const db = await openDatabase();

  return new Promise((resolve, reject) => {
    const transaccion = db.transaction(["usuarios"], "readwrite"); // 1️⃣ Creamos transacción en modo escritura
    const almacen = transaccion.objectStore("usuarios");           // 2️⃣ Accedemos al almacén
    const solicitud = almacen.add(usuarioObj);                     // 3️⃣ Intentamos guardar el objeto

    solicitud.onsuccess = () => {
      console.log("✅ Usuario guardado");
      resolve(true);
    };

    solicitud.onerror = (event) => {
      console.error("❌ Error al guardar el usuario", event);
      reject(event);
    };
  });
}

async function borrarUsuario(usuario) {
  const db = await openDatabase();

  return new Promise((resolve, reject) => {
    const transaccion = db.transaction(["usuarios"], "readwrite");
    const almacen = transaccion.objectStore("usuarios");

    const solicitud = almacen.delete(usuario);

    solicitud.onsuccess = () => {
      console.log(`🗑️ Usuario "${usuario}" eliminado.`);
      resolve(true);
    };

    solicitud.onerror = (event) => {
      console.error("❌ Error al borrar el usuario", event);
      reject(event);
    };
  });
}
