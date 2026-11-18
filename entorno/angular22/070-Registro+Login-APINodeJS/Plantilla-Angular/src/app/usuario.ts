export interface Direccion {
    calle: string;
    cp: string;
    ciudad: string;
    provincia: string;
}

export interface Usuario {
    nombre: string;
    usuario: string;
    password: string;
    telefono: string;
    email: string;
    direccion: Direccion;
    imagen: string;
}
