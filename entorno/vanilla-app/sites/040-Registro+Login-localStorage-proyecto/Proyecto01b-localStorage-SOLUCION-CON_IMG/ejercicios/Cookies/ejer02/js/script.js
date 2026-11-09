"use strict";

const clave = document.getElementById("clave");
const valor = document.getElementById("valor");
const guardarCookieMaxAge = document.getElementById("guardarCookieMaxAge");
const guardarCookieExpires = document.getElementById("guardarCookieExpires");
const guardarCookieNoCaduca = document.getElementById("guardarCookieNoCaduca");
const leerCookie = document.getElementById("leerCookie");
const borrarCookie = document.getElementById("borrarCookie");
const resultado = document.getElementById("resultado");

listarCookies();

/* guardarCookieMaxAge.addEventListener("click", () => {
  guardaCookieMaxAge(clave.value, valor.value);
  listarCookies();
});

guardarCookieExpires.addEventListener("click", () => {
  guardaCookieExpires(clave.value, valor.value);
  listarCookies();
});

guardarCookieNoCaduca.addEventListener("click", () => {
  guardaCookieNoCaduca(clave.value, valor.value);
  listarCookies();
}); */

leerCookie.addEventListener("click", () => {
  let mensaje = "📦 El valor de la cookie es:<br>";
  const cookie = leeCookie(clave.value);
  if (cookie === null) {
    resultado.innerHTML = mensaje + "⚠️ No existe o ha caducado.";
  } else {
    resultado.innerHTML = mensaje + `🍪 <b>${cookie.clave}</b> = ${cookie.valor}<br>`;
  }
  setTimeout(() => {
    listarCookies();
  }, 1500);
});

borrarCookie.addEventListener("click", () => {
  borraCookie(clave.value);
  listarCookies();
});

guardarCookieMaxAge.addEventListener("click", () => {
  const cookie = {
    clave: clave.value.trim(),
    valor: valor.value.trim()
  }
  const caducidad = "max-age=5";
  guardaCookie(cookie, caducidad);
  listarCookies();
});

guardarCookieExpires.addEventListener("click", () => {
  const cookie = {
    clave: clave.value.trim(),
    valor: valor.value.trim()
  }
  const fechaCaducidad = new Date(Date.now() + 5000);
  const caducidad = `expires=${fechaCaducidad.toUTCString()}`;
  guardaCookie(cookie, caducidad);
  listarCookies();
});

guardarCookieNoCaduca.addEventListener("click", () => {
  const cookie = {
    clave: clave.value.trim(),
    valor: valor.value.trim()
  }
  const caducidad = "";
  guardaCookie(cookie, caducidad);
  listarCookies();
});

function listarCookies() {
  let listado = "📦 Todas las cookies actuales:<br>";
  const cookies = leeCookies();
  if (cookies.length === 0) {
    resultado.innerHTML = "📦 No hay cookies actualmente.";
  } else {
    cookies.forEach(cookie => {
      listado += `🍪 <b>${cookie.clave}</b> = ${cookie.valor}<br>`;
    });
    resultado.innerHTML = listado;
  }
}
