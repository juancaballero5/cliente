# 030b — RA y CE

## Resumen técnico

Un formulario registra una cuenta en una cookie: la clave es el nombre y el valor es la contraseña. El envío se cancela, se rechazan `;` y `=`, el nombre `usuario` y el duplicado. El login todavía no existe.

## Resultados de Aprendizaje trabajados

RA2, RA3, RA4 y RA5. Las funciones de cookie se renombran en `auth.js` y hacen el mismo trabajo que en 030a.

## Criterios de Evaluación acreditados

- **RA2.e** Tres decisiones siguen al envío: caracteres prohibidos, nombre reservado y usuario ya registrado.
- **RA3.g** `guardaUsuario` escribe la cuenta en `document.cookie`.
- **RA4.b** La lectura y la escritura de usuarios son funciones propias de `auth.js`.
- **RA4.g** La cuenta es el objeto `{ clave, valor }`.
- **RA5.c** El evento es `submit`, no `click`.
- **RA5.d** El manejador llama a `preventDefault` y escribe el mensaje en `#mensaje`.
- **RA5.e** El formulario tiene campos, etiquetas, `required` y botón `type="submit"`.
- **RA5.f** El vacío lo cubre `required`. El script valida el contenido que sí llega a enviarse.
- **RA5.h** La prueba es enviar el formulario en el navegador y leer la cookie y el párrafo de mensaje.

No entra RA5.g. La validación usa `includes`, no una expresión regular. No entra RA7.
