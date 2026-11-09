// archivo: mostrarUsuarios.js
"use strict";

async function mostrar() {
    tabla.innerHTML = "";

    const usuarios = await obtenerTodosUsuarios();

    // ✅ Mostrar mensaje si no hay usuarios
    if (!usuarios || usuarios.length === 0) {
        const tr = document.createElement("tr");
        const td = document.createElement("td");
        td.colSpan = 5;
        td.textContent = "⚠️ No hay usuarios registrados.";
        td.style.textAlign = "center";
        tr.appendChild(td);
        tabla.appendChild(tr);
        return; // Salimos para no ejecutar el resto
    }

    usuarios.forEach((user) => {
        const tr = document.createElement("tr");

        const tdNombre = document.createElement("td");
        tdNombre.textContent = user.nombre;

        const tdUsuario = document.createElement("td");
        tdUsuario.textContent = user.usuario;

        const tdCiudad = document.createElement("td");  // AÑADIR
        tdCiudad.textContent = user.ciudad || "—";      // AÑADIR

        const tdImagen = document.createElement("td");
        if (user.imagen instanceof File) {
            const url = URL.createObjectURL(user.imagen);
            const img = document.createElement("img");
            img.src = url; img.width = 40; img.height = 40; img.style.borderRadius = "50%";
            tdImagen.appendChild(img);
        } else if (user.imagenURL) {
            const img = document.createElement("img");
            img.src = user.imagenURL; img.width = 40; img.height = 40; img.style.borderRadius = "50%";
            tdImagen.appendChild(img);
        } else {
            tdImagen.textContent = "—";
        }

        const tdAcciones = document.createElement("td");

        // Botón borrar
        const btnBorrar = document.createElement("button");
        btnBorrar.innerHTML = `<img src="./img/wastebasket.png" width="22" height="22" />`;
        btnBorrar.title = "Borrar";
        btnBorrar.onclick = async () => {
            await borrarUsuario(user.usuario);
            await mostrar();
        };

        // Botón actualizar
        const btnActualizar = document.createElement("button");
        btnActualizar.innerHTML = `<img src="./img/pencil.png" width="22" height="22" />`;
        btnActualizar.title = "Actualizar";
        btnActualizar.onclick = async () => {
            await borrarUsuario(user.usuario);  // 1. Eliminamos al usuario
            await mostrar();                    // 2. Refrescamos la tabla
            nombre.value = user.nombre;         // 3. Cargamos datos en el formulario
            usuario.value = user.usuario;
            password.value = user.password;
            ciudad.value = user.ciudad;         // AÑADIR
            imagen.value = null;                // AÑADIR: no se puede pre-rellenar un <input type="file">
            // AÑADIR: pasar imagen URL si existía (usuarios de la API)
            imagenURL.value = user.imagenURL || "";
            // AÑADIR: conservar temporalmente el File/Blob si existía (usuarios locales)
            window.imagenBlobTemporal = (user.imagen instanceof File) ? user.imagen : null;
            mensaje.textContent = "ℹ️ Usuario cargado para actualizar.";
        };

        tdAcciones.appendChild(btnBorrar);
        tdAcciones.appendChild(btnActualizar);

        tr.appendChild(tdNombre);
        tr.appendChild(tdUsuario);
        tr.appendChild(tdCiudad);   // AÑADIR
        tr.appendChild(tdImagen);
        tr.appendChild(tdAcciones);

        tabla.appendChild(tr);
    });
}
