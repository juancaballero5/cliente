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
const ALMACEN_LOCALSTORAGE = "usuarios" ; // Clave unica de almacenamiento

formulario.addEventListener("submit", (e) => {
     e.preventDefault();
});

// resultado.innerHTML = leerTodo();

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
     resultado.textContent = "CORRECTO";

     if (!PATRON_PASSWORD.test(passwordInput)) {
          resultado.textContent = "Contraseña no válida (entre 4 y 20 caracteres).";
          return;
     }

     if (telefonoInput && !PATRON_TELEFONO.test(telefonoInput)) {
          resultado.textContent= "Telefono no válido (9 dígitos)";
     }

     if (emailInput && !PATRON_EMAIL.test(emailInput)) {
          resultado.textContent= "Telefono no válido (9 dígitos)";
     }

     const user = {
          nombre: nombreInput,
          usuario: usuarioInput,
          password: passwordInput,
          telefono: telefonoInput || "sin-telefono",
          email: emailInput || "sin-email",
     };

     guardartodo(user, ALMACEN_LOCALSTORAGE);
     resultado.innerHTML= leerTodo(ALMACEN_LOCALSTORAGE);

});

leer.addEventListener("click", () => {
     const clave = usuario.value.trim();
     const  valor = leerValorClave(clave);
     resultado.innerHTML = `<b>${valor.nombre}</b> Usuario: ${valor.usuario} - Contraseña: ${valor.password} - Telefono: ${valor.telefono}`;
});

borrar.addEventListener("click", () => {
     const clave = usuario.value.trim();
     borrarClave(clave,ALMACEN_LOCALSTORAGE);
     resultado.innerHTML = leerTodo(ALMACEN_LOCALSTORAGE);
});