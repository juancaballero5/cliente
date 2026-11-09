# RA y CE — 040a3 Imagen con FileReader

Informe para la programación. Acredita lo que el alumno hace en este paso (`ejercicios/Storage/ejer03` y los cuatro intentos). No acredita las prácticas de DOM ni de cookies copiadas en la carpeta, ni la plantilla.

## Resumen técnico

La misma foto se intenta guardar de cuatro maneras: la ruta ficticia del input, el objeto `File` convertido a texto, una URL `blob:` y un data URL leído con `FileReader`. Solo el data URL se ve al recargar y desde otra página del origen.

## Resultados de aprendizaje

Núcleo: **RA1**, **RA3** y **RA6**. Apoyo: **RA2**, **RA4** y **RA5**.

## Criterios que este paso puede acreditar

| CE | Justificación |
|----|----------------|
| RA1.b | El paso compara qué recuerda el navegador: `C:\fakepath\…`, `"[object File]"`, `blob:` de esta pestaña y `data:image/…;base64,…`. |
| RA3.g | Los cuatro intentos escriben y leen una sola clave con `setItem`, `getItem` y `removeItem`. |
| RA3.a | `FileReader` y `URL.createObjectURL` se usan como objetos predefinidos del navegador. |
| RA2.d | Un `File` no se guarda como archivo. `setItem` lo vuelve el texto `"[object File]"`. `readAsDataURL` lo convierte en texto Base64. |
| RA6.d | `lecturaAlCargar` crea un `img`, le asigna `src` y lo añade con `appendChild`. `limpiarResultado` vacía el contenedor. |
| RA3.c | La imagen creada fija `style.width` a `120px`. |
| RA5.b | Cada intento es el `click` de un botón. El cuarto espera a la promesa de `FileReader`. |
| RA5.c | El evento que dispara la lectura es el clic, no un `change` del input de archivo. |
| RA4.b | `fileToDataURL` es una función que devuelve una promesa. `onload` resuelve y `onerror` rechaza. |

## No los contaría como evidencia de este paso

- **RA7.c**, **RA7.i** y el resto de **RA7**. `FileReader` lee un archivo local. No llama al servidor, no usa `fetch` ni `XMLHttpRequest`, y no monta una SPA. Si necesitas un antecedente de promesas antes de Fetch, es este paso, pero no acredita el RA7.
- **RA5.f** y **RA5.g**. No hay validación ni expresiones regulares.
- **RA3.e**, **RA3.f**, **RA4.f**, **RA4.j**, **RA6.f**, **RA6.g**.

## Refuerzo

Se usa y no lo pondría como evidencia principal: RA1.c, RA1.e, RA1.f, RA2.b, RA2.c, RA2.e, RA3.h, RA6.b, RA6.e, RA6.h.
