# De las cookies a localStorage

Esta página cuenta el camino que habéis seguido en clase. El enunciado pedía el trabajo. Aquí se lee el código que ha quedado: el ejercicio 02 de Storage, `js/auth.js`, el registro, el login, el menú y la gestión de usuarios.

El cambio de almacén arrastra el formulario. Con las cookies bastaban dos datos, el usuario y la contraseña. La ficha del ejercicio 02 tiene cinco: nombre, usuario, contraseña, teléfono y correo. Esos campos hay que pedirlos al registrar, guardarlos en el objeto y volver a usarlos en la página del administrador. El login no los pide: para entrar siguen bastando el usuario y la contraseña. El menú tampoco enseña el nombre real: enseña el usuario de la sesión.

## Lo que hacían las cookies

Al principio cada cuenta era una cookie. El nombre de la cookie era el nombre de usuario y el valor era la contraseña, un texto: `ana=1234`. La sesión eran otras dos cookies, escritas al entrar: `usuario` (quién ha entrado) y `loggedIn=true`.

Esas tres operaciones vivían en `js/auth.js`: leer una cookie, escribirla y borrarla. Siguen en el archivo, comentadas, para que podáis comparar.

El registro preguntaba si ya existía una cookie con ese nombre. Si no, construía la cadena `usuario=contraseña; path=/; ...` y la asignaba a `document.cookie`. El login comparaba el valor de esa cookie con la contraseña escrita. Si coincidían, escribía las dos cookies de sesión y, al cabo de un segundo y medio, iba a la portada. El menú, al arrancar, miraba si `loggedIn` valía `"true"`. Cerrar sesión borraba `usuario` y `loggedIn`, y dejaba la cookie de la cuenta: la persona sigue registrada, solo ha salido.

Todo eso cabía en un único texto, `document.cookie`. Por eso los nombres `usuario` y `loggedIn` estaban reservados. Si alguien se registraba con uno de esos nombres, su contraseña pisaba la cookie de la sesión.

## Por qué el ejercicio 02 cambia el sitio donde se guarda

En `ejercicios/Storage/ejer02` la cuenta ya no es un texto. Es un objeto: nombre, usuario, contraseña, teléfono y correo. Todas las cuentas van juntas en un solo objeto, y ese objeto se guarda en `localStorage` bajo una sola clave, `usuarios`.

```text
usuarios → {
  ana:   { nombre, usuario, password, telefono, email },
  admin: { nombre, usuario, password, telefono, email }
}
```

`localStorage` solo guarda texto. Por eso, al leer, `JSON.parse` convierte el texto en objeto, y al guardar, `JSON.stringify` hace el camino contrario. Si la clave aún no existe, `getItem` devuelve `null` y el `|| {}` deja un objeto vacío para poder añadir la primera cuenta.

La clave de cada ficha es `user.usuario`. Guardar otra vez el mismo nombre sustituye la ficha anterior. Leer devuelve esa ficha, o `undefined` si el nombre no está. Borrar quita solo esa clave del objeto, vuelve a guardar el resto y devuelve la ficha borrada, también `undefined` si no estaba.

El párrafo que veis en el ejercicio no lo montan esas funciones. Lo monta `script.js`, con `Object.values` para recorrer las fichas. Si leéis o borráis un nombre que no existe, el aviso sale en la página, no como un fallo en la consola. Esa separación es la que luego usa el login: necesita la ficha para mirar `.password`, no un párrafo HTML.

## Dos almacenes, el mismo guion

`js/auth.js` copia ese guion para las cuentas de la aplicación. La constante se llama `ALMACEN_USUARIOS` y vale `"usuarios"`. Quien llama no pasa el nombre de la clave: está dentro de `auth.js`. El registro, el login, el menú y la gestión no escriben `localStorage` ellos mismos. Llaman a una función. Cuando más adelante el motor sea IndexedDB, el cambio queda en el cuerpo de esas funciones. Las páginas siguen pasando y recibiendo las mismas fichas.

La sesión no entra en `guardaUsuario`. Si la metierais ahí, el listado de cuentas la trataría como un usuario más. Va en un segundo almacén, `ALMACEN_SESION`, cuyo valor es `"sesion"`. El guion es el mismo: leer el objeto, tocar una clave y volver a guardarlo.

Dentro de ese objeto hay, de momento, una sola clave, y se llama `usuario`. Su valor no es el nombre suelto. Es la ficha entera de quien ha entrado: el nombre y la fecha del login.

```text
sesion → {
  usuario: { usuario: "admin", fecha: "..." }
}
```

`guardaSesion` recibe esa ficha (la monta el login) y la coloca en `sesion['usuario']`. `leeSesion` devuelve esa ficha, o `undefined` si la clave no está. `borraSesion` hace `delete` de `sesion['usuario']` y guarda el objeto que queda.

Si en esa clave solo estuviera el texto `"admin"`, el `delete` quitaría el nombre y la fecha se quedaría al lado. Como el valor es la ficha completa, se van los dos datos de una vez. El almacén `sesion` no se borra entero: se quita una clave y se guarda el resto. Así, más adelante, puede haber otras claves en el mismo objeto.

El booleano `loggedIn` ya no hace falta. Si `leeSesion` devuelve un objeto, hay sesión. Si devuelve `undefined`, no hay nadie. El menú no necesita otra variable para decirlo: el propio objeto basta, porque un objeto cuenta como valor en un `if`.

Las funciones de cookies pueden seguir comentadas en `auth.js`. La aplicación ya no las llama. El ejercicio de cookies tiene las suyas en su carpeta.

## El registro

`registro.html` carga `auth.js` y después `registro.js`. El `submit` se corta con `preventDefault`. Quien actúa es el botón Registrar, con un `click`. Esta página no carga `menu.js`. El menú se queda como está escrito en el HTML: se ve Login, y los bloques privados siguen ocultos aunque ya hubierais entrado en otra pestaña del sitio. Las funciones de `auth.js` sí están disponibles, porque el script va delante.

### Campos nuevos en el HTML

El formulario de las cookies tenía dos inputs, `usuario` y `password`, y un párrafo `mensaje`. Ahora se añaden tres, con los mismos `id` que en el ejercicio 02:

- `nombre`, el nombre real
- `telefono`, opcional, nueve dígitos
- `email`, opcional

El botón sigue siendo `registrar` y el aviso sigue saliendo en `mensaje`. Si el `id` del input y el `getElementById` del script no coinciden, el campo se ve en la página y el script lee `null`.

### Qué hay que armar en `registro.js`

Por cada campo nuevo hace falta la variable del input, leer `.value.trim()` y meter esa propiedad en el objeto que se pasa a `guardaUsuario`. La llamada ya no es una cadena `usuario=contraseña`. Es la ficha entera:

```text
{
  nombre, usuario, password, telefono, email
}
```

La clave del almacén es `usuario`, el nombre de la cuenta. `nombre` es otra propiedad: dos personas pueden llamarse Jose y tener cuentas distintas, `jota` y `admin`.

Los patrones salen del ejercicio 02. Usuario y contraseña se comprueban siempre. Teléfono y correo solo si el campo trae algo. Si van vacíos, la ficha no guarda la cadena vacía: guarda un relleno, `555123456` y `sin@email.com`. Así la propiedad existe cuando el administrador vuelva a abrir esa cuenta. En el ejercicio 02 el relleno es otro (`sin-teléfono`, `sin-email`). Misma clave `usuarios`, textos distintos según dónde se haya creado la cuenta.

Antes de guardar se pregunta a `leeUsuario` si ese nombre de cuenta ya es una clave. Si lo es, se escribe el aviso en `mensaje` y no se llama a `guardaUsuario`.

Las cuentas que quedaron en cookies no pasan solas a `localStorage`. Hay que registrarlas otra vez, también `admin`, con los campos nuevos.

### Avisos en el registro de clase

En `registro.js` la comprobación de «ya está registrado» llama a `leeUsuario(usuario)`. `usuario` ahí es el input, el elemento del DOM, no el texto escrito. La búsqueda no encuentra la cuenta y se puede registrar el mismo nombre dos veces: la segunda pisa a la primera, porque `guardaUsuario` escribe en la misma clave. Lo que hay que pasar es el texto, el que ya está en `usuarioInput`.

Los avisos de patrón escriben en `resultado`. Ese id existe en el ejercicio 02. En el registro el párrafo es `mensaje`. Con un patrón que no encaja, el script se para y el párrafo de la página se queda vacío. El texto del aviso tiene que ir a `mensaje`.

## El login

`login.html` carga `auth.js` y `login.js`. Al enviar el formulario se evita el salto del navegador, se leen usuario y contraseña, y `credencialCorrecta` pide la ficha con `leeUsuario`.

El formulario de login se queda con dos campos. Nombre, teléfono y correo no se piden al entrar: ya están en la ficha de la cuenta. Lo que cambia es la comprobación. `leeUsuario` devuelve el objeto, o `undefined` si el nombre no está. La contraseña se lee en `user.password`. Comparar el valor entero, como se hacía con la cookie, ya no encaja: ese valor ahora es la ficha, no el texto de la contraseña.

Cuando coinciden, el login monta otra ficha, la de sesión, y se la pasa a `guardaSesion`:

```text
{ usuario: "admin", fecha: "..." }
```

Ahí no van el nombre real, el teléfono ni el correo. Van el nombre de la cuenta y la fecha del login. La fecha la pone el login con `new Date().toUTCString()`. `auth.js` no decide la fecha: solo coloca esa ficha en la clave `usuario` del almacén `sesion`. Después el párrafo saluda y, a los 1500 ms, `window.location` lleva a `index.html`. La sesión ya está escrita antes de esperar. Esos mil quinientos milisegundos son solo para poder leer el mensaje.

Igual que el registro, el login no carga `menu.js`. El menú de esta página no se entera de la sesión. La portada sí, porque `index.html` sí carga el menú.

`login.js` todavía trae la lista `usuario` y `loggedIn`, y el aviso habla de registrarse. Esa lista protegía las cookies de sesión cuando todo iba en `document.cookie`. Con dos almacenes, una cuenta puede llamarse así sin pisar la sesión. El aviso, si se mantiene, corresponde al registro, no al login.

## El menú

`menu.js` llama a `leeSesion` en cuanto arranca. Con `defer`, el HTML ya está leído y `auth.js` ya ha definido la función, porque en el `<head>` va delante.

En la versión de cookies el menú preguntaba si `loggedIn` valía `"true"` y leía otra cookie para el nombre. Esas dos lecturas se sustituyen por la ficha que devuelve `leeSesion`. No hace falta una segunda función para saber si hay sesión.

Si llega un objeto, se recorren los enlaces con clase `enlacePrivado` y se les quita el `display: none`. Los de clase `enlacePublico` (Registro y Login) se ocultan. El texto de `#nombreUsuario` es `sesion.usuario`, el nombre de la cuenta. El nombre real, `nombre`, está en el otro almacén y el menú no lo consulta. El enlace Usuarios solo se muestra si ese nombre de cuenta es exactamente `admin`. `admin` no es un campo de rol: es una cuenta más, creada en el registro con los cinco campos.

Si `leeSesion` no devuelve objeto, se hace al revés: privados ocultos, públicos visibles. El enlace Usuarios se queda como lo dejó el HTML, oculto.

Cerrar sesión escucha el clic en `#cerrarSesion`. `preventDefault` evita el salto de `href="#"`. Antes se borraban las cookies `usuario` y `loggedIn`. Ahora `borraSesion` no recibe argumentos: quita la clave `usuario` del almacén de sesión. La cuenta, en el otro almacén, sigue ahí. Luego se va a la portada con la constante `HOME`, que apunta a la raíz del sitio en el servidor. Da igual que pulséis Cerrar sesión dentro de un ejercicio: una ruta relativa `index.html` escrita en esa carpeta buscaría el `index.html` del propio ejercicio.

En el código de clase `HOME` vale `/EnClaseM-solucion/`. Tiene que coincidir con la carpeta con la que nginx sirve el sitio. Si la carpeta es otra, el cierre de sesión sale del sitio.

## La gestión

`usuarios.html` carga tres scripts, en este orden: `auth.js`, `menu.js` y `usuarios.js`. El menú se ajusta primero. Después `esAdmin` vuelve a leer la ficha de sesión. Hace falta que exista y que `sesion.usuario` sea `"admin"`. Si no, `window.location` manda a `login.html`. El HTML ya ha llegado al navegador: la comprobación ocurre al ejecutar el script, no en el servidor. Quien escribe la URL a mano recibe el archivo, y es este `if` quien le saca de la página.

Con las cookies, el listado recorría `document.cookie` y se saltaba las claves `usuario` y `loggedIn`. Ahora el listado sale de `leeUsuarios`. Ese objeto solo tiene cuentas. `Object.values` saca las fichas.

### El mismo formulario que el registro

La página del administrador tiene el mismo formulario: `nombre`, `usuario`, `password`, `telefono`, `email`, el botón `registrar` y el párrafo `mensaje`. El alta del administrador construye el mismo objeto y llama a `guardaUsuario`. Si aquí se guardan solo usuario y contraseña, la cuenta entra en el almacén sin nombre, teléfono ni correo. Al editarla, esos inputs salen vacíos.

Las comprobaciones son las mismas que en `registro.js`: patrones, relleno si teléfono o correo van vacíos, y `leeUsuario` antes de guardar. Hay que mantener las dos copias a la par. Un patrón nuevo en una página y el viejo en la otra deja pasar en un sitio lo que el otro rechaza.

En `usuarios.js` se repite el fallo del registro. `leeUsuario(usuario)` recibe el input, no el texto, y los avisos de patrón escriben en `resultado`, que en esta página tampoco existe. El alta correcta usa `usuarioInput` y `mensaje`. Después de `guardaUsuario` se vuelve a pintar la tabla. El aviso de alta, en el código de clase, interpola otra vez el input `usuario` en vez del texto guardado.

### La tabla

La ficha tiene cinco propiedades. La tabla de clase sigue con tres columnas: Usuario, Contraseña y Acciones. Nombre, teléfono y correo se guardan y no se ven en el listado. Se ven al pulsar Editar, porque el botón copia `user.nombre`, `user.telefono` y `user.email` a los inputs.

Si queréis verlos en el listado, el cambio va en dos sitios a la vez. En `usuarios.html`, una columna `<th>` por campo. En `pintarTabla`, un `<td>` con `textContent` de esa propiedad. Si añadís la columna en el HTML y no la celda en el script, la cabecera y las filas no coinciden.

### Editar y borrar

Editar rellena los cinco campos con la ficha de esa fila. En el código de clase, a continuación llama a `borraUsuario` y pinta la tabla. La fila desaparece en ese clic, antes de pulsar Registrar. Así, al guardar, el nombre ya no está y no salta el aviso de «ya está registrado». Si salís de la página sin volver a registrar, la cuenta no está. Borrar sí llama a `borraUsuario` en el momento en que se confirma: quita esa clave, deja el resto de cuentas y pinta la tabla.

`borraUsuario` devuelve la ficha borrada, o `undefined` si el nombre no estaba. El ejercicio 02 usa ese valor para avisar. En la gestión de clase el botón Borrar no mira el valor: la fila que pulsáis acaba de pintarse desde el almacén, así que la clave está. Si más adelante el borrado puede fallar, el aviso sale de ese `undefined`, igual que en el ejercicio.

## El mismo localStorage para el ejercicio y la aplicación

El ejercicio 02 y la aplicación usan la clave `usuarios` en el mismo origen. Lo que guardáis en el ejercicio aparece en el registro, y al revés. No son dos bases de datos.

Además, la página del ejercicio carga `auth.js` y, después, su `localStorage.js`. Las dos definen `guardaUsuario`, `leeUsuario`, `leeUsuarios` y `borraUsuario`. En un script normal, la función que se carga la última es la que queda. En esa página mandan las del ejercicio. `leeSesion`, `guardaSesion` y `borraSesion` solo están en `auth.js`, así que el menú de esa página sigue usando la sesión de la aplicación.
