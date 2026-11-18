import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { UsuariosLocalStorage } from '../usuarios-local-storage';
import { Usuario } from '../usuario';

@Component({
    imports: [RouterLink],
    selector: 'app-crud-local-storage',
    styleUrl: './crud-local-storage.css',
    templateUrl: './crud-local-storage.html',
})
export class CrudLocalStorage {

    private readonly almacenamiento = inject(UsuariosLocalStorage);
    private resultado = '';

    async guardar(formulario:HTMLFormElement): Promise<void> {
        const user: Usuario = {
            nombre: 'Pepe',
            usuario: 'pepe',
            password: 'caca',
            telefono: '123456789',
            email: 'pepe@gmail.com',
            direccion: {
                calle: 'C. Gloria',
                cp: '29190',
                ciudad: 'Málaga',
                provincia: 'Málaga',
            },
            imagen: 'user.png'
        };

        this.almacenamiento.guardarUsuario(user).subscribe(() => {
            this.resultado = `Usuario guardado correctamente`;
        });
    }

}
