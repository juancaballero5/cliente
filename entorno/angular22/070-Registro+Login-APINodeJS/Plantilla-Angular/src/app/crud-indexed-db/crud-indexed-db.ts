import { Component, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Usuario } from '../usuario';
import { UsuariosIndexedDb } from '../usuarios-indexed-db';
import { fileToDataURL, mensajeDeValidacion, usuarioParaGuardar } from '../usuario-formulario';

const FOTO_DEFECTO = '/img/user.png';


@Component({
    imports: [RouterLink],
    selector: 'app-crud-indexed-db',
    styleUrl: './crud-indexed-db.css',
    templateUrl: './crud-indexed-db.html',
})
export class CrudIndexedDb {
    readonly resultado = signal('');
    readonly mostrar = signal<Usuario[]>([]);

    private readonly almacenamiento = inject(UsuariosIndexedDb);

    constructor() {
        this.listarUsuarios();
    }

    async guardar(formulario: HTMLFormElement): Promise<void> {
        const datos = new FormData(formulario);
        const nombre = String(datos.get('nombre') ?? '').trim();
        const usuario = String(datos.get('usuario') ?? '').trim();
        const password = String(datos.get('password') ?? '').trim();
        const telefono = String(datos.get('telefono') ?? '').trim();
        const email = String(datos.get('email') ?? '').trim();
        const calle = String(datos.get('calle') ?? '').trim();
        const cp = String(datos.get('cp') ?? '').trim();
        const ciudad = String(datos.get('ciudad') ?? '').trim();
        const provincia = String(datos.get('provincia') ?? '').trim();

        const aviso = mensajeDeValidacion(usuario, password, telefono, email, cp);
        if (aviso) {
            this.resultado.set(aviso);
            return;
        }

        const imagen = formulario.elements.namedItem('imagen') as HTMLInputElement;
        const archivo = imagen.files?.[0];
        const dataURL = archivo ? await fileToDataURL(archivo) : FOTO_DEFECTO;

        const user = usuarioParaGuardar(nombre, usuario, password, telefono, email, calle, cp, ciudad, provincia, dataURL);

        this.almacenamiento.guardarUsuarioIndexedDb(user).subscribe({
            next: () => {
                this.resultado.set(`Usuario "${user.usuario}" guardado.`);
                setTimeout(() => {
                    this.resultado.set('');
                    this.listarUsuarios();
                }, 1500);
            },
            error: () => this.resultado.set('No se pudo guardar el usuario.'),
        });
    }

    leer(formulario: HTMLFormElement): void {
        const datos = new FormData(formulario);
        const usuario = String(datos.get('usuario') ?? '').trim();

        this.almacenamiento.leerUsuarioIndexedDb(usuario).subscribe({
            next: (encontrado) => {
                this.resultado.set(encontrado ? 'El valor del usuario es:' : ' No existe el usuario.');
                this.mostrar.set(encontrado ? [encontrado] : []);
                setTimeout(() => {
                    this.resultado.set('');
                    this.listarUsuarios();
                }, 1500);
            },
            error: () => this.resultado.set('No se pudo leer el usuario.'),
        });
    }

    borrar(formulario: HTMLFormElement): void {
        const datos = new FormData(formulario);
        const usuario = String(datos.get('usuario') ?? '').trim();

        this.almacenamiento.borrarUsuarioIndexedDb(usuario).subscribe({
            next: (borrado) => {
                this.resultado.set(borrado ? `El usuario ${borrado.usuario} ha sido borrado.` : ' No existe el usuario.');
                setTimeout(() => {
                    this.resultado.set('');
                    this.listarUsuarios();
                }, 1500);
            },
            error: () => this.resultado.set('⚠ No se pudo borrar el usuario.'),
        });
    }

    listarUsuarios(): void {
        this.almacenamiento.leerUsuariosIndexedDb().subscribe({
            next: (usuarios) => {
                this.resultado.set(usuarios.length > 0 ? 'El valor de los usuarios es:' : 'No existen usuarios.');
                this.mostrar.set(usuarios);
            },
            error: () => this.resultado.set('⚠ No se pudo leer el listado de IndexedDB.'),
        });
    }

}
