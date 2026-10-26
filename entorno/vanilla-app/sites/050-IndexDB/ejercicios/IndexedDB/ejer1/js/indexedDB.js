"use strict";

const ALMACEN = "usuarios"; // Una tabla
const BASE_DATOS = "UsuarioBD";

function abrirBaseDatos() {
     new Promise((resolve,reject) => {
          const requestDB = indexedDB.open(BASE_DATOS, 1); // Manejador de apertura

          requestDB.onupgradeneeded = (event) => {
               db = event.target.result;
               if (!db.objectStoreNames.contains(ALMACEN)) {
                    db.objectStoreNames(ALMACEN, {keyPath:"usuario"});
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

async function  guardaUsuario(user)  {
     if (!db) {
          await abrirBaseDatos();
     }

     return new Promise ((resolve, reject) => {
          const transaction = db.transaction(ALMACEN, "redwrite");
          const store = transaction.objectStore(ALMACEN);
          const requestEscribir = store.put(user);

          requestEscribir.onsuccess = (event) => {
               resolve();
          }

          requestEscribir.onerror = (event) => {
               reject(event.target.error);
          }

     })
}

function leeUsuario(usuario) {

}

async function leeUsuarios() {
     if (!db) {
          await abrirBaseDatos();
     }

     const usuarios = await new Promise((resolve, reject) => {
          const transaction = db.transaction(ALMACEN, "readonly");
          const store = transaction.objectStore(ALMACEN);
          const requestLeer = store.getAll();
     
          requestLeer.onsuccess = (event) => {
               resolve(requestLeer.result);
          }

          requestLeer.onerror = (event) => {
               reject(event.target.error);
          }
     })

     const listado = {};
     for (const usuario of usuarios) {
          listado[usuario.usuario] = usuario;
     }
     return listado;
}

function borraUsuario(usuario) {

}