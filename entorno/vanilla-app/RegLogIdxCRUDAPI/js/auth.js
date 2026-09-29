// archivo: auth.js
"use strict";

async function obtenerUsuarioActivo() {
    const id = await obtenerSesionActiva(); // ← devuelve "jota" o "admin"
    if (!id) return null;

    const datos = await obtenerUsuario(id); // ← recupera objeto del usuario
    return datos || null;
}
