# Proyecto. De localStorage a IndexedDB

Partís de la carpeta `PartiendoDe...`. Es el sitio de `050a2-Usuario-APIweb`. El registro, el login, el menú, la página de usuarios y las rutas siguen con `localStorage`. La API de IndexedDB ya la tenéis escrita en `ejercicios/IndexedDB/ejer02/js/indexedDB.js`: abrir, guardar, leer uno, leer todos y borrar.

En `040b`–`040f` pasasteis la aplicación de cookies a `localStorage`. Aquí el camino es el mismo, en el mismo orden, y el almacén nuevo es IndexedDB. No rehacéis los formularios, los patrones, el HTML del menú ni las páginas. Cambiáis quién guarda y quién lee.

Las cuentas que ya están en las claves `usuarios` y `sesion` de `localStorage` no se copian. IndexedDB empieza vacío: os registráis de nuevo y creáis un usuario `admin` para entrar en la gestión. No borréis esas claves ni la cuenta `admin` de `localStorage`.

La base del ejercicio se llama `050a2-Usuario-APIweb-DB`. La de la aplicación es otra. Si usáis la del ejercicio, el listado de la práctica y el registro de la web se pisan.

## 1. Las dos APIs conviven en `auth.js`

Copiad en `js/auth.js` las funciones del ejercicio 02. Dejad debajo las de `localStorage`: el login y el menú las siguen usando hasta que les toque cambiar.

Cambiad el nombre de la base, el del almacén y el de cada función. Las del ejercicio se llaman `guardaUsuarioEjercicio`, `leeUsuarioEjercicio`, `leeUsuariosEjercicio` y `borraUsuarioEjercicio`. Si la aplicación usa esos mismos nombres, la página que carga los dos scripts se queda con una sola copia, la del archivo que llega el último.

La base de las cuentas y la de la sesión van aparte. En las dos, el almacén se crea con `keyPath: "usuario"`: la clave de cada fila es el valor del campo `usuario` de la ficha, no una propiedad fija que se llame `usuario` y contenga la ficha. Eso es lo que hacía `sesion['usuario']` en `localStorage`.

Cada función abre, opera y cierra cuando la transacción ha terminado. Cerrar justo después de `put` o de `get` corta la operación. Las cuatro devuelven una promesa.

## 2. El registro escribe en IndexedDB

`js/registro.js` deja de llamar a `leeUsuarioStorage` y a `guardaUsuarioStorage`. Llama a las funciones nuevas.

Esas funciones devuelven una promesa. El `submit` tiene que ser `async` y usar `await`. Si no esperáis, la promesa cuenta como verdadera: cualquier nombre parece ya registrado, aunque la base esté vacía. El texto con el que buscáis y el texto del mensaje tienen que ser la misma lectura. El `await` suelta el turno y el navegador puede rellenar el campo mientras tanto.

La foto deja de pasar por `FileReader`. IndexedDB guarda el archivo. Si no habéis elegido ninguno, guardad `FOTO_DEFECTO`, la ruta de `img/user.png`.

Al terminar este paso, un usuario nuevo está en IndexedDB. El login sigue leyendo `localStorage`, así que con esa cuenta todavía no se entra. Es lo mismo que os pasó en `040b`, cuando el login seguía mirando la cookie.

## 3. El login guarda la sesión en su base

`js/login.js` comprueba la contraseña en la base de las cuentas. `credencialCorrecta` pasa a ser `async`. Sin `await`, una contraseña mala también entra.

Si la contraseña coincide, guardad la ficha entera en la base de la sesión. La clave de esa fila es el campo `usuario` de la ficha.

El menú, en este paso, sigue con `leeSesionStorage`. Después de entrar, la barra no cambia. La fila sí está en la base de la sesión. Comprobadlo en IndexedDB, origen `http://localhost:4300`.

## 4. El menú lee la sesión de IndexedDB

`leeSesionStorage` no necesita argumento: la propiedad se llama siempre `usuario`. Aquí el menú todavía no conoce el nombre, así que no puede hacer `get` con esa clave. `get` sin clave lanza `DataError`. Pedid todas las filas y quedaos con la primera. Si no hay ninguna, no hay sesión.

La lectura devuelve una promesa. Un script no puede hacer `await` en la primera línea: la lectura y el pintado van dentro de una función `async`.

`PORTADA`, `LOGIN` y `FOTO_DEFECTO` se quedan fuera de esa función. `login.js` usa `PORTADA`, y `document.currentScript` solo vale mientras se está cargando `menu.js`. `sesion` y `esAdmin` también se quedan fuera, como `let`, para que `rutas.js` y `usuarios.js` vean las mismas variables.

La foto puede ser un texto o un archivo. Si es texto, ese texto vale como `src`. Si es un archivo, `URL.createObjectURL` prepara la dirección. Poner el archivo directamente en `src` pide `[object File]` y la respuesta es 404.

Cerrar sesión borra la fila cuya clave es `sesion.usuario`, cuando la cuenta ya está leída. El clic va dentro de la función, después del `await`.

En la portada el menú ya puede cambiar. Una práctica sigue saltando a Login: `rutas.js` mira `sesion` antes de que la lectura haya terminado.

## 5. Usuarios, y la ruta espera al menú

`js/usuarios.js` pasa a las funciones de IndexedDB. `leeUsuarios` de `localStorage` devolvía un objeto. La lectura de IndexedDB devuelve un array: no hace falta `Object.values`.

La validación del alta y de Grabar llama a una función `async`. Hay que esperarla. Si no, la promesa cuenta como verdadero y Grabar no llega a guardar. Al comprobar si el nombre ya existe, buscad el texto que acabáis de leer, no el campo del formulario: en Grabar ese campo puede estar vacío.

En la tabla, el `img` ya se llama de una forma. El valor de la foto tiene que usar otro nombre. Si no es un texto, otra vez `URL.createObjectURL`.

No dejéis editar ni borrar la cuenta que tiene la sesión abierta. El aviso tiene que decir ese nombre de usuario, el de la ficha, no el del input.

`js/rutas.js` no puede decidir en la primera línea. Esperad la promesa que ya arrancó el menú. No volváis a llamar a la función del menú: se pintaría dos veces y Cerrar sesión quedaría enganchado dos veces. Seguid con `async` y `await`.

Con `admin` en la base de la sesión, `usuarios.html` se queda. Con otra cuenta, vuelve a la portada. Sin fila, vuelve a Login.

## 6. Recorred las tres llegadas

`rutas.js` ya decide. Este paso no añade otra guarda. Comprobad las tres:

- Sin fila de sesión, una práctica pasa a `login.html` de esta carpeta. La portada, el registro y el login se quedan.
- Con una cuenta que no es `admin`, la práctica se queda y `usuarios.html` vuelve a la portada. El menú no enseña Usuarios.
- Con la cuenta `admin`, `usuarios.html` se queda y el menú enseña Usuarios.

La redirección es `location.replace`. Atrás no devuelve a la página que debía cerrarse. La clave `sesion` de `localStorage` no abre la práctica.

## Qué se entrega

El sitio de esta carpeta, con el registro, el login, el menú, la gestión y las rutas leyendo y escribiendo en IndexedDB. Las funciones del ejercicio 02 siguen en su archivo, con sus nombres, y las de la aplicación en `js/auth.js`, con otros nombres y otra base.

- [ ] Registrar un usuario nuevo crea la fila en la base de las cuentas. Sin archivo, `imagen` es la ruta de `user.png`. Con archivo, es el archivo
- [ ] Un segundo registro del mismo nombre avisa y no sustituye la ficha
- [ ] Una contraseña mala no escribe la sesión. Una buena deja la ficha en la base de la sesión, con el nombre de usuario como clave
- [ ] Al entrar, el menú enseña el nombre, la foto y Cerrar sesión. Registro y Login no se ven
- [ ] Cerrar sesión quita esa fila y el menú vuelve a mostrar Registro y Login
- [ ] Con `admin`, la página de usuarios se queda, lista las filas y no deja editar ni borrar esa sesión
- [ ] Con otra cuenta, `usuarios.html` vuelve a la portada. Sin sesión, una práctica vuelve a Login
- [ ] En el ejercicio 02, guardar sigue escribiendo en `050a2-Usuario-APIweb-DB`, no en la base de la aplicación
