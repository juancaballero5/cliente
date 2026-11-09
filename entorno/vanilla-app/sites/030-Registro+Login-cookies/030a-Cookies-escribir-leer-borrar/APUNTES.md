# 030a — Mostrar, ocultar, escribir, leer y borrar

## De qué va esta sesión

Partís de `020g-DOM-ParentNodeChildSibling`. Las siete prácticas de DOM siguen ahí y sus scripts no se tocan. Lo nuevo es el desplegable Cookies y dos prácticas. La primera muestra y oculta un mensaje que ya está en el HTML. La segunda escribe una cookie, la lee y la borra.

Si estáis pensando que la primera ya guarda una cookie: no escribe nada en `document.cookie`. Solo cambia si el mensaje se ve.

**URL:** `http://localhost:4300/030-Registro+Login-cookies/030a-Cookies-escribir-leer-borrar/`

---

## La portada cambia de nombre

Duplicad `020g-DOM-ParentNodeChildSibling` y renombrad la copia a `030a-Cookies-escribir-leer-borrar`. En la portada cambian el título, la descripción y la tagline. La cabecera y el subtítulo se quedan.

```html
<meta name="description" content="Registro e inicio de sesión con cookies">
<title>030a-Cookies-escribir-leer-borrar</title>
```

```html
<p class="header-tagline">Registro e inicio de sesión con cookies</p>
```

Abrid `http://localhost:4300/030-Registro+Login-cookies/030a-Cookies-escribir-leer-borrar/`. La pestaña dice `030a-Cookies-escribir-leer-borrar`. La tercera línea de la cabecera dice «Registro e inicio de sesión con cookies». El menú, de momento, sigue siendo solo el de DOM.

---

## Las prácticas de DOM bajan una carpeta

Al lado de DOM va a vivir Cookies. Las siete carpetas no pueden quedarse sueltas en `ejercicios/`: movedlas a `ejercicios/DOM/`. `ejer01` pasa a `ejercicios/DOM/ejer01`, y lo mismo con `ejer02` … `ejer07`. El `script.js` de cada una se queda igual.

Desde una práctica ahora hay tres carpetas hasta la raíz del paso, no dos. En cada uno de esos siete `index.html` subís un nivel más en lo que apunta fuera de `DOM`:

```html
<link rel="icon" type="image/x-icon" href="../../../img/favicon.ico">
<link rel="stylesheet" href="../../../css/styles.css">
<link rel="stylesheet" href="../../css/styles.css">
```

```html
<img src="../../../img/user.png" alt="Foto de perfil">
```

```html
<a href="../../../index.html">&gt;&gt; Página principal</a>
```

`../../../css/styles.css` es la hoja de la raíz, la de la cabecera y el menú. `../../css/styles.css` es la de la tarjeta: al meter `DOM/` en el camino, la hoja de `ejercicios/css/` queda un nivel más arriba que antes. Los enlaces de una práctica de DOM a otra siguen en `../ejer02/index.html`, porque esas carpetas se han movido juntas.

En la portada, el `href` también entra en `DOM`:

```html
<li><a href="./ejercicios/DOM/ejer01/index.html">Localizar por id</a></li>
```

Abrid «Localizar por id». La tarjeta se ve como en `020g`. Si la foto o el fondo no salen, algún `href` se ha quedado con dos `../`.

---

## Entra el desplegable Cookies

Detrás del `li` de DOM, en la portada y en cada práctica, añadís otro desplegable. La etiqueta visible es Cookies. La lista no tiene título a la vista: `aria-label="Submenú Cookies"` le pone ese nombre al lector de pantalla, y tiene que coincidir con la palabra del enlace. `aria-haspopup="true"`, en el enlace Cookies, no se ve: avisa de que ahí se abre un submenú.

```html
<li class="dropdown">
  <a href="#" aria-haspopup="true">Cookies</a>
  <ul class="dropdown-content" aria-label="Submenú Cookies">
    <li><a href="./ejercicios/Cookies/ejer01/index.html">Mostrar y ocultar</a></li>
    <li><a href="./ejercicios/Cookies/ejer02/index.html">Escribir, leer y borrar</a></li>
  </ul>
</li>
```

Ese `href` es el de la portada. Desde una práctica de DOM, Cookies está al lado de `DOM`, así que subís dos carpetas: `../../Cookies/ejer01/index.html` y `../../Cookies/ejer02/index.html`.

En la práctica que estáis viendo, «Mostrar y ocultar» no lleva `href`. `aria-current="page"` dice que esa entrada es la página actual. Quitar el `href` impide volver a pulsarla, y la regla que ya tenéis en la hoja raíz, `a[aria-current="page"]`, la deja marcada.

```html
<li><a aria-current="page">Mostrar y ocultar</a></li>
<li><a href="../ejer02/index.html">Escribir, leer y borrar</a></li>
```

Abrid la portada, pulsad con el botón derecho en Cookies y elegid inspeccionar. El enlace tiene `aria-haspopup="true"`. La `ul` tiene `aria-label="Submenú Cookies"`. Esos dos no se ven en la página.

---

## El mensaje ya está en el HTML, oculto

Cread `ejercicios/Cookies/ejer01/index.html`. El `<head>` es el de una práctica que está a tres niveles: hoja raíz, hoja de la tarjeta y `./js/script.js` con `defer`. El `<title>` es `ejer01`. La descripción y la tagline dicen de qué va esta práctica, no el bloque.

```html
<meta name="description" content="Mostrar y ocultar un mensaje">
<title>ejer01</title>
```

```html
<p class="header-tagline">Mostrar y ocultar un mensaje</p>
```

Dentro de la tarjeta van los dos botones y el mensaje. El texto del mensaje ya está escrito. `display: none` lo saca del dibujo: no ocupa sitio. Por eso, al abrir la página, no veis el saludo.

```html
<p>Pulsa los botones para mostrar u ocultar el mensaje oculto.</p>
<p>
  <button id="mostrarBtn" type="button">Mostrar mensaje</button>
  <button id="ocultarBtn" type="button">Ocultar mensaje</button>
</p>
<div id="mensaje" style="display: none; margin-top: 20px;">
  ¡Hola! Este mensaje estaba oculto y ahora es visible.
</div>
```

`type="button"` deja el clic en el oyente. No hay formulario que enviar. `margin-top: 20px` es el hueco que veréis encima del saludo cuando deje de estar oculto.

Si estáis pensando en `visibility: hidden`: eso esconde el texto y conserva el hueco en blanco. `display: none` no lo conserva. El código usa `display`.

Abrid `http://localhost:4300/030-Registro+Login-cookies/030a-Cookies-escribir-leer-borrar/ejercicios/Cookies/ejer01/index.html`. Veis los dos botones y no veis «¡Hola!». En el inspector, `#mensaje` sigue en el HTML y su estilo en línea dice `display: none`.

El pie de la tarjeta vuelve a la portada de este paso: `../../../index.html`.

---

## El script solo cambia display

`script.js` va en `ejercicios/Cookies/ejer01/js/script.js`. Pedís los tres id y engancháis un clic en cada botón, con la flecha de siempre.

```javascript
"use strict";

const mostrarBtn = document.getElementById("mostrarBtn");
const ocultarBtn = document.getElementById("ocultarBtn");
const mensaje = document.getElementById("mensaje");

mostrarBtn.addEventListener("click", () => {
  mensaje.style.display = "block";
});

ocultarBtn.addEventListener("click", () => {
  mensaje.style.display = "none";
});
```

`mensaje.style.display` escribe en el mismo estilo en línea del `div`. `"block"` lo muestra como un bloque, y leéis la frase. `"none"` lo vuelve a sacar del dibujo.

Si estáis pensando en meter la frase con `textContent`: ya está en el HTML. El oyente no la escribe. Solo cambia `display`.

Pulsad Mostrar mensaje. En la página aparece `¡Hola! Este mensaje estaba oculto y ahora es visible.` En el inspector, el `display` de `#mensaje` es `block`. Pulsad Ocultar mensaje. La frase desaparece y el inspector vuelve a `display: none`.

En la consola, `document.cookie` es `""`. Esta página no asigna una cookie.

---

## Si falla

| Qué veis | Qué revisar |
|----------|-------------|
| En una práctica de DOM no salen la foto o el fondo | Un `href` hacia `img` o hacia la hoja raíz sigue con dos `../` |
| La lista Cookies no tiene nombre en el inspector | Falta `aria-label`, o no dice `Submenú Cookies` |
| «Mostrar y ocultar» se puede volver a pulsar | Sigue llevando `href`, o le falta `aria-current="page"` |
| El saludo se ve al cargar | `#mensaje` no tiene `style="display: none"` |
| El botón no enseña la frase | El id no coincide, o la asignación no es `display = "block"` |
| La consola dice que `mostrarBtn` es `null` | El script está en el `<head>` sin `defer` y corre antes del botón |

---

## La segunda práctica parte de la primera

Duplicad `ejercicios/Cookies/ejer01` y renombrad la copia a `ejer02`. En esa página el `<title>` pasa a `ejer02`. La descripción y la tagline dicen de qué va esta práctica.

```html
<meta name="description" content="Escribir, leer y borrar una cookie">
<title>ejer02</title>
```

```html
<p class="header-tagline">Escribir, leer y borrar una cookie</p>
```

En el menú de esta página, «Mostrar y ocultar» recupera el enlace a la hermana, y «Escribir, leer y borrar» se queda sin `href` y con `aria-current="page"`.

```html
<li><a href="../ejer01/index.html">Mostrar y ocultar</a></li>
<li><a aria-current="page">Escribir, leer y borrar</a></li>
```

Abrid `http://localhost:4300/030-Registro+Login-cookies/030a-Cookies-escribir-leer-borrar/ejercicios/Cookies/ejer02/index.html`. La pestaña dice `ejer02`. La tercera línea dice «Escribir, leer y borrar una cookie». En el inspector, «Escribir, leer y borrar» no tiene `href` y tiene `aria-current="page"`.

---

## La tarjeta pide una clave y un valor

Sustituid el mensaje oculto y sus dos botones por dos campos y cinco botones. `#resultado` nace vacío: ahí escribirá el script.

```html
<p>Vamos a guardar, leer y borrar cookies.</p>
<p>
  <label for="clave">Clave</label>
  <input id="clave" type="text" placeholder="Introduce la clave">
  <label for="valor">Valor</label>
  <input id="valor" type="text" placeholder="Introduce el valor">
</p>
<p>
  <button id="guardarCookieMaxAge" type="button">Guardar cookie (max-age)</button>
  <button id="guardarCookieExpires" type="button">Guardar cookie (expires)</button>
  <button id="guardarCookieNoCaduca" type="button">Guardar cookie (no caduca)</button>
</p>
<p>
  <button id="leerCookie" type="button">Leer cookie</button>
  <button id="borrarCookie" type="button">Borrar cookie</button>
</p>
<div id="resultado"></div>
```

Recargad la página antes de enlazar los scripts. Veis los campos y los botones, y debajo no hay ninguna frase.

---

## document.cookie es una sola cadena

Una cookie es la tupla `clave=valor`. `tema=rojo` es una. `curso=daw` es otra.

`document.cookie` no es una lista de JavaScript. Es una sola cadena con todas las cookies de esta página. Al leerla no aparecen `path`, `secure` ni `samesite`: solo las tuplas. Van separadas por `"; "`, un punto y coma y un espacio. Con esas dos cookies, la consola muestra:

```text
tema=rojo; curso=daw
```

Asignar `document.cookie` no borra las demás. Cada asignación escribe una cookie. Si la clave ya existía, esa tupla se sustituye: no quedan dos `tema`.

---

## Dos scripts, y el botón guarda un objeto

En el `<head>`, los dos con `defer`, primero `cookies.js` y después `script.js`. Las funciones viven en `cookies.js`. `script.js` las llama. Si `script.js` va delante, la consola dice que `leeCookies` no existe y `#resultado` se queda vacío.

```html
<script defer src="./js/cookies.js"></script>
<script defer src="./js/script.js"></script>
```

El botón no manda la clave y el valor por separado. Los junta en un objeto `{ clave, valor }`. `trim()` quita espacios al principio y al final de lo que habéis escrito. Ese objeto es la pieza que el resto del curso va a agrandar.

```javascript
guardarCookieMaxAge.addEventListener("click", () => {
  const cookie = {
    clave: clave.value.trim(),
    valor: valor.value.trim()
  }
  const caducidad = "max-age=5";
  guardaCookie(cookie, caducidad);
  listarCookies();
});
```

`guardaCookie` escribe una sola tupla y, detrás, la caducidad que le habéis pasado. `path=/`, `secure` y `samesite=Strict` van siempre en esa asignación.

```javascript
function guardaCookie(cookie, caducidad) {
  document.cookie = `${cookie.clave}=${cookie.valor}; ${caducidad}; path=/; secure; samesite=Strict`;
}
```

Con clave `tema`, valor `rojo` y caducidad `max-age=5`, la asignación es esta cadena:

```text
tema=rojo; max-age=5; path=/; secure; samesite=Strict
```

`max-age=5` le dice al navegador que la tire a los cinco segundos, más o menos. `path=/` es la ruta con la que esta página la ve y con la que luego se puede borrar. En `http://localhost:4300` la página cuenta como contexto seguro, así que `secure` no impide guardarla. `samesite=Strict` va en la cadena que escribís. Al leer `document.cookie` no sale esa palabra: sale la tupla.

Arriba de `cookies.js` hay otras tres funciones, `guardaCookieMaxAge`, `guardaCookieExpires` y `guardaCookieNoCaduca`. Reciben la clave y el valor por separado. En `script.js` los oyentes que las llamaban están entre `/*` y `*/`: el navegador no los ejecuta. Los botones que responden son los tres de debajo, y llaman a `guardaCookie`.

Escribid `tema` y `rojo`, y pulsad Guardar cookie (max-age). `#resultado` muestra `📦 Todas las cookies:` y, en la línea de abajo, `🍪 tema = rojo`, con `tema` en negrita. En la consola, `document.cookie` es `tema=rojo`.

Esperad unos cinco segundos y volved a mirar la consola. `document.cookie` pasa a `""`. `#resultado` sigue enseñando `tema = rojo`: el `div` no se entera solo. Hay que recargar, o pulsar un botón que vuelva a listar.

---

## Las otras dos caducidades

El botón de `expires` cambia la cadena de caducidad. La fecha es ahora más cinco segundos, en UTC.

```javascript
guardarCookieExpires.addEventListener("click", () => {
  const cookie = {
    clave: clave.value.trim(),
    valor: valor.value.trim()
  }
  const fechaCaducidad = new Date(Date.now() + 5000);
  const caducidad = `expires=${fechaCaducidad.toUTCString()}`;
  guardaCookie(cookie, caducidad);
  listarCookies();
});
```

`toUTCString()` devuelve una fecha en inglés que termina en `GMT`. La asignación lleva `expires=` y esa fecha. En la consola, `document.cookie` vuelve a ser solo `tema=rojo`. A los cinco segundos, más o menos, desaparece igual que con `max-age`.

El botón que no caduca pasa la caducidad vacía.

```javascript
guardarCookieNoCaduca.addEventListener("click", () => {
  const cookie = {
    clave: clave.value.trim(),
    valor: valor.value.trim()
  }
  const caducidad = "";
  guardaCookie(cookie, caducidad);
  listarCookies();
});
```

La cadena que se asigna queda con un hueco entre dos puntos y coma:

```text
tema=rojo; ; path=/; secure; samesite=Strict
```

El navegador la guarda igual. `document.cookie` es `tema=rojo`. Recargad la página: sigue ahí. Dura mientras el navegador sigue abierto. No lleva `max-age` ni `expires`.

Volved a guardar `tema`, ahora con valor `dos` y con el botón que no caduca. No aparecen dos cookies. `document.cookie` es `tema=dos`. La misma clave sustituye a la anterior.

---

## Leer parte la cadena y monta el objeto

`leeCookie` busca una clave. Si `document.cookie` está vacío, devuelve `null`. Si no, parte la cadena por `"; "` y cada trozo por `"="`. El primer trozo es la clave y el segundo el valor.

```javascript
function leeCookie(clave) {
  if (!document.cookie) return null;

  const cookies = document.cookie.split("; ");

  for (const cookie of cookies) {
    const [claveCookie, valorCookie] = cookie.split("=");

    if (claveCookie && claveCookie.trim() === clave.trim()) {
      return {
        clave: claveCookie.trim(),
        valor: valorCookie ? valorCookie.trim() : ""
      };
    }
  }

  return null;
}
```

Si estáis pensando en partir solo por `";"`: en `tema=rojo; curso=daw` el segundo trozo llega como `" curso=daw"`, con un espacio delante. `" curso" === "curso"` es falso y no encontráis la cookie. `.trim()` quita ese espacio. El código parte por `"; "` y, además, aplica `.trim()` a la clave y al valor.

Si la clave coincide, devuelve `{ clave, valor }`. Si recorre todas y ninguna coincide, devuelve `null`.

El botón Leer cookie usa ese objeto. `innerHTML` sí entiende `<br>` y `<b>`: el `<br>` parte la línea y el `<b>` pone la clave en negrita. Con `textContent` veríais esos símbolos escritos en la página. A los 1500 ms el listado sustituye esta frase.

```javascript
leerCookie.addEventListener("click", () => {
  let mensaje = "📦 El valor de la cookie es:<br>";
  const cookie = leeCookie(clave.value.trim());
  console.log(cookie);
  if (!cookie) {
    resultado.innerHTML = mensaje + "⚠️ No existe o ha caducado.";
  } else {
    resultado.innerHTML = mensaje + `🍪 <b>${cookie.clave}</b> = ${cookie.valor}<br>`;
  }
  setTimeout(() => {
    listarCookies();
  }, 1500);
});
```

Dejad `tema=dos` guardada. Escribid `tema` y pulsad Leer cookie. `#resultado` muestra `📦 El valor de la cookie es:` y, debajo, `🍪 tema = dos`. En la consola, `console.log` enseña el objeto `{ clave: "tema", valor: "dos" }`. Segundo y medio después vuelve el listado.

Escribid `noesta` y pulsad Leer cookie. La segunda línea es `⚠️ No existe o ha caducado.` La consola muestra `null`.

---

## El listado recorre todas y se salta una clave

`leeCookies` hace el mismo recorrido y no se para en la primera. Cada tupla entra en un array como `{ clave, valor }`. Si no hay ninguna, el array es `[]`.

```javascript
function leeCookies() {
  if (!document.cookie) return [];

  const cookies = document.cookie.split("; ");
  const datos = [];

  for (const cookie of cookies) {
    const [claveCookie, valorCookie] = cookie.split("=");

    if (claveCookie && claveCookie.trim() !== "") {
      const dato = {
        clave: claveCookie.trim(),
        valor: valorCookie ? valorCookie.trim() : ""
      };
      datos.push(dato);
    }
  }
  return datos;
}
```

`listarCookies` pinta ese array. El `filter` tira la cookie cuya clave es el texto `"usuario"`. El parámetro se llama `usuario`, pero cada elemento es una cookie.

```javascript
function listarCookies() {
  let listado = "📦 Todas las cookies:<br>";
  const cookies = leeCookies().filter(usuario => usuario.clave !== "usuario");
  if (cookies.length === 0) {
    resultado.innerHTML = "📦 No hay cookies actualmente.";
  } else {
    cookies.forEach(cookie => {
      listado += `🍪 <b>${cookie.clave}</b> = ${cookie.valor}<br>`;
    });
    resultado.innerHTML = listado;
  }
}
```

`script.js` llama a `listarCookies()` al cargar. Con la caja vacía, `#resultado` dice `📦 No hay cookies actualmente.`

Guardad clave `usuario` y valor `ana` con el botón que no caduca. `document.cookie` contiene `usuario=ana`. `#resultado` no escribe esa línea: el `filter` la ha quitado. Leer cookie y Borrar cookie sí la encuentran, porque llaman a `leeCookie` y esa función no filtra.

---

## Borrar usa la misma ruta

`borraCookie` asigna la clave vacía y `max-age=0`. `path=/` tiene que ser el mismo de `guardaCookie`: si no coincide, el navegador no borra esa cookie. Esta asignación no repite `secure`.

```javascript
function borraCookie(clave) {
  document.cookie = `${clave}=; max-age=0; path=/`;
}
```

El botón solo borra si `leeCookie` ha devuelto el objeto. Si devuelve `null`, no llama a `borraCookie`.

```javascript
borrarCookie.addEventListener("click", () => {
  const cookie = leeCookie(clave.value.trim());
  if (cookie === null) {
    resultado.innerHTML = "⚠️ No existe o ha caducado.";
  } else {
    borraCookie(cookie.clave);
    resultado.innerHTML = `El usuario <b>${cookie.clave}</b> ha sido borrado.`;
  }
  setTimeout(() => {
    listarCookies();
  }, 1500);
});
```

Con `tema=dos` todavía guardada, escribid `tema` y pulsad Borrar cookie. `#resultado` dice `El usuario tema ha sido borrado.`, con `tema` en negrita. `document.cookie` ya no lleva `tema=dos`. Segundo y medio después, el listado ya no tiene esa línea.

Escribid `noesta` y pulsad Borrar cookie. `#resultado` dice `⚠️ No existe o ha caducado.`

---

## Si falla al guardar o al leer

Si la consola y `#resultado` no cuadran, mirad la fila antes de quitar `path=/`, `secure` o `samesite=Strict`.

| Qué veis | Qué revisar |
|----------|-------------|
| La consola dice que `leeCookies` no existe | `script.js` está delante de `cookies.js` |
| Pulsar Guardar no cambia nada | El oyente que responde sigue dentro del comentario `/* */` |
| `document.cookie` enseña `path` o `secure` | Estáis leyendo la cadena que asignáis, no `document.cookie` |
| A los cinco segundos el `div` sigue mostrando la cookie | El `div` no se actualiza solo. Recargad o volved a listar, y mirad la consola |
| Guardar otra vez `tema` deja dos cookies | La segunda asignación no usa la misma clave |
| Leer `curso` no la encuentra y en la cadena se ve ` curso` | Falta `.trim()` después de partir |
| Guardáis `usuario` y el listado no la enseña | El `filter` quita la clave `"usuario"`. `document.cookie` sí la lleva |
| Borrar no la quita | `borraCookie` no usa `path=/`, el mismo de `guardaCookie` |
| En la página se leen los caracteres `<br>` | `#resultado` recibe `textContent`. El código usa `innerHTML` |

---

## Entrega

La entrega es la carpeta `030a-Cookies-escribir-leer-borrar`. Las prácticas de DOM se abren como en `020g`. La primera práctica de Cookies muestra y oculta el mensaje. La segunda escribe, lee y borra una cookie.

- [ ] La pestaña de la portada dice `030a-Cookies-escribir-leer-borrar` y la tagline es «Registro e inicio de sesión con cookies»
- [ ] «Localizar por id» se ve como en `020g`
- [ ] En mostrar y ocultar, esa entrada no tiene `href` y tiene `aria-current="page"`
- [ ] Al cargar esa práctica no se lee el saludo; Mostrar mensaje enseña `¡Hola! Este mensaje estaba oculto y ahora es visible.`; Ocultar mensaje lo quita
- [ ] En escribir, leer y borrar, esa entrada no tiene `href` y tiene `aria-current="page"`
- [ ] Sin cookies, `#resultado` dice `📦 No hay cookies actualmente.`
- [ ] Guardar `tema` / `rojo` con max-age deja `document.cookie` en `tema=rojo`, y a los cinco segundos la consola pasa a `""`
- [ ] Guardar `tema` / `dos` con el botón que no caduca deja `document.cookie` en `tema=dos`, también después de recargar
- [ ] Leer `tema` muestra `📦 El valor de la cookie es:` y debajo `🍪 tema = dos`, y la consola muestra el objeto `{ clave, valor }`
- [ ] Leer `noesta` muestra `⚠️ No existe o ha caducado.`
- [ ] Borrar `tema` muestra `El usuario tema ha sido borrado.` y `tema=dos` sale de `document.cookie`
- [ ] No habéis quitado `path=/`, `secure` ni `samesite=Strict`
