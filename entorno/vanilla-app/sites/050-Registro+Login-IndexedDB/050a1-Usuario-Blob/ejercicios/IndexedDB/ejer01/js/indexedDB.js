"use strict";

const TABLA_EJERCICIO = "050a1-Usuario-Blob";
const BASE_DATOS_EJERCICIO = "050a1-Usuario-Blob-DB";

function abrirBaseDatosEjercicio() {
  return new Promise((resolve, reject) => {
    const requestDB = indexedDB.open(BASE_DATOS_EJERCICIO, 1);

    requestDB.onupgradeneeded = (event) => {
      const db = event.target.result;
      if (!db.objectStoreNames.contains(TABLA_EJERCICIO)) {
        db.createObjectStore(TABLA_EJERCICIO, { keyPath: "usuario" });
      }
    };

    requestDB.onsuccess = (event) => {
      resolve(event.target.result);
    };

    requestDB.onerror = (event) => {
      reject(event.target.error);
    };
  });
}

async function guardaUsuarioEjercicio(usuario) {
  const db = await abrirBaseDatosEjercicio();

  return new Promise((resolve, reject) => {
    const transaction = db.transaction(TABLA_EJERCICIO, "readwrite");
    const store = transaction.objectStore(TABLA_EJERCICIO);
    const requestEscribir = store.put(usuario);
    // console.log("Objeto de la BD (escribo)", requestEscribir);

    requestEscribir.onsuccess = () => {
      resolve();
    };

    requestEscribir.onerror = (event) => {
      reject(event.target.error);
    };

    transaction.oncomplete = () => {
      db.close();
    };

    transaction.onabort = () => {
      db.close();
    };
  });
}

async function leeUsuarioEjercicio(usuario) {
  const db = await abrirBaseDatosEjercicio();

  return new Promise((resolve, reject) => {
    const transaction = db.transaction(TABLA_EJERCICIO, "readonly");
    const store = transaction.objectStore(TABLA_EJERCICIO);
    const requestLeer = store.get(usuario);
    // console.log("Objeto de la BD (leo uno)", requestLeer);

    requestLeer.onsuccess = () => {
      resolve(requestLeer.result);
    };

    requestLeer.onerror = (event) => {
      reject(event.target.error);
    };

    transaction.oncomplete = () => {
      db.close();
    };

    transaction.onabort = () => {
      db.close();
    };
  });
}

async function leeUsuariosEjercicio() {
  const db = await abrirBaseDatosEjercicio();

  return new Promise((resolve, reject) => {
    const transaction = db.transaction(TABLA_EJERCICIO, "readonly");
    const store = transaction.objectStore(TABLA_EJERCICIO);
    const requestLeer = store.getAll();
    // console.log("Objeto de la BD (leo todo)", requestLeer);

    requestLeer.onsuccess = () => {
      // console.log("Resultado de la BD", requestLeer.result);
      resolve(requestLeer.result);
    };

    requestLeer.onerror = (event) => {
      reject(event.target.error);
    };

    transaction.oncomplete = () => {
      db.close();
    };

    transaction.onabort = () => {
      db.close();
    };
  });
}

async function borraUsuarioEjercicio(usuario) {
  const db = await abrirBaseDatosEjercicio();

  return new Promise((resolve, reject) => {
    const transaction = db.transaction(TABLA_EJERCICIO, "readwrite");
    const store = transaction.objectStore(TABLA_EJERCICIO);
    const requestBorrar = store.delete(usuario);
    // console.log("Objeto de la BD (borro)", requestBorrar);

    requestBorrar.onsuccess = () => {
      resolve();
    };

    requestBorrar.onerror = (event) => {
      reject(event.target.error);
    };

    transaction.oncomplete = () => {
      db.close();
    };

    transaction.onabort = () => {
      db.close();
    };
  });
}
