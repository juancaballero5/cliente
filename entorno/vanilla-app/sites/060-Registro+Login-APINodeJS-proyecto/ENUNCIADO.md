# Proyecto. De IndexedDB a la API de Node

Partís de la carpeta `PartiendoDe...`. Es el sitio de `060a1-Usuario-APINodeJS`. El registro, el login, el menú, la página de usuarios y las rutas siguen con IndexedDB. La API de Node ya la tenéis escrita en `ejercicios/APINodeJS/ejer01/js/apiNodeJS.js`: guardar, leer uno, leer todos y borrar, contra `http://localhost:3000/accesoDB`.

En `050b`–`050f` pasasteis la aplicación de `localStorage` a IndexedDB. Aquí el camino es el mismo, en el mismo orden, y el almacén nuevo es esa API. No rehacéis los formularios, los patrones, el HTML del menú, `prepararMenu` ni `rutas.js`. Cambiáis quién guarda y quién lee.

El servidor tiene que estar en marcha. Si no responde, cualquier operación falla antes de llegar a vuestra comprobación. Las cuentas que ya están en IndexedDB no se copian. La API empieza vacía: os registráis de nuevo y creáis un usuario `admin` para entrar en la gestión. No borréis las bases de IndexedDB ni las claves `usuarios` y `sesion` de `localStorage`.

La práctica y la aplicación llaman al mismo servidor. Un usuario guardado en el ejercicio 01 es un usuario de la web, y al revés. No hay dos bases, como en IndexedDB.

## 1. Las dos APIs conviven en `auth.js`

Copiad en `js/auth.js` las funciones del ejercicio 01. Dejad debajo las de IndexedDB: el login y el menú las siguen usando hasta que les toque cambiar.

Cambiad el nombre de cada función. Las del ejercicio se llaman `guardaUsuarioEjercicio`, `leeUsuarioEjercicio`, `leeUsuariosEjercicio` y `borraUsuarioEjercicio`. Si la aplicación usa esos mismos nombres, la página que carga los dos scripts se queda con una sola copia, la del archivo que llega el último.

Guardar envía JSON. La cabecera lleva `Content-Type: application/json` y el cuerpo es `JSON.stringify` de la ficha. Leer y borrar son GET y DELETE: la cabecera va vacía y no llevan cuerpo. El nombre, cuando hace falta, va en la dirección.

Si el nombre no existe, el servidor responde 404. Eso no es un fallo de la red. La función de leer devuelve `undefined`, igual que `get` de IndexedDB cuando la clave no está. Si ese 404 se queda como error, el registro no puede distinguir «no existe» de «la API se ha caído». En la consola veréis `GET http://localhost:3000/accesoDB/usuarios/leer/... 404`. Con un nombre nuevo, es la respuesta esperada.

## 2. El registro escribe en la API

`js/registro.js` deja de llamar a las funciones de IndexedDB. Llama a las nuevas.

Esas funciones devuelven una promesa. El `submit` tiene que ser `async` y usar `await`. Si no esperáis, la promesa cuenta como verdadera: cualquier nombre parece ya registrado. El texto con el que buscáis y el texto del mensaje tienen que ser la misma lectura.

La foto deja de ser el archivo. `JSON.stringify` no manda un `File`. Volved a `fileToDataURL`, como en el ejercicio 01: si habéis elegido una imagen, la ficha guarda el texto `data:`; si no, `FOTO_DEFECTO`, la ruta de `img/user.png`.

Al terminar este paso, un usuario nuevo está en el servidor. El login sigue leyendo IndexedDB, así que con esa cuenta todavía no se entra. Es lo mismo que os pasó en `050b`, cuando el login seguía mirando `localStorage`.

## 3. El login guarda la sesión en la API

`js/login.js` comprueba la contraseña con la lectura de las cuentas. `credencialCorrecta` sigue siendo `async`. Sin `await` sobre esa llamada, una contraseña mala también entra.

El ejercicio 01 no tiene sesión. Hace falta la misma familia, con `sesion` en lugar de `usuarios`:

- guardar la ficha entera, con POST y el JSON
- leer la ficha que haya ahora, con GET y sin el nombre en la dirección
- borrar, con DELETE y el nombre, cuando ya lo conocéis

Si no hay sesión, leer responde 404 y la función devuelve `undefined`.

Si la contraseña coincide, guardad la ficha entera. El menú, en este paso, sigue con `leeSesionIDX`. Después de entrar, la barra no cambia. La sesión sí está en el servidor. No la busquéis en IndexedDB.

## 4. El menú lee la sesión de la API

`prepararMenu` ya espera la lectura y ya pinta la barra. No lo reescribáis. Cambiad la función: en vez de `leeSesionIDX`, la lectura de sesión de la API. Cerrar sesión borra en el servidor, con `sesion.usuario`, dentro de la función y después del `await`.

La foto vuelve a ser un texto, la ruta o el `data:`. Ese texto vale como `src`.

`PORTADA`, `LOGIN`, `FOTO_DEFECTO`, `sesion` y `esAdmin` se quedan como están. `rutas.js` ya espera la promesa del menú. Si lo rehacéis y miráis `sesion` antes de esa espera, una práctica salta a Login aunque el servidor tenga la sesión.

## 5. Usuarios

`js/usuarios.js` pasa a las funciones de la API. La lectura de todos devuelve la lista que manda el servidor. Recorred esa lista. No la tratéis como el objeto de `localStorage`.

La validación del alta y de Grabar es `async`. Hay que esperarla. Si no, la promesa cuenta como verdadero y Grabar no llega a guardar. Al comprobar si el nombre ya existe, buscad el texto que acabáis de leer, no el campo del formulario: en Grabar ese campo puede estar vacío. Un 404 en esa lectura significa que el nombre está libre.

La imagen nueva vuelve a pasar por `fileToDataURL`. Sin archivo nuevo, se queda la que ya tenía la ficha. En la tabla, el `img` ya tiene nombre. El valor de la foto usa otro. Si es texto, ese texto es el `src`.

No dejéis editar ni borrar la cuenta que tiene la sesión abierta. El aviso tiene que decir ese nombre de usuario, el de la ficha, no el del input.

Con `admin` en la sesión del servidor, `usuarios.html` se queda. Con otra cuenta, vuelve a la portada. Sin sesión, vuelve a Login.

## 6. Recorred las tres llegadas

`rutas.js` ya decide. Este paso no añade otra guarda. Comprobad las tres:

- Sin sesión en el servidor, una práctica pasa a `login.html` de esta carpeta. La portada, el registro y el login se quedan.
- Con una cuenta que no es `admin`, la práctica se queda y `usuarios.html` vuelve a la portada. El menú no enseña Usuarios.
- Con la cuenta `admin`, `usuarios.html` se queda y el menú enseña Usuarios.

La redirección es `location.replace`. Atrás no devuelve a la página que debía cerrarse. Una fila de `Sesion-DB` en IndexedDB no abre la práctica.

## Qué se entrega

El sitio de esta carpeta, con el registro, el login, el menú, la gestión y las rutas leyendo y escribiendo en `http://localhost:3000/accesoDB`. Las funciones del ejercicio 01 siguen en su archivo, con sus nombres, y las de la aplicación en `js/auth.js`, con otros nombres.

- [ ] Con el servidor parado, la página lo dice. Con el servidor en marcha, registrar un usuario nuevo lo deja en la API
- [ ] Sin archivo, `imagen` es la ruta de `user.png`. Con archivo, es un texto `data:`
- [ ] Un segundo registro del mismo nombre avisa y no sustituye la ficha. El 404 de un nombre nuevo no corta el registro
- [ ] Una contraseña mala no escribe la sesión. Una buena deja la ficha en la sesión del servidor
- [ ] Al entrar, el menú enseña el nombre, la foto y Cerrar sesión. Registro y Login no se ven
- [ ] Cerrar sesión quita esa sesión y el menú vuelve a mostrar Registro y Login
- [ ] Con `admin`, la página de usuarios se queda, lista las cuentas y no deja editar ni borrar esa sesión
- [ ] Con otra cuenta, `usuarios.html` vuelve a la portada. Sin sesión, una práctica vuelve a Login
- [ ] Guardar en el ejercicio 01 y registrar en la web escriben en el mismo servidor
