# 050a2 — Usuario desde la API

## De qué va esta sesión

En `050a1-Usuario-Blob` escribíais la cuenta a mano y Guardar la metía en IndexedDB. El registro, el login y la sesión de la web no cambian: siguen en las claves `usuarios` y `sesion`. Esta carpeta copia aquella. El desplegable IndexedDB pasa de una práctica a dos.

Abrís `http://localhost:4300/050-Registro+Login-IndexedDB/050a2-Usuario-APIweb/`. El `<title>` es `050a2-Usuario-APIweb`. La frase de la cabecera sigue siendo «Registro e inicio de sesión con localStorage». Entráis como ya sabéis y abrís IndexedDB, «Usuario desde la API».

La práctica nueva es `ejercicios/IndexedDB/ejer02/index.html`. El `<title>` es `ejer02`. La frase de esa página es «Usuario desde la API». En el submenú, esa entrada no tiene `href` y lleva `aria-current="page"`. La de «Usuario e imagen Blob» sí tiene `href`, hacia `../ejer01/index.html`. La lista se llama `Submenú IndexedDB`.

La primera práctica abre la misma base que en el paso anterior, `050a1-Usuario-Blob-DB`. La segunda abre otra.

---

## La misma API de IndexedDB, con otro nombre

Las funciones de `ejercicios/IndexedDB/ejer02/js/indexedDB.js` son las de la práctica anterior: abrir, guardar con `put`, leer uno con `get`, leer todos con `getAll` y borrar con `delete`. Cada una abre, opera y cierra. El clic de Guardar, Leer y Borrar sigue haciendo `await`.

Lo que cambia es el nombre, para no escribir en la base de `050a1`:

```javascript
const TABLA_EJERCICIO = "050a2-Usuario-APIweb";
const BASE_DATOS_EJERCICIO = "050a2-Usuario-APIweb-DB";
```

La tarjeta sigue diciendo «Almacén usuarios». En IndexedDB, origen `http://localhost:4300`, el almacén se llama `050a2-Usuario-APIweb`. La clave de cada fila sigue siendo el campo `usuario`. Esta práctica no toca las claves `usuario`, `usuarios` y `sesion` de `localStorage`, ni la cuenta `admin`.

Al cargar, `listarUsuarios` abre esa base. Si venís de `050a1` y esperáis ver a `lola` aquí, no está: es otra base. En la práctica anterior, la misma `lola` sigue.

---

## Una función para las dos llamadas

El script nuevo es `ejercicios/IndexedDB/ejer02/js/api.js`. Se carga después de `rutas.js` y antes de `script.js`. La página no llama a `fetch` directamente. Llama a `respuestaAPI`, y esa función prepara la dirección y espera la respuesta.

Una API pública es un servicio en internet que os devuelve datos si le pedís una dirección. Aquí hay dos. Las dos se piden con GET: el navegador solo lee, no envía un cuerpo.

```javascript
async function respuestaAPI(url, opciones) {
  const direccion = new URL(url);
  const parametros = opciones.parametros || {};
  for (const clave in parametros) {
    direccion.searchParams.set(clave, parametros[clave]);
  }

  const respuesta = await fetch(direccion, opciones);
  if (!respuesta.ok) {
    throw new Error("La API no respondió bien.");
  }
  return respuesta;
}
```

`new URL` parte de la dirección base. `parametros` no es una cabecera. Es lo que va detrás de `?` en la URL. `searchParams.set` escribe cada pareja y la codifica. `fetch` no lee `parametros`: lee la dirección ya montada. El objeto `opciones` se le pasa igual, con `method` y `headers`. `headers` va vacío. Estas dos APIs no os han dado una clave, y un GET no lleva cuerpo, así que no hay nada que poner en esa cabecera.

Si la respuesta no es correcta, `respuesta.ok` es falso y la función lanza un error. Si lo es, devuelve la respuesta. Todavía no la ha convertido en objeto ni en archivo. Eso lo hace quien la llama.

---

## Pedir la persona rellena el formulario

El botón es Pedir a la API, `type="button"`, con id `pedirAPI`. El clic es `async` y va dentro de `try`. Si algo falla, el `catch` escribe «No se pudo pedir el usuario a la API.» y el error queda en la consola.

`pedirPersonaAPI` usa la función común con la base de randomuser y el parámetro `nat` igual a `es`. La URL que sale es `https://randomuser.me/api/?nat=es`. `json()` convierte el cuerpo en un objeto. La persona es `results[0]`, la primera del array.

```javascript
async function pedirPersonaAPI() {
  const respuesta = await respuestaAPI("https://randomuser.me/api/", {
    method: "GET",
    headers: {},
    parametros: {
      nat: "es"
    }
  });
  const datos = await respuesta.json();
  return datos.results[0];
}
```

El clic copia esos datos a los campos. El nombre junta el nombre y el apellido. El usuario son las dos primeras letras del nombre y las dos primeras del apellido, en minúsculas. La contraseña es el texto fijo `dejameya`. El teléfono se queda solo con los dígitos: `replace(/\D/g, "")` quita espacios, guiones y lo que no sea número. El email, la calle, el código postal, la ciudad y la provincia salen de `persona.location` y de `persona.email`.

```javascript
const usuarioDicebear = (
  persona.name.first.slice(0, 2) + persona.name.last.slice(0, 2)
).toLowerCase();

usuario.value = usuarioDicebear;
telefono.value = String(persona.phone ?? "").replace(/\D/g, "");
imagen.value = "";
```

`imagen.value = ""` vacía el campo de archivo. Si habíais elegido una foto antes, ese archivo ya no compite con la de la API.

Si estáis pensando que Pedir a la API ya guarda la cuenta, no la guarda. El párrafo dice «Datos de la API cargados. Revisa el formulario y pulsa Guardar.» Los patrones de Guardar siguen igual. Si el usuario de cuatro letras lleva un acento o una eñe, o no llega a tres caracteres, Guardar dice que el usuario no es válido. Si el teléfono, ya sin símbolos, no cumple el patrón, dice que el teléfono no es válido. Si el código postal no son cinco dígitos, tampoco guarda. Corregís el campo y volvéis a pulsar Guardar.

---

## La casilla elige qué foto se guarda

Hay una casilla, `fotoBlob`, y una imagen de vista previa, `preview`, que empieza oculta. Una variable de la página, `imagenActual`, guarda la foto que ha llegado, porque un `<input type="file">` no acepta ni una URL ni un `Blob`.

Sin marcar la casilla, `imagenActual` es el texto `persona.picture.thumbnail`. `preview.src` usa ese texto. El navegador pide la miniatura al pintar la imagen. No pasa por `fetch`.

Con la casilla marcada, `blobDeFoto` pide otra API. La base es `https://api.dicebear.com/10.x/avataaars/png` y el parámetro `seed` es el usuario de cuatro letras. `blob()` convierte el cuerpo en un `Blob`, el archivo de la imagen. `preview.src` no puede recibir el `Blob` a pelo: hace falta `URL.createObjectURL`.

```javascript
async function blobDeFoto(clave) {
  const respuesta = await respuestaAPI("https://api.dicebear.com/10.x/avataaars/png", {
    method: "GET",
    headers: {},
    parametros: {
      seed: clave
    }
  });
  return respuesta.blob();
}
```

```javascript
if (fotoBlob.checked) {
  imagenActual = await blobDeFoto(usuarioDicebear);
  preview.src = URL.createObjectURL(imagenActual);
} else {
  imagenActual = persona.picture.thumbnail;
  preview.src = imagenActual;
}
preview.hidden = false;
```

Guardar mira primero el campo de archivo. Si está vacío, usa `imagenActual`. Si tampoco hay foto de la API, usa `FOTO_DEFECTO`.

```javascript
imagen: imagen.files[0] ? imagen.files[0] : imagenActual || FOTO_DEFECTO,
```

Si estáis pensando que la miniatura o el `Blob` se pierden al pulsar Guardar, se perdían cuando Guardar solo miraba `imagen.files[0]`. El campo de archivo no se entera de `imagenActual`. Por eso el valor de la fila sale de esa variable cuando no habéis elegido un archivo.

La lista y Leer no cambian: si `imagen` es texto, ese texto vale como `src`. Si es un `Blob` o un `File`, usan `URL.createObjectURL`.

---

## Si falla

| Qué veis | Qué revisar |
|----------|-------------|
| Sin sesión acabáis en el login | La práctica lleva `paginaPrivada`. La sesión sigue siendo la de `localStorage` |
| `lola` de `050a1` no sale en esta lista | Esta práctica abre `050a2-Usuario-APIweb-DB`, no `050a1-Usuario-Blob-DB` |
| El párrafo dice «No se pudo pedir el usuario a la API.» | `fetch` ha fallado o `respuesta.ok` es falso. El detalle está en la consola |
| `nat` o `seed` no aparecen en la URL | Están en `parametros`. `searchParams.set` los añade a la dirección antes del `fetch` |
| La vista previa no sale | `preview.hidden` sigue en true, o el clic no ha llegado a asignar `preview.src` |
| Guardar después de la API dice que el usuario o el teléfono no valen | Los patrones son los de siempre. El usuario de la API puede llevar acento, y el teléfono o el código postal pueden no coincidir |
| Guardar deja `user.png` aunque la vista previa se vea | `imagenActual` no se ha asignado, o el campo de archivo todavía tiene un archivo y gana en el ternario |
| La foto de la lista pide `[object Blob]` | `src` recibió el `Blob`. Hace falta `URL.createObjectURL` cuando no es un texto |

---

## Entrega

La entrega es la carpeta `050a2-Usuario-APIweb`. Lo nuevo es `ejercicios/IndexedDB/ejer02`: `api.js` y el clic de Pedir a la API.

- [ ] La portada dice «Registro e inicio de sesión con localStorage» y el título es `050a2-Usuario-APIweb`
- [ ] IndexedDB tiene dos prácticas. En la segunda, la entrada abierta no tiene `href`
- [ ] Pedir a la API, con la casilla sin marcar, rellena el formulario y la vista previa usa la miniatura
- [ ] Con la casilla marcada, la vista previa sale de un `Blob` de Dicebear
- [ ] Guardar escribe en `050a2-Usuario-APIweb-DB`. Sin archivo elegido, `imagen` es `imagenActual`
- [ ] La lista pinta la miniatura como texto y el `Blob` con `URL.createObjectURL`
- [ ] Las claves `usuario`, `usuarios` y `sesion` de `localStorage` siguen como estaban, y la cuenta `admin` también

---

## Cierre

La sesión de esta carpeta sigue en `localStorage`. IndexedDB se usa como en el paso anterior, en una base distinta. Lo nuevo es pedir la persona a una API, elegir si la foto llega como texto o como `Blob`, y guardar esa foto con la cuenta.
