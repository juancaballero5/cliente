# 020b — DOM: varios elementos por clase o por etiqueta

## De qué va esta sesión

Partís de `020a`. Ayer `getElementById` os devolvía un nodo, o `null` si ese `id` no estaba. Hoy el nodo no es uno: hay cuatro párrafos con la misma clase y dos títulos con la misma etiqueta. Hace falta una búsqueda que devuelva varios.

La flecha y `addEventListener` se quedan. La tagline de la portada también. Las hojas de estilo no se tocan.

**URL:** `http://localhost:4300/020-DOM/020b-DOM-getElementsByClassName-TagName()/`

---

## Partís de 020a

Duplicad `020a-DOM-getElementById()` y renombrad la copia a `020b-DOM-getElementsByClassName-TagName()`. El `<title>` de la portada pasa a ser el nombre de esta carpeta. La tagline no: sigue contando el bloque.

```html
<title>020b-DOM-getElementsByClassName-TagName()</title>
```

```html
<p class="header-tagline">Leer y cambiar el DOM</p>
```

`css/styles.css` y `ejercicios/css/styles.css` son los de ayer. `ejer01`, su HTML de la tarjeta y su `script.js`, también. No los reescribáis.

Recargad la portada. La pestaña dice `020b-DOM-getElementsByClassName-TagName()`. La tercera línea sigue siendo «Leer y cambiar el DOM». El menú, de momento, solo tiene la práctica de ayer.

---

## El menú crece en las páginas que ya estaban

En el desplegable de la portada entra la práctica de hoy. `aria-haspopup="true"` y `aria-label="Submenú DOM"` no cambian.

```html
<li><a href="./ejercicios/ejer02/index.html">Por clase o etiqueta</a></li>
```

`ejer01` es la página de ayer. La entrada abierta sigue sin `href` y con `aria-current="page"`. La nueva lleva `href` a la carpeta hermana:

```html
<li><a aria-current="page">Localizar por id</a></li>
<li><a href="../ejer02/index.html">Por clase o etiqueta</a></li>
```

Recargad la portada: dos entradas. Abrid `ejer01`. «Localizar por id» no cambia la URL. «Por clase o etiqueta» todavía no abre nada, porque esa carpeta no existe. Es el siguiente paso.

---

## La práctica nueva

Cread `ejercicios/ejer02/` copiando la página de `ejer01`: mismo `head`, mismas dos hojas, el script con `defer`, la misma cabecera y el mismo pie. Cambiad lo que identifica a esta práctica. El `<title>` es `ejer02`. La tagline dice qué hace esta página, no el bloque.

```html
<meta name="description" content="Varios elementos por clase o por etiqueta">
<title>ejer02</title>
```

```html
<p class="header-tagline">Varios elementos por clase o por etiqueta</p>
```

En el menú, la entrada abierta es la de hoy. La de ayer vuelve a ser un enlace:

```html
<li><a href="../ejer01/index.html">Localizar por id</a></li>
<li><a aria-current="page">Por clase o etiqueta</a></li>
```

El `main` ya no lleva los seis botones. Lleva dos botones, dos `h2` y cuatro párrafos con la clase `texto`. El enlace del pie de la tarjeta sigue yendo a `../../index.html`.

```html
<button id="btnClase" type="button">Resaltar párrafos (por clase)</button>
<button id="btnEtiqueta" type="button">Resaltar títulos (por etiqueta)</button>

<h2>Sección A</h2>
<p class="texto">Primer párrafo</p>
<p class="texto">Segundo párrafo</p>

<h2>Sección B</h2>
<p class="texto">Tercer párrafo</p>
<p class="texto">Cuarto párrafo</p>
```

Estos botones son `<button>`, no `<input>`. El rótulo es el texto que hay entre la etiqueta de apertura y la de cierre.

Recargad `ejer02`. Veis la tarjeta, los cuatro párrafos en negro y los dos títulos. El `h1` de la tarjeta no es un `h2`: se queda azul. La hoja de la tarjeta no menciona `.texto` ni `h2`. El color de después lo pondrá el script, en línea.

---

## Los dos botones, otra vez por id

El script nuevo está en `ejercicios/ejer02/js/script.js`. Los botones siguen siendo uno cada uno, así que se piden con `getElementById`, como ayer. La flecha y `addEventListener` también.

```javascript
"use strict";

const botonClase = document.getElementById("btnClase");
const botonEtiqueta = document.getElementById("btnEtiqueta");
```

Si uno de los dos sale `null`, el `id` del HTML y el de `getElementById` no coinciden, y la línea del `addEventListener` rompe al cargar.

---

## getElementsByClassName devuelve varios

`getElementsByClassName` no pide un selector de CSS. Pide el nombre de la clase, sin punto. Con punto, el nombre no coincide con `texto`, la colección llega vacía y no hay error: la página no cambia y parece que el clic no hace nada.

Dentro del clic, pedid la colección y miradla. Todavía no la recorráis.

```javascript
botonClase.addEventListener("click", () => {
  const parrafos = document.getElementsByClassName("texto");
  console.log(parrafos);
});
```

Recargad y pulsad «Resaltar párrafos (por clase)». La consola muestra una `HTMLCollection` con cuatro párrafos. No es un array. Tiene `length` y se puede leer con `[i]`. No tiene `forEach`: si escribís `parrafos.forEach`, la consola dice que no es una función.

Si estáis pensando que un `id` repetido habría valido, no. El `id` es de un solo nodo. La clase es precisamente lo que se repite.

---

## Recorrer la colección

En el archivo hay tres formas de recorrerla. Las dos primeras están comentadas, para leerlas. La que corre es la tercera.

El `for` no necesita `forEach`. Usa `length` y el índice. Con eso basta, y la colección lo tiene:

```javascript
for (let i = 0; i < parrafos.length; i++) {
  parrafos[i].style.backgroundColor = "#ffffcc";
  parrafos[i].style.border = "1px solid #ccc";
  parrafos[i].style.padding = "5px";
}
```

`forEach` es de los array. `Array.from(parrafos)` fabrica uno con los mismos cuatro nodos, y ese sí se recorre:

```javascript
Array.from(parrafos).forEach(parrafo => {
  parrafo.style.backgroundColor = "#ffffcc";
  parrafo.style.border = "1px solid #ccc";
  parrafo.style.padding = "5px";
});
```

`[...parrafos]` hace lo mismo: copia los nodos a un array. Es la forma que queda sin comentar.

```javascript
botonClase.addEventListener("click", () => {
  const parrafos = document.getElementsByClassName("texto");
  console.log(parrafos); // es una Collección y no es iterable
  [...parrafos].forEach(parrafo => {
    parrafo.style.backgroundColor = "#ffffcc";
    parrafo.style.border = "1px solid #ccc";
    parrafo.style.padding = "5px";
  });
});
```

`style.backgroundColor` escribe el color en el atributo `style` de ese nodo, en línea. Por eso se ve aunque la hoja de la tarjeta no hable de `.texto`.

Recargad y pulsad. Los cuatro párrafos quedan con fondo amarillo claro, borde y un poco de relleno. Los `h2` no, porque no tienen la clase `texto`. En el inspector, un párrafo tiene `style="background-color: ..."`. Si no cambia ninguno, el nombre de la clase lleva un punto o no es `texto`.

---

## getElementsByTagName pide la etiqueta

El otro botón busca por nombre de etiqueta, no por clase. El argumento es `h2`, en minúsculas, sin corchetes angulares. `"<h2>"` no es el nombre de ninguna etiqueta: la colección llega vacía y, otra vez, sin error.

La colección es del mismo tipo. El archivo repite el esquema: el `for` y `Array.from` comentados, y el spread en marcha.

```javascript
botonEtiqueta.addEventListener("click", () => {
  const titulos = document.getElementsByTagName("h2");
  console.log(titulos); // es una Collección y no es iterable
  [...titulos].forEach(titulo => {
    titulo.style.color = "darkred";
    titulo.style.textDecoration = "underline";
  });
});
```

Recargad y pulsad «Resaltar títulos (por etiqueta)». La consola muestra una `HTMLCollection` con dos `h2`. En la página, «Sección A» y «Sección B» pasan a rojo oscuro y subrayado. El `h1` de la tarjeta no entra en esa búsqueda: es otra etiqueta, y sigue azul.

`getElementsByTagName` mira el documento entero, no solo la tarjeta. En esta página no hay más `h2`. Si los hubiera fuera de la tarjeta, también cambiarían.

---

## Si falla

| Qué veis | Qué revisar |
|----------|-------------|
| `parrafos.forEach is not a function` | `forEach` se está llamando sobre la `HTMLCollection`. El archivo recorre `[...parrafos]` |
| El clic de la clase no pinta nada y no hay error | `getElementsByClassName` ha recibido `".texto"` o otro nombre. La clase va sin punto |
| El clic de la etiqueta no pinta nada y no hay error | El argumento es `"<h2>"` o no es `h2`. El archivo usa `"h2"` |
| Cambia el título azul de la tarjeta | Estáis pidiendo `"h1"`. El botón de la etiqueta pide `"h2"` |
| `Cannot set properties of null` al cargar | `getElementById("btnClase")` o `getElementById("btnEtiqueta")` no ha encontrado el botón |
| El pie de `ejer02` no es el de la portada | Se ha tocado `ejercicios/css/styles.css`. Esa hoja es la de `020a` |

---

## Entrega

La entrega es la carpeta `020b-DOM-getElementsByClassName-TagName()`. La portada sigue con «Leer y cambiar el DOM» y el menú abre las dos prácticas. `ejer01` se comporta como en `020a`. En `ejer02`, un botón resalta los cuatro párrafos y el otro resalta los dos `h2`.

- [ ] El `<title>` de la portada es `020b-DOM-getElementsByClassName-TagName()` y el de la práctica nueva es `ejer02`
- [ ] La tagline de la portada no ha cambiado. La de `ejer02` es «Varios elementos por clase o por etiqueta»
- [ ] El menú es el mismo en las tres páginas. En cada práctica, la abierta no tiene `href` y tiene `aria-current="page"`
- [ ] Las dos hojas de estilo son las de `020a`
- [ ] `ejer01` conserva su script. El de `ejer02` pide los botones por `id` y los grupos con `getElementsByClassName` y `getElementsByTagName`
- [ ] Lo que corre es el spread. El `for` y `Array.from` se leen, comentados
