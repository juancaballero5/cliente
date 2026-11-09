# RA y CE — 070a1 Plantilla y componentes

Informe para la programación. Acredita la aplicación React de esta carpeta: el proyecto de Vite, la plantilla de `010f` dentro del componente raíz, las cuatro pantallas y el router. No acredita guardar, leer ni borrar: los botones no llaman a ningún almacén. La plantilla visual ya está acreditada en `010f`; aquí cuenta lo que cambia al vivir dentro de React.

## Resumen técnico

Hay una sola aplicación. `index.html` solo tiene el hueco `<div id="root">` y el script que arranca `main.tsx`. Cabecera, menú y pie están en lo que devuelve `App`. El menú abre la portada o una tarjeta cambiando la ruta, sin pedir otro documento. Las tres tarjetas muestran el mismo formulario. Ningún botón escribe todavía.

## Resultados de aprendizaje

Núcleo: **RA7**. Apoyo: **RA6**.

## Criterios que este paso puede acreditar

| CE | Justificación |
|----|----------------|
| RA7.h | React es el framework de la página. Una ruta no abre otro HTML: `Routes` cambia el componente que se ve dentro de `<main>`. En este paso se reconoce qué asume el framework (el documento, el punto de entrada, el componente raíz y el router) frente al `index.html` suelto de Vanilla. |
| RA7.i | El proyecto se crea con Vite, se escriben los cuatro componentes y se declaran las rutas con `react-router`. La depuración de este paso es concreta: la foto apunta a `/img/user.png`, el `<title>` es el nombre de la carpeta, `Link` solo navega si `BrowserRouter` envuelve a `App`, y la hoja de `public` se lee al arrancar el servidor. |
| RA6.h | El documento, el componente y las hojas van separados. `index.html` no pinta la cabecera. La hoja de la plantilla entra porque `main.tsx` importa `index.css`, no por un `<link>` del documento. La hoja de la tarjeta es `src/tarjeta.css`: las tres pantallas la importan y, al importarla, las reglas se suman a la página. |

## No los contaría como evidencia de este paso

- **RA7.a** a **RA7.g**. No hay petición al servidor de datos, ni JSON de intercambio, ni una vista que se actualice con una respuesta. El cambio de pantalla es el router.
- **RA3.g**. El párrafo de la tarjeta nombra `localStorage`. Nada se guarda.
- **RA5**. El formulario se ve. No hay validación ni envío enganchado.
- **RA4**. Las pantallas son funciones que devuelven el trozo visible. En este paso no se les añade lógica.
- **RA1.a** como cliente/servidor de la práctica. El contenedor solo sirve la aplicación para poder verla. La página no pide la API.

## Refuerzo

Se usa y no lo pondría como evidencia principal: RA1.b, RA1.c, RA1.e, RA1.f. Cabecera, menú y hoja ya estaban acreditados en `010f`. Aquí se comprueba que siguen viéndose en http://localhost:4319.

## Dentro del bloque

`070a1` abre el framework (RA7.h y RA7.i). El almacén, el formulario que valida y la ruta que mira la sesión llegan en los pasos siguientes. Con esta carpeta no se cierra RA7.
