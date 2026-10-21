"use strict";

const nombre = document.getElementById("nombre");
const usuario = document.getElementById("usuario");
const password = document.getElementById("password");
const telefono = document.getElementById("telefono");
const guardar = document.getElementById("guardar");
const leer = document.getElementById("leer");
const borrar = document.getElementById("borrar");
const resultado = document.getElementById("resultado");
const formulario = document.getElementById("formulario");

const PATRON_USUARIO = /^[a-z][a-z0-9_]{2,15}$/;
const PATRON_PASSWORD = /^.{4,20}$/;
const PATRON_TELEFONO = /^\d{9}$/;

formulario.addEventListener("submit", (e) => {
     e.preventDefault();
});

// resultado.innerHTML = leerUsuarioPorClave();

guardar.addEventListener("click", () => {
     const nombreInput = nombre.value.trim();
     const usuarioInput = usuario.value.trim();
     const passwordInput = password.value.trim();
     const telefonoInput = telefono.value.trim();

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

     const user = {
          nombre: nombreInput,
          usuario: usuarioInput,
          password: passwordInput,
          telefono: telefonoInput || "555123456",
     };

     guardarClave(user);
     resultado.innerHTML= leerValoresClaves();

});

leer.addEventListener("click", () => {
     const clave = usuario.value.trim();
     const  valor = leerValorClave(clave);
     resultado.innerHTML = `<b>${valor.nombre}</b> Usuario: ${valor.usuario} - Contraseña: ${valor.password} - Telefono: ${valor.telefono}`;
});

borrar.addEventListener("click", () => {
     const clave = usuario.value.trim();
     borrarClave(clave);
     resultado.innerHTML = leerValoresClaves();
});