"use strict";

const btnCrear = document.getElementById("btnCrear");
const btnEliminar = document.getElementById("btnEliminar");
const lista = document.getElementById("lista");
const resultado = document.getElementById("resultado");

btnCrear.addEventListener("click", () => {
  const nuevo = document.createElement("li");
  nuevo.textContent = "Nuevo elemento creado";
  lista.appendChild(nuevo);
  resultado.textContent = "Elemento creado y añadido a la lista.";
});

btnEliminar.addEventListener("click", () => {
  if (lista.children.length > 0) {
    const ultimo = lista.lastElementChild;
    lista.removeChild(ultimo);
    resultado.textContent = "Último elemento eliminado.";
  } else {
    resultado.textContent = "No hay elementos que eliminar.";
  }
});
