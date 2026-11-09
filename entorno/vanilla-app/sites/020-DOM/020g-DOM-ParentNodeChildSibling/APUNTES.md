# 020g — DOM: el padre, los hijos y el hermano de al lado

## De qué va esta sesión

Partís de `020f`. Ayer colgabais y quitabais un evento. Hoy no cambiáis el nodo: preguntáis quién lo contiene, qué hay dentro y quién está al lado.

Os colocáis en el `<li>` del medio. `parentNode` sube al padre. `childNodes` baja a todos los hijos, también a los saltos de línea. `previousSibling` y `nextSibling` dan el nodo de al lado, sea el que sea. `previousElementSibling` y `nextElementSibling` saltan esos saltos y se quedan en un elemento.

En `020e`, `lastChild` ya podía ser un salto de línea y `lastElementChild` era el `<li>`. Aquí es la misma diferencia, mirando al hermano.

La flecha, el menú y la tagline del bloque se quedan. La hoja de la página no se toca.

**URL:** `http://localhost:4300/020-DOM/020g-DOM-ParentNodeChildSibling/`

---

## Partís de 020f

Duplicad `020f-DOM-add-removeEventListener()` y renombrad la copia a `020g-DOM-ParentNodeChildSibling`. El `<title>` de la portada es ese nombre. La tagline no cambia.

```html
<title>020g-DOM-ParentNodeChildSibling</title>
```

```html
<p class="header-tagline">Leer y cambiar el DOM</p>
```

`css/styles.css` es el de `020f`. No lo toquéis. Los scripts de `ejer01` a `ejer06` tampoco.

Recargad la portada. La pestaña dice `020g-DOM-ParentNodeChildSibling`. La tercera línea sigue siendo «Leer y cambiar el DOM». El menú, de momento, tiene las seis prácticas de ayer.

---

## El menú crece en las páginas que ya estaban

En el desplegable de la portada entra la práctica de hoy. `aria-haspopup="true"` y `aria-label="Submenú DOM"` no cambian.

```html
<li><a href="./ejercicios/ejer07/index.html">Padre, hijos y hermanos</a></li>
```

En `ejer06`, la entrada abierta sigue sin `href` y con `aria-current="page"`. La nueva lleva `href` a la carpeta hermana:

```html
<li><a aria-current="page">Activar y quitar el evento</a></li>
<li><a href="../ejer07/index.html">Padre, hijos y hermanos</a></li>
```

`ejer01` a `ejer05` reciben la misma entrada. Recargad `ejer06`. «Activar y quitar el evento» no cambia la URL. «Padre, hijos y hermanos» todavía no abre nada: esa carpeta es el paso siguiente.

---

## La práctica nueva

Cread `ejercicios/ejer07/` copiando la página de `ejer06`: mismo `head`, mismas dos hojas, el script con `defer`, la misma cabecera y el mismo pie. El `<title>` es `ejer07`. La tagline dice qué hace esta página.

```html
<meta name="description" content="El padre, los hijos y el hermano de al lado">
<title>ejer07</title>
```

```html
<p class="header-tagline">El padre, los hijos y el hermano de al lado</p>
```

En el menú, la entrada abierta es la de hoy. Las otras seis vuelven a ser enlaces:

```html
<li><a href="../ejer01/index.html">Localizar por id</a></li>
<li><a href="../ejer02/index.html">Por clase o etiqueta</a></li>
<li><a href="../ejer03/index.html">El primero o todos</a></li>
<li><a href="../ejer04/index.html">Leer y escribir texto</a></li>
<li><a href="../ejer05/index.html">Crear y quitar nodos</a></li>
<li><a href="../ejer06/index.html">Activar y quitar el evento</a></li>
<li><a aria-current="page">Padre, hijos y hermanos</a></li>
```

La lista tiene tres elementos. El script se apoya en el del medio, el que lleva `id`. Entre un `</li>` y el `<li>` siguiente hay un salto de línea. Ese salto también es un nodo.

```html
<ul id="listaNombres">
  <li>Elemento 1</li>
  <li id="elementoActual">Elemento 2 (actual)</li>
  <li>Elemento 3</li>
</ul>
```

Recargad. Veis tres líneas. Los botones aún no escriben nada en `#resultado`.

---

## Los saltos del resultado se tienen que pintar

El botón de los hijos arma un string con `\n` al final de cada línea. Un `div` junta esos saltos en espacios, y la lista se lee seguida. La regla es de esta práctica y va al final de `ejercicios/css/styles.css`, detrás de `.oculto`. No va en la hoja de la página.

```css
/* 020g — los saltos de línea que childNodes escribe en #resultado */

#resultado {
  white-space: pre-wrap;
}
```

`pre-wrap` respeta el salto y, si la línea es larga, la parte. En las prácticas anteriores `#resultado` es una sola frase, así que no cambia de aspecto. Recargad `ejer07`. Todavía no se ve nada en `#resultado`: el script no ha escrito.

---

## parentNode sube un nivel

`parentNode` es el nodo que contiene a este, el de justo encima. No es la tarjeta ni el `body`. En un documento HTML, `nodeName` de una etiqueta va en mayúsculas.

```javascript
"use strict";

const actual = document.getElementById("elementoActual");
const verPadre = document.getElementById("verPadre");
const resultado = document.getElementById("resultado");

verPadre.addEventListener("click", () => {
  const padre = actual.parentNode;
  resultado.textContent = "Nodo padre: " + padre.nodeName + "  id=\"" + padre.id + "\"";
});
```

Los demás botones se piden igual, por su `id`, al principio del script. Recargad y pulsad «Mostrar nodo padre». Leéis `UL` e `id="listaNombres"`. Si `actual` es `null`, el `id` no coincide y la línea de `parentNode` rompe.

---

## childNodes cuenta también el texto

`childNodes` son todos los hijos del padre. `children`, el de `020e`, eran solo elementos. El bucle escribe el nombre y el tipo de cada uno. El tipo `1` es un elemento. El tipo `3` es texto: el salto de línea.

```javascript
const verHijos = document.getElementById("verHijos");

verHijos.addEventListener("click", () => {
  const hijos = actual.parentNode.childNodes;
  let salida = "Hijos del padre (incluye nodos de texto):\n";
  for (let i = 0; i < hijos.length; i++) {
    salida += "- " + hijos[i].nodeName + " (tipo: " + hijos[i].nodeType + ")\n";
  }
  resultado.textContent = salida;
});
```

Recargad y pulsad «Mostrar hijos del padre». Salen siete líneas, alternando `#text` tipo `3` y `LI` tipo `1`. Son tres elementos y cuatro textos. `padre.children.length` sigue siendo `3`. Si lo veis en una sola línea, falta el `pre-wrap`.

---

## previousSibling es el nodo de al lado

El hermano anterior es el nodo que está justo antes, no «el `<li>` de antes». El `if` comprueba el tipo `1`. Si no lo es, no lee su texto: sería el salto, y ese texto está vacío.

```javascript
const verAnterior = document.getElementById("verAnterior");

verAnterior.addEventListener("click", () => {
  const anterior = actual.previousSibling;
  if (anterior && anterior.nodeType === 1) {
    resultado.textContent = "Hermano anterior (nodo): " + anterior.textContent;
  } else {
    resultado.textContent = "previousSibling no es un elemento (suele ser un nodo de texto).";
  }
});
```

Recargad y pulsad «Hermano anterior (previousSibling)». Sale la frase del `else`. En la consola, `actual.previousSibling.nodeName` es `"#text"` y `nodeType` es `3`. Si estáis pensando que debería decir «Elemento 1», el salto entre las etiquetas cuenta como nodo. Si los tres `<li>` fueran seguidos, sin salto, ahí sí sería el elemento.

---

## previousElementSibling salta el texto

`previousElementSibling` ignora los nodos de texto y se para en el elemento anterior. Si no hay, devuelve `null`.

```javascript
const verAnteriorElemento = document.getElementById("verAnteriorElemento");

verAnteriorElemento.addEventListener("click", () => {
  const anteriorElemento = actual.previousElementSibling;
  if (anteriorElemento) {
    resultado.textContent = "Hermano anterior (elemento): " + anteriorElemento.textContent;
  } else {
    resultado.textContent = "No hay previousElementSibling.";
  }
});
```

Recargad y pulsad «Hermano anterior (previousElementSibling)». Leéis «Elemento 1». El `id` está en el del medio, así que ese `else` no sale. Saldría si el `id` estuviera en el primer `<li>`.

---

## El hermano de la derecha

Hacia el otro lado es el mismo criterio. `nextSibling` es el nodo inmediato. Con este HTML, otra vez el salto.

```javascript
const verSiguiente = document.getElementById("verSiguiente");

verSiguiente.addEventListener("click", () => {
  const siguiente = actual.nextSibling;
  if (siguiente && siguiente.nodeType === 1) {
    resultado.textContent = "Hermano siguiente (nodo): " + siguiente.textContent;
  } else {
    resultado.textContent = "nextSibling no es un elemento (suele ser un nodo de texto).";
  }
});
```

Recargad y pulsad «Hermano siguiente (nextSibling)». Sale la frase del `else`, no «Elemento 3».

`nextElementSibling` se para en el `<li>` de la derecha.

```javascript
const verSiguienteElemento = document.getElementById("verSiguienteElemento");

verSiguienteElemento.addEventListener("click", () => {
  const siguienteElemento = actual.nextElementSibling;
  if (siguienteElemento) {
    resultado.textContent = "Hermano siguiente (elemento): " + siguienteElemento.textContent;
  } else {
    resultado.textContent = "No hay nextElementSibling.";
  }
});
```

Recargad y pulsad «Hermano siguiente (nextElementSibling)». Leéis «Elemento 3». Con el `id` en el último `<li>`, este botón diría que no hay elemento siguiente.

---

## Si falla

| Qué veis | Qué revisar |
|----------|-------------|
| El padre no es `UL` | No estáis en `#elementoActual`. Su padre directo es `#listaNombres` |
| Los hijos salen en una sola línea | Falta `#resultado { white-space: pre-wrap; }` al final de la hoja de la tarjeta |
| `previousSibling` escribe «Elemento 1» | Entre los `<li>` no hay salto de línea. Con el HTML de la práctica, ese botón cae en el `else` |
| `previousElementSibling` también avisa de un nodo de texto | Estáis leyendo `previousSibling`. El botón del elemento usa `previousElementSibling` |
| `Cannot read properties of null` al pulsar el padre | `getElementById("elementoActual")` no ha encontrado el `id` |
| El pie de `ejer07` no es el de la portada | La hoja de la tarjeta ha definido `.footer`. Lo nuevo es solo el `pre-wrap` |

---

## Entrega

La entrega es la carpeta `020g-DOM-ParentNodeChildSibling`. La portada sigue con «Leer y cambiar el DOM» y el menú abre las siete prácticas. En `ejer07`, el padre es la lista, los hijos alternan texto y `LI`, y el elemento de al lado es «Elemento 1» o «Elemento 3». Con esta práctica se cierra el bloque.

- [ ] El `<title>` de la portada es `020g-DOM-ParentNodeChildSibling` y el de la práctica nueva es `ejer07`
- [ ] La tagline de la portada no ha cambiado. La de `ejer07` es «El padre, los hijos y el hermano de al lado»
- [ ] El menú es el mismo en las ocho páginas. En cada práctica, la abierta no tiene `href` y tiene `aria-current="page"`
- [ ] `#resultado` tiene `white-space: pre-wrap` al final de la hoja de la tarjeta. La hoja de la página es la de `020f`
- [ ] Los scripts de `ejer01` a `ejer06` son los de `020f`
- [ ] `previousSibling` avisa que no es un elemento, y `previousElementSibling` lee «Elemento 1»
