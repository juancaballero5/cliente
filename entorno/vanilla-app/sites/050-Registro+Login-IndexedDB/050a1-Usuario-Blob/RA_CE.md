# 050a1 — RA y CE

## Resumen técnico

La cuenta pasa a IndexedDB. La base se abre con una promesa, el almacén usa `usuario` como clave y `put` guarda el objeto. Si se elige una imagen, se guarda el archivo (`Blob`), no un data URL. Para pintarla se usa `URL.createObjectURL`. La sesión de la aplicación sigue en `localStorage`.

## Resultados de Aprendizaje trabajados

RA4, RA6 y RA7.

## Criterios de Evaluación acreditados

- **RA4.g** El registro de la base es el objeto de usuario. La imagen puede ser un binario, no una propiedad de texto.
- **RA6.d** El listado crea la fila y, si la imagen es un `Blob`, le asigna una URL temporal al `img`.
- **RA7.a** Abrir la base y escribir no terminan en el momento de la llamada. El alta espera.
- **RA7.b** `indexedDB.open` y la transacción `readwrite` son el mecanismo asíncrono. No es `localStorage`.
- **RA7.d** `onupgradeneeded` crea el almacén, `onsuccess` resuelve la promesa y `onerror` la rechaza. `put` y el cursor de lectura usan el mismo esquema.

No entra RA3.g: IndexedDB no está en el grupo de cookies, `localStorage` y `sessionStorage`. No entra RA7.c ni RA7.f: no hay `fetch` y el objeto no se convierte a JSON para guardarse. No entra RA7.h.
