"use strict";

const btnCrear = document.getElementById("btnCrear");
const btnEliminar = document.getElementById("btnEliminar");
const lista = document.getElementById("lista");
const resultado = document.getElementById("resultado");

btnCrear.addEventListener('click', () => {
    const nuevo = document.createElement('li');
    console.log(nuevo);
    nuevo.textContent ='Nuevo elemnto creado';
    console.log(nuevo);
    lista.appendChild(nuevo);
    resultado.textContent = 'Se ha creado el nuevo elemento en la lista' ;
    console.log(lista);
})

btnEliminar.addEventListener("click", () => {
    if (lista.children.length > 0) {
        const ultimo = lista.lastElementChild;
        lista.removeChild(ultimo);
        resultado.textContent = "Último elemento eliminado.";
    } else {
        resultado.textContent = "No hay elementos que eliminar.";
    }
});
