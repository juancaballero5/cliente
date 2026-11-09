# 030c — Iniciar sesión con la cookie del usuario

## De qué va esta sesión

Partís de `030b-Formulario-auth+registro`. El formulario de registro no se reescribe. Login deja de abrir `enConstruccion.html`. Ahora pide el usuario y la contraseña, los compara con la cookie de esa cuenta y, si coinciden, guarda otra cookie: la clave es el texto `usuario` y el valor es el nombre de quien entra.

**URL:** `http://localhost:4300/030-Registro+Login-cookies/030c-Formulario-auth+login/`

---

## La portada y los enlaces de Login

Duplicad `030b-Formulario-auth+registro` y renombrad la copia a `030c-Formulario-auth+login`. Borrad `enConstruccion.html`. En la portada cambian el título y la frase de bienvenida. La tagline del bloque se queda.

```html
<title>030c-Formulario-auth+login</title>
```

```html
<p>Selecciona un ejercicio desde el menú superior, o entra en Registro o en Login.</p>
```

Donde el menú decía `enConstruccion.html`, ahora dice `login.html`. En la portada y en `registro.html` el camino es `./login.html`. En cada práctica de DOM es `../../../login.html`. Las dos prácticas de Cookies siguen sin estos enlaces, como en `030b`.

```html
<li><a href="./login.html">Login</a></li>
```

Abrid `http://localhost:4300/030-Registro+Login-cookies/030c-Formulario-auth+login/`. La pestaña dice `030c-Formulario-auth+login`. Pulsad Login: de momento el navegador no encuentra la página, porque `login.html` todavía no existe.

---

## login.html copia el formulario de registro

Cread `login.html` a partir de `registro.html`. La tagline de esta página es «Iniciar sesión con la cookie del usuario». El `<title>` es `login`. El formulario se llama `formLogin`. El botón dice Iniciar sesión. La contraseña lleva `autocomplete="current-password"`: en el registro era `new-password`, porque allí la contraseña era nueva.

```html
<meta name="description" content="Iniciar sesión con la cookie del usuario">
<title>login</title>
```

```html
<p class="header-tagline">Iniciar sesión con la cookie del usuario</p>
```

```html
<form id="formLogin">
  <p>
    <label for="usuario">Usuario:</label><br>
    <input id="usuario" type="text" name="usuario" autocomplete="username" required>
  </p>
  <p>
    <label for="password">Contraseña:</label><br>
    <input id="password" type="password" name="password" autocomplete="current-password" required>
  </p>
  <p>
    <button type="submit">Iniciar sesión</button>
  </p>
</form>
<p id="mensaje"></p>
```

Los scripts van con `defer`: primero `auth.js`, después `login.js`. En el menú de esta página, Login no lleva `href` y lleva `aria-current="page"`. Registro sigue enlazando con `./registro.html`.

Abrid `http://localhost:4300/030-Registro+Login-cookies/030c-Formulario-auth+login/login.html`. Dejad los campos vacíos y pulsad Iniciar sesión. El navegador muestra «Completa este campo» y `#mensaje` sigue vacío.

---

## La sesión es otra cookie, con la clave usuario

En `auth.js`, debajo de las funciones del usuario, entran tres más. `guardaSesion` escribe igual que `guardaUsuario`: una tupla, la caducidad, `path=/`, `secure` y `samesite=Strict`.

```javascript
function guardaSesion(sesion, caducidad) {
  document.cookie = `${sesion.clave}=${sesion.valor}; ${caducidad}; path=/; secure; samesite=Strict`;
}
```

`leeSesion` no recibe la clave. Busca el texto `"usuario"`. Si esa cookie está, devuelve `{ clave: "usuario", valor }`. Si no está, devuelve `null`. `borraSesion` la tira con `max-age=0` y el mismo `path=/`, sin repetir `secure`.

```javascript
function leeSesion() {
  if (!document.cookie) return null;

  const cookies = document.cookie.split("; ");

  for (const cookie of cookies) {
    const [claveCookie, valorCookie] = cookie.split("=");

    if (claveCookie && claveCookie.trim() === "usuario") {
      return {
        clave: "usuario",
        valor: valorCookie ? valorCookie.trim() : ""
      };
    }
  }

  return null;
}

function borraSesion() {
  document.cookie = `usuario=; max-age=0; path=/`;
}
```

Esta página no llama a `leeSesion` ni a `borraSesion`. El login llama a `guardaSesion`.

La clave `usuario` es la que el registro no deja usar como nombre. Si una cuenta se llamara `usuario`, guardar la sesión sustituiría esa cookie: la misma clave no deja dos tuplas. Por eso el nombre estaba reservado.

---

## Comparáis el valor, no el objeto entero

`login.js` calcula la portada desde su propia dirección. `document.currentScript` es la etiqueta de `login.js` mientras ese archivo se ejecuta. Su `src` acaba en `/js/login.js`. `"../"` sube a la carpeta del paso. `pathname` es la ruta de `index.html` sin el `http://localhost:4300`.

```javascript
const RAIZ = new URL("../", document.currentScript.src);
const PORTADA = new URL("index.html", RAIZ).pathname;
```

Con este paso, `PORTADA` es `/030-Registro+Login-cookies/030c-Formulario-auth+login/index.html`. Si leéis `document.currentScript` después, cuando el script ya ha terminado, vale `null` y no podéis sacar el `src`.

El dato que llega a la comprobación es otra vez `{ clave, valor }`: la clave es lo escrito en Usuario y el valor es la contraseña. `leeUsuario` devuelve la cookie de esa cuenta, o `null`. La contraseña guardada está en `usuario.valor`, no en el objeto entero. Comparar el objeto con la contraseña es siempre falso.

```javascript
function credencialCorrecta(login) {
  const usuario = leeUsuario(login.clave);
  console.log(usuario);
  if (usuario === null) return false;
  return usuario.valor === login.valor;
}
```

Si no hay cuenta, o la contraseña no coincide, la función devuelve `false`. El mensaje es el mismo en los dos casos: no dice cuál de las dos ha fallado.

Registrad antes a `ana` con contraseña `daw`. En la consola de esa página, `document.cookie` es `ana=daw`. Abrid el login, escribid `pepe` y `daw`, y pulsad Iniciar sesión. `#mensaje` dice `Usuario o contraseña incorrectos.` `document.cookie` sigue siendo `ana=daw`. En la consola, `console.log` ha escrito `null`.

Escribid `ana` y `otra`. El mensaje es otra vez `Usuario o contraseña incorrectos.` La consola muestra el objeto `{ clave: "ana", valor: "daw" }`. La cookie no cambia.

---

## Si coincide, guardáis la sesión y volvéis a la portada

El `submit` frena el envío con `preventDefault`, igual que el registro. Si la comprobación falla, sale con `return`. Si no falla, guarda la sesión con caducidad vacía: la clave fija `"usuario"` y el valor el nombre. La cookie de la cuenta, `ana=daw`, no se toca.

```javascript
formulario.addEventListener("submit", (e) => {
  e.preventDefault();

  const usuario = document.getElementById("usuario").value.trim();
  const password = document.getElementById("password").value.trim();

  const login = {
    clave: usuario,
    valor: password
  };
  if (!credencialCorrecta(login)) {
    mensaje.textContent = "Usuario o contraseña incorrectos.";
    return;
  }

  const sesion = {
    clave: "usuario",
    valor: usuario
  };
  guardaSesion(sesion, "");

  mensaje.textContent = `Bienvenido, ${usuario}. Redirigiendo...`;
  setTimeout(() => {
    window.location.href = PORTADA;
  }, 1500);
});
```

Escribid `ana` y `daw`, y pulsad Iniciar sesión. `#mensaje` dice `Bienvenido, ana. Redirigiendo...` En la consola, `document.cookie` es `ana=daw; usuario=ana`. Segundo y medio después estáis en `http://localhost:4300/030-Registro+Login-cookies/030c-Formulario-auth+login/index.html`. La frase de la portada no dice el nombre: esa página no lee la cookie `usuario`. `document.cookie` sigue siendo `ana=daw; usuario=ana`.

---

## Si falla

No quitéis `path=/`, `secure` ni `samesite=Strict` de `guardaSesion`.

| Qué veis | Qué revisar |
|----------|-------------|
| Login sigue abriendo «En construcción» | El `href` sigue en `enConstruccion.html` |
| La consola dice que `leeUsuario` no existe | `login.js` va delante de `auth.js` |
| `ana` / `daw` dice que son incorrectos | Comparáis el objeto entero con la contraseña. Tiene que ser `usuario.valor` |
| `document.cookie` se queda en `ana=daw` tras un acierto | `guardaSesion` no se llama, o la clave de la sesión no es `"usuario"` |
| No vuelve a la portada | `PORTADA` no sale de `document.currentScript.src`, o el `setTimeout` no usa 1500 |
| La portada enseña el nombre `ana` | Esta página no escribe el nombre en el HTML. Solo guarda la cookie |

---

## Entrega

La entrega es la carpeta `030c-Formulario-auth+login`. El registro sigue guardando la cuenta. El login comprueba esa cookie y, si coincide, guarda la sesión.

- [ ] La pestaña de la portada dice `030c-Formulario-auth+login` y Login abre `login.html`
- [ ] Con los campos vacíos, el navegador muestra «Completa este campo» y `#mensaje` sigue vacío
- [ ] Con `ana` ya registrada, `pepe` / `daw` y `ana` / `otra` dejan `Usuario o contraseña incorrectos.` y `document.cookie` en `ana=daw`
- [ ] `ana` / `daw` deja `Bienvenido, ana. Redirigiendo...` y `document.cookie` en `ana=daw; usuario=ana`
- [ ] Segundo y medio después estáis en el `index.html` de `030c`, y la frase de bienvenida no dice `ana`
- [ ] No habéis quitado `path=/`, `secure` ni `samesite=Strict`
