import { Service } from '@angular/core';
import { Usuario } from './usuario';
import { Observable, of } from 'rxjs';

const ALMACEN_USUARIOS: string = 'usuarios';

@Service()
export class UsuariosLocalStorage {
  guardarUsuarioStorage(usuario: Usuario): Observable<undefined> {
    /*   const guardado = localStorage.getItem(ALMACEN_USUARIOS);
      const usuarios = guardado === null ? {} : JSON.parse(guardado); */
    const usuarios: Record<string, Usuario> = JSON.parse(localStorage.getItem(ALMACEN_USUARIOS) || 'null') || {};
    usuarios[usuario.usuario] = usuario;
    console.log('Escritura terminada');
    localStorage.setItem(ALMACEN_USUARIOS, JSON.stringify(usuarios));
    return of(undefined);
  }

  leerUsuarioStorage(usuario: string): Observable<Usuario | undefined> {
    const usuarios: Record<string, Usuario> = JSON.parse(localStorage.getItem(ALMACEN_USUARIOS) || 'null') || {};
    return of(usuarios[usuario]);
  }

  leerUsuariosStorage(): Observable<Usuario[]> {
    const usuarios: Record<string, Usuario> = JSON.parse(localStorage.getItem(ALMACEN_USUARIOS) || 'null') || {}; // [admin: {...}, jota: {...}, ...]
    return of(Object.values(usuarios)); // [{...}, {...}, ...]
  }

  borrarUsuariosStorage(usuario: string): Observable<Usuario | undefined> {
    const usuarios: Record<string, Usuario> = JSON.parse(localStorage.getItem(ALMACEN_USUARIOS) || 'null') || {};
    const user = usuarios[usuario];
    delete usuarios[usuario];
    localStorage.setItem(ALMACEN_USUARIOS, JSON.stringify(usuarios));
    return of(user);
  }
}
