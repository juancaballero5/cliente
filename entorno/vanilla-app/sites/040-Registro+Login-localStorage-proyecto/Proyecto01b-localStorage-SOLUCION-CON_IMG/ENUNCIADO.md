# Proyecto. Menú completo y cuentas en Storage

Partís del sitio EnClaseM tal como está ahora: ejercicios de DOM, Cookies y Storage, y las páginas de registro, login y gestión de usuarios. La autenticación sigue en cookies (`js/auth.js`). El almacenamiento que vais a reutilizar es el del ejercicio 02 de Storage: una sola clave, con todas las cuentas dentro de un objeto.

El `cardBody` de cada ejercicio se queda como está. El trabajo está en el menú, en las comprobaciones y en sustituir las cookies de la aplicación.

## 1. Menú

El menú está repetido en cada HTML. La referencia del menú completo es `index.html`: DOM (siete ejercicios), Cookies (dos) y Storage (tres), más Registro, Login, el nombre de quien ha entrado, Usuarios y Cerrar sesión.

Revisad el `<nav>` de estas páginas:

- los siete `index.html` de `ejercicios/DOM/`
- los dos de `ejercicios/Cookies/`
- los tres de `ejercicios/Storage/`
- `login.html`, `registro.html` y `usuarios.html`

En cada página tienen que poder abrirse el resto de ejercicios de los tres bloques. El ejercicio en el que ya estáis puede no salir en su propio submenú.

La ruta depende de la carpeta. En la raíz, un ejercicio se enlaza como `./ejercicios/DOM/ejer01/index.html`. Desde un ejercicio, para salir a otra familia se sube dos niveles (`../../Cookies/ejer01/index.html`, `../../Storage/ejer01/index.html`) y para volver a Registro, Login, Usuarios o la portada se sube tres (`../../../usuarios.html`). Abrid cada enlace. El texto del menú y la página que se abre tienen que coincidir.

## 2. Comprobaciones en el ejercicio 02 de Storage

Antes de tocar la aplicación, probad el ejercicio 02 y dejad cerrados los casos que fallen. Las funciones están en `ejercicios/Storage/ejer02/js/localStorage.js`. Los mensajes los muestra `script.js`.

Probad, como mínimo:

- Leer un usuario que no existe.
- Borrar un usuario que no existe.
- Leer o borrar con el campo de usuario vacío.
- Guardar un usuario que ya existe.
- Guardar con usuario o contraseña que no cumplan los patrones que ya tenéis en `script.js`.

En cada caso la página tiene que decir qué ha pasado. No vale un fallo en la consola, ni un mensaje de éxito cuando no se ha borrado o no se ha leído nada.

Al hacerlo, separad dos cosas. La función devuelve el dato: el objeto de la cuenta, o `null` si no está. El párrafo que veis en pantalla lo construye `script.js`. Si la función ya devuelve el HTML, el login no podrá usar esa misma función para comprobar la contraseña.

## 3. La aplicación pasa de cookies a Storage

`js/auth.js` deja de ser la capa de cookies de la aplicación. Ahí viven dos almacenes. Los dos son un objeto. El nombre de cada clave se queda dentro de `auth.js`, en una constante. Quien llama no lo pasa. Así, el registro, el login, el menú y la gestión no saben si detrás hay `localStorage` o, más adelante, IndexedDB.

El de las cuentas se llama `usuarios`. Cada clave es el nombre de una persona y el valor es su ficha (`usuario`, `password`, …):

```text
{
  ana: { usuario, password },
  admin: { usuario, password }
}
```

El de la sesión se llama `usuario`. De momento tiene una sola entrada. La clave fija también se llama `usuario`, y su valor es la ficha entera de quien ha entrado: el nombre y la fecha del login. No es solo el nombre, y no hace falta un booleano del estilo `loggedIn`.

```text
{
  usuario: { usuario: "admin", fecha: "..." }
}
```

Si esa ficha está, hay sesión. Si no está, no hay nadie.

Las cuentas y la sesión no comparten función. Guardar la sesión dentro de la función de las cuentas la mezcla con el listado. Hacen falta dos familias, con el mismo guion: leer el objeto, guardar o borrar una clave, y volver a escribir el objeto.

Para las cuentas:

- guardar una ficha, usando su nombre como clave
- leer una ficha, o `null` si ese nombre no está
- leer el objeto entero, para montar la tabla
- borrar una ficha y devolverla, o `null` si no estaba

Para la sesión:

- guardar la ficha que os pasa el login, en la clave `usuario`
- leer esa ficha, o `null`
- borrar solo esa clave y devolver la ficha, o `null` si no había sesión

Al borrar, no vaciéis el almacén entero. Borráis una clave del objeto y guardáis el resto, igual que al borrar una cuenta. Si en la clave `usuario` solo estuviera el texto del nombre, el `delete` dejaría la fecha colgando. Como el valor es la ficha completa, se van el nombre y la fecha, y cualquier otra clave futura se queda.

La lectura usa el mismo criterio en las dos: si la clave existe, devolvéis el objeto; si no, `null`. Un objeto cuenta como valor. `null` es lo que quien llama comprueba.

Esas funciones solo se definen en `js/auth.js`. El ejercicio 02 tiene las suyas en su carpeta. Si las dos copias se llaman igual y la página carga los dos scripts, gana la que se carga después. Poned a las de la aplicación un nombre que no pise las del ejercicio.

La lista de nombres reservados (`usuario`, `loggedIn`) existía porque la sesión y las cuentas compartían `document.cookie`. Con la sesión en su propio almacén, esa lista ya no hace falta.

Archivos en los que tenéis que cambiar las llamadas:

- `js/registro.js`. Hoy comprueba si la cuenta existe con `getCookie` y la guarda con `setCookie` y una cadena de cookie. Pasad a leer la ficha y a guardar un objeto `{ usuario, password }`. Si el nombre ya está, avisad: guardar otra vez sustituye la ficha anterior.
- `js/login.js`. La contraseña buena es la de la ficha leída, no un texto suelto. Si la cuenta no existe, esa ficha viene vacía y hay que decirlo sin romper. Si entra, montad la ficha de sesión (nombre y fecha) y pasádsla a la función que guarda la sesión. El mensaje de esta página habla de entrar, no de registrarse.
- `js/menu.js`. Al cargar, leéis la ficha de sesión. Si hay objeto, hay sesión: el nombre está en su propiedad `usuario`, y Usuarios solo se muestra cuando ese nombre es `admin`. No hace falta otra variable para decir si hay sesión. Cerrar sesión borra la clave `usuario` del almacén de sesión y vuelve a la portada.
- `js/usuarios.js`. El listado, el alta, la edición y el borrado usan las funciones de las cuentas. Para saber si entra `admin`, leéis la misma ficha de sesión. Si borráis a quien tiene la sesión abierta, cerrad también esa sesión: el menú no puede seguir mostrando a alguien que ya no está.

Probad después estos casos, en la aplicación y no solo en el ejercicio:

- Registrar un usuario que ya existe.
- Entrar con un usuario que no existe, o con la contraseña mal.
- Borrar desde la gestión un usuario que ya no está. La función de borrar devuelve `null` y la página lo dice.
- Pulsar Editar, no guardar, y recargar. La cuenta tiene que seguir ahí. El borrado ocurre al confirmar Borrar, no al preparar la edición.
- Borrar al usuario con el que habéis entrado, o borrar a `admin`. La sesión de esa persona desaparece.
- Cerrar sesión y abrir de nuevo una página de ejercicio: los bloques DOM, Cookies y Storage quedan ocultos, y Registro y Login se ven.
- Entrar como `admin` y abrir Usuarios desde una página de ejercicio, no solo desde la portada. En esa página el menú también tiene que mostrar Storage.

Las cuentas viejas de las cookies no se copian. El almacén empieza vacío: registraos de nuevo y cread un usuario `admin` para entrar en la gestión. Tened en cuenta que el ejercicio 02, si usa la clave `usuarios`, está escribiendo en el mismo `localStorage` que la aplicación.

Cuando más adelante paséis esto a IndexedDB, el registro, el login, el menú y la gestión siguen pasando y recibiendo las mismas fichas. El cambio queda en el cuerpo de las funciones de `auth.js`.

## 4. Extra (no obligatorio). Foto de la cuenta

En el ejercicio 03 hay cuatro formas de guardar una imagen. La que sigue ahí después de recargar es la que convierte el archivo en una cadena con `FileReader` y `readAsDataURL`.

Añadid en el registro (y, si os encaja, en la gestión) un `<input type="file">` que acepte imágenes. Guardad esa cadena dentro de la cuenta de esa persona, no en una clave común para todo el sitio.

Cuando alguien entra, la imagen de la cabecera (ahora `user.png`) pasa a ser la suya. El sitio donde ya se pinta el nombre de la sesión es `js/menu.js`: ahí también podéis cambiar el `src`. Si esa cuenta no tiene foto, dejad el `src` que ya trae el HTML.

Rechazad lo que no sea una imagen y los archivos demasiado grandes. `localStorage` cabe poco (del orden de 5 MB para todo el sitio) y la cadena en Base64 ocupa más que el archivo. Si no cabe, avisad. No dejéis la consola con `QuotaExceededError` como única respuesta.

## Qué se entrega

El sitio funcionando con el menú completo, las comprobaciones del ejercicio 02, el registro, el login, el menú y la gestión leyendo y escribiendo en Storage, y la sesión en su propio almacén, en la clave `usuario`, con la ficha del nombre y la fecha. La foto, si la hacéis, se ve en la cabecera al entrar y no se pierde al recargar.
