import { Service } from '@angular/core';
import { Usuario } from './usuario';
import { Observable, of } from 'rxjs';

const ALMACEN_USUARIO: string = 'usuarios';

@Service()
export class UsuariosLocalStorage {

    guardarUsuario(user:Usuario):Observable<undefined> {
        const usuarios = JSON.parse(localStorage.getItem(ALMACEN_USUARIO) || 'null') || {}; // { ... || (nada) }
        usuarios[user.usuario] = user;
        localStorage.setItem(ALMACEN_USUARIO, JSON.stringify(usuarios));
        return of(undefined);
    }
}
