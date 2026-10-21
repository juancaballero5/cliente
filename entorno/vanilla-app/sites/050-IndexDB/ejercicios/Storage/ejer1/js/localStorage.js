"use strict";

function guardarClave(user) {
     localStorage.setItem(user.usuario, JSON.stringify(user)); 
}

function leerValorClave(clave) {
     return JSON.parse(localStorage.getItem(clave));
}

function leerValoresClaves() {
     let mensaje = "Todas las claves actuales:<br>";
     for (let i = 0; i < localStorage.length; i++) {
          const clave = localStorage.key(i);
          const valor = leerValorClave(clave);
          mensaje += `🔑 <b>${clave}</b>: ${valor.nombre} - Usuario: ${valor.usuario} - Constraseña: ${valor.password}<br>`;
     }

     return mensaje ;
}

function borrarClave(clave) {
     localStorage.removeItem(clave);
}