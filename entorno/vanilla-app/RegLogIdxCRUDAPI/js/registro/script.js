"use strict";

document.addEventListener("DOMContentLoaded", () => {
    const formRegistro = document.getElementById("formRegistro");
    const mensaje = document.getElementById("mensaje");

    formRegistro.addEventListener("submit", async (e) => {
        e.preventDefault();

        const nombre = document.getElementById("nombre").value.trim();
        const usuario = document.getElementById("usuario").value.trim();
        const password = document.getElementById("password").value.trim();
        const ciudad = document.getElementById("ciudad").value.trim();  // AÑADIR
        const imagenInput = document.getElementById("imagen");

        const existente = await obtenerUsuario(usuario); // 1️⃣ Comprobamos si el usuario existe

        if (existente) {
            mensaje.textContent = "⚠️ El usuario ya existe.";
            return;
        }

        let imagenBlob = null;
        if (imagenInput.files.length > 0) {
            imagenBlob = imagenInput.files[0]; // 2️⃣ Guardamos la imagen como Blob
        }

        const nuevoUsuario = {
            nombre,
            usuario,
            password,
            ciudad,             // AÑADIR, guardar ciudad
            imagen: imagenBlob, // File si suben imagen
            imagenURL: "",      // coherencia con los de la API
        };

        // Guardamos en localStorage
        try {
            await guardarUsuario(nuevoUsuario); // 3️⃣ Guardamos en la base de datos
            mensaje.textContent = `✅ Usuario ${nombre} registrado correctamente.`;
            formRegistro.reset();
        } catch (error) {
            mensaje.textContent = "❌ Error al registrar el usuario.";
        }

        // Opcional: redireccionar a login después de 2 segundos
        /*
        setTimeout(() => {
          window.location.href = "login.html";
        }, 2000);
        */
    });
});
