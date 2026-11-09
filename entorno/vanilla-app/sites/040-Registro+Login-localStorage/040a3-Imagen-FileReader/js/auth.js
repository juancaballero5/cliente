"use strict";

function leeUsuarios() {
  if (!document.cookie) return []; // Si no hay cookies, devuelve array vacío directamente

  const cookies = document.cookie.split("; ");
  const datos = [];

  for (const cookie of cookies) {
    const [claveCookie, valorCookie] = cookie.split("=");

    // Comprobación para cuando el array está vacio y se ejecuta: ... = cookie.split("=");
    if (claveCookie && claveCookie.trim() !== "") {
      const dato = {
        clave: claveCookie.trim(),
        valor: valorCookie ? valorCookie.trim() : ""
      };
      datos.push(dato);
    }
  }
  return datos;
}

function leeUsuario(clave) {
  // 1. Protección inicial: si no hay cookies en el navegador, devolvemos null inmediatamente
  if (!document.cookie) return null;

  const cookies = document.cookie.split("; ");

  for (const cookie of cookies) {
    const [claveCookie, valorCookie] = cookie.split("=");

    // 2. Comprobación para cuando el array está vacio y se ejecuta: ... = cookie.split("=");
    if (claveCookie && claveCookie.trim() === clave.trim()) {
      return {
        clave: claveCookie.trim(),
        valor: valorCookie ? valorCookie.trim() : ""
      };
    }
  }

  // 3. Si recorrió todas las cookies y no hubo coincidencia
  return null;
}

function borraUsuario(clave) {
  document.cookie = `${clave}=; max-age=0; path=/`;
}

function guardaUsuario(usuario, caducidad) {
  document.cookie = `${usuario.clave}=${usuario.valor}; ${caducidad}; path=/; secure; samesite=Strict`;
}

function leeSesion() {
  // 1. Protección inicial: si no hay cookies en el navegador, devolvemos null inmediatamente
  if (!document.cookie) return null;

  const cookies = document.cookie.split("; ");

  for (const cookie of cookies) {
    const [claveCookie, valorCookie] = cookie.split("=");

    // 2. Comprobación para cuando el array está vacio y se ejecuta: ... = cookie.split("=");
    if (claveCookie && claveCookie.trim() === "usuario") {
      return {
        clave: "usuario",
        valor: valorCookie ? valorCookie.trim() : ""
      };
    }
  }

  // 3. Si recorrió todas las cookies y no hubo coincidencia
  return null;
}

function borraSesion() {
  document.cookie = `usuario=; max-age=0; path=/`;
}

function guardaSesion(sesion, caducidad) {
  document.cookie = `${sesion.clave}=${sesion.valor}; ${caducidad}; path=/; secure; samesite=Strict`;
}
