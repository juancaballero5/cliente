# 030a — RA y CE

## Resumen técnico

Dos prácticas nuevas. La primera muestra y oculta un bloque cambiando `display`. La segunda guarda, lista, lee y borra cookies como objetos `{ clave, valor }`. El menú DOM se copia y no es el trabajo de este paso.

## Resultados de Aprendizaje trabajados

RA2, RA3, RA4, RA5 y RA6.

## Criterios de Evaluación acreditados

- **RA2.e** Al leer, se distingue si la clave existe. Al listar, se deja fuera la clave `usuario`.
- **RA2.f** La cadena `document.cookie` se parte y se recorre cookie a cookie.
- **RA2.d** Cada trozo `clave=valor` se separa y se recorta con `trim` antes de guardarlo en el objeto.
- **RA3.c** Mostrar y ocultar cambian `style.display` entre `none` y `block`.
- **RA3.g** `document.cookie` escribe con `path`, `secure`, `samesite` y caducidad (`max-age`, `expires` o cadena vacía) y borra con `max-age=0`.
- **RA4.b** `guardaCookie`, `leeCookie`, `leeCookies` y `borraCookie` son funciones propias.
- **RA4.e** `filter` quita la cookie cuya clave es `usuario`.
- **RA4.g** La cookie de trabajo es un objeto `{ clave, valor }`, no una cadena suelta.
- **RA4.h** Se leen y se escriben `clave` y `valor`.
- **RA5.d** Cada botón (`type="button"`) lanza mostrar, ocultar, guardar, leer o borrar.
- **RA6.b** Los botones y `#resultado` se localizan por id. El listado se pinta con `innerHTML`.

No entra RA5.g: no hay expresión regular. No entra RA3.e: no se usan `alert`, `prompt` ni `confirm`. No entra RA7: la cookie no pasa por `fetch` ni por JSON.
