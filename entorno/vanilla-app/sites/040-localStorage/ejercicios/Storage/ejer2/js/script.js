"use strict";

const nombre = document.getElementById("nombre");
const usuario = document.getElementById("usuario");
const password = document.getElementById("password");
const telefono = document.getElementById("telefono");
const email = document.getElementById("email");
const guardar = document.getElementById("guardar");
const leer = document.getElementById("leer");
const borrar = document.getElementById("borrar");
const resultado = document.getElementById("resultado");
const formulario = document.getElementById("formulario");

const PATRON_USUARIO = /^[a-z][a-z0-9_]{2,15}$/;
const PATRON_PASSWORD = /^.{4,20}$/;
const PATRON_TELEFONO = /^\d{9}$/;
const PATRON_EMAIL = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const ALMACEN_LOCALSTORAGE = "usuarios"; // Clave unica de almacenamiento

formulario.addEventListener("submit", (e) => {
     e.preventDefault();
});

// resultado.innerHTML = leeTodo(ALMACEN_LOCALSTORAGE);

guardar.addEventListener("click", () => {
     const nombreInput = nombre.value.trim();
     const usuarioInput = usuario.value.trim();
     const passwordInput = password.value.trim();
     const telefonoInput = telefono.value.trim();
     const emailInput = email.value.trim();

     if (!PATRON_USUARIO.test(usuarioInput)) {
          resultado.textContent = "Usuario no válido (minúsculas, números o _; 3-16 caracteres; empieza por letra).";
          return;
     }

     if (!PATRON_PASSWORD.test(passwordInput)) {
          resultado.textContent = "Contraseña no válida (entre 4 y 20 caracteres).";
          return;
     }

     if (telefonoInput && !PATRON_TELEFONO.test(telefonoInput)) {
<<<<<<< Updated upstream
          resultado.textContent= "Telefono no válido (9 dígitos)";
          return;
     }

     if (emailInput && !PATRON_EMAIL.test(emailInput)) {
          resultado.textContent= "Telefono no válido (9 dígitos)";
          return;
=======
          resultado.textContent = "Telefono no válido (9 dígitos)";
     }

     if (emailInput && !PATRON_EMAIL.test(emailInput)) {
          resultado.textContent = "Telefono no válido (9 dígitos)";
>>>>>>> Stashed changes
     }

     const user = {
          nombre: nombreInput,
          usuario: usuarioInput,
          password: passwordInput,
          telefono: telefonoInput || "sin-telefono",
          email: emailInput || "sin-email",
     };

<<<<<<< Updated upstream
     guarda(user, ALMACEN_LOCALSTORAGE);
     resultado.innerHTML= leeTodo(ALMACEN_LOCALSTORAGE);
=======
     guardartodo(user, ALMACEN_LOCALSTORAGE);
     resultado.innerHTML = leerTodo(ALMACEN_LOCALSTORAGE);
>>>>>>> Stashed changes

});

leer.addEventListener("click", () => {
     const clave = usuario.value.trim();
<<<<<<< Updated upstream
     const  valor = leeClave(clave,ALMACEN_LOCALSTORAGE);
     resultado.innerHTML = valor;
=======
     const valor = leerValorClave(clave);
     if (valor === undefined) {
          resultado.innerHTML = `El usuario: ${clave} no existe`;
          setTimeout(() => {
               mostrarUsuarios();
          }, 1500);
     } else {
          resultado.innerHTML = `🔑 Nombre: ${valor.nombre} - Usuario: ${valor.usuario} - Contraseña: ${valor.password} - Teléfono: ${valor.telefono} - eMail: ${valor.email}`;
          setTimeout(() => {
               mostrarUsuarios();
          }, 1500);
     }
>>>>>>> Stashed changes
});

function mostrarUsuarios() {
     const valores = Object.values(leeUsuarios());
     let listadoUsuarios = "📦 Todas las claves actuales:<br>";
     valores.forEach((valor) => {
          listadoUsuarios += `🔑 Nombre: ${valor.nombre} - Usuario: ${valor.usuario} - Contraseña: ${valor.password} - Teléfono: ${valor.telefono} - eMail: ${valor.email}`;
     });
     resultado.innerHTML = listadoUsuarios;
}

borrar.addEventListener("click", () => {
     const clave = usuario.value.trim();
<<<<<<< Updated upstream
     resultado.innerHTML =borra(clave,ALMACEN_LOCALSTORAGE);
     resultado.innerHTML += `<br>` +  leeTodo(ALMACEN_LOCALSTORAGE);
=======
     const valor = borraUsuario(clave);
     console.log(valor);
     if (valor === undefined) {
          resultado.innerHTML = `El usuario: ${clave} no existe`;
          setTimeout(() => {
               mostrarUsuarios();
          }, 1500);
     } else {
          resultado.innerHTML = `El usuario: ${valor.usuario}, se ha borrado`;
          setTimeout(() => {
               mostrarUsuarios();
          }, 1500);
     }
>>>>>>> Stashed changes
});