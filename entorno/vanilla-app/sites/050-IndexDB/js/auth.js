"use strict";

const TABLA_USUARIOS = "Usuarios";
const BASE_DATOS_USUARIOS = "Usuarios-DB";
const TABLA_SESION = "Sesiones";
const BASE_DATOS_SESION = "Sesiones-DB";

function abrirDB() {
    return new Promise((resolve, reject) => {
        const requestDB = indexedDB.open(BASE_DATOS_USUARIOS, 1);

        requestDB.onupgradeneeded = (event) => {
            const db = event.target.result;
            if (!db.objectStoreNames.contains(TABLA_USUARIOS)) {
                db.createObjectStore(TABLA_USUARIOS, { keyPath: "usuario" });
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

async function guardaUsuarioDB(user) {
    const db = await abrirDB();

    return new Promise((resolve, reject) => {
        const transaction = db.transaction(TABLA_USUARIOS, "readwrite");
        const store = transaction.objectStore(TABLA_USUARIOS);
        const requestEscribir = store.put(user);
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

async function leeUsuarioDB(usuario) {
    const db = await abrirDB();

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

async function leeUsuariosDB() {
    const db = await abrirDB();

    return new Promise((resolve, reject) => {
        const transaction = db.transaction(TABLA_USUARIOS, "readonly");
        const store = transaction.objectStore(TABLA_USUARIOS);
        const requestLeer = store.getAll();

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

async function borraUsuarioDB(usuario) {
    const db = await abrirDB();

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

function abrirDBSesion() {
	return new Promise((resolve, reject) => {
		const requestDB = indexedDB.open(BASE_DATOS_SESION, 1);

		requestDB.onupgradeneeded = (event) => {
			const db = event.target.result;
			if (!db.objectStoreNames.contains(TABLA_SESION)) {
				db.createObjectStore(TABLA_SESION, {keyPath: "usuario"});
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

async function guardaSesionDB(ficha) {
	const db = await abrirDBSesion();

	return new Promise ((resolve, reject) => {
		const transaction = db.transaction(TABLA_SESION, "readwrite");
		const store = transaction.objectStore(TABLA_SESION);
		const requestEscribir = store.put(ficha);

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

async function leeSesionesDB() {
    const db = await abrirDBSesion();

    return new Promise((resolve, reject) => {
        const transaction = db.transaction(TABLA_SESION, "readonly");
        const store = transaction.objectStore(TABLA_SESION);
        const requestLeer = store.getAll();

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

async function borraSesionDB(usuario) {
    const db = await abrirDBSesion();

    return new Promise((resolve, reject) => {
        const transaction = db.transaction(TABLA_SESION, "readwrite");
        const store = transaction.objectStore(TABLA_SESION);
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

// LOCALSTORAGE

const ALMACEN_USUARIOS = "usuarios"; // {jota: { nombre, usuario, password, ...}, ...}

/**
 * Función de guardado de usuario
 * 
 * @param nuevo 
 */
function guardaUsuarioStorage(nuevo) {
	const usuarios = JSON.parse(localStorage.getItem(ALMACEN_USUARIOS)) || {};
	usuarios[nuevo.usuario] = nuevo;
	localStorage.setItem(ALMACEN_USUARIOS, JSON.stringify(usuarios));
}

/**
 * Función para leer el usuario 
 * 
 * @param nombre 
 * @returns 
 */
function leeUsuarioStorage(datos) {
	const usuarios = JSON.parse(localStorage.getItem(ALMACEN_USUARIOS)) || {};
	return usuarios[datos];
}

/**
 * Función para leer todos lor usuarios almacenados
 */
function leeUsuariosStorage() {
	return JSON.parse(localStorage.getItem(ALMACEN_CUENTAS)) || {};
}

/**
 * 
 * 
 * @param nombre 
 */
function borraCuentaStorage(nombre) {
	const datos = JSON.parse(localStorage.getItem(ALMACEN_CUENTAS)) || {};
	if (!(nombre in datos)) return null;
	const ficha = datos[nombre];
	delete datos[nombre];
	localStorage.setItem(ALMACEN_CUENTAS, JSON.stringify(datos));
	return ficha;
}