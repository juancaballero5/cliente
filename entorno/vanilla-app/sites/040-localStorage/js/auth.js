"use strict";

const ALMACEN_CUENTAS = "usuarios";
const ALMACEN_SESION = "usuario";
const CLAVE_SESION = "usuario";

function guardaCuenta(ficha) {
	const datos = JSON.parse(localStorage.getItem(ALMACEN_CUENTAS)) || {};
	datos[ficha.usuario] = ficha; // el nombre es la clave
	localStorage.setItem(ALMACEN_CUENTAS, JSON.stringify(datos));
}

function leeCuenta(nombre) {
	const datos = JSON.parse(localStorage.getItem(ALMACEN_CUENTAS)) || {};
	return nombre in datos ? datos[nombre] : null;
}

function leeCuentas() {
	return JSON.parse(localStorage.getItem(ALMACEN_CUENTAS)) || {};
}

function borraCuenta(nombre) {
	const datos = JSON.parse(localStorage.getItem(ALMACEN_CUENTAS)) || {};
	if (!(nombre in datos)) return null;
	const ficha = datos[nombre];
	delete datos[nombre];
	localStorage.setItem(ALMACEN_CUENTAS, JSON.stringify(datos));
	return ficha;
}

// SESIÓN

function guardaSesion(ficha) {
	const datos = JSON.parse(localStorage.getItem(ALMACEN_SESION)) || {};
	datos[CLAVE_SESION] = ficha;
	localStorage.setItem(ALMACEN_SESION, JSON.stringify(datos));
}

function leeSesion() {
	const datos = JSON.parse(localStorage.getItem(ALMACEN_SESION)) || {};
	return CLAVE_SESION in datos ? datos[CLAVE_SESION] : null;
}

function borraSesion() {
	const datos = JSON.parse(localStorage.getItem(ALMACEN_SESION)) || {};
	if (!(CLAVE_SESION in datos)) return null;
	const ficha = datos[CLAVE_SESION];
	delete datos[CLAVE_SESION];
	localStorage.setItem(ALMACEN_SESION, JSON.stringify(datos));
	return ficha;
}