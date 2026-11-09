# 040a4 — Usuarios con imagen Base64

## De qué va esta sesión

En `040a2` todas las cuentas iban en una sola clave. En `040a3`, `FileReader` convertía una imagen en un texto `data:`. Esta carpeta copia la anterior y junta las dos cosas: la cuenta guarda la dirección y, en `imagen`, ese texto o la foto por defecto.

El registro y el login siguen con la cookie. Abrís `http://localhost:4300/040-Registro+Login-localStorage/040a4-Usuarios-imagen-Base64/`. El `<title>` es `040a4-Usuarios-imagen-Base64`. La frase de la cabecera sigue siendo «Registro e inicio de sesión con cookies». En Storage hay cuatro entradas. La nueva dice «Usuarios con imagen Base64».

---

## La cuenta crece

La página es `ejercicios/Storage/ejer04/index.html`. El `<title>` es `ejer04`. La frase de esa página es «Usuarios con imagen Base64». Esa entrada no tiene `href` y lleva `aria-current="page"`. La lista se llama `Submenú Storage`.

La tarjeta dice: «Guardamos en localStorage todas las cuentas juntas», «Clave: usuarios; valor: objeto con todas las cuentas en JSON» y «Cada cuenta añade la dirección y la imagen en Base64». El formulario añade calle, código postal, ciudad, provincia y un campo de archivo.

Las cuatro funciones de `localStorage.js` son las de la clave única. La clave de este archivo no es `usuarios`:

```javascript
const ALMACEN_EJERCICIO = "040a4-Usuarios-imagen-Base64";
```

`guardaUsuarioEjercicio` lee el objeto, escribe `usuarios[user.usuario] = user` y guarda el JSON. `leeUsuarioEjercicio` devuelve una cuenta, o `undefined`. `leeUsuariosEjercicio` devuelve el objeto, o `{}`. `borraUsuarioEjercicio` hace `delete` de esa propiedad y vuelve a guardar. Si estáis pensando que la clave es `usuarios`, como dice la tarjeta, `localStorage.getItem("usuarios")` no es esta práctica. La clave nueva se llama `040a4-Usuarios-imagen-Base64`. Sigue siendo del origen `http://localhost:4300`: desde la portada de `040a3`, el mismo `getItem` devuelve el mismo texto.

Al abrir, `#resultado` dice «Usuarios guardados (1 clave = todos):» y, si no hay cuentas, «No hay usuarios guardados.»

---

## Guardar la dirección y la imagen

Usuario, contraseña, teléfono y email se comprueban como en la práctica de la clave única. El código postal, si no está vacío, tiene que ser cinco dígitos. Si escribís `12`, el párrafo dice «Código postal no válido (5 dígitos).» y no se guarda nada.

```javascript
const PATRON_CP = /^\d{5}$/;
```

Con los campos vacíos, la cuenta no se guarda vacía. Teléfono, email, calle, código postal, ciudad y provincia reciben un texto fijo. La dirección no es una clave de `localStorage`. Es un objeto dentro de la cuenta:

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
```

`fileToDataURL` es la función del intento 4: `FileReader` lee el archivo y la promesa entrega el texto `data:image/...;base64,`. El clic de Guardar es `async`, y el `await` espera ese texto. Si no habéis elegido archivo, no llama a `FileReader`. Usa `FOTO_DEFECTO`.

Esa constante no está en `script.js`. Está en `js/menu.js`, y el `script` de la práctica se carga después de `menu.js`:

```javascript
const FOTO_DEFECTO = new URL("./img/user.png", RAIZ).pathname;
```

`RAIZ` es la carpeta de este paso. El valor es la ruta `/040-Registro+Login-localStorage/040a4-Usuarios-imagen-Base64/img/user.png`. Si guardáis a `lola` sin elegir imagen, `imagen` es esa ruta, no un texto `data:`. La foto se ve igual, porque `img.src` acepta una ruta de este origen. Si elegís un archivo para `rita`, `imagen` empieza por `data:image/` y el JSON de la clave lleva ese texto dentro de la propiedad `rita`.

Intro sigue sin guardar: el `submit` solo hace `preventDefault()`.

---

## La lista pinta la foto en la línea

`listarUsuarios` recorre `Object.values` y, por cada cuenta, mete un `img` con `src` igual a `user.imagen`. La hoja de la raíz, al final, deja esa foto a la altura del texto:

```css
#resultado img {
  width: 1.25em;
  height: 1.25em;
  object-fit: cover;
  vertical-align: middle;
  margin-right: 0.35em;
}
```

La fila sigue con el nombre, el usuario, el teléfono, el email, la calle, el código postal, la ciudad y la provincia. Con `lola` vacía se lee «Lola lola - 5551234567 - sin-email@ejemplo.com - Sin calle - 00000 - Sin ciudad - Sin provincia», y a la izquierda la foto pequeña de `user.png`.

Leer usa el campo Usuario. Si la cuenta existe, el mensaje lleva la misma foto y los mismos datos, también la dirección. Al segundo y medio, `listarUsuarios` vuelve a pintar la lista. Borrar quita la propiedad y vuelve a guardar el objeto. La clave de `localStorage` sigue; si era la última cuenta, el texto queda en `{}`.

---

## Si falla

| Qué veis | Qué revisar |
|----------|-------------|
| Sin sesión acabáis en el login | La práctica lleva `paginaPrivada`. La sesión sigue siendo la cookie |
| `getItem("usuarios")` no tiene a `lola` | `setItem` usa `ALMACEN_EJERCICIO`, el texto `040a4-Usuarios-imagen-Base64` |
| Sin archivo, `imagen` no empieza por `data:` | Es `FOTO_DEFECTO`, la ruta de `img/user.png` |
| `FOTO_DEFECTO` no existe al pulsar Guardar | `script.js` está cargado antes que `menu.js` |
| El código postal `12` se guarda | La comprobación está después del `await`, o el patrón no es cinco dígitos |
| La foto sale enorme | Falta la regla `#resultado img` al final de `css/styles.css` |
| La consola marca un error al leer `user.direccion.calle` | Esa cuenta no tiene el objeto `direccion` |
| Al borrar la última cuenta, `getItem` sigue devolviendo texto | El texto es `{}`. `delete` no llama a `removeItem` |

---

## Entrega

La entrega es la carpeta `040a4-Usuarios-imagen-Base64`. Lo nuevo es `ejercicios/Storage/ejer04`: la misma clave única, y cada cuenta con `direccion` e `imagen`.

- [ ] La portada dice «Registro e inicio de sesión con cookies» y el título es `040a4-Usuarios-imagen-Base64`
- [ ] Storage tiene cuatro prácticas, y la abierta no tiene `href`
- [ ] Guardar `lola` sin imagen deja la clave `040a4-Usuarios-imagen-Base64`. `imagen` es la ruta de `user.png` y la foto se ve pequeña en la lista
- [ ] Guardar `rita` con una imagen deja `imagen` en un texto `data:image/...;base64,`, dentro de la misma clave
- [ ] Calle, código postal, ciudad y provincia vacíos se guardan como `Sin calle`, `00000`, `Sin ciudad` y `Sin provincia`
- [ ] Leer enseña la foto, el email y la dirección, y al segundo y medio vuelve la lista
- [ ] Esa clave se lee desde otra página de `http://localhost:4300`

---

## Cierre

La sesión de esta carpeta sigue en la cookie. La práctica guarda todas las cuentas en una clave, y cada cuenta lleva la dirección y una imagen: la ruta de `user.png`, o el texto `data:` si habéis elegido un archivo.
