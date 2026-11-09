"use strict";

const activar = document.getElementById("activar");
const desactivar = document.getElementById("desactivar");
const zona = document.getElementById("zona");
const resultado = document.getElementById("resultado");

function cambiarFondo() {
  zona.style.backgroundColor = "lightblue";
  resultado.textContent = "Evento ejecutado: color de fondo aplicado.";
}

activar.addEventListener("click", () => {
  zona.addEventListener("mouseover", cambiarFondo);
  resultado.textContent = "Evento activado. Pasa el ratón por el párrafo.";
});

desactivar.addEventListener("click", () => {
  zona.removeEventListener("mouseover", cambiarFondo);
  zona.style.backgroundColor = "";
  resultado.textContent = "Evento desactivado. Ya no se aplicará el color.";
});
