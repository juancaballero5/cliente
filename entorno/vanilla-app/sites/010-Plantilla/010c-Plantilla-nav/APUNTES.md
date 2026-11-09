# 010c — Plantilla: el menú

## De qué va esta sesión

La cabecera de ayer se queda como está. Debajo vais a colocar una barra marrón con cuatro enlaces en fila, sin viñetas y sin subrayado. Los tres primeros salen del ejercicio y abren documentación de JavaScript. El cuarto, «Ejercicios», apunta a una carpeta que todavía no existe. Vais a pulsarla, vais a ver que el servicio no encuentra esa página, y vais a dejar el enlace así. Las páginas de esa carpeta llegan en la sesión siguiente. Si las creáis hoy, ocultáis el fallo y mañana no sabréis si el enlace es el de esta clase.

El CSS de la cabecera no se reescribe. Se copia entero, con el comentario `/* 010b — header */` al principio. Lo nuevo va al final de la hoja, bajo un comentario `010c`. Si retocáis las reglas de arriba «para dejarlas más limpias», el siguiente ejercicio ya no coincidirá con el de hoy.

La tagline sí cambia. Ayer decía qué hacía la cabecera. Hoy tiene que decir qué hace este paso.

**URL:** `http://localhost:4300/010-Plantilla/010c-Plantilla-nav/`

---

## Partís de 010b

Duplicad la carpeta `010b-Plantilla-header` y renombrad la copia a `010c-Plantilla-nav`. En el `index.html` cambiad el título de la pestaña y la tercera frase de la cabecera:

```html
<title>010c-Plantilla-nav</title>
```

```html
<p class="header-tagline">Menú horizontal con enlaces</p>
```

Las dos primeras frases no se tocan: `Ejercicios – FUNDAMENTOS DE JS (ES6)` y `Desarrollo WEB en entorno cliente`. El `head`, la foto y `styles.css` vienen copiados. La hoja tiene solo las reglas de la cabecera. No añadáis nada todavía.

Abrid la URL de hoy. Tenéis que ver la misma franja azul de ayer, con la tagline nueva, y debajo nada más. Si la pestaña dice `010b-Plantilla-header`, estáis en la carpeta anterior. La barra de direcciones sigue empezando por `http://localhost:4300`.

---

## Paso 1 — La lista, todavía con viñetas

Debajo del `header`, y antes del comentario, escribid el menú. `nav` marca la zona de navegación. Por sí solo no pone los enlaces en fila ni les quita el subrayado: eso lo hará el CSS. Dentro va una lista, y cada elemento de la lista es un enlace.

```html
<nav>
  <ul class="navbar">
    <li><a href="https://www.w3schools.com/js/default.asp">w3schools</a></li>
    <li><a href="https://es.javascript.info/js">javascript.info</a></li>
    <li><a href="https://developer.mozilla.org/es/docs/Web/JavaScript">MDN</a></li>
    <li><a href="./ejercicios/">Ejercicios</a></li>
  </ul>
</nav>
```

`ul` es la lista. `li` es cada entrada. `a` es el enlace: el texto que se lee y la dirección a la que se va están en la misma etiqueta. La clase `navbar` es el nombre para el CSS, igual que `header-content` ayer. Hasta que no haya una regla con ese nombre, no cambia el aspecto.

Actualizad el comentario. La cabecera y el menú ya están. Quedan el contenido y el pie:

```html
<!-- Aquí irán main y footer en los siguientes bloques -->
```

Guardad y recargad. Debajo del azul aparece una lista vertical, con un punto delante de cada frase y los enlaces en azul subrayado. Ese punto y esa sangría los pone el navegador en toda lista. No los habéis pedido. Dentro de un rato los vais a quitar, y si ahora no los veis es que `styles.css` ya contiene alguna regla de lista que no tocaba.

---

## Paso 1b — Dos clases de dirección, y un 404 que se queda

Los tres primeros `href` empiezan por `https://`. Esa dirección es otro sitio, en otro servidor. No es un archivo de vuestra carpeta. Pulsad «w3schools»: el navegador se va de `localhost:4300`. Para volver al ejercicio usad el botón atrás del navegador. No abráis esos enlaces en otra pestaña por vuestra cuenta añadiendo `target`: el HTML del curso no lo lleva, y queremos ver la ida y la vuelta.

El cuarto enlace es distinto. `./ejercicios/` se lee desde la carpeta de este `index.html`, igual que `./css/styles.css` y `./img/user.png`. Pide una carpeta llamada `ejercicios` al lado del HTML. Esa carpeta no está creada.

Pulsad «Ejercicios». El servicio responde que no encuentra la página. Volved atrás. No creéis la carpeta para «arreglarlo». El enlace está bien escrito: lo que falta es la página, y esa página es el trabajo de la sesión siguiente. Si hoy aparece un directorio vacío o un `index.html` improvisado, mañana no podréis distinguir vuestro enlace del que escribisteis ahora.

---

## Paso 2 — Solo el marrón

Al final de `styles.css`, debajo de todo el bloque `010b`, añadid el comentario y una sola propiedad. No modifiquéis las reglas de la cabecera.

```css
/* 010c — nav base */

nav {
  background: #6a3d16;
}
```

`#6a3d16` es un marrón. Va a propósito en otro color que el azul de la cabecera: si las dos franjas fueran del mismo azul, el menú parecería un trozo más del `header` y no se vería dónde acaba uno y empieza el otro.

Recargad. Detrás de la lista hay una mancha marrón. Los puntos, el subrayado y la columna siguen ahí. Si el marrón no sale, la regla está por encima del comentario `010b` y el navegador está leyendo otra hoja, o no habéis recargado esta URL. Ctrl+F5 (en Mac, Cmd+Shift+R).

---

## Paso 3 — Quitar el punto, y ver que la sangría sigue

Debajo de la regla `nav`, escribid solo esto:

```css
.navbar {
  list-style: none;
}
```

`list-style: none` quita la marca de la lista, el punto. No quita el hueco de la izquierda. Ese hueco es un `padding` que el navegador aplica a todo `ul`, para que el texto no choque con el punto.

Recargad. Los puntos han desaparecido y el texto sigue desplazado a la derecha, dentro del marrón. Si también se ha pegado al borde izquierdo, ya teníais un `padding: 0` de antes. En este paso solo tenía que perderse el punto.

---

## Paso 3b — Quitar la sangría y el margen de la lista

Completad la regla `.navbar`. No creéis otra con el mismo nombre:

```css
.navbar {
  list-style: none;
  margin: 0;
  padding: 0;
}
```

`padding: 0` anula la sangría. `margin: 0` anula el margen que el `ul` trae arriba y abajo, el que separaría la barra marrón de la cabecera azul con una raya blanca.

Recargad. Las cuatro frases quedan pegadas al borde izquierdo del marrón, una debajo de otra, sin punto. Siguen siendo una columna. La fila es el paso siguiente, y usa el mismo `display: flex` que ayer puso el texto y la foto uno al lado del otro.

---

## Paso 4 — Los cuatro enlaces en fila

Añadid tres propiedades dentro de `.navbar`:

```css
.navbar {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
}
```

`display: flex` coloca los `li` en fila. `align-items: center` los centra en vertical si uno fuera más alto que otro. `flex-wrap: wrap` permite que, si la ventana es estrecha, bajen a una segunda línea en vez de salirse por la derecha de la página.

Recargad con la ventana ancha: una sola fila. Estrechad la ventana del navegador hasta que no quepan los cuatro. Tienen que pasar a una segunda línea, todavía dentro del marrón. Si se cortan por el borde, falta `flex-wrap`.

Debajo, añadid:

```css
.navbar li {
  margin: 0;
}
```

Un `li` casi nunca trae margen propio: el hueco que visteis al principio era del `ul`, y ya lo habéis quitado. Esta regla se nota poco, o nada. Se deja escrita para que un navegador que sí separe los `li` no vuelva a abrir un blanco entre enlaces. Si al recargar la fila no cambia, la regla está bien puesta.

---

## Paso 5 — El enlace ocupa un rectángulo

El subrayado y el azul de los enlaces siguen siendo los del navegador. La regla siguiente los sustituye, y solo en los enlaces que son hijos directos de la lista:

```css
.navbar > li > a {
  display: block;
  padding: 14px 16px;
  color: #f7f7f7;
  text-decoration: none;
}
```

El `>` no es un adorno. Significa «hijo directo», no «cualquier enlace que haya dentro». Hoy cada `a` es hijo directo de un `li`, así que `.navbar a` se vería igual. Mañana, dentro de uno de esos `li`, habrá otra lista con más enlaces. Esos no deben heredar este relleno ni este color claro. Por eso el selector se escribe ahora con los dos `>`, aunque hoy no veáis la diferencia.

`display: block` hace que el enlace sea una caja de ancho completo, no solo el ancho de la palabra. `padding: 14px 16px` es el aire: 14 píxeles arriba y abajo, 16 a los lados. Ese aire es también zona de clic. `color: #f7f7f7` pone el texto casi blanco, para que se lea sobre el marrón. `text-decoration: none` quita el subrayado. El navegador subraya los enlaces para señalarlos. En esta barra todos lo son, y el que está bajo el ratón lo vais a marcar de otra forma en el paso siguiente.

Recargad. Cuatro frases claras, sin subrayar, con sitio alrededor. Pasad el ratón por encima: el cursor cambia, pero el fondo no. Eso es lo que falta.

---

## Paso 6 — El fondo cuando el ratón está encima

Debajo de la regla anterior:

```css
.navbar > li > a:hover {
  background: rgba(255, 255, 255, 0.12);
}
```

`:hover` no es una clase que tengáis que escribir en el HTML. El navegador aplica esa regla solo mientras el puntero está sobre ese enlace. `rgba(255, 255, 255, 0.12)` es blanco muy transparente: aclara un poco el marrón de debajo, sin tapar la frase.

Recargad y moved el ratón a lo largo de la barra. El aclarado sigue al enlace que tenéis debajo. Al salir, vuelve el marrón liso. Si el aclarado no aparece, la regla no usa el mismo selector que la anterior, o le falta `:hover` pegado a la `a`.

Pulsad otra vez «Ejercicios». El aviso de página no encontrada tiene que seguir ahí. Los otros tres enlaces siguen llevándoos fuera, y el botón atrás os devuelve a la barra.

---

## Si falla

| Qué veis | Qué revisar |
|----------|-------------|
| No hay lista bajo la cabecera | El `nav` está en el `body` de 010c, debajo del `header` |
| Pestaña de 010b | La URL es la de hoy |
| Siguen los puntos | `list-style: none` en `.navbar` |
| Sigue la sangría izquierda | `padding: 0` en `.navbar` |
| Siguen en columna | `display: flex` en `.navbar` |
| Texto azul y subrayado | La regla `.navbar > li > a` tiene `color` y `text-decoration` |
| El fondo no reacciona al ratón | `:hover` en el mismo selector, con los `>` |
| «Ejercicios» abre una página vuestra | Habéis creado `ejercicios/` antes de tiempo. Hoy tiene que fallar |

---

## Entrega

La entrega es la carpeta `010c-Plantilla-nav`. En la URL de hoy se ve la cabecera azul y, debajo, la barra marrón con cuatro enlaces en fila. Al estrechar la ventana, los enlaces bajan de línea. «Ejercicios» no encuentra página. `styles.css` conserva intacto el bloque `010b` y termina con el comentario `/* 010c — nav base */`.

- [ ] El `<title>` es `010c-Plantilla-nav`
- [ ] La tagline es `Menú horizontal con enlaces`
- [ ] Las reglas nuevas están al final, sin reescribir la cabecera
- [ ] El enlace «Ejercicios» apunta a `./ejercicios/` y esa carpeta no existe
