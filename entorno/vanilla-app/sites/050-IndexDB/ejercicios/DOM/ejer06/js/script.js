"use strict";

const activar = document.getElementById("activar");
const desactivar = document.getElementById("desactivar");
const zona = document.getElementById("zona");
const resultado = document.getElementById("resultado");

function cambiarFondo() {
    zona.style.backgroundColor = "lightblue";
    resultado.textContent = "Evento ejecutado: color de fondo aplicado.";
}

function limpiarFondo() {
    zona.style.backgroundColor = "" ;
    resultado.textContent = "El color de fondo ha vuelto a la normalidad." ;
}

activar.addEventListener('click', () => {
    zona.addEventListener('mouseover',cambiarFondo);
    zona.addEventListener('mouseout',limpiarFondo);
    resultado.textContent = "Evento actovado: pasa el ratón por encima del párrafo." ;
});

desactivar.addEventListener('click', () => {
    zona.removeEventListener('mouseover', cambiarFondo);
    zona.removeEventListener('mouseout', limpiarFondo);
    limpiarFondo();
    resultado.textContent = "Evento desactivado: El color de fondo ya no cambiará.";
})