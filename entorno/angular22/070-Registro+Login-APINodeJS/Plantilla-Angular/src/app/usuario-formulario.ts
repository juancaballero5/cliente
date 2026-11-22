import { Usuario } from "./usuario";


const PATRON_USUARIO: RegExp = /^[a-z][a-z0-9_]{2,15}$/;
const PATRON_PASSWORD: RegExp = /^.{4,20}$/;
const PATRON_TELEFONO: RegExp = /^[5-9]\d{8,9}$/;
const PATRON_EMAIL: RegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PATRON_CP: RegExp = /^\d{5}$/;

export function mensajeDeValidacion(usuarioValor: string, passwordValor: string, telefonoValor: string, emailValor: string, cpValor: string): string {
  if (!PATRON_USUARIO.test(usuarioValor)) {
    return 'Usuario no válido (minúsculas, números o _; 3-16 caracteres; empieza por letra).';
  }
  if (!PATRON_PASSWORD.test(passwordValor)) {
    return 'Contraseña no válida (entre 4 y 20 caracteres).';
  }
  if (telefonoValor && !PATRON_TELEFONO.test(telefonoValor)) {
    return 'Teléfono no válido (9 o 10 dígitos; empieza por 5-9).';
  }
  if (emailValor && !PATRON_EMAIL.test(emailValor)) {
    return 'Email no válido.';
  }
  if (cpValor && !PATRON_CP.test(cpValor)) {
    return 'Código postal no válido (5 dígitos).';
  }
  return '';
}

export function usuarioParaGuardar(nombreValor: string, usuarioValor: string, passwordValor: string, telefonoValor: string, emailValor: string, calleValor: string, cpValor: string, ciudadValor: string, provinciaValor: string, imagenValor: string): Usuario {
  return {
    nombre: nombreValor,
    usuario: usuarioValor,
    password: passwordValor,
    telefono: telefonoValor || '5551234567',
    email: emailValor || 'sin-email@ejemplo.com',
    direccion: {
      calle: calleValor || 'Sin calle',
      cp: cpValor || '00000',
      ciudad: ciudadValor || 'Sin ciudad',
      provincia: provinciaValor || 'Sin provincia',
    },
    imagen: imagenValor,
  };
}

export function fileToDataURL(file: Blob): Promise<string> {
  return new Promise((resolve, reject) => {
    const lector = new FileReader();
    lector.onload = () => resolve(String(lector.result));
    lector.onerror = () => reject('Error al leer el archivo');
    lector.readAsDataURL(file);
  });
}
