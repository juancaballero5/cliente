// archivo: indexedDB.js
'use strict';

function openDatabase() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open('RegLogIdxCRUDAPI', 1);

    request.onerror = (event) => {
      console.error('❌ Error al abrir la base de datos', event);
      reject(event);
    };

    request.onsuccess = () => {
      console.log('✅ Base de datos abierta correctamente');
      resolve(request.result);
    };

    request.onupgradeneeded = (event) => {
      const db = event.target.result;

      // Usuarios (ya existente)
      if (!db.objectStoreNames.contains('usuarios')) {
        db.createObjectStore('usuarios', { keyPath: 'usuario' });
      }

      // Nueva store: Sesión
      if (!db.objectStoreNames.contains('sesion')) {
        db.createObjectStore('sesion', { keyPath: 'clave' });
      }

      console.log('📦 ObjectStores actualizados: usuarios, sesion');
    };
  });
}
