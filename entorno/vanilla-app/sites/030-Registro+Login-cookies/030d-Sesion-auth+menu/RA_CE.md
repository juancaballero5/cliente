# 030d — RA y CE

## Resumen técnico

`menu.js` lee la cookie `usuario`. Sin sesión se ven Registro y Login. Con sesión se ven los ejercicios, el nombre y Cerrar sesión. Cerrar sesión borra solo esa cookie y vuelve a la portada.

## Resultados de Aprendizaje trabajados

RA2, RA3, RA4, RA5 y RA6.

## Criterios de Evaluación acreditados

- **RA2.c** `PORTADA` se declara en `menu.js`. `login.js` la usa y no puede volver a declararla: los dos scripts clásicos comparten ese ámbito.
- **RA2.e** `if (sesion)` separa la barra privada de la pública. El objeto devuelto cuenta como verdadero y `null` no.
- **RA3.b** Cerrar sesión asigna `window.location.href`.
- **RA3.c** `style.display` muestra u oculta grupos de enlaces. La cadena vacía quita el `none` escrito en el HTML.
- **RA3.g** `leeSesion` y `borraSesion` leen y borran la cookie de sesión. La cuenta permanece.
- **RA4.e** `querySelectorAll` devuelve una lista y `forEach` aplica el cambio de `display` a cada enlace.
- **RA5.c** El clic del nombre y el de Cerrar sesión se cancelan con `preventDefault` porque el `href` es `#`.
- **RA6.b** Los enlaces se seleccionan por clase y el nombre, por id. `textContent` recibe `sesion.valor`.

No entra el control de la dirección. Ocultar el enlace no impide escribir la URL. Eso es 030f. `LOGIN` se calcula y este archivo no la usa.
