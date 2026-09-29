"use strict";

const btnLeer = document.getElementById("btnLeer");
const btnModificar = document.getElementById("btnModificar");
const parrafo = document.querySelector("#caja .parrafo");
const resultado = document.getElementById("resultado");

btnLeer.addEventListener("click", () => {
    const porTextContent = parrafo.textContent;
    const porInnerText = parrafo.innerText;
    const porInnerHTML = parrafo.innerHTML;
    resultado.innerHTML =
    "<p><b>textContent:</b> " + porTextContent + "</p>" +
    "<p><b>innerText:</b> " + porInnerText + "</p>" +
    "<p><b>innerHTML:</b> " + porInnerHTML + "</p>";
});

btnModificar.addEventListener("click", () => {
    parrafo.innerHTML = "Texto <mark>modificado</mark> usando <code>innerHTML</code>.";
    resultado.textContent = "Contenido modificado. Vuelve a pulsar «Leer contenido».";
});