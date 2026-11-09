# 020e — DOM: crear un nodo, engancharlo y quitarlo

## De qué va esta sesión

Partís de `020d`. Ayer leíais y escribíais el texto de nodos que ya estaban en la página. Hoy el nodo no existe hasta que lo creáis. `createElement` lo fabrica. `appendChild` lo cuelga al final de la lista. `removeChild` lo quita.

Si estáis pensando que `innerHTML` ya creaba etiquetas, sí: interpretaba un string y sustituía lo de dentro. Aquí montáis el nodo primero y luego decidís dónde va. Los `<li>` que ya estaban no se reescriben.

La flecha, el menú y la tagline del bloque se quedan. Las dos hojas de estilo no se tocan.

**URL:** `http://localhost:4300/020-DOM/020e-DOM-createElement()-append-removeChild()/`

---

## Partís de 020d

Duplicad `020d-DOM-textContent, innerText e innerHTML` y renombrad la copia a `020e-DOM-createElement()-append-removeChild()`. El `<title>` de la portada es ese nombre, con los paréntesis. La tagline no cambia.

```html
<title>020e-DOM-createElement()-append-removeChild()</title>
```

```html
<p class="header-tagline">Leer y cambiar el DOM</p>
```

`css/styles.css` y `ejercicios/css/styles.css` son los de `020d`. `.oculto` sigue al final de la hoja de la tarjeta, porque `ejer04` sigue en este paso. No añadáis nada. Los scripts de `ejer01` a `ejer04` tampoco se reescriben.

Recargad la portada. La pestaña lleva los paréntesis. La tercera línea sigue siendo «Leer y cambiar el DOM». El menú, de momento, tiene las cuatro prácticas de ayer.

---

## El menú crece en las páginas que ya estaban

En el desplegable de la portada entra la práctica de hoy. `aria-haspopup="true"` y `aria-label="Submenú DOM"` no cambian.

```html
<li><a href="./ejercicios/ejer05/index.html">Crear y quitar nodos</a></li>
```

En `ejer04`, la entrada abierta sigue sin `href` y con `aria-current="page"`. La nueva lleva `href` a la carpeta hermana:

```html
<li><a aria-current="page">Leer y escribir texto</a></li>
<li><a href="../ejer05/index.html">Crear y quitar nodos</a></li>
```

`ejer01`, `ejer02` y `ejer03` reciben la misma entrada. Recargad `ejer04`. «Leer y escribir texto» no cambia la URL. «Crear y quitar nodos» todavía no abre nada: esa carpeta es el paso siguiente.

---

## La práctica nueva

Cread `ejercicios/ejer05/` copiando la página de `ejer04`: mismo `head`, mismas dos hojas, el script con `defer`, la misma cabecera y el mismo pie. El `<title>` es `ejer05`. La tagline dice qué hace esta página.

```html
<meta name="description" content="Crear un nodo, engancharlo y quitarlo">
<title>ejer05</title>
```

```html
<p class="header-tagline">Crear un nodo, engancharlo y quitarlo</p>
```

En el menú, la entrada abierta es la de hoy. Las otras cuatro vuelven a ser enlaces:

```html
<li><a href="../ejer01/index.html">Localizar por id</a></li>
<li><a href="../ejer02/index.html">Por clase o etiqueta</a></li>
<li><a href="../ejer03/index.html">El primero o todos</a></li>
<li><a href="../ejer04/index.html">Leer y escribir texto</a></li>
<li><a aria-current="page">Crear y quitar nodos</a></li>
```

La lista no empieza vacía. Esos dos `<li>` ya son nodos al cargar la página. `#resultado` empieza vacío.

```html
<button id="btnCrear" type="button">Crear nuevo elemento</button>
<button id="btnEliminar" type="button">Eliminar último elemento</button>

<ul id="lista">
  <li>Elemento inicial 1</li>
  <li>Elemento inicial 2</li>
</ul>

<div id="resultado"></div>
```

Recargad. Veis dos líneas. Lo que creéis después no está en este HTML: aparece cuando el script lo engancha.

---

## createElement no lo pinta

Los tres nodos se piden por `id`. El `<li>` nuevo se fabrica con el nombre de la etiqueta, sin corchetes angulares. Todavía no cuelga de la lista.

```javascript
"use strict";

const btnCrear = document.getElementById("btnCrear");
const btnEliminar = document.getElementById("btnEliminar");
const lista = document.getElementById("lista");
const resultado = document.getElementById("resultado");

btnCrear.addEventListener("click", () => {
  const nuevo = document.createElement("li");
  console.log(nuevo);
  console.log(nuevo.parentNode);
});
```

Recargad y pulsad «Crear nuevo elemento». La lista sigue con dos líneas. En la consola hay un `<li>` vacío, y `parentNode` es `null`: no cuelga de nadie. El inspector de la lista tampoco lo muestra. Si `lista` es `null`, el `id` no coincide y el paso siguiente rompe al llamar a `appendChild`.

Ese `console.log` es para verlo ahora. En el archivo no se queda: el clic de crear pasa directo a rellenar el nodo y colgarlo.

---

## Texto y appendChild

`textContent` rellena el nodo antes de colgarlo. El nombre de la carpeta dice *append*. El método del archivo es `appendChild`, y recibe el nodo que ya habéis creado. Lo deja como último hijo.

```javascript
btnCrear.addEventListener("click", () => {
  const nuevo = document.createElement("li");
  nuevo.textContent = "Nuevo elemento creado";
  lista.appendChild(nuevo);
  resultado.textContent = "Elemento creado y añadido a la lista.";
});
```

Recargad y pulsad. Sale una tercera línea, siempre con el mismo texto. Cada clic añade otra igual, al final. `#resultado` escribe la frase de aviso. En el inspector, el `<li>` nuevo es el último hijo de `#lista`. Los dos iniciales siguen ahí: `appendChild` no sustituye el interior de la lista, como haría `innerHTML`.

---

## El último elemento no es el último nodo

Entre los `<li>` del HTML hay saltos de línea. Esos saltos también son nodos, de texto, y no se ven. `lastChild` puede ser uno de ellos. `lastElementChild` es el último elemento, el último `<li>`.

En la consola, con la lista recién cargada:

```javascript
console.log(lista.lastChild);
console.log(lista.lastElementChild);
console.log(lista.children.length);
```

`lastElementChild` es el `<li>` de «Elemento inicial 2». `lastChild` es un texto en blanco, el salto de después de ese `<li>`. `children` son solo elementos: `length` vale 2. `childNodes` cuenta también los saltos, y sale más alto.

Esas tres líneas no van en el archivo. Sirven para ver por qué el botón de eliminar no usa `lastChild`. Si lo usara, el primer clic quitaría el salto y la lista se vería igual.

---

## removeChild pide el nodo, y la lista puede estar vacía

`removeChild` no recibe un número ni un selector. Recibe el nodo que queréis sacar. `children` son los elementos hijos. Si `length` es 0, `lastElementChild` es `null` y `removeChild` no acepta `null`.

```javascript
btnEliminar.addEventListener("click", () => {
  if (lista.children.length > 0) {
    const ultimo = lista.lastElementChild;
    lista.removeChild(ultimo);
    resultado.textContent = "Último elemento eliminado.";
  } else {
    resultado.textContent = "No hay elementos que eliminar.";
  }
});
```

Recargad. Cread uno y eliminad. Desaparece el último, el que acabáis de crear. Seguid: también se van «Elemento inicial 2» y «Elemento inicial 1». Esos también son hijos de la lista.

Eliminad hasta vaciarla y pulsad una vez más. La página no rompe: `#resultado` dice que no hay elementos. Cread otro: vuelve a colgarse al final, aunque la lista hubiera quedado vacía.

---

## Si falla

| Qué veis | Qué revisar |
|----------|-------------|
| El clic de crear no añade ninguna línea | Falta `appendChild`. `createElement` solo fabrica el nodo |
| Cada clic sustituye el texto de la lista en vez de añadir una línea | Estáis escribiendo `innerHTML` de `#lista`. El archivo usa `appendChild` |
| Eliminar no quita el `<li>` y la lista parece igual | Estáis pasando `lastChild`. El archivo usa `lastElementChild` |
| `Failed to execute 'removeChild'` con la lista vacía | Falta el `if` de `children.length` |
| `Cannot read properties of null` al cargar | Algún `getElementById` no coincide con el `id` del HTML |
| El pie de `ejer05` no es el de la portada | Se ha tocado la hoja de la tarjeta. Es la de `020d` |

---

## Entrega

La entrega es la carpeta `020e-DOM-createElement()-append-removeChild()`. La portada sigue con «Leer y cambiar el DOM» y el menú abre las cinco prácticas. En `ejer05`, «Crear nuevo elemento» añade un `<li>` al final y «Eliminar último elemento» quita ese último, o avisa si la lista está vacía.

- [ ] El `<title>` de la portada es `020e-DOM-createElement()-append-removeChild()` y el de la práctica nueva es `ejer05`
- [ ] La tagline de la portada no ha cambiado. La de `ejer05` es «Crear un nodo, engancharlo y quitarlo»
- [ ] El menú es el mismo en las seis páginas. En cada práctica, la abierta no tiene `href` y tiene `aria-current="page"`
- [ ] Las dos hojas de estilo son las de `020d`. Los scripts de `ejer01` a `ejer04` también
- [ ] Crear no pinta nada hasta `appendChild`
- [ ] Eliminar con la lista vacía escribe el aviso y no lanza error en la consola
