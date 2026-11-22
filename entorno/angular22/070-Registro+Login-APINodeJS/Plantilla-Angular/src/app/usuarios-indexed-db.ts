import { Service } from '@angular/core';
import { defer, Observable } from 'rxjs';
import { Usuario } from './usuario';

const BASE_USUARIOS = "proyecto-IndexedDB";
const TABLA_USUARIOS = "usuarios";

@Service()
export class UsuariosIndexedDb {

    abrirBD(): Promise<IDBDatabase> {
        return new Promise((resolve, reject) => {
            const requestDB = indexedDB.open(BASE_USUARIOS, 1);

            requestDB.onupgradeneeded = (event) => {
                const db = (event.target as IDBOpenDBRequest).result;
                if (!db.objectStoreNames.contains(TABLA_USUARIOS)) {
                    db.createObjectStore(TABLA_USUARIOS, { keyPath: 'usuario' });
                }
            };

            requestDB.onsuccess = (event) => {
                resolve((event.target as IDBOpenDBRequest).result);
            };

            requestDB.onerror = (event) => {
                reject((event.target as IDBOpenDBRequest).error);
            };

        });
    }

    guardarUsuarioIndexedDb(user: Usuario): Observable<undefined> {
        return defer(async () => {
            const db = await this.abrirBD();

            return new Promise<undefined>((resolve, reject) => {
                const transaction = db.transaction(TABLA_USUARIOS, 'readwrite');
                const almacen = transaction.objectStore(TABLA_USUARIOS);
                const requestEscribir = almacen.put(user);

                requestEscribir.onerror = (event) => {
                    reject((event.target as IDBRequest).error);
                };

                transaction.oncomplete = () => {
                    db.close();
                    resolve(undefined);
                };

                transaction.onabort = () => {
                    db.close();
                    reject(transaction.error);
                };
            });
        });
    }

    leerUsuarioIndexedDb(usuario: string): Observable<Usuario | undefined> {
        return defer(async () => {
            const db = await this.abrirBD();

            return new Promise<Usuario | undefined>((resolve, reject) => {
                const transaction = db.transaction(TABLA_USUARIOS, 'readonly');
                const almacen = transaction.objectStore(TABLA_USUARIOS);
                const requestLeer = almacen.get(usuario);

                requestLeer.onerror = (event) => {
                    reject((event.target as IDBRequest).error);
                };

                transaction.oncomplete = () => {
                    db.close();
                    resolve(requestLeer.result);
                };

                transaction.onabort = () => {
                    db.close();
                    reject(transaction.error);
                };
            });
        });
    }

    leerUsuariosIndexedDb(): Observable<Usuario[]> {
        return defer(async () => {
            const db = await this.abrirBD();

            return new Promise<Usuario[]>((resolve, reject) => {
                const transaction = db.transaction(TABLA_USUARIOS, 'readonly');
                const almacen = transaction.objectStore(TABLA_USUARIOS);
                const requestLeer = almacen.getAll();

                requestLeer.onerror = (event) => {
                    reject((event.target as IDBRequest).error);
                };

                transaction.oncomplete = () => {
                    db.close();
                    resolve(requestLeer.result);
                };

                transaction.onabort = () => {
                    db.close();
                    reject(transaction.error);
                };
            });
        });
    }

    borrarUsuarioIndexedDb(usuario: string): Observable<Usuario | undefined> {
        return defer(async () => {
            const db = await this.abrirBD();

            return new Promise<Usuario | undefined>((resolve, reject) => {
                const transaction = db.transaction(TABLA_USUARIOS, 'readwrite');
                const almacen = transaction.objectStore(TABLA_USUARIOS);
                const requestLeer = almacen.get(usuario);

                requestLeer.onsuccess = () => {
                    if (requestLeer.result) {
                        almacen.delete(usuario);
                    }
                };

                requestLeer.onerror = (event) => {
                    reject((event.target as IDBRequest).error);
                };

                transaction.oncomplete = () => {
                    db.close();
                    resolve(requestLeer.result); // el usuario borrado, o undefined si no existía
                };

                transaction.onabort = () => {
                    db.close();
                    reject(transaction.error);
                };
            });
        });
    }

}
