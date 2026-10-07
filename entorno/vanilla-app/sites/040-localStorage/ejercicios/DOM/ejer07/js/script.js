"use strict";

const actual = document.getElementById("elementoActual");
const verPadre = document.getElementById("verPadre");
const verHijos = document.getElementById("verHijos");
const verAnterior = document.getElementById("verAnterior");
const verSiguiente = document.getElementById("verSiguiente");
const verAnteriorElemento = document.getElementById("verAnteriorElemento");
const verSiguienteElemento = document.getElementById("verSiguienteElemento");
const resultado = document.getElementById("resultado");

verPadre.addEventListener("click", () => {
    const padre = actual.parentNode;
    resultado.textContent = "Nodo padre: " + padre.nodeName + " id=\"" + padre.id + "\"";
});

verHijos.addEventListener("click", () => {
    const hijos = actual.parentNode.childNodes;
    let salida = "Hijos del padre (incluye nodos de texto):\n";
    for (let i = 0; i < hijos.length; i++) {
        salida += "- " + hijos[i].nodeName + " (tipo: " + hijos[i].nodeType + ")\n";
    }
    resultado.textContent = salida;
});

verAnterior.addEventListener("click", () => {
    const anterior = actual.previousSibling;
    if (anterior && anterior.nodeType === 1) {
        resultado.textContent = "Vecino anterior (nodo): " + anterior.textContent;
    } else {
        resultado.textContent = "previousSibling no es un elemento (suele ser un nodo de texto).";
    }
});

verAnteriorElemento.addEventListener("click", () => {
    const anteriorElemento = actual.previousElementSibling;
    if (anteriorElemento) {
        resultado.textContent = "Elemento anterior: " + anteriorElemento.textContent;
    } else {
        resultado.textContent = "No hay previousElementSibling.";
    }
});
