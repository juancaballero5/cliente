"use strict";

async function respuestaAPI(url, opciones) {
  const direccion = new URL(url);
  const parametros = opciones.parametros || {};
  for (const clave in parametros) {
    direccion.searchParams.set(clave, parametros[clave]);
    console.log("URL: ", direccion);
  }

  const respuesta = await fetch(direccion, opciones);
  if (!respuesta.ok) {
    throw new Error("La API no respondió bien.");
  }
  return respuesta;
}

async function pedirPersonaAPI() {
  const respuesta = await respuestaAPI("https://randomuser.me/api/", {
    method: "GET",
    headers: {},
    parametros: {
      nat: "es"
    }
  });
  const datos = await respuesta.json();
  return datos.results[0];
}

async function blobDeFoto(clave) {
  const respuesta = await respuestaAPI("https://api.dicebear.com/10.x/avataaars/png", {
    method: "GET",
    headers: {},
    parametros: {
      seed: clave
    }
  });
  return respuesta.blob();
}

/* EJEMPLOS DE URL's:
randomuser: "https://randomuser.me/api/?nat=es", datos en español
dicebear: "https://api.dicebear.com/10.x/avataaars/png?seed=jamo", clave = jamo
*/
