# RA y CE — 040a4 Usuarios con imagen Base64

Informe para la programación. Acredita lo que el alumno hace en este paso (`ejercicios/Storage/ejer04`). No acredita las prácticas de DOM ni de cookies copiadas en la carpeta, ni la plantilla.

## Resumen técnico

La clave única de 040a2 guarda ahora también la dirección y la imagen. Si hay archivo, `FileReader` lo pasa a data URL. Si no hay archivo, se guarda la ruta `FOTO_DEFECTO`. El listado pinta esa propiedad en un `img`.

## Resultados de aprendizaje

Núcleo: **RA3**, **RA4** y **RA5**. Apoyo: **RA2** y **RA6**.

## Criterios que este paso puede acreditar

| CE | Justificación |
|----|----------------|
| RA3.g | `guardaUsuarioEjercicio` sigue escribiendo un solo objeto en `localStorage`. La cuenta incorpora `direccion` e `imagen`. |
| RA4.g | `direccion` es un objeto anidado: calle, código postal, ciudad y provincia. |
| RA4.h | El listado lee `user.direccion.calle`, `user.email` y `user.imagen`. |
| RA5.e | El formulario reúne los campos de la cuenta, los de la dirección y el input de archivo. |
| RA5.f | Usuario, contraseña, teléfono, email y código postal se comprueban antes de guardar. Los vacíos opcionales reciben un valor por defecto. |
| RA5.g | Entra `PATRON_CP` (`/^\d{5}$/`), junto con los patrones de usuario, contraseña, teléfono y email. |
| RA2.d | Con archivo, `readAsDataURL` produce `data:image/…;base64,…`. Sin archivo, `imagen` es la ruta de `user.png`, no un Base64. |
| RA4.b | `fileToDataURL` envuelve `FileReader` en una promesa. El `click` de guardar es `async` y hace `await`. |
| RA3.d | El listado incorpora la foto con `innerHTML` a partir de `user.imagen`. |
| RA5.b | El botón Guardar escucha `click`. El `submit` del formulario se anula. |

## No los contaría como evidencia de este paso

- **RA7**. La promesa lee un archivo del disco. No hay petición al servidor ni formato de intercambio con un API.
- La foto por defecto **no** acredita una conversión a Base64. Solo el archivo elegido pasa por `FileReader`.
- **RA6.d**. La foto del listado no se crea con `createElement`. Entra en la cadena de `innerHTML`.
- **RA3.e**, **RA3.f**, **RA4.f**, **RA4.j**, **RA6.f**, **RA6.g**, **RA1.a**.

## Refuerzo

Se usa y no lo pondría como evidencia principal: RA1.b, RA1.c, RA1.e, RA1.f, RA2.b, RA2.c, RA2.e, RA3.a, RA4.d, RA6.b, RA6.e, RA6.h.
