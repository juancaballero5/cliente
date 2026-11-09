# 030e — Alta, listado, edición y borrado de usuarios

Partís de la carpeta `030d-Sesion-auth+menu`. El registro, el login y la barra de sesión se quedan. Con la sesión abierta ya veíais los ejercicios, el nombre y Cerrar sesión. Este paso añade una página para las cuentas y un enlace, Usuarios, que solo aparece si habéis entrado como `admin`.

`auth.js`, `registro.js` y `login.js` no cambian. El nombre `admin` no está reservado. El reservado sigue siendo `usuario`, el de la cookie de sesión. A `admin` lo dais de alta en el registro, como a cualquier otra cuenta, y luego entráis con él.

## El enlace Usuarios

En la portada, en registro, en login, en `usuarios.html` y en las siete prácticas DOM, entre el nombre y Cerrar sesión, añadís este `li`:

```html
<li id="gestionUsuarios" class="enlaceAdmin" style="display: none;"><a href="./usuarios.html">Usuarios</a></li>
```

En una práctica DOM el `href` es `../../../usuarios.html`, porque la página está tres carpetas más abajo. En `usuarios.html` el enlace no lleva `href` y sí `aria-current="page"`, igual que la práctica abierta del menú DOM. Así no se vuelve a pulsar.

Ese `li` no lleva la clase `enlacePrivado`. Esa clase la enseña el menú a cualquiera que tenga sesión. Usuarios no va con cualquiera: solo con `admin`. Por eso tiene su propia clase, `enlaceAdmin`, y nace con `display: none` en la etiqueta. El primer pintado no lo enseña.

En la portada de `030d` el `id="nombreUsuario"` estaba en el `li` y el nombre dejaba de ser un enlace. En esta carpeta la portada ya lo lleva en el `<a>`, como registro, login y las prácticas DOM. Al copiar el menú, dejadlo ahí.

Las dos prácticas de Cookies no cambian. No cargan `menu.js` y no tienen el enlace Usuarios.

En `menu.js`, debajo de `leeSesion`, calculáis si la sesión es la de admin. `sesion.valor` es el nombre, no la contraseña. La comparación del archivo es `==`.

```javascript
const esAdmin = sesion ? sesion.valor == "admin" : false;
const gestionUsuarios = document.getElementById("gestionUsuarios");
```

Si no hay sesión, `sesion` es `null` y `esAdmin` queda en `false`. El operador `?` evita leer `.valor` de `null`. Sin ese operador, la portada sin sesión se para en la consola y la barra no termina de pintarse.

Dentro del `if (sesion)`, después de escribir el nombre, una línea decide el enlace:

```javascript
gestionUsuarios.style.display = esAdmin ? "" : "none";
```

La cadena vacía quita el `none` de la etiqueta y el enlace se ve. `"none"` lo deja oculto. Un usuario como `ana` tiene sesión, ve DOM y Cookies, y no ve Usuarios. `admin` sí lo ve.

El `else`, el de sin sesión, no toca `gestionUsuarios`. Se queda con el `none` del HTML.

## La página de usuarios

`usuarios.html` es una tarjeta con el mismo formulario que el registro: `formRegistro`, campos `usuario` y `password`, botón `type="submit"` con el texto Registrar, y el párrafo `mensaje`. Debajo, otra tarjeta con la tabla `tablaUsuarios`. Las columnas son Usuario, Contraseña y Acciones. El `tbody` empieza vacío. El título de la primera tarjeta es «Formulario de registro». La tagline de la página es «Alta, listado, edición y borrado de usuarios».

La hoja de la tarjeta, `ejercicios/css/styles.css`, gana al final las reglas de `#tablaUsuarios`: borde, relleno y `border-collapse: collapse`. La hoja de la raíz del paso no cambia. `usuarios.html` carga las dos hojas, la de la raíz y la de la tarjeta.

Los scripts, en este orden: `auth.js`, `usuarios.js`, `menu.js`. `usuarios.js` llama a `leeUsuarios` y a `borraUsuario`, que viven en `auth.js`. Por eso `auth.js` va delante.

## El alta y el listado

Al cargar, `usuarios.js` llama a `listarUsuarios()`. El submit es el del registro. Si el alta llega hasta `guardaUsuario`, el mensaje dice `Usuario "ana" registrado correctamente.` y volvéis a listar. Sin esa segunda llamada, el mensaje anuncia el alta y la tabla sigue igual hasta que recargáis.

```javascript
guardaUsuario(dato, "");
mensaje.textContent = `Usuario "${usuario}" registrado correctamente.`;
listarUsuarios();
```

`listarUsuarios` pide todas las cookies y se queda con las que no tienen la clave `usuario`. Esa clave es la sesión, `usuario=admin`. No es una cuenta. Si no la filtráis, la tabla pinta una fila `usuario` con el nombre de quien ha entrado.

```javascript
function listarUsuarios() {
  const usuarios = leeUsuarios().filter(usuario => usuario.clave !== "usuario");
  tbody.textContent = "";
  // ...
}
```

`tbody.textContent = ""` vacía la tabla antes de pintarla. Si solo añadís filas, el alta siguiente repite las que ya estaban.

Si el filtro deja el array vacío, creáis una fila con una celda, `colSpan = 3`, y el texto `No hay usuarios registrados.`

Si hay cuentas, cada una es una fila. La primera celda es `usuario.clave`. La segunda es `usuario.valor`, la contraseña, en texto claro. El campo del formulario es `type="password"` y la tapa mientras escribís. La tabla no la tapa: enseña el valor.

La tercera celda lleva dos botones, `type="button"`, con los textos Editar y Borrar. Entre los dos hay un nodo de texto con un espacio, para que no queden pegados. Editar llama a `editarUsuario(usuario)`. Borrar llama a `borrarUsuario(usuario)`. El argumento es el objeto `{ clave, valor }` de esa fila, no el nombre suelto.

`borrarUsuario`, con o, es la función de esta página. `borraUsuario`, sin o, es la de `auth.js` y borra la cookie. Si al botón le pasáis `borraUsuario(usuario)`, la clave que se borra es el objeto convertido a texto, `[object Object]`, y la cuenta sigue en la tabla.

## Editar

Si la fila es la de quien tiene la sesión, no se edita. El mensaje usa `innerHTML` porque lleva un `<br>`. El párrafo se parte en dos líneas. Con `textContent` veríais los caracteres `<br>` en la misma línea. Al segundo y medio el párrafo se vacía.

```javascript
if (usuario.clave == sesion.valor) {
  mensaje.innerHTML = `El usuario: "${usuario.clave}" tiene la sesión abierta.<br>No se puede editar`;
  setTimeout(() => {
    mensaje.textContent = "";
  }, 1500);
  return;
}
```

`sesion` no se declara en `usuarios.js`. La declara `menu.js`. Los dos scripts comparten ese nombre. El clic llega después de que `menu.js` haya corrido, así que `sesion` ya existe. Si en `usuarios.js` ponéis otro `const sesion`, la consola dice que `sesion` ya está declarada y ni el listado ni el menú terminan.

Si la fila es de otra cuenta, el `else` copia la clave y la contraseña a los campos y, a continuación, borra esa cuenta.

```javascript
document.getElementById("usuario").value = usuario.clave;
document.getElementById("password").value = usuario.valor;
borrarUsuario(usuario);
listarUsuarios();
```

El valor va en `.value`. Si asignáis el texto al `getElementById` entero, el campo no cambia.

Si estáis pensando que Editar solo rellena el formulario, el `else` también borra la cookie. La fila desaparece antes de pulsar Registrar. Si salís de la página sin registrar, esa cuenta ya no está. El botón sigue diciendo Registrar. No hay otro botón de guardar. Al enviar, el alta de siempre vuelve a crear la cookie. Si en el campo cambiáis el nombre, creáis otra cuenta: la anterior ya se borró al pulsar Editar.

`borrarUsuario` ya vuelve a pintar la tabla, y `editarUsuario` la pinta otra vez. El segundo pintado deja las mismas filas.

## Borrar

Borrar no pide confirmación. Si la fila es la de la sesión, el mensaje es el mismo esquema, con `No se puede borrar`, y la cuenta sigue. Si es otra, `borraUsuario(usuario.clave)` escribe `ana=; max-age=0; path=/` y `listarUsuarios()` quita la fila. La cookie de sesión no se toca.

Ese camino no escribe un mensaje de éxito. Si el párrafo todavía tenía el texto del alta, se queda ahí. La fila sí desaparece.

Ocultar el enlace no cierra la dirección. Con la sesión de `ana`, si escribís a mano `usuarios.html`, la página se abre. Usuarios no sale en la barra. El formulario y la tabla sí, y desde ahí se puede borrar otra cuenta, también la de `admin`.

Sin la cookie `usuario`, la página también se abre. El listado se pinta, porque `listarUsuarios` no mira `sesion`. Editar y Borrar sí la miran. `sesion` es `null`, y la consola muestra `TypeError: Cannot read properties of null (reading 'valor')`. La fila no cambia.

## Si falla

Si `admin` no ve Usuarios, la sesión no vale `admin`. Entráis con la cuenta cuyo nombre es exactamente `admin`. `Admin` no cumple el `==`.

Si la portada sin sesión se queda a medias y la consola lee `.valor` de `null`, `esAdmin` usa `sesion.valor` sin el `?`.

Si cualquier sesión ve Usuarios, el `li` lleva `enlacePrivado` o la línea del `display` no distingue `esAdmin`.

Si el alta dice que ha ido bien y la tabla no cambia, falta el `listarUsuarios()` de después de `guardaUsuario`.

Si en la tabla sale una fila `usuario`, el filtro no está quitando la cookie de sesión.

Si Editar no rellena el campo, habéis asignado el texto al elemento y no a `.value`.

Si al pulsar Borrar la consola habla de `sesion` ya declarada, `usuarios.js` y `menu.js` tienen los dos el `const`.

Si Borrar no quita la cuenta y la clave que intentáis borrar es `[object Object]`, el botón llama a `borraUsuario` con el objeto. La función de la página es `borrarUsuario`, y esa pasa `usuario.clave` a `borraUsuario`.

## Entrega

Registrad `ana` con `daw` y `admin` con `1234`. Entrad como `ana`. La portada enseña el nombre `ana` en el enlace, DOM y Cookies. Usuarios no se ve.

Cerrad la sesión y entrad como `admin`. Usuarios sí se ve. Abridlo. La tabla tiene dos filas, `ana daw` y `admin 1234`. No hay fila `usuario`. `document.cookie` contiene `ana=daw`, `admin=1234` y `usuario=admin`.

Editar en la fila de `admin` escribe `El usuario: "admin" tiene la sesión abierta.` y, en la línea de abajo, `No se puede editar`. La cuenta sigue. Borrar en esa misma fila hace lo mismo con `No se puede borrar`.

Editar en la fila de `ana` deja el formulario con `ana` y `daw`, y la fila desaparece. `ana=daw` ya no está en `document.cookie`. Cambiad la contraseña, pulsad Registrar y la fila vuelve con la contraseña nueva.

Borrar en una fila que no sea la vuestra la quita sin pedir confirmación.

Entrad como `ana` y escribid la dirección de `usuarios.html`. La página se abre, el enlace Usuarios no está en la barra, y la tabla sí.
