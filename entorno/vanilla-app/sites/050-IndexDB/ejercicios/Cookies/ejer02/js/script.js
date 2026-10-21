'use strict';

const guardarCookieMaxAge = document.getElementById('guardarCookieMaxAge');
const guardarCookieExpires = document.getElementById('guardarCookieExpires');
const guardarCookieNoCaduca = document.getElementById('guardarCookieNoCaduca');
const leerCookies = document.getElementById('leerCookies');
const leerCookie = document.getElementById('leerCookie');
const borrarCookie = document.getElementById('borrarCookie');
const clave = document.getElementById('clave');
const valor = document.getElementById('valor');
const resultado = document.getElementById('resultado');

resultado.innerHTML = leeCookies();

guardarCookieMaxAge.addEventListener('click', () => {
  guardaCookieMaxAge(clave.value, valor.value);
  resultado.innerHTML = leeCookies();
});

guardarCookieExpires.addEventListener('click', () => {
  guardaCookieExpires(clave.value, valor.value);
  resultado.innerHTML = leeCookies();
});

guardarCookieNoCaduca.addEventListener('click', () => {
  guardaCookieNoCaduca(clave.value, valor.value);
  resultado.innerHTML = leeCookies();
});

leerCookies.addEventListener('click', () => {
  resultado.textContent = "";
  resultado.innerHTML = leeCookies(clave.value);
});

leerCookie.addEventListener('click', () => {
  resultado.textContent = "";
  resultado.innerHTML = leeCookie(clave.value);
});

borrarCookie.addEventListener('click', () => {
  borraCookie(clave.value);
  resultado.innerHTML = leeCookies();
});
