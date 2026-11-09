# 060a1 — RA y CE

## Resumen técnico

La práctica llama a una API en `http://localhost:3000`. Alta, lectura y borrado viajan en JSON con `fetch`. El navegador es el cliente y el proceso de Node es el servidor. La sesión de la aplicación, en esta carpeta, sigue en IndexedDB.

## Resultados de Aprendizaje trabajados

RA1 y RA7.

## Criterios de Evaluación acreditados

- **RA1.a** Hay un modelo cliente/servidor real: la página no abre la base. Pide el recurso a otro origen del equipo, el puerto 3000.
- **RA1.b** Quien ejecuta el script es el navegador. La API no pinta el DOM.
- **RA7.a** La interfaz espera a la respuesta. Un fallo HTTP no se trata como un usuario encontrado.
- **RA7.b** `fetch` más `async`/`await` es el mecanismo.
- **RA7.c** `GET` para leer y `POST` para grabar, con la URL montada en el cliente.
- **RA7.d** Se mira `respuesta.ok`, el estado y `respuesta.json()`. Un 404 al leer un usuario se convierte en «no está», no en un fallo genérico.
- **RA7.e** Con el JSON recibido se actualiza el listado del documento.
- **RA7.f** El cuerpo de la petición y el de la respuesta son JSON (`JSON.stringify` y `respuesta.json()`).
- **RA7.g** La llamada usa la API estándar del navegador, sin librería.

No entra RA7.h ni RA7.i. No hay Angular, React ni una SPA.
