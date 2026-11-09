# 060a1 — Usuario en la API

## De qué va esta sesión

En `050f-Rutas` la cuenta de la web vive en IndexedDB, y la práctica de IndexedDB guarda la foto como `File`. Esta carpeta copia aquella. El registro, el login y el menú siguen en el navegador. Lo nuevo es una práctica, APINodeJS, que no abre IndexedDB: pide la cuenta a otro programa, la API en Node.js, y ese programa la guarda en MySQL.

Abrís `http://localhost:4300/060-Registro+Login-APINodeJS/060a1-Usuario-APINodeJS/`. El `<title>` es `060a1-Usuario-APINodeJS`. La frase de la cabecera sigue siendo «Registro e inicio de sesión con localStorage». Entráis como ya sabéis y abrís APINodeJS, «Usuario en la API».

La práctica se abre en `ejercicios/APINodeJS/ejer01/index.html`. El `<title>` es `ejer01`. La frase de esa página es «Usuario en la API». En el submenú, esa entrada no tiene `href` y lleva `aria-current="page"`. La lista se llama `Submenú APINodeJS`.

La página es `paginaPrivada`. Sin fila de sesión en IndexedDB, `rutas.js` os manda al login de esta carpeta. La lista que vais a ver no es esa sesión: es la tabla de MySQL.

---

## Una base en el navegador, dos almacenes

En `050f`, `auth.js` abría dos bases: `Usuarios-DB` y `Sesion-DB`. Aquí hay una, con el mismo nombre que la base de MySQL:

```javascript
const BASE_DATOS_ACCESO = "accesoDB";
const TABLA_USUARIOS = "usuarios";
const TABLA_SESION = "sesion";
```

`abrirBaseDatosAccesoIDX` hace `indexedDB.open("accesoDB", 1)`. La primera vez, `onupgradeneeded` crea los dos almacenes, los dos con `keyPath: "usuario"`. En IndexedDB no se crean tablas SQL. El almacén es el equivalente: cada cuenta es una fila y la clave es el campo `usuario`.

`guardaUsuarioIDX`, `leeUsuarioIDX`, `leeUsuariosIDX`, `borraUsuarioIDX`, `guardaSesionIDX`, `leeSesionIDX` y `borraSesionIDX` hacen lo mismo que en `050f`. Solo cambia la función que abre. `leeSesionIDX` sigue con `getAll()` y se queda el primero, porque al cargar el menú todavía no conoce la clave.

Si estáis pensando que `Usuarios-DB` y `Sesion-DB` se han borrado, siguen en el navegador. Esta página no las lee. Hay que registrarse otra vez en `accesoDB`. No borréis esas bases, ni las claves `usuario`, `usuarios` y `sesion` de `localStorage`, ni la cuenta `admin`.

`onupgradeneeded` solo corre al crear la base o al subir la versión. Con la versión `1` y los dos almacenes creados a la vez, la segunda visita no los vuelve a crear.

---

## La práctica habla con otro programa

La tarjeta dice: «Guardamos cada cuenta en MySQL, a través de la API en Node.js», «Base de datos accesoDB; tabla usuarios; clave: el campo usuario» y «La foto es texto: una ruta, o el archivo convertido a un data URL». El formulario es el de la práctica de IndexedDB. Los botones siguen siendo Guardar, Leer, Borrar y Simular espera, los cuatro `type="button"`. Intro no guarda: el `submit` solo hace `preventDefault()`.

La página que estáis viendo la sirve nginx en el puerto 4300. La API es otro proceso, en el puerto 3000. `apiNodeJS.js` se carga el primero:

```javascript
const APIEjercicio = "http://localhost:3000/accesoDB";
```

`fetch` pide una URL y devuelve una promesa. La promesa es el resultado que todavía no está. `await`, dentro de una función `async`, espera ese resultado. IndexedDB también os hacía esperar, porque el navegador avisaba después. Aquí el aviso llega cuando el otro programa ha contestado.

`respuestaAPIEjercicio` monta la dirección, llama a `fetch` y mira si la respuesta ha ido bien:

```javascript
async function respuestaAPIEjercicio(url, opciones) {
  const direccion = new URL(url);
  const parametros = opciones.parametros || {};
  for (const clave in parametros) {
    direccion.searchParams.set(clave, parametros[clave]);
  }

  const respuesta = await fetch(direccion, opciones);
  if (!respuesta.ok) {
    const error = new Error("La API no respondió bien.");
    error.status = respuesta.status;
    throw error;
  }
  return respuesta;
}
```

`opciones` es el segundo argumento de `fetch`: el método (`GET`, `POST` o `DELETE`), las cabeceras y, si hace falta, el cuerpo. Un `GET` no lleva cuerpo. `respuesta.ok` es verdadero cuando el estado HTTP está entre 200 y 299. El estado es el número con el que el servidor resume qué ha pasado. 200 es «aquí está». 404 es «eso que pides no está». 500 es «el servidor ha fallado». Si no es `ok`, la función lanza un error y le pega el estado, para que quien la llama pueda distinguir un 404 de un fallo de verdad.

El volcado de MySQL deja dos filas en `usuarios`: `admin` / Administrador y `jota` / Jose, las dos con la contraseña `dejameya`. Al cargar, `listarUsuarios` pide todas y tienen que salir esas dos, si la API está en marcha.

---

## JSON no guarda un File

En la práctica de IndexedDB, `imagen` era `imagen.files[0]`: un `File`. IndexedDB acepta ese objeto. Esta práctica envía la cuenta con `JSON.stringify`. JSON solo copia texto, números, booleanos, `null`, arrays y objetos planos. Un `File` no entra. Si lo metéis igual, la propiedad sale como `{}`. MySQL, al guardar ese objeto, escribe el texto `[object Object]`.

Por eso el archivo se lee antes de montar la cuenta, con la misma promesa que en la práctica de la imagen Base64:

```javascript
function fileToDataURL(file) {
  return new Promise((resolve, reject) => {
    const lector = new FileReader();
    lector.onload = () => resolve(lector.result);
    lector.onerror = () => reject("Error al leer el archivo");
    lector.readAsDataURL(file);
  });
}
```

`FileReader` lee el archivo en el navegador. `readAsDataURL` termina después, y `onload` entrega el texto `data:image/jpeg;base64,…`. Ese texto es un data URL: el tipo del archivo y los bytes escritos en Base64. Cabe en JSON y cabe en la columna `imagen`, que es un texto largo. Si no elegís archivo, `imagen` es `FOTO_DEFECTO`, la ruta `img/user.png`, que ya es texto.

```javascript
const dataURL = imagen.files[0] ? await fileToDataURL(imagen.files[0]) : FOTO_DEFECTO;

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
  imagen: dataURL,
};

await guardaUsuarioEjercicio(user);
```

La dirección va agrupada en el objeto, como en IndexedDB. En MySQL son cuatro columnas (`calle`, `cp`, `ciudad`, `provincia`). La API las vuelve a agrupar al leer, para que la página siga usando `user.direccion.calle`.

---

## Cuatro peticiones, los mismos nombres

`guardaUsuarioEjercicio` hace `POST /accesoDB/usuarios/grabar`. La cabecera `Content-Type: application/json` dice que el cuerpo es JSON. Si la clave ya existe, la API sustituye la fila, como el `put` de IndexedDB. La respuesta es `{ ok: true }`.

`leeUsuarioEjercicio` hace `GET /accesoDB/usuarios/leer/` y el nombre, pasado por `encodeURIComponent` para que un carácter raro no rompa la URL. Si la API responde 404, el `catch` devuelve `undefined`. El botón Leer escribe entonces «No existe el usuario.» Si el estado es otro, el error se relanza.

`leeUsuariosEjercicio` hace `GET /accesoDB/usuarios/leer` y recibe un array. `borraUsuarioEjercicio` hace `DELETE /accesoDB/usuarios/borrar/` y el nombre. Borrar una clave que no está también responde `{ ok: true }`: el botón, antes, ha leído la cuenta y solo borra si existe.

Si estáis pensando que el 404 de la consola es un fallo del registro de la práctica, es la respuesta prevista a «¿existe este usuario?». El navegador anota el 404 del `fetch` aunque el `catch` lo haya convertido en `undefined`. No veréis `Uncaught` por ese 404.

Al pintar, `img.src` recibe el texto tal cual. Un data URL y una ruta valen los dos. `URL.createObjectURL` se queda en el script por si `imagen` llegara como `File`. Desde esta API llega texto, y esa rama no se usa.

Simular espera sigue guardando a John / `doe`, con la contraseña `dejameya` y la foto por defecto, después de diez segundos. Esa fila también cae en MySQL.

La cuenta que registréis en `registro.html` no sale en esta lista. Ese formulario todavía llama a `guardaUsuarioIDX`. La lista de la práctica llama a `leeUsuariosEjercicio`. Son dos sitios.

---

## Si falla

| Qué veis | Qué revisar |
|----------|-------------|
| La práctica vuelve al login | No hay fila en el almacén `sesion` de la base IndexedDB `accesoDB`. El registro y el login de esta carpeta siguen siendo de IndexedDB |
| La lista no carga y la consola no llega a `localhost:3000` | La API no está en marcha. La página sola, en el puerto 4300, no guarda en MySQL |
| `GET /accesoDB/usuarios/leer` no responde | La ruta es `/usuarios/leer`, no `/leer`. El montaje de la API separa `usuarios` y `sesion` |
| Al guardar una foto, en MySQL pone `[object Object]` | `imagen` se ha enviado como `File`. Tiene que ser el texto de `fileToDataURL`, o `FOTO_DEFECTO` |
| La consola muestra 404 al leer un usuario que no existe | `leeUsuarioEjercicio` lo convierte en `undefined`. El párrafo dice «No existe el usuario.» |
| La cuenta de `registro.html` no sale en la práctica | El registro escribe en IndexedDB. La práctica lee la tabla `usuarios` de MySQL |
| No aparecen `admin` ni `jota` | La base `accesoDB` no se ha cargado con el volcado. Esas dos filas vienen de `mysql-db.sql` |
| Habéis borrado `Usuarios-DB`, `Sesion-DB` o las claves de `localStorage` | Esta práctica no las usa. No forman parte del paso |

---

## Entrega

La entrega es la carpeta `060a1-Usuario-APINodeJS`. Lo que se comprueba es la práctica, con la API en marcha.

- [ ] El título de la portada es `060a1-Usuario-APINodeJS` y la frase de la cabecera sigue siendo «Registro e inicio de sesión con localStorage»
- [ ] El submenú APINodeJS abre «Usuario en la API». En esa página la entrada no tiene `href` y lleva `aria-current="page"`
- [ ] `apiNodeJS.js` usa `http://localhost:3000/accesoDB` y las rutas `/usuarios/grabar`, `/usuarios/leer`, `/usuarios/leer/…` y `/usuarios/borrar/…`
- [ ] Guardar sin archivo manda la ruta `FOTO_DEFECTO`. Guardar con archivo manda un data URL, no un `File`
- [ ] Leer un usuario que no existe muestra «No existe el usuario.» y el 404 no corta la página
- [ ] La lista enseña las filas de MySQL, entre ellas `admin` y `jota` si el volcado está cargado
- [ ] `auth.js` abre una sola base IndexedDB, `accesoDB`, con los almacenes `usuarios` y `sesion`
- [ ] Las claves `usuario`, `usuarios` y `sesion` de `localStorage` siguen como estaban, y también `Usuarios-DB`, `Sesion-DB` y la cuenta `admin`

---

## Siguiente

El registro de la web sigue en IndexedDB. La tabla `usuarios` de MySQL solo la toca esta práctica.
