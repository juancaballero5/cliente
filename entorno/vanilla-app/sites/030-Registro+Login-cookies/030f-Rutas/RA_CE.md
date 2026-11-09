# 030f — RA y CE

## Resumen técnico

`rutas.js` lee las clases del `body`. Una práctica DOM sin sesión va al login. Usuarios sin ser admin va a la portada. Usuarios sin sesión cae en la primera rama y también va al login. `replace` sustituye la entrada del historial.

## Resultados de Aprendizaje trabajados

RA2, RA3 y RA6. Cierra el bloque de cookies.

## Criterios de Evaluación acreditados

- **RA2.c** `rutas.js` no declara `sesion`, `esAdmin`, `LOGIN` ni `PORTADA`. Los lee de `menu.js`, que tiene que ir delante.
- **RA2.e** La primera condición es página privada sin sesión. La segunda, página de admin sin serlo. El `else if` impide que las dos se apliquen a la vez.
- **RA3.b** `window.location.replace` cambia de documento sin dejar la página privada en el historial. Cerrar sesión sigue usando `location.href` en `menu.js`.
- **RA6.b** `document.body.classList.contains` pregunta por una clase aunque el `body` de Usuarios lleve dos (`paginaPrivada` y `paginaAdmin`).

No entra RA7. Las dos prácticas de Cookies no cargan `rutas.js`: escribir su dirección no redirige. No se acredita ese hueco como si el control cubriera todo el sitio.
