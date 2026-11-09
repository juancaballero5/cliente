# 030e — RA y CE

## Resumen técnico

La página de usuarios da de alta cuentas con el mismo criterio que el registro, las lista en una tabla y permite editar o borrar. El enlace Usuarios solo se muestra si el valor de la sesión es `admin`. Editar borra la cookie y deja los datos en el formulario para volver a registrarla.

## Resultados de Aprendizaje trabajados

RA2, RA3, RA4, RA5 y RA6.

## Criterios de Evaluación acreditados

- **RA2.e** No se edita ni se borra la cuenta que coincide con la sesión. El enlace Usuarios depende de `sesion.valor == "admin"`.
- **RA3.d** El aviso de sesión abierta se pinta con `innerHTML` para que `<br>` parta la línea.
- **RA3.g** Alta, borrado y la edición escriben o eliminan cookies de cuenta. La de sesión no se toca.
- **RA4.e** `filter` deja fuera la cookie `usuario` antes de pintar la tabla.
- **RA5.e** El formulario de alta convive con los botones `type="button"` de cada fila, que no envían el formulario.
- **RA5.f** El alta repite las comprobaciones del registro.
- **RA6.d** Cada fila, celda y botón se crean con `createElement` y se enganchan al `tbody`. Al relistar, el cuerpo de la tabla se vacía.

No entra RA3.e: Borrar no llama a `confirm`. No entra RA5.g. No cierra la URL: sin ser admin, la página se abre si se escribe la dirección.
