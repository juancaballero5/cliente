# 030c — RA y CE

## Resumen técnico

El login busca la cookie de la cuenta y compara la contraseña con `valor`. Si coincide, guarda otra cookie, `usuario=nombre`, y a los 1,5 s lleva a la portada. La cuenta no se borra.

## Resultados de Aprendizaje trabajados

RA2, RA3, RA4 y RA5.

## Criterios de Evaluación acreditados

- **RA2.e** Usuario inexistente y contraseña distinta comparten el mismo rechazo. El acierto es la otra rama.
- **RA3.b** `window.location.href` cambia de documento. `URL` y `document.currentScript` calculan la ruta de la portada.
- **RA3.g** `guardaSesion` escribe la cookie de sesión. `leeUsuario` lee la de la cuenta. Son dos cookies.
- **RA4.h** La comparación usa `usuario.valor`, no el objeto entero.
- **RA5.c** El formulario de login también se maneja con `submit`.
- **RA5.e** Campos de usuario y contraseña, `required` y botón de envío.
- **RA5.f** La credencial se comprueba en el script después de cancelar el envío.

No entra RA6 como bloque nuevo: localizar el formulario y escribir el mensaje ya quedó acreditado. La portada todavía no lee la cookie de sesión.
