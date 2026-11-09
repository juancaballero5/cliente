"use strict";

const BASE_DATOS_ACCESO = "accesoDB";
const TABLA_USUARIOS = "usuarios";
const TABLA_SESION = "sesion";

function abrirBaseDatosAccesoIDX() {
  return new Promise((resolve, reject) => {
    const requestDB = indexedDB.open(BASE_DATOS_ACCESO, 1);

    requestDB.onupgradeneeded = (event) => {
      const db = event.target.result;
      if (!db.objectStoreNames.contains(TABLA_USUARIOS)) {
        db.createObjectStore(TABLA_USUARIOS, { keyPath: "usuario" });
      }
      if (!db.objectStoreNames.contains(TABLA_SESION)) {
        db.createObjectStore(TABLA_SESION, { keyPath: "usuario" });
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

async function guardaUsuarioIDX(usuario) {
  const db = await abrirBaseDatosAccesoIDX();

  return new Promise((resolve, reject) => {
    const transaction = db.transaction(TABLA_USUARIOS, "readwrite");
    const store = transaction.objectStore(TABLA_USUARIOS);
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

async function leeUsuarioIDX(usuario) {
  const db = await abrirBaseDatosAccesoIDX();

  return new Promise((resolve, reject) => {
    const transaction = db.transaction(TABLA_USUARIOS, "readonly");
    const store = transaction.objectStore(TABLA_USUARIOS);
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

async function leeUsuariosIDX() {
  const db = await abrirBaseDatosAccesoIDX();

  return new Promise((resolve, reject) => {
    const transaction = db.transaction(TABLA_USUARIOS, "readonly");
    const store = transaction.objectStore(TABLA_USUARIOS);
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

async function borraUsuarioIDX(usuario) {
  const db = await abrirBaseDatosAccesoIDX();

  return new Promise((resolve, reject) => {
    const transaction = db.transaction(TABLA_USUARIOS, "readwrite");
    const store = transaction.objectStore(TABLA_USUARIOS);
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

async function guardaSesionIDX(usuarioSesion) {
  const db = await abrirBaseDatosAccesoIDX();

  return new Promise((resolve, reject) => {
    const transaction = db.transaction(TABLA_SESION, "readwrite");
    const store = transaction.objectStore(TABLA_SESION);
    const requestEscribir = store.put(usuarioSesion);
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

async function leeSesionIDX() {
  const db = await abrirBaseDatosAccesoIDX();

  return new Promise((resolve, reject) => {
    const transaction = db.transaction(TABLA_SESION, "readonly");
    const store = transaction.objectStore(TABLA_SESION);
    const requestLeer = store.getAll();
    // console.log("Objeto de la BD (leo uno)", requestLeer);

    requestLeer.onsuccess = () => {
      resolve(requestLeer.result[0]);
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

async function borraSesionIDX(usuarioSesion) {
  const db = await abrirBaseDatosAccesoIDX();

  return new Promise((resolve, reject) => {
    const transaction = db.transaction(TABLA_SESION, "readwrite");
    const store = transaction.objectStore(TABLA_SESION);
    const requestBorrar = store.delete(usuarioSesion);
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

