"use strict";

function guardartodo(valor,almacen) {
     const datos = JSON.parse(localStorage.getItem(almacen)) || {}; // [{clave1: valores1}, {clave2: valores2}, ...]
     datos[valor.usuario] = valor;
     localStorage.setItem(almacen, JSON.stringify(datos)); 
}

function leerClave(clave,almacen) {
     const datos = JSON.parse(localStorage.getItem(almacen)) || {}; // [{clave1: valores1}, {clave2: valores2}, ...]
     let valor = datos[clave] ;
     return `🔑 <b>${clave}</b>: ${valor.nombre} - Usuario: ${valor.usuario} - Constraseña: ${valor.password} - Teléfono<: ${valor.telefono} - Email: ${valor.email}br>`
}

function leerTodo(almacen) {
     const datos = JSON.parse(localStorage.getItem(almacen)) || {}; // [{clave1: valores1}, {clave2: valores2}, ...]
     const claves = Object.keys(datos);
     let mensaje = "Todas las claves actuales:<br>";

     for (const clave of claves) {
          const dato = datos[clave] ; 
          mensaje += `🔑 <b>${clave}</b>: ${dato.nombre} - Usuario: ${dato.usuario} - Constraseña: ${dato.password} - Teléfono<: ${dato.telefono} - Email: ${dato.email}<br>`;
     };

     return mensaje ;
}

function borrarClave(clave,almacen) {
     const datos = JSON.parse(localStorage.getItem(almacen)) || {};
     delete datos[clave]; //Eliminamos los datos del objeo
     localStorage.setItem(almacen,JSON.stringify(datos));
}