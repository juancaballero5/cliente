"use strict";

const ALMACEN_EJERCICIO = "ejercicio"; // Una tabla
const BASE_DATOS_EJERCICIO = "EjercicioBD";

function abrirBaseDatosEjercicio() {
     return new Promise((resolve, reject) => {
          const requestDB = indexedDB.open(BASE_DATOS_EJERCICIO, 1); // Manejador de apertura

          requestDB.onupgradeneeded = (event) => {
               db = event.target.result;
               if (!db.objectStoreNames.contains(ALMACEN_EJERCICIO)) {
                    db.objectStoreNames(ALMACEN_EJERCICIO, { keyPath: "usuario" });
               }

          }

          requestDB.onsuccess = (event) => {
               db = event.target.result;
               resolve(db);
          }

          requestDB.onerror = (event) => {
               reject(event.target.error);
          }
     })
}

async function guardaUsuarioEjercicio(user) {
     const db = await abrirBaseDatosEjercicio();

     return new Promise((resolve, reject) => {
          const transaction = db.transaction(ALMACEN_EJERCICIO, "readwrite");
          const store = transaction.objectStore(ALMACEN_EJERCICIO);
          const requestEscribir = store.put(user);

          requestEscribir.onsuccess = (event) => {
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

     })
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

     const usuarios = await new Promise((resolve, reject) => {
          const transaction = db.transaction(ALMACEN_EJERCICIO, "readonly");
          const store = transaction.objectStore(ALMACEN_EJERCICIO);
          const requestLeer = store.getAll();

          requestLeer.onsuccess = () => {
               resolve(requestLeer.result);
          }

          requestLeer.onerror = (event) => {
               reject(event.target.error);
          }

          transaction.oncomplete = () => {
               db.close();
          }

          transaction.onabort = () => {
               db.close();
          }

     })
}

async function borraUsuarioEjercicio(usuario) {
     const db = await abrirBaseDatosEjercicio();

     return new Promise((resolve, reject) => {
          const transaction = db.transaction(TABLA_EJERCICIO, "readwrite");
          const store = transaction.objectStore(TABLA_EJERCICIO);
          const requestBorrar = store.delete(usuario);

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