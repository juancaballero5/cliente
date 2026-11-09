# 020c — RA y CE

## Resumen técnico

`querySelector` devuelve el primer párrafo que cumple el selector. `querySelectorAll` devuelve todos. Con el segundo se construye una lista HTML y se vuelca en el resultado.

## Resultados de Aprendizaje trabajados

RA2, RA3, RA5 y RA6.

## Criterios de Evaluación acreditados

- **RA2.f** El bucle recorre la lista de nodos que devuelve `querySelectorAll`.
- **RA3.d** El resultado se monta como HTML (`<p>` y `<ul>`) y se asigna con `innerHTML`.
- **RA5.d** Cada botón dispara una de las dos búsquedas.
- **RA6.b** Entran `querySelector` y `querySelectorAll`.
- **RA6.c** El selector recorre el documento por clase y se distingue el primero del conjunto.

No entra RA6.d: aquí no se crean nodos con `createElement`. El HTML del resultado es una cadena.
