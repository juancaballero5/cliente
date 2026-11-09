// archivo: menu.js
"use strict";

document.addEventListener("DOMContentLoaded", () => {
  initMenu(); // función async aparte
});

async function initMenu() {
  const enlacesPrivados = document.querySelectorAll(".privado");
  const enlacesPublicos = document.querySelectorAll(".publico");
  const nodoUsuario = document.getElementById("usuario");
  const cerrarSesion = document.getElementById("cerrarSesion");
  const fotoPerfil = document.querySelector(".header-profile img");

  const usuarioActivo = await obtenerUsuarioActivo();

  if (usuarioActivo) {
    // Mostrar enlaces privados
    enlacesPrivados.forEach(el => el.style.display = "inline-block");
    enlacesPublicos.forEach(el => el.style.display = "none");

    // Mostrar nombre real del usuario (si existe el nodo)
    if (nodoUsuario) {
      nodoUsuario.innerHTML = `<a href="#">👤 ${usuarioActivo.nombre}</a>`;
    }

    // Mostrar imagen personalizada (File o URL)
    // Importante: si no hay imagen, NO tocamos el src,
    // así respetamos el <img> del HTML (ruta correcta por página).
    if (fotoPerfil) {
      if (usuarioActivo.imagen instanceof File) {
        const url = URL.createObjectURL(usuarioActivo.imagen);
        fotoPerfil.src = url;
        fotoPerfil.onload = () => URL.revokeObjectURL(url); // liberar blob tras cargar
      } else if (usuarioActivo.imagenURL) {
        fotoPerfil.src = usuarioActivo.imagenURL; // caso usuarios importados (API)
      }
      // else: no cambiar fotoPerfil.src (deja el que trae el HTML)
    }

    // Mostrar sección de gestión solo si es el admin
    console.log("🧪 usuarioActivo:", usuarioActivo);
    console.log("🔎 Tipo de usuarioActivo:", typeof usuarioActivo);
    console.log("🔍 usuarioActivo.usuario:", usuarioActivo.usuario);

    const gestionUsuarios = document.getElementById("gestionUsuarios");
    if (gestionUsuarios) {
      if (usuarioActivo.usuario === "admin") {
        gestionUsuarios.style.display = "inline-block";
        console.log("✅ ADMIN DETECTADO → Se muestra el enlace de gestión de usuarios.");
      } else {
        gestionUsuarios.style.display = "none";
        console.log("🚫 NO ES ADMIN → No se muestra el enlace de gestión de usuarios.");
      }
    }

    // Habilitar cierre de sesión (si existe el enlace)
    cerrarSesion?.addEventListener("click", async (e) => {
      e.preventDefault();
      await borrarSesionActiva();
      location.reload();
    });

  } else {
    // Usuario NO logueado
    enlacesPrivados.forEach(el => el.style.display = "none");
    enlacesPublicos.forEach(el => el.style.display = "inline-block");

    // ⚠️ No reasignamos fotoPerfil.src aquí.
    // Dejamos el que trae el HTML, que ya apunta a la ruta correcta según la página.
  }
}
