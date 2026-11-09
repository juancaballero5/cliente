# 050a1 — Usuario e imagen Blob

## De qué va esta sesión

En `040f-Rutas` la cuenta de la práctica iba en `localStorage`, en un solo texto JSON. El registro, el login y la sesión de la web no cambian: siguen en las claves `usuarios` y `sesion`. Esta carpeta copia aquella y añade un desplegable, IndexedDB, con una sola práctica.

Abrís `http://localhost:4300/050-Registro+Login-IndexedDB/050a1-Usuario-Blob/`. El `<title>` es `050a1-Usuario-Blob`. La frase de la cabecera sigue siendo «Registro e inicio de sesión con localStorage». Entráis como ya sabéis y abrís IndexedDB, «Usuario e imagen Blob».

La práctica se abre en `ejercicios/IndexedDB/ejer01/index.html`. El `<title>` es `ejer01`. La frase de esa página es «Usuario e imagen Blob». En el submenú, esa entrada no tiene `href` y lleva `aria-current="page"`. La lista se llama `Submenú IndexedDB`.

---

## IndexedDB no es otra clave de localStorage

La tarjeta dice: «Guardamos cada cuenta en IndexedDB», «Almacén usuarios; clave primaria: el campo usuario» y «La foto es un Blob, no texto Base64». El formulario es el de la práctica de la imagen Base64: nombre, usuario, contraseña, teléfono, email, dirección y un campo de archivo. Los botones son Guardar, Leer, Borrar y Simular espera. Los cuatro son `type="button"`.

Si estáis pensando que la tecla Intro guarda la cuenta, el formulario no hace eso. Al pulsar Intro, el navegador dispara `submit`. La función solo llama a `event.preventDefault()`, para que la página no se recargue. Guardar está en el clic del botón.

`localStorage` guarda texto y lo leéis en el momento, con `getItem`. IndexedDB guarda cada cuenta como un registro. La petición no termina en la línea en la que la lanzáis: el navegador avisa después, cuando ha podido hacerla. Por eso las funciones de `indexedDB.js` devuelven una promesa. Una promesa es el resultado que todavía no está. `await`, dentro de una función `async`, espera ese resultado y sigue.

Las cuatro funciones de esta práctica son la API que vais a usar: guardar, leer uno, leer todos y borrar. Abrir la base es el paso que las cuatro comparten.

---

## Abrir crea la base la primera vez

El archivo es `ejercicios/IndexedDB/ejer01/js/indexedDB.js`. Se carga el primero, antes de `auth.js`, `menu.js`, `rutas.js` y `script.js`.

La tarjeta habla de un almacén `usuarios`. El código no usa ese nombre. La base y el almacén llevan el nombre de esta carpeta, para no pisar las claves `usuario`, `usuarios` y `sesion` de `localStorage`, ni otra base de otro paso:

```javascript
const TABLA_EJERCICIO = "050a1-Usuario-Blob";
const BASE_DATOS_EJERCICIO = "050a1-Usuario-Blob-DB";

function abrirBaseDatosEjercicio() {
  return new Promise((resolve, reject) => {
    const requestDB = indexedDB.open(BASE_DATOS_EJERCICIO, 1);

    requestDB.onupgradeneeded = (event) => {
      const db = event.target.result;
      if (!db.objectStoreNames.contains(TABLA_EJERCICIO)) {
        db.createObjectStore(TABLA_EJERCICIO, { keyPath: "usuario" });
      }
    };

    requestDB.onsuccess = (event) => {
      resolve(event.target.result);
    };

    requestDB.onerror = (event) => {
      reject(event.target.error);
    };
  });
}
```

`indexedDB.open` pide la base `050a1-Usuario-Blob-DB`, versión 1. Si no existe, el navegador la crea y dispara `onupgradeneeded` antes de `onsuccess`. Ahí se crea el almacén `050a1-Usuario-Blob`, si todavía no está. `keyPath: "usuario"` dice que la clave de cada fila es el valor del campo `usuario` de la cuenta. Con `ana`, la clave es `"ana"`. No es el texto fijo `"usuario"` de la clave `sesion`.

`onsuccess` entrega la conexión con `resolve`. `onerror` rechaza la promesa. En la consola, Aplicación, IndexedDB, origen `http://localhost:4300`, la base aparece en cuanto la práctica llama a `abrirBaseDatosEjercicio`. Al cargar la página, `listarUsuarios` ya hace esa llamada. No borréis desde ahí las claves de `localStorage`: esta práctica no las usa.

La segunda vez que abrís la misma versión, `onupgradeneeded` no se repite. El almacén ya está.

---

## Guardar escribe una fila

Usuario, contraseña, teléfono, email y código postal se comprueban como en la práctica de la imagen Base64. Si el teléfono no cumple el patrón, el párrafo dice «Teléfono no válido (9 dígitos; empieza por 6-9).» El patrón del script acepta de 8 a 9 dígitos y empieza por 5, 6, 7, 8 o 9.

Con los campos opcionales vacíos, la cuenta no se guarda vacía. Teléfono, email y dirección reciben el mismo texto fijo que en Storage. La foto no pasa por `FileReader`:

```javascript
const user = {
  nombre: nombre.value.trim(),
  usuario: usuario.value.trim(),
  password: password.value.trim(),
  telefono: telefono.value.trim() || "5551234567",
  email: email.value.trim() || "sin-email@ejemplo.com",
  direccion: {
    calle: calle.value.trim() || "Sin calle",
    cp: cp.value.trim() || "00000",
    ciudad: ciudad.value.trim() || "Sin ciudad",
    provincia: provincia.value.trim() || "Sin provincia",
  },
  imagen: imagen.files[0] ? imagen.files[0] : FOTO_DEFECTO,
};
```

Si habéis elegido un archivo, `imagen.files[0]` es un `File`. Un `File` es un `Blob`: el archivo en sí, no el texto `data:` de `040a4`. IndexedDB puede guardar ese valor dentro de la fila. Si no habéis elegido archivo, `imagen` es `FOTO_DEFECTO`, la ruta de `img/user.png` que declara `menu.js`. Sigue siendo un texto.

El clic es `async` y espera a la función de guardar:

```javascript
await guardaUsuarioEjercicio(user);
```

El parámetro se llama `usuario`, pero lo que recibe es la cuenta entera. Dentro, abre la base, abre una transacción de escritura sobre el almacén y lanza `put`:

```javascript
async function guardaUsuarioEjercicio(usuario) {
  const db = await abrirBaseDatosEjercicio();

  return new Promise((resolve, reject) => {
    const transaction = db.transaction(TABLA_EJERCICIO, "readwrite");
    const store = transaction.objectStore(TABLA_EJERCICIO);
    const requestEscribir = store.put(usuario);

    requestEscribir.onsuccess = () => {
      resolve();
    };

    requestEscribir.onerror = (event) => {
      reject(event.target.error);
    };

    transaction.oncomplete = () => {
      db.close();
    };

    transaction.onabort = () => {
      db.close();
    };
  });
}
```

`put` no ha terminado en la línea en la que lo escribís. `onsuccess` es el aviso de que la fila está escrita, y ahí la promesa se resuelve. Si ya había una fila con la misma clave `usuario`, `put` la sustituye. Al terminar la transacción, `oncomplete` cierra la conexión. Si la transacción se corta, cierra `onabort`. La página no se queda con la base abierta.

Después del `await`, el clic llama a `listarUsuarios`. `#resultado` no dice «guardado»: pinta la lista.

---

## La lista ya es un array

`leeUsuariosEjercicio` abre la base en modo `readonly` y llama a `getAll`. El resultado no es el objeto `{ ana: cuenta, lola: cuenta }` de la clave única. Es un array de cuentas. Por eso el script no hace `Object.values`:

```javascript
requestLeer.onsuccess = () => {
  resolve(requestLeer.result);
};
```

```javascript
const usuarios = await leeUsuariosEjercicio();
if (usuarios.length === 0) {
  resultado.innerHTML = listado + "No hay usuarios guardados.";
}
```

El encabezado dice «Usuarios guardados (almacén usuarios):». El almacén que veréis en IndexedDB se llama `050a1-Usuario-Blob`. Si estáis pensando que `localStorage.getItem("usuarios")` enseña estas cuentas, esa clave es la del registro de la web. Esta práctica no escribe ahí.

Cada fila pinta la foto. Si `imagen` es texto, esa cadena vale como `src`. Si es el `File`, `src` no la acepta: hay que pedirle al navegador una dirección temporal.

```javascript
const src = typeof user.imagen === "string" ? user.imagen : URL.createObjectURL(user.imagen);
```

Con `lola` sin archivo, la foto pequeña es `user.png`. Con `rita` y un archivo, la misma línea usa `createObjectURL` y la foto también se ve en la lista.

---

## Leer una clave y borrarla

Leer toma el texto del campo Usuario y llama a `leeUsuarioEjercicio`. Dentro, `store.get(usuario)` busca esa clave. Si no hay fila, `onsuccess` también se dispara, y `result` es `undefined`. No es un error.

```javascript
const user = await leeUsuarioEjercicio(usuario.value.trim());
if (!user) {
  resultado.innerHTML = mensaje + "⚠️ No existe el usuario.";
}
```

Si la cuenta existe, el mensaje lleva la misma foto y los mismos datos, también la dirección. Al segundo y medio, `listarUsuarios` vuelve a pintar la lista.

Borrar lee primero. Si no existe, el párrafo dice «No existe el usuario.» y no llama a borrar. Si existe, `borraUsuarioEjercicio` hace `store.delete` con la clave `user.usuario`. `delete` de una clave que no está también terminaría en `onsuccess` y no borraría nada: por eso el script comprueba antes. Al segundo y medio vuelve la lista.

---

## La espera no bloquea la página

El botón Simular espera espera diez segundos y después guarda una cuenta fija, `doe`, con la foto por defecto:

```javascript
await new Promise((resolve) => {
  setTimeout(resolve, 10000);
});

await guardaUsuarioEjercicio({
  nombre: "John",
  usuario: "doe",
  password: "dejameya",
  telefono: "5551234567",
  email: "sin-email@ejemplo.com",
  direccion: {
    calle: "Sin calle",
    cp: "00000",
    ciudad: "Sin ciudad",
    provincia: "Sin provincia",
  },
  imagen: FOTO_DEFECTO,
});
```

El `await` está dentro del clic, que es `async`. La página sigue respondiendo: podéis escribir en el formulario y pulsar Guardar mientras cuentan los diez segundos. Al terminar, `doe` aparece en la lista.

---

## Si falla

| Qué veis | Qué revisar |
|----------|-------------|
| Sin sesión acabáis en el login | La práctica lleva `paginaPrivada`. La sesión sigue siendo la de `localStorage` |
| En IndexedDB no hay un almacén `usuarios` | El almacén es `050a1-Usuario-Blob`, dentro de la base `050a1-Usuario-Blob-DB` |
| `getItem("usuarios")` no tiene a `lola` | Esta práctica no escribe esa clave. La fila está en IndexedDB |
| Sin archivo, la foto no se ve | `imagen` es `FOTO_DEFECTO`. `script.js` tiene que cargarse después de `menu.js` |
| Con archivo, la consola pide `[object File]` | `src` recibió el `File`. Hace falta `URL.createObjectURL` cuando no es un texto |
| Al guardar, la consola dice que `guardaUsuarioEjercicio` no es una función | `indexedDB.js` no es el primer script de la página |
| Leer un usuario que no está lanza un error | `get` de una clave ausente resuelve `undefined`. El `if (!user)` tiene que estar |
| La lista dice que `direccion` no existe | Esa fila se guardó sin el objeto `direccion` |

---

## Entrega

La entrega es la carpeta `050a1-Usuario-Blob`. Lo nuevo es `ejercicios/IndexedDB/ejer01`: las funciones de `indexedDB.js` y la cuenta con la foto en la fila.

- [ ] La portada dice «Registro e inicio de sesión con localStorage» y el título es `050a1-Usuario-Blob`
- [ ] IndexedDB tiene una práctica, y la abierta no tiene `href`
- [ ] Guardar `lola` sin imagen crea la base `050a1-Usuario-Blob-DB` y el almacén `050a1-Usuario-Blob`. La clave de la fila es `lola`. `imagen` es la ruta de `user.png`
- [ ] Guardar `rita` con una imagen deja `imagen` como archivo, no como texto `data:`
- [ ] Las dos fotos se ven pequeñas en la lista
- [ ] Calle, código postal, ciudad y provincia vacíos se guardan como `Sin calle`, `00000`, `Sin ciudad` y `Sin provincia`
- [ ] Leer enseña la foto y la dirección, y al segundo y medio vuelve la lista
- [ ] Las claves `usuario`, `usuarios` y `sesion` de `localStorage` siguen como estaban, y la cuenta `admin` también

---

## Cierre

La sesión de esta carpeta sigue en `localStorage`. La práctica abre una base, guarda cada cuenta en una fila y la vuelve a leer con `await`. La foto es el archivo, o la ruta de `user.png` si no habéis elegido ninguno.
