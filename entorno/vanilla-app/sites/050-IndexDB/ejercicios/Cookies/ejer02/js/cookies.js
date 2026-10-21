"use strict";

function guardaCookieMaxAge(clave, valor) {
  setCookie(`${clave}=${valor}; max-age=5; path=/; secure; samesite=Strict`);
};

function guardaCookieExpires(clave, valor) {
  const fechaExpiracion = new Date(Date.now() + 5000).toUTCString();
  setCookie(`${clave}=${valor}; expires=${fechaExpiracion}; path=/; secure; samesite=Strict`);
};

function guardaCookieNoCaduca(clave, valor) {
  setCookie(`${clave}=${valor}; path=/; secure; samesite=Strict`);
}

function leeCookies() {
  let mensaje = "📦 Todas las cookies actuales:<br>";

  if (!document.cookie) {
    return mensaje + "⚠️ No hay cookies disponibles.";
  }

  const cookies = document.cookie.split("; "); /* ['jota=dejame', 'juan=pachuli', 'goku=kakaroto'] */
  for (const cookie of cookies) {
    const [clave, valor] = cookie.split("=");
    if (clave.trim()) {
      mensaje += `🔑 ${clave}: ${valor}<br>`;
    }
  }
  return mensaje;
}

function leeCookie(claveCookie) {
  let mensaje = "📦 El valor de la cookie es:<br>";

  if (!document.cookie) {
    return mensaje + "⚠️ No hay cookies disponibles.";
  }

  const valor = getCookie(clave);
  if (valor === null) {
    return mensaje + "⚠ No existe o ha caducado.";
  }
  return mensaje + `🔑 ${claveCookie}: ${valor}<br>`;
}

function borraCookie(clave) {
  deleteCookie(clave);
}
