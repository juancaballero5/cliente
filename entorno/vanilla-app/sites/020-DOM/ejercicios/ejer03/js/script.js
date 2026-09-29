"use strict";

const btnSelector = document.getElementById("btnSelector");
const btnSelectorAll = document.getElementById("btnSelectorAll");
const resultado = document.getElementById("resultado");

btnSelector.addEventListener("click", () => {
    const primero = document.querySelector(".parrafo");
    resultado.innerHTML =
    `<p>querySelector() encontró: <b>${primero.textContent}</b></p>`;
});

btnSelectorAll.addEventListener("click", () => {
    const todos = document.querySelectorAll(".parrafo");
    let salida = "<p>querySelectorAll() encontró:</p><ul>";
    todos.forEach((p) => {
        salida += `<li><b>${p.textContent}</b></li>`;
    });
    salida += "</ul>";
    resultado.innerHTML = salida;
});
