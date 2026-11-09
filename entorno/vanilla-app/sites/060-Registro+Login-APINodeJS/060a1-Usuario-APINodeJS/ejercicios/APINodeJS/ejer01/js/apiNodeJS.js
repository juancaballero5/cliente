"use strict";

const APIEjercicio = "http://localhost:3000/accesoDB";

async function respuestaAPIEjercicio(url, opciones) {
  // const direccion = new URL(url);
  // console.log("URL (antes): ", direccion);
  /*   const parametros = opciones.parametros || {};
    for (const clave in parametros) {
      direccion.searchParams.set(clave, parametros[clave]);
    } */
  // console.log("URL (después): ", direccion);

  const respuesta = await fetch(url, opciones);
  if (!respuesta.ok) {
    const error = new Error("La API no respondió bien.");
    error.status = respuesta.status;
    throw error;
  }
  return respuesta;
}

async function guardaUsuarioEjercicio(usuario) {
  const respuesta = await respuestaAPIEjercicio(APIEjercicio + "/usuarios/grabar", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(usuario)
  });
  return respuesta.json();
}

async function leeUsuarioEjercicio(usuario) {
  try {
    const respuesta = await respuestaAPIEjercicio(APIEjercicio + "/usuarios/leer/" + encodeURIComponent(usuario), {
      method: "GET",
      headers: {}
    });
    return respuesta.json();
  } catch (error) {
    if (error.status === 404) return undefined;
    throw error;
  }
}

async function leeUsuariosEjercicio() {
  const respuesta = await respuestaAPIEjercicio(APIEjercicio + "/usuarios/leer", {
    method: "GET",
    headers: {}
  });
  return respuesta.json();
}

async function borraUsuarioEjercicio(usuario) {
  const respuesta = await respuestaAPIEjercicio(APIEjercicio + "/usuarios/borrar/" + encodeURIComponent(usuario), {
    method: "DELETE",
    headers: {}
  });
  return respuesta.json();
}
