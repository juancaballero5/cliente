"use strict";

function mostrar(datos) {
    console.log("✅ Datos recibidos:", datos);
    console.log("📌 Título:", datos.title);
    console.log("📝 Contenido:", datos.body);

    const textarea = document.getElementById("texto");
    if (textarea) {
        textarea.value = `Título: ${datos.title}\n\nContenido: ${datos.body}`;
        // Establecer estilo visual
        textarea.style.maxWidth = "600px";       // Anchura máxima
        textarea.style.width = "100%";           // Que se adapte al contenedor
        textarea.style.boxSizing = "border-box"; // Para que padding no desborde
        textarea.style.resize = "none";          // Opcional: evita que el usuario cambie tamaño manualmente

        // Ajustar altura al contenido
        textarea.style.height = "auto"; // Reinicio
        textarea.style.height = `${textarea.scrollHeight}px`;
    }
}
