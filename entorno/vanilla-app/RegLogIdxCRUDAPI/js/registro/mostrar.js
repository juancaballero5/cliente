"use strict";

document.addEventListener("DOMContentLoaded", () => {
  const ciudadInput = document.getElementById("ciudad");
  const datalist = document.getElementById("listaCiudades");
  let timeout = null;

  ciudadInput.addEventListener("input", () => {
    const prefijo = ciudadInput.value.trim();

    if (prefijo.length < 3) {
      datalist.innerHTML = ""; // limpiamos sugerencias si hay menos de 3 letras
      return;
    }

    clearTimeout(timeout); // limpiamos anteriores
    timeout = setTimeout(async () => {
      const respuesta = await datosAPICiudades(prefijo);

      if (!respuesta || !respuesta.data) {
        datalist.innerHTML = "";
        return;
      }

      const opciones = respuesta.data.map((c) => {
        return `<option value="${c.city} (${c.country})">`;
      });

      datalist.innerHTML = opciones.join("");
    }, 300); // esperamos 300ms antes de llamar a la API
  });
});
