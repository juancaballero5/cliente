# 030b — Registrar un usuario en una cookie

## De qué va esta sesión

Partís de `030a-Cookies-escribir-leer-borrar`. Las prácticas no se reescriben. Lo nuevo es un formulario de registro. El usuario y la contraseña se guardan en una cookie, con el mismo objeto `{ clave, valor }` de ayer. Login está en el menú y abre una página que dice que el inicio de sesión todavía no está montado.

**URL:** `http://localhost:4300/030-Registro+Login-cookies/030b-Formulario-auth+registro/`

---

## La portada solo cambia el nombre y una frase

Duplicad `030a-Cookies-escribir-leer-borrar` y renombrad la copia a `030b-Formulario-auth+registro`. En la portada cambian el título y la frase de bienvenida. La tagline del bloque se queda.

```html
<title>030b-Formulario-auth+registro</title>
```

```html
<p>Selecciona un ejercicio desde el menú superior, o entra en Registro.</p>
```

Abrid `http://localhost:4300/030-Registro+Login-cookies/030b-Formulario-auth+registro/`. La pestaña dice `030b-Formulario-auth+registro`. La tercera línea sigue siendo «Registro e inicio de sesión con cookies».

---

## Registro se va a la derecha

Al final de `css/styles.css` entran dos reglas. `.derecha` empuja ese `li` hacia la derecha de la barra: el hueco libre se queda a su izquierda. La segunda pinta el enlace de la página actual cuando ese enlace es hijo directo de la barra. La regla de `020a` solo mira dentro de `.dropdown-content`, y Registro no está dentro del desplegable.

```css
.navbar .derecha {
  margin-left: auto;
}

.navbar > li > a[aria-current="page"] {
  color: #6a3d16;
  background: #f4f4f4;
  cursor: default;
  pointer-events: none;
}
```

---

## Registro y Login entran en el menú

Detrás de Cookies, en la portada, añadís dos enlaces. Registro lleva `derecha`. Login apunta a `enConstruccion.html`.

```html
<li class="derecha"><a href="./registro.html">Registro</a></li>
<li><a href="./enConstruccion.html">Login</a></li>
```

En cada práctica de DOM el camino sube tres carpetas: `../../../registro.html` y `../../../enConstruccion.html`. Las dos prácticas de Cookies se quedan como en `030a`: en esa carpeta su menú no lleva estos dos enlaces.

Abrid la portada. Registro y Login quedan a la derecha. Abrid «Localizar por id»: los mismos dos enlaces están en la barra.

---

## Login abre una página en construcción

`enConstruccion.html` usa la misma cabecera. El título de la pestaña es `enConstruccion`. La tagline y el texto dicen que el inicio de sesión no está hecho.

```html
<title>enConstruccion</title>
```

```html
<p class="header-tagline">Inicio de sesión, en construcción</p>
```

```html
<h1>En construcción</h1>
<p>El formulario de inicio de sesión se montará en el siguiente paso. Mientras tanto, regístrate o practica con las cookies.</p>
```

En esa página, Login no lleva `href` y lleva `aria-current="page"`. Registro sí enlaza con `./registro.html`.

Pulsad Login en la portada. Leéis ese párrafo. En el inspector, el enlace Login tiene `aria-current="page"` y no tiene `href`.

---

## El formulario envía con submit

`registro.html` es una tarjeta, como las prácticas, pero está en la raíz del paso. Por eso la hoja de la tarjeta es `./ejercicios/css/styles.css`, y los scripts son `./js/auth.js` y después `./js/registro.js`. Los dos van con `defer`. Si `registro.js` va delante, `leeUsuario` todavía no existe.

La tagline de esta página es «Registrar un usuario en una cookie». El botón es `type="submit"`. Los dos campos llevan `required`.

```html
<form id="formRegistro">
  <p>
    <label for="usuario">Usuario:</label><br>
    <input id="usuario" type="text" name="usuario" autocomplete="username" required>
  </p>
  <p>
    <label for="password">Contraseña:</label><br>
    <input id="password" type="password" name="password" autocomplete="new-password" required>
  </p>
  <p>
    <button type="submit">Registrar</button>
  </p>
</form>
<p id="mensaje"></p>
```

`type="password"` no enseña lo que escribís. `autocomplete` le dice al navegador qué puede recordar: el usuario, y una contraseña nueva.

En el menú de esta página, Registro no lleva `href` y lleva `aria-current="page"`.

Abrid `http://localhost:4300/030-Registro+Login-cookies/030b-Formulario-auth+registro/registro.html`. Dejad los campos vacíos y pulsad Registrar. El navegador muestra «Completa este campo» y `#mensaje` sigue vacío: con `required`, el `submit` no llega a ejecutarse. Enter en un campo también intenta enviar el formulario.

---

## auth.js es la API de ayer, con otros nombres

Copiad las cuatro funciones de `ejercicios/Cookies/ejer02/js/cookies.js` a `js/auth.js` y cambiadles el nombre. El cuerpo es el mismo: parten `document.cookie` por `"; "`, hacen `.trim()` y montan `{ clave, valor }`.

| En `cookies.js` | En `auth.js` |
| --- | --- |
| `leeCookies` | `leeUsuarios` |
| `leeCookie` | `leeUsuario` |
| `borraCookie` | `borraUsuario` |
| `guardaCookie` | `guardaUsuario` |

`guardaUsuario` escribe una cookie. La caducidad llega en el segundo argumento, igual que en `guardaCookie`.

```javascript
function guardaUsuario(usuario, caducidad) {
  document.cookie = `${usuario.clave}=${usuario.valor}; ${caducidad}; path=/; secure; samesite=Strict`;
}
```

Esta página llama a `leeUsuario` y a `guardaUsuario`. `leeUsuarios` y `borraUsuario` están en el archivo y el registro no las usa.

---

## El submit guarda la cookie si el nombre vale

`registro.js` escucha `submit`, no `click`. `preventDefault` frena el envío del formulario: sin eso, el navegador recarga la página y no llegáis a leer `#mensaje`.

`;` y `=` son los separadores de `document.cookie`. Si el usuario o la contraseña los llevan, al partir la cadena la tupla se rompe. Por eso esos caracteres se rechazan antes de guardar.

El nombre `"usuario"` está reservado. En la práctica de ayer el listado ya se saltaba esa clave. Aquí no se puede registrar.

```javascript
formulario.addEventListener("submit", (e) => {
  e.preventDefault();

  const usuario = document.getElementById("usuario").value.trim();
  const password = document.getElementById("password").value.trim();

  if (usuario.includes(";") || usuario.includes("=") || password.includes(";") || password.includes("=")) {
    mensaje.textContent = "El usuario y la contraseña no pueden llevar ; ni =.";
    return;
  }

  if (usuario === "usuario") {
    mensaje.textContent = `No puedes registrarte con el nombre "${usuario}" (está reservado).`;
    return;
  }

  if (leeUsuario(usuario) !== null) {
    mensaje.textContent = `El usuario "${usuario}" ya está registrado.`;
    return;
  }

  const dato = {
    clave: usuario,
    valor: password
  };

  if (leeUsuario(dato.clave)) {
    mensaje.textContent = `El usuario "${usuario}" ya existe.`;
    return;
  }
  guardaUsuario(dato, "");

  mensaje.textContent = `Usuario "${usuario}" registrado correctamente.`;
});
```

`dato` es el objeto de ayer: la clave es el nombre y el valor es la contraseña. `guardaUsuario(dato, "")` usa la caducidad vacía. La cadena que se asigna queda con un hueco entre dos puntos y coma, como el botón que no caduca, y el navegador la guarda. Al leer, `document.cookie` solo muestra la tupla.

El `if` de «ya existe» está detrás del de «ya está registrado». Ese primer `return` sale de la función, así que el mensaje `El usuario "ana" ya existe.` no llega a verse.

Escribid `ana` y `daw`, y pulsad Registrar. `#mensaje` dice `Usuario "ana" registrado correctamente.` En la consola, `document.cookie` es `ana=daw`. Recargad: la cookie sigue.

Pulsad Registrar otra vez con `ana` y `daw`. `#mensaje` dice `El usuario "ana" ya está registrado.` Sigue habiendo una sola cookie `ana=daw`.

Escribid `usuario` y `daw`. `#mensaje` dice `No puedes registrarte con el nombre "usuario" (está reservado).` No aparece una cookie `usuario`.

Escribid `a;b` y `daw`. `#mensaje` dice `El usuario y la contraseña no pueden llevar ; ni =.` Lo mismo si la contraseña es `a=b`. `document.cookie` no gana esas claves.

Escribid ` pepe ` y ` 123 `, con espacios. `trim()` los quita. `#mensaje` dice `Usuario "pepe" registrado correctamente.` y `document.cookie` contiene `pepe=123`.

---

## Si falla

No quitéis `path=/`, `secure` ni `samesite=Strict` de `guardaUsuario`.

| Qué veis | Qué revisar |
|----------|-------------|
| La consola dice que `leeUsuario` no existe | `registro.js` va delante de `auth.js` |
| Al pulsar Registrar con los campos vacíos, `#mensaje` escribe algo | Falta `required`, o el botón no es `type="submit"` |
| La página se recarga y `#mensaje` se queda vacío | El `submit` no llama a `preventDefault` |
| `a;b` crea una cookie | Falta el `if` de `;` y `=`, o no hace `return` |
| Repetir `ana` sustituye la contraseña | El `if` de `leeUsuario(usuario) !== null` no está, o no hace `return` |
| `document.cookie` muestra `path` o `secure` | Estáis mirando la cadena que asigna `guardaUsuario`, no `document.cookie` |

---

## Entrega

La entrega es la carpeta `030b-Formulario-auth+registro`. Las prácticas siguen como en `030a`. El registro guarda el usuario en una cookie.

- [ ] La pestaña de la portada dice `030b-Formulario-auth+registro`
- [ ] Registro y Login están a la derecha, y Login abre la página cuyo `h1` es «En construcción»
- [ ] Con los campos vacíos, el navegador muestra «Completa este campo» y `#mensaje` sigue vacío
- [ ] `ana` / `daw` deja `#mensaje` en `Usuario "ana" registrado correctamente.` y `document.cookie` en `ana=daw`
- [ ] Repetir `ana` deja `El usuario "ana" ya está registrado.` y una sola cookie `ana=daw`
- [ ] `usuario` deja `No puedes registrarte con el nombre "usuario" (está reservado).`
- [ ] `a;b` o una contraseña `a=b` dejan `El usuario y la contraseña no pueden llevar ; ni =.`
- [ ] ` pepe ` / ` 123 ` guarda `pepe=123`
- [ ] No habéis quitado `path=/`, `secure` ni `samesite=Strict`
