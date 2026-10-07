"use strict";

function getCookie(usuario) {
	const cookies = document.cookie.split("; ");
	for (const cookie of cookies) {
		const [clave, valor] = cookie.split("=");
		if (usuario === clave) return valor;
	}
	return null;
}

function setCookie(cookie) {
	document.cookie = cookie;
}

function deleteCookie(usuario) {
	document.cookie = `${usuario}=; max-age=0; path=/`;
}
