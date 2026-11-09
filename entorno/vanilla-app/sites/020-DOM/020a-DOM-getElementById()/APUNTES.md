# 020a — DOM: localizar un elemento por su id

## De qué va esta sesión

Partís de `010f`. La página que cerrasteis sigue igual de aspecto: la misma cabecera, el mismo fondo, el mismo pie. Hoy no retocáis esas texturas.

Lo que cambia es el bloque. La portada deja de presentarse como plantilla y pasa a decir de qué va el DOM. En la práctica, el texto que explicaba la carpeta desaparece. En su sitio hay seis botones y un párrafo. Cada botón se localiza por su `id` y engancha el clic de una manera distinta.

Los seis escriben la misma frase en el párrafo. En la página, esa frase no os dice qué forma habéis usado. La diferencia está en la consola. El último botón, además, escribe dentro del propio botón: eso no se lee en el rótulo, se lee en el inspector.

**URL:** `http://localhost:4300/020-DOM/020a-DOM-getElementById()/`

---

## Partís de 010f

Duplicad `010f-Plantilla-estilos` y renombrad la copia a `020a-DOM-getElementById()`. En la portada, el `<title>` es el nombre de esa carpeta. La descripción y la tagline dejan de hablar de la plantilla. Hablan del bloque, y esta frase se queda en la portada de todos los pasos del DOM.

```html
<meta name="description" content="Leer y cambiar el DOM">
<title>020a-DOM-getElementById()</title>
```

```html
<p class="header-tagline">Leer y cambiar el DOM</p>
```

El título de la cabecera y el subtítulo no se tocan. Siguen siendo «Ejercicios – FUNDAMENTOS DE JS (ES6)» y «Desarrollo WEB en entorno cliente».

Recargad la portada. La tercera línea dice «Leer y cambiar el DOM». La pestaña dice `020a-DOM-getElementById()`. El desplegable, de momento, sigue como en `010f`.

---

## El desplegable pasa a llamarse DOM

En `010f` el asa decía «Ejercicios», la lista se llamaba «Submenú de ejercicios» y había dos entradas: «Página en su carpeta» y «Otra página, otra URL». Este paso solo tiene una práctica. La segunda carpeta, `ejercicios/ejer02`, no sigue: fuera de la copia no aporta nada y el enlace se quedaría apuntando a una página de la plantilla.

Sustituid el `li` del desplegable por este:

```html
<li class="dropdown">
  <a href="#" aria-haspopup="true">DOM</a>
  <ul class="dropdown-content" aria-label="Submenú DOM">
    <li><a href="./ejercicios/ejer01/index.html">Localizar por id</a></li>
  </ul>
</li>
```

`href="#"` ya lo visteis: no pide otro archivo. `aria-haspopup="true"` tampoco se ve. Va en el enlace que abre la lista y le dice a un lector de pantalla que ahí se despliega un submenú, no que navega a otra página. `aria-label` es el nombre de la `ul`, porque esa lista no tiene un título a la vista. En `010f` era «Submenú de ejercicios» porque el asa se llamaba Ejercicios. Ahora el bloque es DOM, y el nombre tiene que coincidir con lo que leéis.

Recargad. Abrid el desplegable: una sola entrada, «Localizar por id». En la página no aparecen los dos atributos. Abrid el inspector, seleccionad el enlace DOM y luego la `ul`. Ahí están.

---

## La práctica deja de explicar la carpeta

En `010f`, `ejer01` tenía la tagline «Página en su carpeta», un `<section class="intro">` y el enlace a la portada suelto dentro del `main`. El `<title>` ya era `ejer01`. Ese título se queda. La tagline no: en la práctica dice qué hace esta página, no qué hace el bloque.

```html
<meta name="description" content="Localizar un elemento por su id">
<title>ejer01</title>
```

```html
<p class="header-tagline">Localizar un elemento por su id</p>
```

Recargad `ejer01`. Arriba dice «Localizar un elemento por su id». Volved a la portada: ahí sigue «Leer y cambiar el DOM». Son dos frases distintas a propósito.

---

## El texto de la plantilla pasa a ser una tarjeta

El `main` de `ejer01` ya no es esa sección. Es una tarjeta: un título, seis botones y un párrafo. El enlace a la portada baja al pie de la tarjeta. Sigue yendo a `../../index.html`, el mismo sitio que en `010f`.

```html
<main>
  <div class="container">
    <div class="card">
      <h1 class="cardTitle">Uso básico de getElementById()</h1>
      <div class="cardBody">
        <input id="asignaF" type="button" value="asignaF">
        <input id="defineF" type="button" value="defineF">
        <input id="escucha" type="button" value="escucha">
        <input id="enLlamada" type="button" value="enLlamada">
        <input id="Farrow" type="button" value="Farrow">
        <input id="variableE" type="button" value="variableE">
        <p id="resultado">(Aquí se mostrará el resultado del ejercicio)</p>
      </div>
      <div class="cardFooter">
        <a href="../../index.html">&gt;&gt; Página principal</a>
      </div>
    </div>
  </div>
</main>
```

Son `<input type="button">`. El rótulo que veis es el atributo `value`, no un texto metido entre dos etiquetas. El `id` es el nombre con el que el script va a pedir ese nodo. No lleva `#`.

Si recargáis ahora, la tarjeta aún no parece una tarjeta. `ejer01` en `010f` solo enlazaba `../../css/styles.css`, y esa hoja no conoce `.card`.

---

## La tarjeta tiene su propia hoja

Cread `ejercicios/css/styles.css`. No es un añadido al final de la hoja de la portada. Es otro archivo, y solo pinta la tarjeta: la caja, el título, el cuerpo y el pie de la tarjeta. No define `.footer`, ni `.header`, ni una media query de la página. Si lo hiciera, el pie de la práctica dejaría de ser el de la portada, porque esta hoja se carga después y ganaría.

```css
/* === TARJETAS (ESTILO EJERCICIOS) === */
.container {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 16px;
  padding: 20px;
}

.card {
  display: inline-flex;
  flex-direction: column;
  justify-content: space-between;
  border: 1px solid rgba(42, 90, 163, 0.25);
  box-shadow: 2px 2px 8px 4px rgba(0, 0, 0, 0.15);
  border-radius: 15px;
  background-color: #ffffff;
}

.cardTitle {
  font-size: 24px;
  padding: 10px 10px 0 10px;
  margin: 0;
  color: #2a5aa3;
  font-weight: bold;
}

.cardBody {
  padding: 10px;
  flex: 1 1 100%;
}

.cardFooter {
  background: rgba(42, 90, 163, 0.05);
  border-radius: 0 0 15px 15px;
  padding: 10px;
  text-align: center;
}

.cardFooter a {
  text-decoration: none;
  color: #2a5aa3;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.2);
}

.cardFooter a:hover {
  text-decoration: underline;
}
```

En `ejer01`, el enlace de esta hoja va después del de la página:

```html
<link rel="stylesheet" href="../../css/styles.css">
<link rel="stylesheet" href="../css/styles.css">
```

Recargad. La caja es blanca, con el borde y la sombra. El pie de la página, el de «© José García», sigue siendo el oscuro de la portada. «Página principal» está en la franja clara de la tarjeta. Si el pie de la página se ha aclarado, la hoja de la tarjeta ha definido `.footer`.

---

## En la práctica, el menú es el mismo

En `010f`, `ejer01` y `ejer02` no llevaban el desplegable. Solo tenían los tres enlaces de fuera. Desde este bloque, la práctica muestra el mismo menú que la portada, para poder abrir cualquier ejercicio desde cualquiera.

La entrada de la página en la que estáis sigue en la lista, y no lleva `href`. Sin `href` no hay destino.

```html
<li class="dropdown">
  <a href="#" aria-haspopup="true">DOM</a>
  <ul class="dropdown-content" aria-label="Submenú DOM">
    <li><a aria-current="page">Localizar por id</a></li>
  </ul>
</li>
```

`aria-current="page"` tampoco se ve. Quitar el `href` impide el salto. Este atributo dice que esa entrada es la página actual. Va solo aquí. En la portada, la misma entrada sí lleva `href`, porque desde allí sí hay que abrir la práctica.

La regla que lo pinta va al final de `css/styles.css`, la hoja de la página, no en la hoja de la tarjeta:

```css
/* 020a — la práctica abierta no se vuelve a pulsar */

.dropdown-content a[aria-current="page"] {
  color: #6a3d16;
  background: #f4f4f4;
  cursor: default;
  pointer-events: none;
}
```

`pointer-events: none` hace que el puntero no dispare ese enlace. Recargad `ejer01`, abrid DOM y pulsad «Localizar por id». La URL no cambia. En el inspector, ese `<a>` no tiene `href` y sí tiene `aria-current="page"`. En la portada, la misma frase sí abre la práctica.

---

## El script espera a que el HTML exista

El script va en el `head`, con `defer`. Sin `defer`, el navegador lo ejecuta al llegar a esa línea, el `body` todavía no se ha leído y `getElementById` devuelve `null`. Con `defer`, espera a tener el documento y luego corre.

```html
<script defer src="./js/script.js"></script>
```

El archivo es `ejercicios/ejer01/js/script.js`. Empieza en modo estricto y pide los siete nodos. El argumento de `getElementById` es el `id` tal como está en el HTML, sin `#` y sin punto. Devuelve un nodo, o `null` si ese `id` no está.

```javascript
"use strict";

const asignaF = document.getElementById("asignaF");
const defineF = document.getElementById("defineF");
const escucha = document.getElementById("escucha");
const enLlamada = document.getElementById("enLlamada");
const Farrow = document.getElementById("Farrow");
const variableE = document.getElementById("variableE");
const resultado = document.getElementById("resultado");
```

Recargad y abrid la consola. No tiene que haber ningún `Cannot set properties of null`. Si lo hay, el `id` del HTML y el texto de `getElementById` no son el mismo, o el script ha corrido antes del `body`.

---

## Una función con nombre, guardada en onclick

`onclick` es una propiedad del botón. Ahí cabe una función, una sola. La estáis guardando, no llamándola: el nombre va sin paréntesis. Con paréntesis, la función correría al cargar y en `onclick` quedaría lo que devuelve, que es nada.

El nombre de la función es el del archivo, con esa grafía. Las dos apariciones tienen que coincidir.

```javascript
// Se asigna una función con nombre directamente a la propiedad del evento en el
// objeto del DOM
asignaF.onclick = mostrarAsingarF;

function mostrarAsingarF() {
  console.log("Asignando una función");
  resultado.textContent = "¡Has pulsado el botón correctamente!";
}
```

`textContent` cambia el texto del nodo. En un párrafo sí se ve en la página.

Recargad y pulsad `asignaF`. La consola escribe `Asignando una función`. El párrafo deja la frase de aviso y muestra «¡Has pulsado el botón correctamente!».

Si estáis pensando en colgar otra función al mismo `onclick`, la segunda escritura sustituye a la primera. Por eso cada forma va en su botón.

---

## La función, escrita en la propia asignación

Esta no tiene nombre fuera. Se crea en la línea del `onclick`. Por lo demás hace lo mismo: una función, guardada sin llamarla.

```javascript
// Definiendo la función directamente sin asignarle un nombre global
defineF.onclick = function () {
  console.log("Definiendo función directamente");
  resultado.textContent = "¡Has pulsado el botón correctamente!";
};
```

Recargad y pulsad `defineF`. La consola escribe `Definiendo función directamente`. El párrafo muestra la misma frase. En la página no se distingue de `asignaF`. La diferencia es el texto de la consola, y que esta función no tiene un nombre al que podáis llamar desde otra línea.

---

## addEventListener no sustituye al anterior

`addEventListener` no guarda la función en una propiedad. La registra para un tipo de evento, aquí `"click"`. Si más adelante registráis otra para el mismo tipo, las dos se quedan. Con `onclick`, la segunda habría borrado a la primera.

```javascript
// Estándar moderno. addEventListener permite vincular múltiples escuchadores al
// mismo evento sin sobrescribir los anteriores
escucha.addEventListener("click", mostrarEscucha);

function mostrarEscucha() {
  console.log("Estandar Moderno. Multiples escuchadores, que no manejadores");
  resultado.textContent = "¡Has pulsado el botón correctamente!";
}
```

Otra vez el nombre va sin paréntesis. Recargad y pulsad `escucha`. Consola: `Estandar Moderno. Multiples escuchadores, que no manejadores`. El párrafo, la misma frase.

---

## La función, dentro de addEventListener

El cuarto botón junta las dos ideas anteriores: la función se escribe en la llamada, y el registro es `addEventListener`, no `onclick`.

```javascript
// Definiendo la función dentro de la llamada en lugar de referenciar una
// función externa
enLlamada.addEventListener("click", function () {
  console.log("Función en la llamada");
  resultado.textContent = "¡Has pulsado el botón correctamente!";
});
```

Recargad y pulsad `enLlamada`. Consola: `Función en la llamada`. Esta función es normal, con la palabra `function`. Dentro de ella, `this` es el botón al que se la habéis colgado. No hace falta usarlo: el párrafo se alcanza por la constante `resultado`, que está fuera.

---

## La flecha no tiene this propio

La flecha es otra forma de escribir la función. No lleva `function` ni nombre. Ve `resultado` porque esa constante está fuera, y la flecha lee lo de fuera igual que las otras.

No tiene `this` propio. Usa el del sitio donde está escrita. Este script está en el nivel de arriba de la página, y ahí `this` es `window`, la ventana del navegador, no el botón. `this.disabled = true` dentro de esa flecha no apagaría el botón: estaría hablando de la ventana.

```javascript
// Es la forma más moderna y común en el desarrollo actual con JavaScript (ES6+)
Farrow.addEventListener("click", () => {
  console.log(this);
  console.log("Funciones arrow");
  resultado.textContent = "¡Has pulsado el botón correctamente!";
});
```

Recargad y pulsad `Farrow`. La consola muestra primero `Window` y debajo `Funciones arrow`. El párrafo se actualiza. Esas dos líneas de consola se quedan: son las que distinguen este botón.

A partir de aquí, cuando el ejercicio solo tenga que localizar un nodo y escribir en otro, la forma es esta: `addEventListener` y la flecha. El botón se pide por `id`. La flecha no usa `this`.

---

## El botón, a través del evento

El último también es una flecha. Para hablar del botón no usa `this`, que volvería a ser la ventana. Usa el evento. `e` es el clic. `e.currentTarget` es el nodo donde registrasteis el oyente: el botón `variableE`.

```javascript
// Accediendo al botón a través del evento en una arrow function
variableE.addEventListener("click", (e) => {
  console.log(e);
  console.log("Usando la variable de evento (e)");
  e.currentTarget.textContent = "¡Cambiado!";
  resultado.textContent = "¡Has pulsado el botón correctamente!";
});
```

Recargad y pulsad `variableE`. La consola muestra el evento y la frase. El párrafo cambia, como en los otros cinco. El rótulo del botón sigue diciendo `variableE`.

Abrid el inspector y seleccionad ese `<input>`. Dentro aparece el texto `¡Cambiado!`. `textContent` sí ha escrito en el nodo. Lo que el navegador pinta en un `<input type="button">` es `value`, y `value` sigue siendo `variableE`. Por eso el rótulo no cambia. La frase de la página sale del párrafo, que sí es un nodo de texto.

`e.target` aquí coincide con `e.currentTarget`: el clic ha nacido en el propio input, y el input no tiene hijos. Cuando el oyente está en un padre y el clic nace en un hijo, `target` es el hijo y `currentTarget` sigue siendo el padre. Para hablar del botón al que enganchasteis la flecha, la que vale es `currentTarget`.

---

## Si falla

| Qué veis | Qué revisar |
|----------|-------------|
| Al cargar, `Cannot set properties of null` | El `id` del HTML y el de `getElementById` no coinciden, o el script no lleva `defer` |
| La frase sale al recargar, sin pulsar | Detrás del nombre de la función hay paréntesis: la estáis llamando al cargar |
| Pulsáis `asignaF` y no arranca vuestra función | El nombre guardado en `onclick` y el de `function` no son el mismo |
| `Farrow` no muestra `Window` | Dentro de la flecha no está `console.log(this)`, o la función se ha escrito con `function` |
| `variableE` no cambia su rótulo | Es lo previsto. `textContent` no pinta un `<input type="button">`. Lo que se lee es `value`. `¡Cambiado!` está en el inspector |
| El párrafo de `variableE` no cambia | Falta `resultado.textContent` en esa flecha |
| La tarjeta no tiene sombra | `ejer01` no enlaza `../css/styles.css` después de la hoja de la página |
| El pie de la práctica no es el de la portada | `ejercicios/css/styles.css` ha definido `.footer` o `.header` |
| En `ejer01`, «Localizar por id» recarga la página | Esa entrada no lleva `href`, tiene `aria-current="page"`, y la regla del final de `css/styles.css` incluye `pointer-events: none` |
| El desplegable dice Ejercicios | El asa es DOM y el `aria-label` de la lista es «Submenú DOM» |

---

## Entrega

La entrega es la carpeta `020a-DOM-getElementById()`. La portada abre la práctica. En `ejer01`, cada botón deja su línea en la consola. Los seis escriben la frase en el párrafo. `variableE`, además, deja `¡Cambiado!` dentro del input: se ve en el inspector, no en el rótulo.

- [ ] El `<title>` de la portada es `020a-DOM-getElementById()` y el de la práctica es `ejer01`
- [ ] La tagline de la portada es «Leer y cambiar el DOM» y la de `ejer01` es «Localizar un elemento por su id»
- [ ] No queda `ejercicios/ejer02`. El desplegable dice DOM y tiene una entrada, «Localizar por id»
- [ ] En `ejer01`, esa entrada no tiene `href` y tiene `aria-current="page"`. En la portada, sí abre la práctica
- [ ] `css/styles.css` es el de `010f` más la regla de `aria-current` al final
- [ ] `ejercicios/css/styles.css` solo pinta la tarjeta, y `ejer01` la enlaza después de la hoja de la página
- [ ] El script lleva `defer` y `"use strict"`, y cada botón tiene un solo manejador
