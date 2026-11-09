"use strict";

const ALMACEN_EJERCICIO = "050a1-Usuario-Blob";
const BASE_DATOS_EJERCICIO = "050a1-Usuario-Blob-DB";

let db;
// console.log("Manejador de la BD", db);


function abrirBaseDatosEjercicio() {
  return new Promise((resolve, reject) => {
    const requestDB = indexedDB.open(BASE_DATOS_EJERCICIO, 1);

    requestDB.onupgradeneeded = (event) => {
      db = event.target.result;
      if (!db.objectStoreNames.contains(ALMACEN_EJERCICIO)) {
        db.createObjectStore(ALMACEN_EJERCICIO, { keyPath: "usuario" });
      }
    };

    requestDB.onsuccess = (event) => {
      db = event.target.result;
      resolve(db);
    };

    requestDB.onerror = (event) => {
      reject(event.target.error);
    };
  });
}

async function guardaUsuarioEjercicio(user) {
  if (!db) {
    await abrirBaseDatosEjercicio();
  }

  return new Promise((resolve, reject) => {
    const transaction = db.transaction(ALMACEN_EJERCICIO, "readwrite");
    const store = transaction.objectStore(ALMACEN_EJERCICIO);
    const requestEscribir = store.put(user);
    // console.log("Objeto de la BD (escribo)", requestEscribir);

    requestEscribir.onsuccess = () => {
      resolve();
    };

    requestEscribir.onerror = (event) => {
      reject(event.target.error);
    };
  });
}

async function leeUsuarioEjercicio(usuario) {
  if (!db) {
    await abrirBaseDatosEjercicio();
  }

  return new Promise((resolve, reject) => {
    const transaction = db.transaction(ALMACEN_EJERCICIO, "readonly");
    const store = transaction.objectStore(ALMACEN_EJERCICIO);
    const requestLeer = store.get(usuario);
    // console.log("Objeto de la BD (leo uno)", requestLeer);

    requestLeer.onsuccess = () => {
      resolve(requestLeer.result);
    };

    requestLeer.onerror = (event) => {
      reject(event.target.error);
    };
  });
}

async function leeUsuariosEjercicio() {
  if (!db) {
    await abrirBaseDatosEjercicio();
  }

  return new Promise((resolve, reject) => {
    const transaction = db.transaction(ALMACEN_EJERCICIO, "readonly");
    const store = transaction.objectStore(ALMACEN_EJERCICIO);
    const requestLeer = store.getAll();
    // console.log("Objeto de la BD (leo todo)", requestLeer);

    requestLeer.onsuccess = () => {
      // console.log("Resultado de la BD", requestLeer.result);
      resolve(requestLeer.result);
    };

    requestLeer.onerror = (event) => {
      reject(event.target.error);
    };
  });
}

async function borraUsuarioEjercicio(usuario) {
  if (!db) {
    await abrirBaseDatosEjercicio();
  }

  return new Promise((resolve, reject) => {
    const transaction = db.transaction(ALMACEN_EJERCICIO, "readwrite");
    const store = transaction.objectStore(ALMACEN_EJERCICIO);
    const requestBorrar = store.delete(usuario);
    // console.log("Objeto de la BD (borro)", requestBorrar);

    requestBorrar.onsuccess = () => {
      resolve();
    };

    requestBorrar.onerror = (event) => {
      reject(event.target.error);
    };
  });
}
