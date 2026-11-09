# 040a3 — Imagen con FileReader

## De qué va esta sesión

En `040a2` todas las cuentas iban en una sola clave, como texto JSON. Esta carpeta copia aquella y añade otra práctica. No guarda cuentas. Prueba cuatro maneras de meter una imagen en `localStorage`. El registro y el login siguen con la cookie.

Abrís `http://localhost:4300/040-Registro+Login-localStorage/040a3-Imagen-FileReader/`. El `<title>` es `040a3-Imagen-FileReader`. La frase de la cabecera sigue siendo «Registro e inicio de sesión con cookies». En Storage hay tres entradas. La nueva dice «Imagen con FileReader».

---

## Al abrir, solo hay texto

La página es `ejercicios/Storage/ejer03/index.html`. El `<title>` es `ejer03`. La frase de esa página es «Imagen con FileReader». Esa entrada no tiene `href` y lleva `aria-current="page"`. La lista se llama `Submenú Storage`.

La tarjeta dice: «Probamos cuatro formas de guardar una imagen en localStorage» y «Clave: fotoUsuario; valor: solo el intento 4 persiste tras recargar.» Hay un campo de archivo, `accept="image/*"`, y cuatro botones `type="button"`.

`localStorage` solo guarda texto. Una imagen es un archivo, y un archivo no es un texto. Cada botón guarda algo distinto en la misma clave, y al recargar se ve si ese texto sirve para pintar la imagen.

La clave no se llama `fotoUsuario`. En `localStorage.js` es esta:

```javascript
const ALMACEN_EJERCICIO = "040a3-Imagen-FileReader";

function guardaFotoEjercicio(valor) {
  localStorage.setItem(ALMACEN_EJERCICIO, valor);
}
```

Después de pulsar un botón, `localStorage.getItem("fotoUsuario")` devuelve `null`. `localStorage.getItem("040a3-Imagen-FileReader")` devuelve el texto de ese intento. La clave es del origen `http://localhost:4300`. Desde la portada de `040a2`, el mismo `getItem` devuelve el mismo texto.

Al cargar, `lecturaAlCargar` lee esa clave:

```javascript
function lecturaAlCargar() {
  const guardado = leeFotoEjercicio();

  if (!guardado) {
    resultado.textContent = "No hay ninguna imagen guardada.";
    return;
  }

  const img = document.createElement("img");
  img.src = guardado;
  img.style.width = "120px";
  img.style.height = "auto";

  resultado.innerHTML = "<p>Intentando cargar la imagen guardada previamente:</p>";
  resultado.appendChild(img);
}
```

La primera vez el párrafo dice «No hay ninguna imagen guardada.»

Cada botón empieza por `limpiarResultado`. Esa función vacía `#resultado` y llama a `localStorage.removeItem`. Si pulsáis Intento 1 sin haber elegido archivo, el mensaje pasa a «Selecciona una imagen antes de guardar.» y, si había una imagen guardada, la clave desaparece.

---

## Intento 1 guarda una ruta falsa

Elegid una imagen y pulsad Intento 1. El párrafo dice «Guardada la ruta:» y detrás sale un texto como `C:\fakepath\prueba.png`. Debajo, la imagen no se ve.

`image.value` no es la carpeta del archivo en vuestro ordenador. El navegador escribe `C:\fakepath\` y el nombre del archivo, y no deja leer la ruta de verdad. `guardaFotoEjercicio` mete ese texto en la clave. Luego crea un `img` y le pone ese texto en `src`. Esa dirección no es una imagen, así que no se pinta.

Recargad. La clave sigue, el párrafo dice «Intentando cargar la imagen guardada previamente:» y la imagen sigue sin verse. El texto ha permanecido. La imagen, no.

---

## Intento 2 guarda el nombre del objeto

Elegid otra vez la imagen y pulsad Intento 2. Ahora el código no usa `image.value`. Usa el archivo:

```javascript
const archivo = image.files[0];
guardaFotoEjercicio(archivo);
```

`image.files[0]` es el archivo elegido. Si estáis pensando que en la clave entra el archivo, `setItem` lo convierte a texto antes de guardarlo. `localStorage.getItem("040a3-Imagen-FileReader")` devuelve `[object File]`. El párrafo de la página dice lo mismo, porque al meter el archivo en una frase también se convierte en ese texto.

El `img` recibe ese texto en `src`. El navegador lo toma como una dirección de esta misma página, y busca un archivo llamado `[object File]` al lado de `index.html`. No está. La imagen no se ve. Al recargar, la clave sigue valiendo `[object File]` y la imagen tampoco se ve.

---

## Intento 3 guarda una dirección temporal

Intento 3 también toma `image.files[0]`. Antes de guardar, pide una dirección:

```javascript
const urlTemporal = URL.createObjectURL(archivo);
guardaFotoEjercicio(urlTemporal);
```

`URL.createObjectURL` devuelve un texto que empieza por `blob:http://localhost:4300/` y sigue con un identificador. Esa dirección enseña el archivo ahora: la imagen sí se ve. En la clave no está el archivo. Está el texto de la dirección.

Abrid la misma página en otra pestaña. El texto sigue en `localStorage` y la imagen no se carga: esa dirección vale en la pestaña que la creó. Si recargáis esa misma pestaña, la imagen puede seguir viéndose, porque la dirección todavía está viva ahí. El archivo no ha quedado guardado.

---

## Intento 4 lee el archivo y guarda un texto

Intento 4 es el que usa `FileReader`. `readAsDataURL` no devuelve el texto en la línea siguiente. Empieza a leer el archivo y, cuando termina, llama a `onload`. Para esperar ese momento, `fileToDataURL` devuelve una promesa.

Una promesa es un objeto que representa un resultado que todavía no está. `resolve` entrega el resultado. `reject` entrega el fallo. La función vuelve enseguida con la promesa. El texto de la imagen llega más tarde, cuando `onload` ejecuta `resolve(lector.result)`.

```javascript
function fileToDataURL(file) {
  return new Promise((resolve, reject) => {
    const lector = new FileReader();
    lector.onload = () => resolve(lector.result);
    lector.onerror = () => reject("Error al leer el archivo");
    lector.readAsDataURL(file);
  });
}

tryIt4.addEventListener("click", async () => {
  limpiarResultado();

  const archivo = image.files[0];
  if (!archivo) {
    resultado.textContent = "Selecciona una imagen antes de guardar.";
    return;
  }

  const dataURL = await fileToDataURL(archivo);
  guardaFotoEjercicio(dataURL);
  // ...
});
```

`async` marca la función del clic: dentro puede usar `await`. `await` detiene esa función hasta que la promesa termina. Si estáis pensando que `dataURL` ya tiene el texto en la línea de arriba, no llega hasta que `onload` ha llamado a `resolve`. Las líneas de después del `await` crean el `img` y le ponen ese texto en `src`.

El texto empieza por `data:image/png;base64,` si el archivo es un PNG, y sigue con la imagen escrita en letras y números. Ese texto largo es la imagen. `setItem` puede guardarlo, porque es texto. El navegador, al ver una dirección `data:`, pinta la imagen. El párrafo dice «Imagen guardada en Base64 (persiste tras recargar).»

Recargad. `lecturaAlCargar` lee el mismo texto, lo pone en `img.src` y la imagen se ve. En otra página de `http://localhost:4300` el `getItem` de `040a3-Imagen-FileReader` devuelve ese mismo texto, y por eso la imagen también se puede pintar allí.

Si la lectura falla, `reject` hace que el `await` lance un error. La función del clic no tiene `catch`.

---

## Si falla

| Qué veis | Qué revisar |
|----------|-------------|
| Sin sesión acabáis en el login | La práctica lleva `paginaPrivada`. La sesión sigue siendo la cookie |
| `getItem("fotoUsuario")` devuelve `null` | `setItem` usa `ALMACEN_EJERCICIO`, el texto `040a3-Imagen-FileReader` |
| Intento 1 guarda `C:\fakepath\...` y no se ve la imagen | `image.value` no es la ruta del disco, y ese texto no es una imagen |
| Intento 2 guarda `[object File]` | `setItem` ha convertido el archivo a texto |
| En otra pestaña, el intento 3 no pinta la imagen | La clave guarda la dirección `blob:`, no el archivo |
| Intento 4 no espera y `dataURL` sale vacío | Falta el `await`, o la función del clic no es `async` |
| Al recargar no aparece la imagen del intento 4 | `leeFotoEjercicio` no se llama al cargar, o `img.src` no recibe ese texto |
| Un clic sin archivo borra la imagen anterior | `limpiarResultado` llama a `removeItem` antes de comprobar si hay archivo |

---

## Entrega

La entrega es la carpeta `040a3-Imagen-FileReader`. Lo nuevo es `ejercicios/Storage/ejer03`: cuatro textos distintos en una sola clave, y la imagen que vuelve a verse es la del `data:`.

- [ ] La portada dice «Registro e inicio de sesión con cookies» y el título es `040a3-Imagen-FileReader`
- [ ] Storage tiene tres prácticas, y «Imagen con FileReader» no tiene `href`
- [ ] La clave escrita es `040a3-Imagen-FileReader`
- [ ] Intento 1 guarda `C:\fakepath\` y el nombre. Al recargar, el texto sigue y la imagen no se ve
- [ ] Intento 2 guarda `[object File]`
- [ ] Intento 3 enseña la imagen en esa pestaña. En otra pestaña, el texto `blob:` no la enseña
- [ ] Intento 4 guarda un texto `data:image/...;base64,`. Al recargar, y desde otra página de `http://localhost:4300`, la imagen se ve

---

## Cierre

La sesión de esta carpeta sigue en la cookie. De las cuatro pruebas, la que guarda la imagen es la que convierte el archivo en un texto `data:`. Las otras tres guardan un texto que no es la imagen.
