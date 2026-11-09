# RA y CE — 070a1 Plantilla y componentes

Informe para la programación. Acredita la aplicación Angular de esta carpeta: el proyecto de la CLI, la plantilla de `010f` dentro del componente, las cuatro pantallas y el router. No acredita guardar, leer ni borrar: los botones no llaman a ningún almacén. La plantilla visual ya está acreditada en `010f`; aquí cuenta lo que cambia al vivir dentro de Angular.

## Resumen técnico

Hay una sola aplicación. `index.html` solo tiene `<app-root>`. Cabecera, menú y pie están en la plantilla de `App`. El menú abre la portada o una tarjeta cambiando la ruta, sin pedir otro documento. Las tres tarjetas muestran el mismo formulario. Ningún botón escribe todavía.

## Resultados de aprendizaje

Núcleo: **RA7**. Apoyo: **RA6**.

## Criterios que este paso puede acreditar

| CE | Justificación |
|----|----------------|
| RA7.h | Angular es el framework de la página. Una ruta no abre otro HTML: el router cambia el componente que se ve dentro de `<main>`. En este paso se reconoce qué asume el framework (componente, plantilla, hoja y router) frente al `index.html` suelto de Vanilla. |
| RA7.i | El proyecto se crea con la CLI, se generan los cuatro componentes y se declaran las rutas. La depuración de este paso es concreta: la foto apunta a `/img/user.png`, el `<title>` es el nombre de la carpeta, y `routerLink` solo navega si el componente dueño de esa plantilla lo importa. |
| RA6.h | Plantilla, hoja y clase van en archivos distintos. La hoja global entra por `angular.json`, no por un `<link>` del documento. La hoja de la tarjeta solo pinta su componente, y por eso está copiada en los tres CRUD. |

## No los contaría como evidencia de este paso

- **RA7.a** a **RA7.g**. No hay petición al servidor de datos, ni JSON de intercambio, ni una vista que se actualice con una respuesta. El cambio de pantalla es el router.
- **RA3.g**. El párrafo de la tarjeta nombra `localStorage`. Nada se guarda.
- **RA5**. El formulario se ve. No hay validación ni envío enganchado.
- **RA4**. Las clases las escribe la CLI y en este paso no se les añade ningún método.
- **RA1.a** como cliente/servidor de la práctica. El contenedor solo sirve la aplicación para poder verla. La página no pide la API.

## Refuerzo

Se usa y no lo pondría como evidencia principal: RA1.b, RA1.c, RA1.e, RA1.f. Cabecera, menú y hoja ya estaban acreditados en `010f`. Aquí se comprueba que siguen viéndose en http://localhost:4222.

## Dentro del bloque

`070a1` abre el framework (RA7.h y RA7.i). El almacén, el formulario que valida y la ruta que mira la sesión llegan en los pasos siguientes. Con esta carpeta no se cierra RA7.
