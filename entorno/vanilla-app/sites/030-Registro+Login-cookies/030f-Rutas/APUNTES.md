# 030f — La dirección también mira la sesión

Partís de la carpeta `030e-Sesion-admin+usuarios`. El registro, el login, el menú y la página de usuarios se quedan. En el paso anterior, ocultar Usuarios no cerraba la dirección: si la escribíais, la página se abría. Este paso mira la dirección.

La portada lo dice en el párrafo de bienvenida. Sin sesión se ven Registro y Login. Con la sesión abierta se ven los ejercicios, el nombre y Cerrar sesión. Si entráis como `admin`, también se ve Usuarios. Si escribís un ejercicio sin sesión, volvéis al login. Si escribís Usuarios sin ser `admin`, volvéis a la portada.

Esa frase habla de un ejercicio. En esta carpeta el control está en las siete prácticas DOM y en `usuarios.html`. Las dos prácticas de Cookies no cambian: no cargan este script y se abren igual si escribís su dirección.

## Qué página lleva el control

`document.body` es la etiqueta `<body>` de la página que está abierta. `classList` es la lista de sus clases. `contains` pregunta por una, aunque haya dos.

En cada práctica DOM el body queda así:

```html
<body class="paginaPrivada">
```

En `usuarios.html` lleva las dos:

```html
<body class="paginaPrivada paginaAdmin">
```

`classList.contains("paginaPrivada")` es verdadero en las dos. `className` es el texto entero. En Usuarios ese texto es `paginaPrivada paginaAdmin`. Compararlo con `=== "paginaPrivada"` da falso, y esa página se os escaparía del primer control.

La portada, el registro y el login no llevan ninguna de esas clases y no cargan `rutas.js`. Son páginas abiertas: se pueden escribir en la barra.

Detrás de `menu.js` añadís `rutas.js`. En una práctica DOM el orden queda: el script del ejercicio, `auth.js`, `menu.js` y `rutas.js`. En `usuarios.html`: `auth.js`, `usuarios.js`, `menu.js` y `rutas.js`. En el head de una práctica la ruta del script es `../../../js/rutas.js`.

`rutas.js` tiene que ir después de `menu.js`. Lee `sesion`, `esAdmin`, `LOGIN` y `PORTADA`, y no los declara. Los declara `menu.js`. `LOGIN` se calculaba desde el paso del menú y hasta ahora ese archivo no la usaba. Si la volvéis a declarar en `rutas.js`, la consola dice que ya está declarada y el control no corre. Si ponéis `rutas.js` delante, `sesion` todavía no existe, la consola lo dice, y la página se queda.

`LOGIN` y `PORTADA` salen de la URL de `menu.js`, no de la página. Escritas desde una práctica DOM llevan a `login.html` y a `index.html` de esta carpeta.

## rutas.js

```javascript
const paginaPrivada = document.body.classList.contains("paginaPrivada");
const paginaAdmin = document.body.classList.contains("paginaAdmin");

if (paginaPrivada && !sesion) {
  window.location.replace(LOGIN);
} else if (paginaAdmin && !esAdmin) {
  window.location.replace(PORTADA);
}
```

`!sesion` es verdadero cuando `leeSesion` ha devuelto `null`. No hay cookie `usuario`.

La primera rama manda al login. La segunda, a la portada. Van en ese orden, unidas por `else if`. Si la primera se cumple, la segunda no se mira.

Usuarios lleva las dos clases. Sin sesión cumple la primera: es privada y no hay sesión. Vais al login, no a la portada. Si estáis pensando que, sin sesión, `esAdmin` también es falso y la segunda rama os mandaría a la portada, el `else` lo impide. Si invertís las ramas, un usuario sin sesión que escriba `usuarios.html` acaba en la portada.

Con la sesión de `ana` la primera rama ya no se cumple. La segunda sí: la página es de admin y `ana` no lo es. `replace` os deja en la portada. La cookie `usuario=ana` sigue. No os manda al login. En el login, con la sesión abierta, el menú esconde Login y enseña el nombre. La portada os deja la sesión y el nombre a la vista.

Con la sesión de `admin`, las dos ramas fallan. Usuarios se queda. Una práctica DOM, con cualquier sesión, tampoco es `paginaAdmin`, así que se queda.

`replace` sustituye la entrada actual del historial. Atrás no reabre la página que acabáis de escribir: vuelve a la que teníais antes. Cerrar sesión sigue con `location.href`, en `menu.js`. Si aquí usáis `href` en vez de `replace`, Atrás reabre la práctica, `rutas.js` corre otra vez y os saca de nuevo. No os quedáis, pero la página privada vuelve a cargarse.

## Si falla

Si escribís una práctica DOM sin sesión y os quedáis en ella, falta la clase `paginaPrivada`, falta `rutas.js`, o `rutas.js` va delante de `menu.js`.

Si la consola dice que `LOGIN` o `sesion` ya están declaradas, `rutas.js` las declara otra vez. Quitad ese `const`. Las lee de `menu.js`.

Si sin sesión acabáis en la portada al escribir `usuarios.html`, la rama de admin está antes que la de la sesión. Sin sesión `esAdmin` es falso, y esa rama se cumple.

Si `ana` acaba en el login al escribir `usuarios.html`, la segunda rama usa `LOGIN`. En este archivo usa `PORTADA`.

Si Atrás reabre la práctica y os vuelve a sacar, habéis usado `location.href`. Este archivo usa `replace`.

Si en Usuarios `contains("paginaPrivada")` os sale falso, estáis mirando `className === "paginaPrivada"`. El texto del body tiene las dos clases.

## Entrega

Sin la cookie `usuario`, escribid la dirección de una práctica DOM. Acabáis en `login.html` de esta carpeta. Atrás no reabre la práctica.

Escribid `usuarios.html` sin sesión. También acabáis en el login, no en la portada.

Entrad como `ana`. Escribid `usuarios.html`. Acabáis en la portada, el nombre sigue siendo `ana` y `document.cookie` sigue llevando `usuario=ana`. Abrid una práctica DOM desde el menú. Esa sí se queda.

Entrad como `admin`. `usuarios.html` se queda, con el formulario y la tabla.

Escribid la dirección de una práctica de Cookies, sin sesión. Esa página se abre. En esta carpeta no lleva el control.
