# RA y CE — 040a2 Una clave «usuarios»

Informe para la programación. Acredita lo que el alumno hace en este paso (`ejercicios/Storage/ejer02`). No acredita las prácticas de DOM ni de cookies copiadas en la carpeta, ni la plantilla.

## Resumen técnico

Todas las cuentas viven en una sola clave de `localStorage`, un objeto cuya propiedad es el nombre de usuario. Se añade el email, con su patrón. Borrar quita la propiedad y vuelve a guardar el objeto.

## Resultados de aprendizaje

Núcleo: **RA3**, **RA4** y **RA5**. Apoyo: **RA2** y **RA6**.

## Criterios que este paso puede acreditar

| CE | Justificación |
|----|----------------|
| RA3.g | `ALMACEN_EJERCICIO` es una clave. `guardaUsuarioEjercicio` lee el objeto, añade `usuarios[user.usuario]` y hace `setItem`. |
| RA4.g | La cuenta es un objeto literal. El almacén es otro objeto: propiedad = usuario, valor = cuenta. |
| RA4.h | Leer una cuenta es `usuarios[usuario]`. Borrar es `delete usuarios[usuario]`. |
| RA4.d | `Object.values` saca el array de cuentas y `forEach` escribe el listado. |
| RA4.e | `Object.values` es la operación que convierte el objeto en lista. No hay `map`, `filter` ni `reduce`. |
| RA5.e | El formulario añade el email al objeto que se guarda. |
| RA5.f | El email vacío se admite. Si viene relleno y no encaja en el patrón, no se guarda. |
| RA5.g | Entra `PATRON_EMAIL`, además de los patrones de usuario, contraseña y teléfono. |
| RA5.b | Igual que en 040a1: `submit` anulado y botones por `click`. |
| RA2.d | `JSON.parse(...) \|\| {}` y `JSON.stringify` en cada escritura. El email vacío pasa a `"sin-email@ejemplo.com"`. |
| RA3.d | El listado sigue siendo una cadena HTML en `innerHTML`, ahora con el email. |

## No los contaría como evidencia de este paso

- **RA2.f**. Ya no hay un `for` sobre `localStorage.length`. El recorrido es `forEach`.
- **RA7** entero. Sigue sin haber cliente-servidor. El JSON es la persistencia de la clave.
- **RA3.e**, **RA3.f**, **RA4.f**, **RA4.j**, **RA6.d**, **RA6.f**, **RA6.g**, **RA1.a**. Igual que en 040a1.
- **sessionStorage**. RA3.g cita tres mecanismos. Aquí solo se trabaja `localStorage`.

## Refuerzo

Se usa y no lo pondría como evidencia principal: RA1.b, RA1.c, RA1.e, RA1.f, RA2.b, RA2.c, RA2.e, RA2.h, RA3.a, RA3.h, RA4.b, RA6.b, RA6.e, RA6.h.
