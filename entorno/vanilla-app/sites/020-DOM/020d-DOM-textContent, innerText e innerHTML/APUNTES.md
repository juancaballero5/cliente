# 020d — DOM: leer y escribir el texto de un nodo

## De qué va esta sesión

Partís de `020c`. Ayer `textContent` leía el texto de un nodo e `innerHTML` creaba nodos a partir de un string. Hoy el mismo párrafo se lee de tres maneras, y no devuelven lo mismo.

`textContent` junta el texto de todos los nodos de dentro, también el que no se pinta, y tira las etiquetas. `innerText` es el texto que se ve. `innerHTML` es el HTML de dentro, en un string. Al escribir, cada una hace el camino inverso.

La flecha, el menú y la tagline del bloque se quedan. La hoja de la página no se toca.

**URL:** `http://localhost:4300/020-DOM/020d-DOM-textContent, innerText e innerHTML/`

---

## Partís de 020c

Duplicad `020c-DOM-querySelector-SelectorAll()` y renombrad la copia a `020d-DOM-textContent, innerText e innerHTML`. El `<title>` de la portada es ese nombre, con la coma y los espacios. La tagline no cambia.

```html
<title>020d-DOM-textContent, innerText e innerHTML</title>
```

```html
<p class="header-tagline">Leer y cambiar el DOM</p>
```

`css/styles.css` es el de `020c`. No lo toquéis. Los scripts de `ejer01`, `ejer02` y `ejer03` tampoco.

Recargad la portada. La pestaña lleva la coma y los espacios. La tercera línea sigue siendo «Leer y cambiar el DOM». El menú, de momento, tiene las tres prácticas de ayer.

---

## El menú crece en las páginas que ya estaban

En el desplegable de la portada entra la práctica de hoy. `aria-haspopup="true"` y `aria-label="Submenú DOM"` no cambian.

```html
<li><a href="./ejercicios/ejer04/index.html">Leer y escribir texto</a></li>
```

En `ejer03`, la entrada abierta sigue sin `href` y con `aria-current="page"`. La nueva lleva `href` a la carpeta hermana:

```html
<li><a aria-current="page">El primero o todos</a></li>
<li><a href="../ejer04/index.html">Leer y escribir texto</a></li>
```

`ejer01` y `ejer02` reciben la misma entrada, cada una con la suya abierta. Recargad `ejer03`. «El primero o todos» no cambia la URL. «Leer y escribir texto» todavía no abre nada: esa carpeta es el paso siguiente.

---

## La práctica nueva

Cread `ejercicios/ejer04/` copiando la página de `ejer03`: mismo `head`, mismas dos hojas, el script con `defer`, la misma cabecera y el mismo pie. El `<title>` es `ejer04`. La tagline dice qué hace esta página.

```html
<meta name="description" content="Leer y escribir el texto de un nodo">
<title>ejer04</title>
```

```html
<p class="header-tagline">Leer y escribir el texto de un nodo</p>
```

En el menú, la entrada abierta es la de hoy. Las otras tres vuelven a ser enlaces:

```html
<li><a href="../ejer01/index.html">Localizar por id</a></li>
<li><a href="../ejer02/index.html">Por clase o etiqueta</a></li>
<li><a href="../ejer03/index.html">El primero o todos</a></li>
<li><a aria-current="page">Leer y escribir texto</a></li>
```

Dentro de la tarjeta hay un solo párrafo. Mezcla negrita, cursiva y un trozo que no se va a pintar. `#resultado` empieza vacío.

```html
<button id="btnLeer" type="button">Leer contenido</button>
<button id="btnModificar" type="button">Modificar contenido</button>

<div id="caja">
  <h2>Mensaje original</h2>
  <p class="parrafo">Este <b>texto</b> tiene <span class="oculto">contenido oculto</span> y <i>HTML</i>.</p>
</div>

<div id="resultado"></div>
```

`.oculto` no es de la tarjeta en general. Es de esta práctica, y va al final de `ejercicios/css/styles.css`, no en la hoja de la página:

```css
/* 020d — el texto que innerText no lee */

.oculto {
  display: none;
}
```

`display: none` saca el elemento de la página pintada. Sigue en el documento. Recargad. Leéis «Este texto tiene y HTML.». No leéis «contenido oculto». Abrid el inspector sobre el párrafo: el `span` está, con la clase `oculto`. Si lo veis en la página, la regla no ha llegado.

---

## El párrafo de dentro de la caja

Los botones y `#resultado` se piden por `id`. El párrafo no: hay que acotar. `#caja .parrafo` es el selector de ayer. El espacio significa «un `.parrafo` dentro de `#caja`».

```javascript
"use strict";

const btnLeer = document.getElementById("btnLeer");
const btnModificar = document.getElementById("btnModificar");
const parrafo = document.querySelector("#caja .parrafo");
const resultado = document.getElementById("resultado");
```

Si `parrafo` es `null`, el selector no coincide. El espacio cuenta. La línea que lea `.textContent` rompe al pulsar.

---

## Las tres lecturas no son la misma

El botón de leer guarda las tres y las escribe en `#resultado` con `innerHTML`. Las dos primeras ya son texto plano. La tercera mete otra vez las etiquetas.

```javascript
btnLeer.addEventListener("click", () => {
  const porTextContent = parrafo.textContent;
  const porInnerText = parrafo.innerText;
  const porInnerHTML = parrafo.innerHTML;

  resultado.innerHTML =
    "<p><b>textContent:</b> " + porTextContent + "</p>" +
    "<p><b>innerText:</b> " + porInnerText + "</p>" +
    "<p><b>innerHTML:</b> " + porInnerHTML + "</p>";
});
```

Recargad y pulsad «Leer contenido». Salen tres párrafos.

El primero incluye «contenido oculto». `textContent` no mira si el `span` se pinta: junta el texto y tira `<b>`, `<span>` e `<i>`.

El segundo no trae esas dos palabras. `innerText` se parece a lo que seleccionaríais con el ratón, y ese `span` no está en la página. Si estáis pensando que `textContent` e `innerText` son la misma propiedad, ayer no había nada oculto y por eso parecían iguales.

El tercero se ve con negrita y cursiva, y «contenido oculto» otra vez no se lee. `innerHTML` había devuelto el string con las etiquetas. Al meterlo en `resultado.innerHTML`, el navegador crea de nuevo el `span` con la clase `oculto`, y `.oculto` lo vuelve a esconder. En el inspector, dentro de `#resultado`, ese `span` está. Si esa tercera línea se hubiera escrito con `textContent`, veríais los caracteres `<b>` y `<span` en la página.

---

## Escribir con innerHTML

El otro botón sustituye el interior del párrafo. `<mark>` y `<code>` son etiquetas: el navegador las crea porque entran por `innerHTML`. El aviso de debajo va con `textContent`, así que no se interpreta.

```javascript
btnModificar.addEventListener("click", () => {
  parrafo.innerHTML = "Texto <mark>modificado</mark> usando <code>innerHTML</code>.";
  resultado.textContent = "Contenido modificado. Vuelve a pulsar «Leer contenido».";
});
```

Recargad. Pulsad «Modificar contenido». El párrafo de arriba cambia: «modificado» queda marcado y `innerHTML` va en el estilo de código. `#resultado` muestra la frase de aviso como texto.

Volved a pulsar «Leer contenido». Ya no hay `span` oculto, porque el `innerHTML` nuevo no lo trae. `textContent` e `innerText` se parecen: todo lo nuevo se pinta. En el tercer párrafo, `<mark>` y `<code>` se ven ya interpretados.

---

## Si falla

| Qué veis | Qué revisar |
|----------|-------------|
| «contenido oculto» se lee en el párrafo de arriba | `.oculto` está al final de `ejercicios/css/styles.css` y esa hoja está enlazada |
| `textContent` e `innerText` salen iguales antes de modificar | El `span` no tiene la clase `oculto`, o `display: none` no se aplica |
| En las tres líneas se leen los caracteres `<b>` | `#resultado` está recibiendo `textContent`. Las tres lecturas entran por `innerHTML` |
| `Cannot read properties of null` | `querySelector("#caja .parrafo")` no ha encontrado el párrafo. El espacio del selector cuenta |
| El pie de `ejer04` no es el de la portada | La hoja de la tarjeta ha vuelto a definir `.footer`. Lo único nuevo es `.oculto` |

---

## Entrega

La entrega es la carpeta `020d-DOM-textContent, innerText e innerHTML`. La portada sigue con «Leer y cambiar el DOM» y el menú abre las cuatro prácticas. En `ejer04`, «Leer contenido» muestra las tres lecturas, y «Modificar contenido» sustituye el párrafo.

- [ ] El `<title>` de la portada es `020d-DOM-textContent, innerText e innerHTML` y el de la práctica nueva es `ejer04`
- [ ] La tagline de la portada no ha cambiado. La de `ejer04` es «Leer y escribir el texto de un nodo»
- [ ] El menú es el mismo en las cinco páginas. En cada práctica, la abierta no tiene `href` y tiene `aria-current="page"`
- [ ] `.oculto` está solo al final de la hoja de la tarjeta. La hoja de la página es la de `020c`
- [ ] Los scripts de `ejer01`, `ejer02` y `ejer03` son los de `020c`
- [ ] Antes de modificar, `textContent` incluye el texto oculto e `innerText` no
