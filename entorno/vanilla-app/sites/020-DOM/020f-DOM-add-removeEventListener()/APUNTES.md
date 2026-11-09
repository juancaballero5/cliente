# 020f — DOM: colgar un evento y poder quitarlo

## De qué va esta sesión

Partís de `020e`. Hasta ahora `addEventListener` se quedaba en el elemento mientras la página siguiera abierta. Hoy un botón lo cuelga y otro se lo quita.

El oyente es la función que se ejecuta cuando ocurre el evento. `removeEventListener` solo la encuentra si es la misma que colgasteis. Por eso `cambiarFondo` tiene nombre. Los clics de los dos botones siguen en flecha: esos no se quitan.

Si estáis pensando que habíamos quedado en flechas para todo, la flecha escrita dentro de `addEventListener` es una función nueva cada vez que se lee esa línea. No hay forma de señalarla después. La que hay que poder quitar se declara aparte, y los dos botones usan esa.

La tagline del bloque se queda. Las dos hojas de estilo no se tocan.

**URL:** `http://localhost:4300/020-DOM/020f-DOM-add-removeEventListener()/`

---

## Partís de 020e

Duplicad `020e-DOM-createElement()-append-removeChild()` y renombrad la copia a `020f-DOM-add-removeEventListener()`. El `<title>` de la portada es ese nombre, con los paréntesis. La tagline no cambia.

```html
<title>020f-DOM-add-removeEventListener()</title>
```

```html
<p class="header-tagline">Leer y cambiar el DOM</p>
```

`css/styles.css` y `ejercicios/css/styles.css` son los de `020e`. No los toquéis. Los scripts de `ejer01` a `ejer05` tampoco.

Recargad la portada. La pestaña lleva los paréntesis. La tercera línea sigue siendo «Leer y cambiar el DOM». El menú, de momento, tiene las cinco prácticas de ayer.

---

## El menú crece en las páginas que ya estaban

En el desplegable de la portada entra la práctica de hoy. `aria-haspopup="true"` y `aria-label="Submenú DOM"` no cambian.

```html
<li><a href="./ejercicios/ejer06/index.html">Activar y quitar el evento</a></li>
```

En `ejer05`, la entrada abierta sigue sin `href` y con `aria-current="page"`. La nueva lleva `href` a la carpeta hermana:

```html
<li><a aria-current="page">Crear y quitar nodos</a></li>
<li><a href="../ejer06/index.html">Activar y quitar el evento</a></li>
```

`ejer01` a `ejer04` reciben la misma entrada. Recargad `ejer05`. «Crear y quitar nodos» no cambia la URL. «Activar y quitar el evento» todavía no abre nada: esa carpeta es el paso siguiente.

---

## La práctica nueva

Cread `ejercicios/ejer06/` copiando la página de `ejer05`: mismo `head`, mismas dos hojas, el script con `defer`, la misma cabecera y el mismo pie. El `<title>` es `ejer06`. La tagline dice qué hace esta página.

```html
<meta name="description" content="Colgar un oyente y poder quitárselo">
<title>ejer06</title>
```

```html
<p class="header-tagline">Colgar un oyente y poder quitárselo</p>
```

En el menú, la entrada abierta es la de hoy. Las otras cinco vuelven a ser enlaces:

```html
<li><a href="../ejer01/index.html">Localizar por id</a></li>
<li><a href="../ejer02/index.html">Por clase o etiqueta</a></li>
<li><a href="../ejer03/index.html">El primero o todos</a></li>
<li><a href="../ejer04/index.html">Leer y escribir texto</a></li>
<li><a href="../ejer05/index.html">Crear y quitar nodos</a></li>
<li><a aria-current="page">Activar y quitar el evento</a></li>
```

El párrafo ya está en la página. El texto pide pasar el ratón, y de momento no pasa nada. `#resultado` empieza vacío.

```html
<button id="activar" type="button">Activar color de fondo</button>
<button id="desactivar" type="button">Desactivar evento</button>

<p id="zona">Pasa el ratón por encima de este párrafo para cambiar su color de fondo.</p>

<div id="resultado"></div>
```

Recargad y pasad el ratón por el párrafo. El fondo no cambia. El oyente todavía no está colgado.

---

## La función con nombre

Pedid los cuatro nodos. `cambiarFondo` pinta el párrafo y escribe en `#resultado`. No va dentro de un `addEventListener`: así la misma función sirve para colgar y para quitar.

```javascript
"use strict";

const activar = document.getElementById("activar");
const desactivar = document.getElementById("desactivar");
const zona = document.getElementById("zona");
const resultado = document.getElementById("resultado");

function cambiarFondo() {
  zona.style.backgroundColor = "lightblue";
  resultado.textContent = "Evento ejecutado: color de fondo aplicado.";
}
```

Recargad. Pasad el ratón: sigue sin color. En la consola podéis escribir `cambiarFondo()`. Ahí sí se pinta, porque la estáis llamando vosotros. Eso no es el evento del ratón. Si `zona` es `null`, el `id` no coincide y esa llamada rompe al leer `.style`.

---

## Activar cuelga mouseover

El botón de activar no pinta el color. Cuelga `cambiarFondo` en el evento `mouseover` del párrafo: el puntero entra en `#zona`.

```javascript
activar.addEventListener("click", () => {
  zona.addEventListener("mouseover", cambiarFondo);
  resultado.textContent = "Evento activado. Pasa el ratón por el párrafo.";
});
```

Recargad y pulsad «Activar color de fondo». `#resultado` cambia, y el párrafo todavía no. Pasad el ratón: el fondo pasa a azul claro y el aviso dice que el evento se ha ejecutado. Salid y volved a entrar: se vuelve a ejecutar. El oyente sigue ahí.

Pulsar «Activar» dos veces no deja dos `cambiarFondo`. `addEventListener` no apila la misma función en el mismo evento del mismo elemento.

---

## Quitar pide la misma función

`removeEventListener` compara tres cosas: el mismo elemento, el mismo nombre de evento y la misma función. `cambiarFondo` en el `add` y en el `remove` es la misma.

Quitar el oyente no borra el azul que ya se pintó. El archivo vacía el estilo en la misma función: `""` quita el color que el JavaScript había puesto en línea.

```javascript
desactivar.addEventListener("click", () => {
  zona.removeEventListener("mouseover", cambiarFondo);
  zona.style.backgroundColor = "";
  resultado.textContent = "Evento desactivado. Ya no se aplicará el color.";
});
```

Recargad. Activad, pasad el ratón y pulsad «Desactivar evento». El fondo vuelve al de la tarjeta y `#resultado` avisa. Pasad el ratón otra vez: no se pone azul. Si se pone, `removeEventListener` no ha dado con `cambiarFondo`.

Si en el `add` escribís una flecha y en el `remove` otra, son dos funciones distintas aunque el cuerpo se parezca. El `remove` no encuentra nada y el ratón sigue pintando. Si un lado dice `"mouseover"` y el otro `"mouseenter"`, tampoco coincide.

Volved a pulsar «Activar» y pasad el ratón. El color regresa: quitar el evento no borra la función, solo deja de escuchar.

---

## Si falla

| Qué veis | Qué revisar |
|----------|-------------|
| Al pasar el ratón, antes de activar, ya se pinta | `cambiarFondo` está colgada al cargar, fuera del botón |
| Tras desactivar, el ratón vuelve a pintar | El `remove` no usa la misma `cambiarFondo`, o el nombre del evento no es `"mouseover"` en los dos sitios |
| El aviso de desactivado sale y el azul se queda | Falta `zona.style.backgroundColor = ""`. Quitar el oyente no limpia el estilo |
| `cambiarFondo is not defined` | La función está dentro de otra. En el archivo va en el script, al mismo nivel que las constantes |
| `Cannot read properties of null` | Algún `getElementById` no coincide con el `id` del HTML |
| El pie de `ejer06` no es el de la portada | Se ha tocado la hoja de la tarjeta. Es la de `020e` |

---

## Entrega

La entrega es la carpeta `020f-DOM-add-removeEventListener()`. La portada sigue con «Leer y cambiar el DOM» y el menú abre las seis prácticas. En `ejer06`, el párrafo solo cambia de color después de activar, y deja de hacerlo después de desactivar.

- [ ] El `<title>` de la portada es `020f-DOM-add-removeEventListener()` y el de la práctica nueva es `ejer06`
- [ ] La tagline de la portada no ha cambiado. La de `ejer06` es «Colgar un oyente y poder quitárselo»
- [ ] El menú es el mismo en las siete páginas. En cada práctica, la abierta no tiene `href` y tiene `aria-current="page"`
- [ ] Las dos hojas de estilo son las de `020e`. Los scripts de `ejer01` a `ejer05` también
- [ ] `cambiarFondo` es una función con nombre, y `add` y `remove` usan esa misma
- [ ] Tras desactivar, pasar el ratón no vuelve a pintar el párrafo
