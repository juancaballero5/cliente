// archivo: login.js
"use strict";

document.addEventListener("DOMContentLoaded", () => {
    const formLogin = document.getElementById("formLogin");
    const mensaje = document.getElementById("mensaje");

    formLogin.addEventListener("submit", async (e) => {
        e.preventDefault();

        const usuario = document.getElementById("usuario").value.trim();
        const password = document.getElementById("password").value.trim();

        if (!usuario || !password) {
            mensaje.textContent = "❌ Por favor, rellena todos los campos.";
            return;
        }

        // 🧠 Recuperamos el objeto de localStorage (está en formato JSON string)
        try {
            const datos = await obtenerUsuario(usuario);

            if (!datos) {
                mensaje.textContent = "❌ El usuario no existe.";
                return;
            }

            if (datos.password !== password) {
                mensaje.textContent = "❌ Contraseña incorrecta.";
                return;
            }

            await guardarSesionActiva(usuario); // Guardamos el ID del usuario como sesión

            mensaje.textContent = `✅ Bienvenido, ${datos.nombre}. Redirigiendo...`;
            
            setTimeout(() => {
                window.location.href = "index.html";
            }, 1500);
        } catch (error) {
            mensaje.textContent = "❌ Error al iniciar sesión.";
        }
    });
});

