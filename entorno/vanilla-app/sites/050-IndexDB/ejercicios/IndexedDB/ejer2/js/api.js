"use strict";

async function respuestaAPI(url,opciones) {
    const direccion = new URL(url);
    const parametros = opciones.parametros || {};
    for (const clave in parametros) {
        direccion.searchParams.set(clave,parametros[clave]);
    }
    const respuesta = await fetch(direccion,opciones);
    if (!respuesta.ok) {
        throw new Error("La API no respondio bien.");
    }

    return respuesta;
}

async function pedirPersonaAPI() {
    const respuesta = await respuestaAPI("https://randomuser.me/api/?nat=es", {
        method: "GET",
        headers: {},
        parametros: {
            nat: "es",
            user: "jota"
        }
    });

    const datos = await respuesta.json();
}

async function pedirFoto(clave) {
    const respuesta = await fetch("https://api.dicebear.com/10.x/avataaars/png", {
        method: "GET",
        headers: {},
        parametros: {
            seed: clave
        }
    });

    const datos = await respuesta.json();
}

/* EJEMPLOS DE URL's:
randomuser: "https://randomuser.me/api/?nat=es", datos en español
dicebear: "https://api.dicebear.com/10.x/avataaars/png?seed=jamo", clave = jamo
*/
