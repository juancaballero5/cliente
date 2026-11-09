# 020c — DOM: el primero, o todos, con un selector

## De qué va esta sesión

Partís de `020b`. Ayer el nombre de la clase iba sin punto, porque `getElementsByClassName` no entiende CSS. Hoy el argumento vuelve a ser un selector: el punto entra otra vez. `querySelector` se queda con el primer nodo que cumple. `querySelectorAll` los trae todos.

La flecha, `addEventListener` y la tagline del bloque se quedan. Las hojas de estilo no se tocan.

**URL:** `http://localhost:4300/020-DOM/020c-DOM-querySelector-SelectorAll()/`

---

## Partís de 020b

Duplicad `020b-DOM-getElementsByClassName-TagName()` y renombrad la copia a `020c-DOM-querySelector-SelectorAll()`. El `<title>` de la portada pasa a ser el nombre de esta carpeta. La tagline no.

```html
<title>020c-DOM-querySelector-SelectorAll()</title>
```

```html
<p class="header-tagline">Leer y cambiar el DOM</p>
```

`css/styles.css` y `ejercicios/css/styles.css` son los de ayer. El script de `ejer01` y el de `ejer02` también: no los reescribáis. Si al copiar se pierde el `console.log` o las formas comentadas de `ejer02`, la copia no es la carpeta de `020b`.

Recargad la portada. La pestaña dice `020c-DOM-querySelector-SelectorAll()`. La tercera línea sigue siendo «Leer y cambiar el DOM». El menú, de momento, tiene las dos prácticas de ayer.

---

## El menú crece en las páginas que ya estaban

En el desplegable de la portada entra la práctica de hoy. `aria-haspopup="true"` y `aria-label="Submenú DOM"` no cambian.

```html
<li><a href="./ejercicios/ejer03/index.html">El primero o todos</a></li>
```

En `ejer01` y en `ejer02` la entrada abierta sigue sin `href` y con `aria-current="page"`. La nueva lleva `href` a la carpeta hermana. En `ejer02`:

```html
<li><a aria-current="page">Por clase o etiqueta</a></li>
<li><a href="../ejer03/index.html">El primero o todos</a></li>
```

Recargad `ejer02`. «Por clase o etiqueta» no cambia la URL. «El primero o todos» todavía no abre nada: esa carpeta es el paso siguiente.

---

## La práctica nueva

Cread `ejercicios/ejer03/` copiando la página de `ejer02`: mismo `head`, mismas dos hojas, el script con `defer`, la misma cabecera y el mismo pie. Cambiad lo que identifica a esta práctica. El `<title>` es `ejer03`. La tagline dice qué hace esta página.

```html
<meta name="description" content="El primero, o todos, con un selector">
<title>ejer03</title>
```

```html
<p class="header-tagline">El primero, o todos, con un selector</p>
```

En el menú, la entrada abierta es la de hoy. Las otras dos vuelven a ser enlaces:

```html
<li><a href="../ejer01/index.html">Localizar por id</a></li>
<li><a href="../ejer02/index.html">Por clase o etiqueta</a></li>
<li><a aria-current="page">El primero o todos</a></li>
```

El cuerpo de la tarjeta ya no es el de ayer. Hay dos párrafos con la clase `parrafo`, un párrafo con `id` y sin esa clase, y otro párrafo suelto que solo sirve de rótulo. `#resultado` empieza vacío.

```html
<button id="btnSelector" type="button">Usar querySelector()</button>
<button id="btnSelectorAll" type="button">Usar querySelectorAll()</button>

<h3>Ejemplo A</h3>
<p class="parrafo">Soy el primer párrafo.</p>
<p class="parrafo">Soy el segundo párrafo.</p>

<h3>Ejemplo B</h3>
<p id="especial">Soy un párrafo especial con ID.</p>
<p>PÁRRAFOS ENCONTRADOS:</p>
<div id="resultado"></div>
```

Recargad `ejer03`. Veis los dos botones y los cuatro textos. `#resultado` no se lee: está vacío. El párrafo especial no tiene la clase `parrafo`. Eso importa en cuanto el script busque por esa clase.

---

## Los botones, por id

El script está en `ejercicios/ejer03/js/script.js`. Los botones y el hueco del resultado siguen siendo uno cada uno. Se piden con `getElementById`. El archivo usa comillas simples. Funcionan igual que las dobles; copiad las que ya están, para que el archivo no mezcle.

```javascript
'use strict';

const btnSelector = document.getElementById('btnSelector');
const btnSelectorAll = document.getElementById('btnSelectorAll');
const resultado = document.getElementById('resultado');
```

Si alguno sale `null`, el `id` no coincide y el `addEventListener` de debajo rompe al cargar.

---

## querySelector se queda con el primero

El argumento es un selector CSS. La clase lleva punto, como en la hoja de estilos. Ayer ese punto sobraba. Hoy, sin punto, `querySelector` busca una etiqueta que se llame `parrafo`, no la encuentra y devuelve `null`.

```javascript
btnSelector.addEventListener('click', () => {
  const primerParrafo = document.querySelector('.parrafo');
  resultado.innerHTML = `<p>querySelector() encontró: <b>${primerParrafo.textContent}</b></p>`;
});
```

`querySelector` recorre el documento y para en el primer nodo que cumple. Aquí es «Soy el primer párrafo.». El segundo, el especial y el rótulo «PÁRRAFOS ENCONTRADOS:» no entran.

`innerHTML` no escribe letras sueltas. Interpreta el string y crea nodos. El `<b>` se vuelve una etiqueta de negrita. `textContent` en `#resultado` habría mostrado los caracteres `<b>` y `</b>`.

Recargad y pulsad «Usar querySelector()». Debajo del rótulo aparece la frase, con «Soy el primer párrafo.» en negrita. El segundo párrafo de arriba no se ha movido: sigue en su sitio. Lo que hay en `#resultado` es otro párrafo, creado por el string.

Si `primerParrafo` es `null`, la línea de `.textContent` rompe. El selector no ha coincidido con nada.

---

## querySelectorAll los trae todos, y forEach sí existe

`querySelectorAll('.parrafo')` no se queda con el primero. Devuelve una `NodeList` con los dos que tienen la clase. El especial no está, ni el rótulo de debajo: no tienen `parrafo`.

Ayer la `HTMLCollection` no tenía `forEach` y había que copiarla a un array. Esta `NodeList` sí tiene `forEach`. El archivo la recorre directamente.

```javascript
btnSelectorAll.addEventListener('click', () => {
  const todosParrafos = document.querySelectorAll('.parrafo');
  let salida = '<p>querySelectorAll() encontró:</p><ul>';
  todosParrafos.forEach((p) => {
    salida += `<li><b>${p.textContent}</b></li>`;
  });
  salida += '</ul>';
  resultado.innerHTML = salida;
});
```

El bucle no pinta cada párrafo según lo encuentra. Va armando un string. Al terminar, `innerHTML` crea de una vez el párrafo de título y una lista con dos elementos. Cada texto va en negrita porque el string lleva `<b>`.

Recargad y pulsad «Usar querySelectorAll()». La lista tiene «Soy el primer párrafo.» y «Soy el segundo párrafo.». No aparece «Soy un párrafo especial con ID.». Si pulsáis otra vez el primer botón, esa lista se sustituye: `innerHTML` reemplaza lo que hubiera dentro de `#resultado`.

Si estáis pensando que `querySelectorAll` también devuelve la colección de ayer, no. Ayer no había `forEach`. Si lo hubiera, el spread no haría falta. Aquí el `forEach` va sobre `todosParrafos`, sin `[...]`.

---

## Si falla

| Qué veis | Qué revisar |
|----------|-------------|
| `Cannot read properties of null` al pulsar el primer botón | `querySelector` ha devuelto `null`. El selector de la clase lleva punto: `'.parrafo'` |
| La lista incluye el párrafo especial | El selector no es `'.parrafo'`, o ese párrafo también tiene la clase |
| Se leen los caracteres `<b>` en la página | `#resultado` está recibiendo `textContent`. El archivo escribe con `innerHTML` |
| `forEach is not a function` | El recorrido es el de ayer, sobre una `HTMLCollection`. Aquí es `querySelectorAll`, y `forEach` va sobre esa `NodeList` |
| `Cannot set properties of null` al cargar | Algún `getElementById` no coincide con el `id` del HTML |
| El pie de `ejer03` no es el de la portada | Se ha tocado `ejercicios/css/styles.css`. Esa hoja es la de `020b` |

---

## Entrega

La entrega es la carpeta `020c-DOM-querySelector-SelectorAll()`. La portada sigue con «Leer y cambiar el DOM» y el menú abre las tres prácticas. `ejer01` y `ejer02` se comportan como en sus pasos. En `ejer03`, un botón muestra el primer `.parrafo` y el otro lista los dos.

- [ ] El `<title>` de la portada es `020c-DOM-querySelector-SelectorAll()` y el de la práctica nueva es `ejer03`
- [ ] La tagline de la portada no ha cambiado. La de `ejer03` es «El primero, o todos, con un selector»
- [ ] El menú es el mismo en las cuatro páginas. En cada práctica, la abierta no tiene `href` y tiene `aria-current="page"`
- [ ] Las dos hojas de estilo son las de `020b`. Los scripts de `ejer01` y de `ejer02` también
- [ ] `querySelector('.parrafo')` escribe el primer párrafo en negrita dentro de `#resultado`
- [ ] `querySelectorAll('.parrafo')` lista solo los dos de esa clase, y el párrafo especial no sale
