"use strict";

function guardaCookieMaxAge(clave, valor) {
  document.cookie = `${clave}=${valor}; max-age=5; path=/; secure; samesite=Strict`;
}

function guardaCookieExpires(clave, valor) {
  const fechaCaducidad = new Date(Date.now() + 5000);
  document.cookie = `${clave}=${valor}; expires=${fechaCaducidad.toUTCString()}; path=/; secure; samesite=Strict`;
}

function guardaCookieNoCaduca(clave, valor) {
  document.cookie = `${clave}=${valor}; path=/; secure; samesite=Strict`;
}

// ESTA SERÁ NUESTRA API en /js/auth.js

function leeCookie(clave) {
  // 1. Protección inicial: si no hay cookies en el navegador, devolvemos null inmediatamente
  if (!document.cookie) return null;

  const cookies = document.cookie.split("; ");

  for (const cookie of cookies) {
    const [claveCookie, valorCookie] = cookie.split("=");

    // Comprobación para cuando el array está vacio y se ejecuta: ... = cookie.split("=");
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

function leeCookies() {
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

function borraCookie(clave) {
  document.cookie = `${clave}=; max-age=0; path=/`;
}

function guardaCookie(cookie, caducidad) {
  document.cookie = `${cookie.clave}=${cookie.valor}; ${caducidad}; path=/; secure; samesite=Strict`;
}
