"use strict";

function guarda(valor,almacen) {
     const datos = JSON.parse(localStorage.getItem(almacen)) || {}; // [{clave1: valores1}, {clave2: valores2}, ...]
     datos[valor.usuario] = valor;
     localStorage.setItem(almacen, JSON.stringify(datos)); 
}

function leeClave(clave,almacen) {
     const datos = JSON.parse(localStorage.getItem(almacen)) || {}; // [{clave1: valores1}, {clave2: valores2}, ...]
     let valor = datos[clave] ;
     if (!valor) {
          return `🔑 <b>${clave}</b>: no existe ningún usuario con esa clave.`;
     }
     return `🔑 <b>${clave}</b>: ${valor.nombre} - Usuario: ${valor.usuario} - Constraseña: ${valor.password} - Teléfono<: ${valor.telefono} - Email: ${valor.email}br>`
}

function leeTodo(almacen) {
     const datos = JSON.parse(localStorage.getItem(almacen)) || {}; // [{clave1: valores1}, {clave2: valores2}, ...]
     let mensaje = "Todas las claves actuales:<br>";

     for (const clave of Object.keys(datos)) {
          let valor = datos[clave] ; 
          mensaje += `🔑 <b>${clave}</b>: ${valor.nombre} - Usuario: ${valor.usuario} - Constraseña: ${valor.password} - Teléfono<: ${valor.telefono} - Email: ${valor.email}<br>`;
     };

     return mensaje ;
}

function borra(clave,almacen) {
     const datos = JSON.parse(localStorage.getItem(almacen)) || {};
     if (!(clave in datos)) {
          return `<b>${clave}</b>: no existe ningún usuario con esa clave, no se ha borrado nada.`;
     }
     delete datos[clave]; //Eliminamos los datos del objeo
     localStorage.setItem(almacen,JSON.stringify(datos));
}