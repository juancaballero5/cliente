# 050a2 — RA y CE

## Resumen técnico

Otra práctica pide una persona a `randomuser.me` y una imagen a Dicebear. La ficha llega en JSON y la foto, como `Blob`. Esos datos se guardan en IndexedDB y la imagen binaria se pinta con `URL.createObjectURL`.

## Resultados de Aprendizaje trabajados

RA1 y RA7. IndexedDB ya quedó acreditado en 050a1.

## Criterios de Evaluación acreditados

- **RA1.a** El navegador es el cliente y las dos direcciones son servicios externos. La página no guarda esos datos en el servidor propio.
- **RA7.a** La ficha y la foto llegan después del clic. La interfaz espera a las dos respuestas.
- **RA7.b** `fetch` es el mecanismo. Sigue habiendo promesas e `async`/`await`.
- **RA7.c** `fetch` con `GET`. Los parámetros de consulta se añaden con `URL.searchParams`.
- **RA7.d** Se usa el estado de la respuesta (`respuesta.ok`) y, según el recurso, `respuesta.json()` o `respuesta.blob()`.
- **RA7.e** Con la respuesta se actualiza el listado y el `src` de la imagen.
- **RA7.f** La persona viaja en JSON. La imagen, no: es un binario y por eso no se mete en ese JSON.
- **RA7.g** Son peticiones HTTP normales del navegador, sin librería.

No entra RA7.h ni RA7.i: no hay framework ni SPA. La sesión de la aplicación sigue en `localStorage`.
