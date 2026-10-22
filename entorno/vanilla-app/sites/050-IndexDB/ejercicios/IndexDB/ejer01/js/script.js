"use strict";

const PATRON_USUARIO = /^[a-z][a-z0-9_]{2,15}$/;
const PATRON_PASSWORD = /^.{4,20}$/;
const PATRON_TELEFONO = /^[6-9]\d{8}$/;
const PATRON_EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PATRON_CP = /^\d{5}$/;
const FOTO_DEFECTO = "/040-Registro+Login-localStorage/040g-Rutas+ExtraUsuarios/img/user.png";

const nombre = document.getElementById("nombre");
const usuario = document.getElementById("usuario");
const password = document.getElementById("password");
const telefono = document.getElementById("telefono");
const email = document.getElementById("email");
const calle = document.getElementById("calle");
const cp = document.getElementById("cp");
const ciudad = document.getElementById("ciudad");
const provincia = document.getElementById("provincia");
const imagen = document.getElementById("imagen");
const guardar = document.getElementById("guardar");
const leer = document.getElementById("leer");
const borrar = document.getElementById("borrar");
const resultado = document.getElementById("resultado");

function fileToDataURL(file) {
     return new Promise((resolve, reject) => {
          const lector = new FileReader();
          lector.onload = () => resolve(lector.result);
          lector.onerror = () => reject("Error al leer el archivo");
          lector.readAsDataURL(file);
     });
}

listarUsuarios();

guardar.addEventListener("click", async () => {
     const nombreValor = nombre.value.trim();
     const usuarioValor = usuario.value.trim();
     const passwordValor = password.value.trim();
     const telefonoValor = telefono.value.trim();
     const emailValor = email.value.trim();
     const calleValor = calle.value.trim();
     const cpValor = cp.value.trim();
     const ciudadValor = ciudad.value.trim();
     const provinciaValor = provincia.value.trim();
     const archivo = imagen.files[0];

     if (!PATRON_USUARIO.test(usuarioValor)) {
          resultado.textContent =
               "Usuario no válido (minúsculas, números o _; 3-16 caracteres; empieza por letra).";
          return;
     }

     if (!PATRON_PASSWORD.test(passwordValor)) {
          resultado.textContent = "Contraseña no válida (entre 4 y 20 caracteres).";
          return;
     }

     if (telefonoValor && !PATRON_TELEFONO.test(telefonoValor)) {
          resultado.textContent = "Teléfono no válido (9 dígitos; empieza por 6-9).";
          return;
     }

     if (emailValor && !PATRON_EMAIL.test(emailValor)) {
          resultado.textContent = "Email no válido.";
          return;
     }

     if (cpValor && !PATRON_CP.test(cpValor)) {
          resultado.textContent = "Código postal no válido (5 dígitos).";
          return;
     }

     const dataURL = archivo ? await fileToDataURL(archivo) : FOTO_DEFECTO;

     const user = {
          nombre: nombreValor,
          usuario: usuarioValor,
          password: passwordValor,
          telefono: telefonoValor || "5551234567",
          email: emailValor || "sin-email@ejemplo.com",
          direccion: {
               calle: calleValor || "Sin calle",
               cp: cpValor || "00000",
               ciudad: ciudadValor || "Sin ciudad",
               provincia: provinciaValor || "Sin provincia",
          },
          imagen: dataURL,
     };

     guardaUsuario(user);
     listarUsuarios();
});

leer.addEventListener("click", () => {
     const clave = usuario.value.trim();
     if (!clave) {
          resultado.textContent = "Escribe el usuario que quieres leer.";
     } else {
          const user = leeUsuario(clave);
          if (user) {
               const foto = user.imagen ? `<img src="${user.imagen}" alt=""> ` : "";
               resultado.innerHTML =
                    `${foto}<b>${user.nombre}</b> ${user.usuario} - ${user.telefono} - ${user.email} - ${user.direccion.calle} - ${user.direccion.cp} - ${user.direccion.ciudad} - ${user.direccion.provincia}<br>`;
          } else {
               resultado.textContent = "No existe ese usuario.";
          }
     }
     setTimeout(() => {
          listarUsuarios();
     }, 1500);
});

borrar.addEventListener("click", () => {
     const clave = usuario.value.trim();
     if (!clave) {
          resultado.textContent = "Escribe el usuario que quieres borrar.";
     } else {
          const user = borraUsuario(clave);
          if (user) {
               resultado.innerHTML = `Usuario "<b>${user.usuario}</b>" borrado.`;
          } else {
               resultado.textContent = "No existe ese usuario.";
          }
     }
     setTimeout(() => {
          listarUsuarios();
     }, 1500);
});

function listarUsuarios() {
     let listado = "Usuarios guardados (1 clave = todos):<br>";
     const usuarios = Object.values(leeUsuarios());
     if (usuarios.length === 0) {
          resultado.innerHTML = listado + "No hay usuarios guardados.";
     } else {
          usuarios.forEach((user) => {
               const foto = user.imagen ? `<img src="${user.imagen}" alt=""> ` : "";
               listado += `${foto}<b>${user.nombre}</b> ${user.usuario} - ${user.telefono} - ${user.email} - ${user.direccion.calle} - ${user.direccion.cp} - ${user.direccion.ciudad} - ${user.direccion.provincia}<br>`;
          });
          resultado.innerHTML = listado;
     }
}
