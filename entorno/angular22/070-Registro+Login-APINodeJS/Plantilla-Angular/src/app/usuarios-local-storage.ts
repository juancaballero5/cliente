import { Service } from '@angular/core';
import { Usuario } from './usuario';
import { Observable, of } from 'rxjs';

const ALMACEN_USUARIO: string = 'usuarios';

@Service()
export class UsuariosLocalStorage {
  guardarUsuarioStorage(usuario: Usuario): Observable<undefined> {
    const usuarios: Record<string, Usuario> = JSON.parse(localStorage.getItem(ALMACEN_USUARIO) || 'null') || {};
    usuarios[usuario.usuario] = usuario;
    console.log('Escritura terminada');
    localStorage.setItem(ALMACEN_USUARIO, JSON.stringify(usuarios));
    return of(undefined);
  }

  leerUsuarioStorage(usuario: string): Observable<Usuario | undefined> {
    const usuarios: Record<string, Usuario> = JSON.parse(localStorage.getItem(ALMACEN_USUARIO) || 'null') || {};
    return of(usuarios[usuario]);
  }

  leerUsuariosStorage(): Observable<Usuario[]> {
    const usuarios: Record<string, Usuario> = JSON.parse(localStorage.getItem(ALMACEN_USUARIO) || 'null') || {}; 
    return of(Object.values(usuarios)); 
  }

  borrarUsuariosStorage(usuario: string): Observable<Usuario | undefined> {
    const usuarios: Record<string, Usuario> = JSON.parse(localStorage.getItem(ALMACEN_USUARIO) || 'null') || {};
    const user = usuarios[usuario];
    delete usuarios[usuario];
    localStorage.setItem(ALMACEN_USUARIO, JSON.stringify(usuarios));
    return of(user);
  }
}
