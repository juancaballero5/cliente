# 040a2 — Una sola clave «usuarios»

## De qué va esta sesión

En `040a1` cada cuenta era una clave de `localStorage`: la clave `ana` guardaba solo a Ana. Esta carpeta copia aquella y añade otra práctica. El registro y el login siguen con la cookie.

Abrís `http://localhost:4300/040-Registro+Login-localStorage/040a2-Una-clave-usuarios/`. El `<title>` es `040a2-Una-clave-usuarios`. La frase de la cabecera sigue siendo «Registro e inicio de sesión con cookies». En Storage hay dos entradas. La nueva dice «Una sola clave «usuarios»».

---

## La práctica nueva

La página es `ejercicios/Storage/ejer02/index.html`. El `<title>` es `ejer02`. La frase de esa página es «Una sola clave «usuarios»». Esa entrada no tiene `href` y lleva `aria-current="page"`. «Una clave por usuario» sí tiene `href`, hacia `../ejer01/index.html`. La lista se llama `Submenú Storage`.

La tarjeta dice: «Guardamos en localStorage todas las cuentas juntas» y «Clave: usuarios; valor: objeto con todas las cuentas en JSON». El formulario es el de la práctica anterior, con un campo más: Email, opcional. Guardar, Leer y Borrar siguen siendo `type="button"`. Intro dispara `submit`, y esa función solo hace `event.preventDefault()`.

Al abrirla, `#resultado` dice «Usuarios guardados (1 clave = todos):» y, si esa clave aún no tiene cuentas, «No hay usuarios guardados.»

---

## Guardar mete la cuenta dentro de un objeto

Pulsad Guardar con el usuario vacío. El párrafo dice lo mismo que en la práctica anterior. La contraseña, también. El teléfono, si no está vacío, usa este patrón, y el aviso sigue siendo «Teléfono no válido (9 dígitos; empieza por 6-9).»:

```javascript
const PATRON_TELEFONO = /^[5-9]\d{8,9}$/;
const PATRON_EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
```

El email, si no está vacío, tiene que llevar algo, una `@`, algo, un punto y algo, sin espacios. Si lo dejáis vacío, no entra en esa comprobación.

Con `nela`, `daw1` y el nombre `Nela`, y con el teléfono y el email vacíos, el clic construye la cuenta y llama a `guardaUsuarioEjercicio`:

```javascript
const user = {
  nombre: nombre.value.trim(),
  usuario: usuario.value.trim(),
  password: password.value.trim(),
  telefono: telefono.value.trim() || "5551234567",
  email: email.value.trim() || "sin-email@ejemplo.com",
};

const ALMACEN_EJERCICIO = "040a2-Una-clave-usuarios";

function guardaUsuarioEjercicio(user) {
  const usuarios = JSON.parse(localStorage.getItem(ALMACEN_EJERCICIO)) || {};
  usuarios[user.usuario] = user;
  localStorage.setItem(ALMACEN_EJERCICIO, JSON.stringify(usuarios));
}
```

Si estáis pensando que la clave es `usuarios`, como dice el párrafo de la tarjeta, mirad la consola después de Guardar. `localStorage.getItem("usuarios")` no es esta cuenta. La clave nueva se llama `040a2-Una-clave-usuarios`, que es el texto de `ALMACEN_EJERCICIO`. `setItem` usa esa constante.

La primera vez esa clave no existe. `getItem` devuelve `null`. `JSON.parse(null)` devuelve `null`, y `null || {}` es un objeto vacío. Ahí se escribe la propiedad. El nombre de la propiedad es el texto del usuario, así que no podéis escribir `usuarios.nela` en el archivo: el nombre llega en una variable. `usuarios[user.usuario] = user` crea la propiedad `nela` y mete dentro el objeto de la cuenta. `JSON.stringify` convierte el objeto entero en un texto, y ese texto es el valor de la única clave.

Si guardáis otra vez a `nela`, no aparece una segunda fila. La propiedad `nela` se sustituye por la cuenta nueva. Si guardáis a `eva`, el mismo texto pasa a tener dos propiedades, `nela` y `eva`. En la consola, `Object.keys(localStorage)` tiene un nombre más, no uno por cuenta.

Esa clave es del origen `http://localhost:4300`, no de la carpeta. Si la guardáis aquí y abrís la práctica de `040a1`, `localStorage.getItem("040a2-Una-clave-usuarios")` sigue devolviendo el mismo texto. La lista de aquella práctica no enseña a Eva: allí solo entran los valores cuyo `usuario` es un texto, y aquí `usuario` no es una propiedad del objeto de fuera. Es una propiedad de cada cuenta, por dentro.

Si el texto de esa clave no es JSON, `JSON.parse` lanza un error. Este archivo no tiene `try`. `listarUsuarios()` se llama al cargar, antes de enganchar los clics: si el `parse` falla, Guardar, Leer y Borrar se quedan sin función.

---

## La lista lee solo esa clave

`leeUsuariosEjercicio` no recorre `localStorage.length`. Lee una clave y devuelve el objeto, o `{}` si no había nada.

```javascript
function leeUsuariosEjercicio() {
  return JSON.parse(localStorage.getItem(ALMACEN_EJERCICIO)) || {};
}

function listarUsuarios() {
  let listado = "Usuarios guardados (1 clave = todos):<br>";
  const usuarios = Object.values(leeUsuariosEjercicio());
  if (usuarios.length === 0) {
    resultado.innerHTML = listado + "No hay usuarios guardados.";
  } else {
    usuarios.forEach((user) => {
      listado += `<b>${user.nombre}</b> ${user.usuario} - ${user.telefono} - ${user.email}<br>`;
    });
    resultado.innerHTML = listado;
  }
}
```

`Object.values` no devuelve los nombres `nela` y `eva`. Devuelve las cuentas que hay dentro. Por eso la fila pinta el nombre, el usuario, el teléfono y el email. Tras guardar a Nela con los dos campos vacíos, la fila es «Nela nela - 5551234567 - sin-email@ejemplo.com».

---

## Leer y borrar tocan una propiedad

Leer mira el campo Usuario. `leeUsuarioEjercicio` devuelve `usuarios[usuario]`. Si esa propiedad no está, el resultado es `undefined`, y `#resultado` dice «⚠️ No existe el usuario.» Si está, muestra el nombre, el usuario y el teléfono. El email no sale en ese mensaje, aunque la cuenta lo tenga.

Borrar hace la misma lectura. Si la cuenta existe, `borraUsuarioEjercicio` ejecuta `delete usuarios[usuario]` y vuelve a hacer `setItem` con el objeto que queda. El párrafo dice que ese usuario ha sido borrado.

Si estáis pensando que Borrar quita la clave de `localStorage`, no es eso. `delete` quita una propiedad. La clave sigue. Cuando borréis la última cuenta, `localStorage.getItem("040a2-Una-clave-usuarios")` devuelve `{}`. La lista dice «No hay usuarios guardados.» porque `Object.values` de ese objeto no tiene elementos.

En los dos botones, el `setTimeout` de 1500 milisegundos está fuera del `if`. Al segundo y medio `listarUsuarios` vuelve a pintar la lista.

---

## Si falla

| Qué veis | Qué revisar |
|----------|-------------|
| Sin sesión acabáis en el login | La práctica lleva `paginaPrivada`. La sesión sigue siendo la cookie |
| En la consola no aparece la clave `usuarios` con esta cuenta | `setItem` usa `ALMACEN_EJERCICIO`, el texto `040a2-Una-clave-usuarios` |
| Dos veces `nela` dan dos filas | La segunda escritura sustituye `usuarios["nela"]` |
| La consola marca `SyntaxError` al cargar y los botones no hacen nada | El texto de esa clave no es JSON, y `JSON.parse` no está en un `try` |
| La lista de la práctica anterior enseña estas cuentas | Aquí la cuenta no es el valor de la clave. Es una propiedad de dentro |
| Leer no enseña el email | El mensaje de Leer no escribe `user.email`. La lista sí |
| Tras borrar a la última cuenta, `getItem` sigue devolviendo texto | El texto es `{}`. `delete` no llama a `removeItem` |
| El mensaje de leer se queda para siempre | El `setTimeout` está dentro del `if`, o el tiempo no es 1500 |

---

## Entrega

La entrega es la carpeta `040a2-Una-clave-usuarios`. Lo nuevo es `ejercicios/Storage/ejer02`: una sola clave de `localStorage` y, dentro, un objeto con todas las cuentas. Cada cuenta lleva también `email`.

- [ ] La portada dice «Registro e inicio de sesión con cookies» y el título es `040a2-Una-clave-usuarios`
- [ ] Storage tiene las dos prácticas, y la abierta no tiene `href`
- [ ] Guardar `nela` y `eva` deja una sola clave, `040a2-Una-clave-usuarios`, con las dos propiedades
- [ ] El teléfono vacío se guarda como `5551234567` y el email vacío como `sin-email@ejemplo.com`
- [ ] La lista pinta nombre, usuario, teléfono y email. Leer no pinta el email
- [ ] Borrar a la última cuenta deja la clave con el texto `{}`
- [ ] Esa clave se lee desde otra página de `http://localhost:4300`

---

## Cierre

La sesión de esta carpeta sigue en la cookie. La práctica nueva no crea una clave por cuenta: crea una, y cada nombre de usuario es una propiedad del objeto que hay dentro.
