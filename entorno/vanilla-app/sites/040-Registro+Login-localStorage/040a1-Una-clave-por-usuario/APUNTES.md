# 040a1 — Una clave por usuario

## De qué va esta sesión

En `030f-Rutas` la barra de menú tiene DOM y Cookies. El registro y el login siguen guardando la sesión en una cookie. Esta carpeta copia eso y añade un desplegable, Storage, con una sola práctica.

Abrís `http://localhost:4300/040-Registro+Login-localStorage/040a1-Una-clave-por-usuario/`. El `<title>` es `040a1-Una-clave-por-usuario`. La frase de la cabecera sigue siendo «Registro e inicio de sesión con cookies». Entráis como ya sabéis y abrís Storage, «Una clave por usuario».

La práctica se abre en `ejercicios/Storage/ejer01/index.html`. El `<title>` es `ejer01`. La frase de esa página es «Una clave por usuario». En el submenú, esa entrada no tiene `href` y lleva `aria-current="page"`. La lista se llama `Submenú Storage`.

---

## La página guarda texto, no el objeto

La tarjeta dice: «Guardamos en localStorage cada cuenta por separado» y «Clave: nombre de usuario; valor: objeto de la cuenta en JSON». Hay cuatro campos: nombre, usuario, contraseña y teléfono. Tres botones, Guardar, Leer y Borrar. Los tres son `type="button"`.

Si estáis pensando que la tecla Intro guarda la cuenta, el formulario no hace eso. Al pulsar Intro, el navegador dispara `submit`. La función de `formulario.addEventListener("submit", ...)` solo llama a `event.preventDefault()`, para que la página no se recargue. Guardar está en el clic del botón.

`localStorage` es un almacén del navegador. Solo guarda texto. Al recargar la página, el texto sigue. No es una cookie: la cookie de la sesión no aparece en este almacén, y esta cuenta no se escribe en `document.cookie`.

---

## Guardar escribe una clave

Pulsad Guardar con el usuario vacío. `#resultado` dice «Usuario no válido (minúsculas, números o _; 3-16 caracteres; empieza por letra).» La contraseña tiene que tener entre 4 y 20 caracteres. Si el teléfono no está vacío y no cumple el patrón, el párrafo dice «Teléfono no válido (9 dígitos; empieza por 6-9).»

El patrón que hace la comprobación es este:

```javascript
const PATRON_TELEFONO = /^[5-9]\d{8,9}$/;
```

Si el teléfono se deja vacío, no entra en esa comprobación. La cuenta guarda `5551234567`.

Con `ana`, `daw1` y el nombre `Ana`, el clic construye el objeto y llama a `guardarUsuarioPorClave`:

```javascript
const user = {
  nombre: nombre.value.trim(),
  usuario: usuario.value.trim(),
  password: password.value.trim(),
  telefono: telefono.value.trim() || "5551234567",
};

function guardarUsuarioPorClave(user) {
  localStorage.setItem(user.usuario, JSON.stringify(user));
}
```

`JSON.stringify` convierte el objeto en un texto. `setItem` guarda ese texto con la clave `ana`. Si estáis pensando que dentro queda el objeto, abrid la consola y escribid `localStorage.getItem("ana")`. Lo que vuelve es un texto, con comillas y con los nombres de las propiedades entre comillas. `JSON.parse` de ese texto vuelve a dar el objeto.

Después de guardar, `#resultado` no dice «guardado». Llama a `listarUsuarios` y pinta la lista.

---

## La lista recorre todo el origen

`leerUsuariosPorClave` no busca una carpeta. Recorre `localStorage.length` y, en cada vuelta, `localStorage.key(i)` le da un nombre de clave. `getItem` lee el texto.

```javascript
for (let i = 0; i < localStorage.length; i++) {
  const clave = localStorage.key(i);
  const valor = localStorage.getItem(clave);
  try {
    const user = JSON.parse(valor);
    if (!user || typeof user !== "object" || typeof user.usuario !== "string") {
      continue;
    }
    usuarios.push(user);
  } catch {
    // El valor no es un JSON válido; se ignora esta clave.
  }
}
```

Si estáis pensando que un texto cualquiera rompe la lista, `JSON.parse` de un texto que no es JSON lanza un error. El `catch` lo ignora y sigue con la clave siguiente. Si el texto sí es JSON, pero no es un objeto, o su propiedad `usuario` no es un texto, `continue` se lo salta.

El almacén no es de la carpeta `040a1`. Es del origen `http://localhost:4300`. En la consola, `location.origin` dice eso. Si guardáis `ana` aquí y abrís otra página de ese mismo origen, `localStorage.getItem("ana")` sigue devolviendo el mismo texto. Esta lista enseña cualquier clave de ese origen que pase el filtro, venga de la carpeta que venga.

En este origen había una clave `sesion` cuyo valor es un objeto con `usuario` igual al texto `"admin"`. La lista la pintó, aunque no tiene `nombre` ni `telefono`: «undefined admin - undefined». La cookie `usuario=admin` no salió, porque una cookie no está en `localStorage`.

`listarUsuarios` escribe el título «📦 Todos los usuarios: (1 clave = 1 usuario):» y, por cada cuenta, el nombre en negrita, el usuario y el teléfono. Si no queda ninguna, añade «No hay usuarios guardados.»

---

## Leer y borrar usan el mismo nombre

Leer no mira lo que hay escrito en Nombre. Mira el campo Usuario. `getUsuarioPorClave` hace `getItem` de ese texto y `JSON.parse`. Si no hay clave, o el valor no es una cuenta, devuelve `null` y `#resultado` dice «⚠️ No existe el usuario.» Si la encuentra, muestra el nombre, el usuario y el teléfono.

Borrar hace el mismo recorrido. Si la cuenta existe, `borrarUsuarioPorClave` llama a `localStorage.removeItem` con `user.usuario` y el párrafo dice que ese usuario ha sido borrado.

En los dos botones, el `setTimeout` de 1500 milisegundos está fuera del `if`. Pase lo que pase, al segundo y medio `listarUsuarios` vuelve a pintar la lista y el mensaje de leer o de borrar desaparece.

---

## Si falla

| Qué veis | Qué revisar |
|----------|-------------|
| Sin sesión acabáis en el login | La práctica lleva `paginaPrivada`. La sesión sigue siendo la cookie, como en `030f` |
| Intro no guarda | Los botones son `type="button"`. El `submit` solo hace `preventDefault` |
| `getItem("ana")` devuelve texto con comillas | `setItem` guardó `JSON.stringify(user)`, no el objeto |
| En la lista sale una cuenta que no habéis guardado aquí | `leerUsuariosPorClave` recorre todas las claves de `http://localhost:4300` |
| La consola marca un error al leer una clave y la lista no sigue | El `JSON.parse` no está dentro del `try` |
| Borrar no quita la fila | `removeItem` no recibe `user.usuario` |
| El mensaje de leer se queda para siempre | El `setTimeout` está dentro del `if`, o el tiempo no es 1500 |

---

## Entrega

La entrega es la carpeta `040a1-Una-clave-por-usuario`. Lo nuevo es `ejercicios/Storage/ejer01`: una clave de `localStorage` por cuenta. El registro, el login y la cookie de sesión no cambian.

- [ ] La portada dice «Registro e inicio de sesión con cookies» y el título es `040a1-Una-clave-por-usuario`
- [ ] Storage tiene una práctica, «Una clave por usuario», y la página abierta no tiene `href`
- [ ] Guardar `ana` crea la clave `ana`. `localStorage.getItem("ana")` es un texto JSON
- [ ] La lista enseña esa cuenta y, si las hay, las otras claves del origen que pasan el filtro
- [ ] Leer y Borrar usan el nombre de usuario, y al segundo y medio vuelve la lista
- [ ] La misma clave se lee desde otra página de `http://localhost:4300`

---

## Cierre

La sesión de esta carpeta sigue en la cookie. La práctica nueva guarda cada cuenta aparte, en `localStorage`, con el nombre de usuario como clave.
