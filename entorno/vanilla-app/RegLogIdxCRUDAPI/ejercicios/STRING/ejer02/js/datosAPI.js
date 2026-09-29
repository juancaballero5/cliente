"use strict"

async function datosAPI() {
    let id = aleatorio(1, 100);

    try {
        const datos = await llamarAPI({
            baseURL: "https://jsonplaceholder.typicode.com/posts",
            params: { id }
        });
        mostrar(datos[0]); // ✅ Aquí sí decidimos mostrarlo
    } catch (error) {
        console.error("❌ Error al obtener los datos:", error);
        texto.value = "❌ No se pudo obtener el texto.";
    }
}

/* "use strict";

async function datosAPI() {
  const post = aleatorio(1, 100); // Elegir un post entre los 100 que hay

  try {
    const datos = await llamarAPI(`https://jsonplaceholder.typicode.com/posts/${post}`);
    mostrar(datos); // Mostramos el resultado
  } catch (error) {
    console.error("❌ Error al obtener los datos:", error);
    texto.value = "❌ No se pudo obtener el texto.";
  }
} */
