# 030d — El menú según la cookie de sesión

Partís de la carpeta `030c-Formulario-auth+login`. El formulario de registro y el de login siguen. Al entrar, el login ya guardaba la cookie `usuario=ana` y os dejaba en la portada. Esa portada no leía la cookie, así que el menú era el mismo con sesión y sin ella.

Este paso lee esa cookie y enseña una barra u otra.

## La barra, antes de que corra el script

En la portada, en `registro.html`, en `login.html` y en las siete prácticas de DOM, DOM y Cookies, el nombre y Cerrar sesión llevan la clase `enlacePrivado` y, en la propia etiqueta, `style="display: none"`. Registro y Login llevan la clase `enlacePublico`.

El `none` va en el HTML para que el primer pintado no enseñe los ejercicios. Si el oculto lo dejáis solo para el script, se ve un instante el menú privado y luego desaparece.

La clase `derecha` sigue empujando un elemento al borde derecho, como en el registro. Sin sesión está en Registro, y Login queda a su lado. Con sesión está en el nombre, y Cerrar sesión queda a su lado.

En registro, en login y en las prácticas DOM el `li` del nombre tiene `id="usuarioSesion"`. El enlace de dentro tiene `id="nombreUsuario"` y el `href` es `#`. En la portada de esta carpeta el `id="nombreUsuario"` está en el propio `li`, y el enlace de dentro no tiene id.

`menu.js` escribe el nombre en el nodo que tenga ese id. En la portada ese nodo es el `li`: el enlace vacío desaparece y el nombre queda como texto del `li`. En las otras páginas el nodo es el enlace, y el nombre sigue siendo un enlace.

Las dos prácticas de Cookies no cambian. No cargan `menu.js`. Su barra sigue enseñando DOM y Cookies, con la cookie `usuario` y sin ella.

## Qué script carga cada página

La portada carga `auth.js` y, detrás, `menu.js`.

El registro carga `auth.js`, `registro.js` y `menu.js`. El login carga `auth.js`, `login.js` y `menu.js`. Cada práctica DOM carga el script del ejercicio, luego `auth.js` y luego `menu.js`.

`auth.js` va delante de `menu.js` porque el menú llama a `leeSesion` y a `borraSesion`. Esas funciones viven en `auth.js`. Si invertís el orden, la consola dice que `leeSesion` no existe y la barra se queda como la dejó el HTML: solo Registro y Login.

`login.js` ya no declara `PORTADA`. La declara `menu.js`. Los dos son scripts clásicos y comparten los nombres de la raíz. Si dejáis dentro de `login.js` el `const PORTADA` del paso anterior, `menu.js` no llega a ejecutarse: el navegador avisa de que `PORTADA` ya está declarada. La barra se queda en el estado del HTML y, al acertar el login, la redirección tampoco tiene a dónde ir.

## menu.js

`RAIZ` se calcula igual que en el login del paso anterior: `new URL("../", document.currentScript.src)` sube desde `js/` hasta la carpeta del paso. `currentScript` es la etiqueta de `menu.js` mientras ese archivo corre. Después vale `null`, así que la URL se guarda en ese momento.

```javascript
const PORTADA = new URL("index.html", RAIZ).pathname;
const LOGIN = new URL("login.html", RAIZ).pathname;
```

`pathname` es la ruta sin el host. En esta carpeta, `PORTADA` acaba en `/030-Registro+Login-cookies/030d-Sesion-auth+menu/index.html`. `LOGIN` se calcula igual y este archivo no la usa.

```javascript
const sesion = leeSesion();
```

`leeSesion` busca la cookie cuya clave es `usuario`. Si no está, devuelve `null`. Si está, devuelve el objeto `{ clave: "usuario", valor: "ana" }`. El valor es el nombre, no la contraseña. La cuenta sigue en su cookie, `ana=daw`. Son dos cookies distintas.

```javascript
if (sesion) {
  enlacesPrivados.forEach((el) => {
    el.style.display = "";
  });
  enlacesPublicos.forEach((el) => {
    el.style.display = "none";
  });
  nombreUsuario.textContent = sesion.valor;
} else {
  enlacesPrivados.forEach((el) => {
    el.style.display = "none";
  });
  enlacesPublicos.forEach((el) => {
    el.style.display = "";
  });
}
```

`if (sesion)` es verdadero cuando `leeSesion` ha devuelto el objeto. Un objeto cuenta como verdadero. `null` no. No hay otra cookie de sesión: la sesión es esa clave `usuario`.

`style.display = ""` quita el `display: none` que estaba escrito en la etiqueta. El elemento vuelve a verse con el estilo de la hoja. `style.display = "none"` lo oculta otra vez. Si en vez de la cadena vacía dejáis el `none` del HTML, la sesión está abierta y la barra privada sigue invisible.

`nombreUsuario.textContent = sesion.valor` pinta `ana`. Si asignáis el objeto entero, el texto sale `[object Object]`.

El clic en el nombre hace `preventDefault`. El `href` es `#`. Sin eso, la página salta al inicio.

Cerrar sesión también hace `preventDefault`, llama a `borraSesion` y luego `window.location.href = PORTADA`. `borraSesion` escribe `usuario=; max-age=0; path=/`. Solo desaparece la cookie de sesión. `ana=daw` se queda, y con ella la cuenta. Al cargar la portada, `leeSesion` devuelve `null` y vuelven Registro y Login.

Si en Cerrar sesión llamáis a `borraUsuario("ana")`, borrais la cuenta y la cookie `usuario` sigue. La barra privada no se va.

Ocultar el enlace no cierra la dirección. Si escribís a mano la URL de una práctica DOM sin la cookie `usuario`, la página se abre. `menu.js` corre, no hay sesión, y la barra enseña Registro y Login. El ejercicio sigue en la página.

## Si falla

Si al recargar se ve un instante DOM y luego desaparece, el `display: none` no está en el HTML. Está solo en el script, y el primer pintado ya ha enseñado la barra.

Si la barra no cambia nunca y la consola dice que `leeSesion` no existe, `menu.js` va delante de `auth.js`.

Si la consola dice que `PORTADA` ya está declarada, `login.js` y `menu.js` tienen los dos el `const`. Quitadlo de `login.js`.

Si el nombre sale `[object Object]`, habéis escrito `sesion` en `textContent`. El nombre está en `sesion.valor`.

Si en la portada el nombre no es un enlace, el `id="nombreUsuario"` está en el `li`. `textContent` sustituye lo que había dentro, y el `<a>` vacío desaparece. En una práctica DOM el id está en el enlace, y el nombre sigue siéndolo.

Si Cerrar sesión os deja sin la cuenta `ana=daw`, habéis borrado la cookie del usuario en vez de la cookie `usuario`.

Si una práctica de Cookies enseña DOM y Cookies sin sesión, esa página no carga `menu.js`. En esta carpeta es así.

## Entrega

Sin la cookie `usuario`, abrid la portada. Se ven Registro y Login. No se ven DOM, Cookies, el nombre ni Cerrar sesión.

Registrad `ana` con la contraseña `daw`. Entrad con esos datos. El mensaje dice `Bienvenido, ana. Redirigiendo...`. Al segundo y medio estáis en la portada de este paso. Se ven DOM, Cookies, el nombre `ana` y Cerrar sesión. Registro y Login no se ven. En el inspector, `document.cookie` es `ana=daw; usuario=ana`. En esa portada `ana` es el texto del `li`.

Abrid una práctica DOM desde el menú. `ana` es un enlace. Cerrar sesión os deja otra vez en la portada. La cookie que queda es `ana=daw`.

Escribid a mano la dirección de una práctica DOM, sin la cookie `usuario`. La página se abre y la barra enseña Registro y Login.
