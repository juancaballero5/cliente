# RA y CE — 040a1 Una clave por usuario

Informe para la programación. Acredita lo que el alumno hace en este paso (`ejercicios/Storage/ejer01`). No acredita las prácticas de DOM ni de cookies copiadas en la carpeta, ni la plantilla.

## Resumen técnico

Cada cuenta se guarda en `localStorage` con una clave: el nombre de usuario. El valor es el objeto en JSON. El formulario valida con expresiones regulares y el listado recorre todas las claves del origen.

## Resultados de aprendizaje

Núcleo: **RA3** y **RA5**. Apoyo: **RA2**, **RA4** y **RA6**.

## Criterios que este paso puede acreditar

| CE | Justificación |
|----|----------------|
| RA3.a | `localStorage` se usa como objeto predefinido del navegador (`setItem`, `getItem`, `removeItem`, `key`, `length`). |
| RA3.g | Una cuenta, una clave. Leer recorre `localStorage.length` y se queda solo con valores cuyo `usuario` es un texto. |
| RA3.h | El `try/catch` de `JSON.parse` descarta claves que no son JSON y el resultado se mira en Application. |
| RA5.b | `submit` hace `preventDefault`. Guardar, leer y borrar van en `click`. |
| RA5.c | El envío del formulario y el clic del botón son eventos distintos: Enter no guarda. |
| RA5.e | El alta lee nombre, usuario, contraseña y teléfono del formulario. |
| RA5.f | Si el patrón no encaja, se escribe el aviso y no se llama a `guardarUsuarioPorClave`. |
| RA5.g | `PATRON_USUARIO`, `PATRON_PASSWORD` y `PATRON_TELEFONO` son expresiones regulares. |
| RA2.d | `JSON.stringify` al guardar y `JSON.parse` al leer. El teléfono vacío pasa a `"5551234567"`. |
| RA2.f | El `for` de `leerUsuariosPorClave` recorre las claves. No hay bucle anidado. |
| RA4.b | `guardarUsuarioPorClave`, `leerUsuariosPorClave`, `getUsuarioPorClave` y `borrarUsuarioPorClave`. |
| RA4.d | Los usuarios válidos se acumulan en un array con `push` y se recorren con `forEach`. |
| RA3.d | El listado se monta como HTML y se vuelca con `innerHTML`. |

## No los contaría como evidencia de este paso

- **RA7** entero. No hay comunicación con servidor, `fetch`, `XMLHttpRequest`, IndexedDB ni framework. El JSON de aquí es el formato de la clave, no un intercambio.
- **RA3.e** y **RA3.f**. No hay `alert`, `prompt`, `confirm` ni varias ventanas.
- **RA4.e**, **RA4.f**, **RA4.j**. No hay `map`/`filter`/`reduce`, ni clases, ni patrón de diseño.
- **RA6.d**. No se crean ni se borran nodos. El texto entra por `innerHTML`.
- **RA6.f** y **RA6.g**. No se prueba compatibilidad entre navegadores.
- **RA1.a**. No se compara este almacén con un servidor.

## Refuerzo

Se usa y no lo pondría como evidencia principal de este paso: RA1.b, RA1.c, RA1.e, RA1.f, RA2.b, RA2.c, RA2.e, RA2.g, RA2.h, RA4.h, RA6.b, RA6.e, RA6.h.
