import { Component, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { UsuariosLocalStorage } from '../usuarios-local-storage';
import { fileToDataURL, mensajeDeValidacion, usuarioParaGuardar } from '../usuario-formulario';
import { Usuario } from '../usuario';

const FOTO_DEFECTO = "/img/user.png";

@Component({
  imports: [RouterLink],
  selector: 'app-crud-local-storage',
  styleUrl: './crud-local-storage.css',
  templateUrl: './crud-local-storage.html',
})
export class CrudLocalStorage {

  constructor() {
    this.listarUsuarios();
  }

  readonly resultado = signal('');
  readonly mostrar = signal<Usuario[]>([]);

  private readonly almacenamiento = inject(UsuariosLocalStorage);

  async guardar(formulario: HTMLFormElement): Promise<void> {
    const datos = new FormData(formulario); // HTMLCollection
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

    const user = usuarioParaGuardar(nombre, usuario, password, telefono, email, calle, cp, ciudad, provincia, dataURL)

    this.almacenamiento.guardarUsuarioStorage(user).subscribe(() => {
      this.resultado.set(`Usuario "${user.usuario}" guardado.`);
      setTimeout(() => {
        this.resultado.set('');
        this.listarUsuarios();
      }, 1500);
    });
  }

  leer(formulario: HTMLFormElement): void {
    const datos = new FormData(formulario); // HTMLCollection
    const usuario = String(datos.get('usuario') ?? '').trim();

    this.almacenamiento.leerUsuarioStorage(usuario).subscribe((usuario) => {
      this.resultado.set(usuario ? '📦 El valor del usuario es:' : '⚠ No existe el usuario.')
      this.mostrar.set(usuario ? [usuario] : []); // [{...}]
      setTimeout(() => {
        this.resultado.set('');
        this.listarUsuarios();
      }, 1500);
    });
  }

  borrar(formulario: HTMLFormElement): void {
    const datos = new FormData(formulario); // HTMLCollection
    const usuario = String(datos.get('usuario') ?? '').trim();

    this.almacenamiento.borrarUsuariosStorage(usuario).subscribe((usuario) => {
      this.resultado.set(usuario ? `El usuario ${usuario.usuario} ha sido borrado.` : '⚠ No existe el usuario.')
      setTimeout(() => {
        this.resultado.set('');
        this.listarUsuarios();
      }, 1500);
    });
  }

  listarUsuarios(): void {
    this.almacenamiento.leerUsuariosStorage().subscribe((usuarios) => {
      this.resultado.set(usuarios.length > 0 ? '📦 El valor de los usuarios es:' : '⚠️ No existen usuarios.')
      this.mostrar.set(usuarios); // [{...}, ...]
    });
  }
}
