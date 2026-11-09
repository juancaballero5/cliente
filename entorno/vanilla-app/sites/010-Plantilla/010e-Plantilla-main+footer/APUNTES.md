# 010e — Plantilla: título y pie

## De qué va esta sesión

La portada ya tiene cabecera, menú y una frase en el contenido. Le falta el título de esa zona y le falta el cierre de la página. Hoy el `h1` entra en la portada, y el pie entra en la portada y también en `ejer01` y en `ejer02`.

La hoja de estilos es una sola, y las tres páginas ya la enlazan. Las etiquetas no se copian solas. Si escribís el `<footer>` solo en la portada, al abrir un ejercicio el pie no está: esa página es otro archivo. Vais a verlo, y luego vais a repetir el mismo pie en los otros dos.

El CSS de la cabecera, de la barra y del submenú no se reescribe. Lo nuevo va al final, bajo un comentario `010e`. La tagline de la portada cambia. La de cada ejercicio se queda: esas páginas siguen siendo las de ayer, y el pie se les añade.

**URL:** `http://localhost:4300/010-Plantilla/010e-Plantilla-main+footer/`

---

## Partís de 010d

Duplicad `010d-Plantilla-nav+enlaces` y renombrad la copia a `010e-Plantilla-main+footer`. Entran con ella `css`, `img` y la carpeta `ejercicios`. En el `index.html` de la portada cambiad el título y la tagline:

```html
<title>010e-Plantilla-main+footer</title>
```

```html
<p class="header-tagline">Contenido con título y pie</p>
```

No toquéis todavía el `main` ni añadáis el pie. Abrid la URL de hoy. Tiene que verse la portada de ayer, con la tagline nueva, el submenú abriendo `ejer01` y `ejer02`, y sin franja al final de la página. Si el submenú no abre, estáis en la carpeta de 010d o se ha perdido el bloque `/* 010d — submenús */` al copiar.

---

## Paso 1 — El título, con el hueco que trae el navegador

En la portada, dentro de `section.intro`, escribid el `h1` antes del párrafo que ya estaba:

```html
<main>
  <section class="intro">
    <h1>Bienvenido</h1>
    <p>Selecciona un ejercicio desde el menú superior para empezar.</p>
  </section>
</main>
```

Este es el `h1` que venimos reservando desde la cabecera. Nombra el contenido de la portada. No va en el `header`, y no sustituye al `<title>` de la pestaña: la pestaña sigue diciendo `010e-Plantilla-main+footer`.

Guardad y recargad. «Bienvenido» aparece grande, y entre la barra marrón y esa palabra hay un hueco amplio. No lo habéis escrito. El navegador le da a todo `h1` un margen arriba y otro abajo. El de abajo separa el título del párrafo, y os sirve. El de arriba es el que sobra, porque `main` ya va a tener su propio aire. Todavía no lo quitéis: en el CSS vais a ver cómo desaparece solo el de arriba.

Abrid `ejer01` desde el submenú. Allí el `h1` ya existía desde ayer («Página en su carpeta») y también tiene ese hueco. No dupliquéis otro `h1` en esa página. Una página, un `h1`.

---

## Paso 2 — El pie solo en la portada

En la portada, después de `</main>` y antes de `</body>`, escribid el pie. Borrad el comentario que reservaba ese hueco: ya no reserva nada. No metáis el pie dentro de `main`. Cierra la página; no es contenido de la sección.

```html
<footer>
  © José García ☺
</footer>
```

`©` es el signo de copyright. El nombre es el del pie de esta plantilla. Si en la entrega tenéis que poner el vuestro, cambiad solo el nombre y dejad el signo y la etiqueta.

Recargad la portada. Debajo del párrafo, pegada a la izquierda y en negro, se lee esa línea. No es una franja: es texto suelto. No hay color, ni centrado, ni aire alrededor. Es lo que toca antes del CSS.

Abrid ahora «Página en su carpeta». Llegáis al final y no hay pie. La tagline, el `h1` y el enlace de vuelta están. El `<footer>` no. No es un fallo de la ruta: `ejer01` enlaza la misma hoja `../../css/styles.css`, pero el pie no vive en la hoja. Vive en cada HTML. La portada y el ejercicio no comparten el `body`.

---

## Paso 3 — El mismo pie en las dos páginas

En `ejercicios/ejer01/index.html` y en `ejercicios/ejer02/index.html`, después de `</main>`, añadid el mismo bloque:

```html
<footer>
  © José García ☺
</footer>
```

No cambiéis la tagline ni el `h1` de esas páginas. No copiéis el submenú de la portada: el `nav` de cada ejercicio sigue con los tres enlaces externos, como ayer.

Recargad `ejer01` y `ejer02`. El texto del pie ya está, igual de negro y pegado a la izquierda que en la portada. Volved a la portada y abrid el submenú: tiene que seguir cubriendo el párrafo sin empujarlo. Si el pie ha roto el submenú, el `<footer>` se ha colado dentro de `nav` o de `main`.

---

## Paso 4 — Aire alrededor del contenido

Al final de `styles.css`, sin tocar los comentarios `010b`, `010c` ni `010d`:

```css
/* 010e — main + footer */

main {
  padding: 1rem;
}
```

`1rem` es el tamaño de letra del documento, el mismo que ya usasteis en la cabecera. Suele equivaler a 16 píxeles. El `padding` empuja el contenido hacia dentro por los cuatro lados y separa el `h1` de los bordes de la ventana.

Recargad la portada. «Bienvenido» y el párrafo se separan un poco de la izquierda. El hueco grande de encima del `h1` sigue ahí: ese no es el `padding`, es el margen del título. Abrid `ejer01` sin cambiar de hoja. El mismo aire aparece, porque las tres páginas leen este `styles.css`. Si la portada cambia y `ejer01` no, esa página no está enlazando `../../css/styles.css`.

---

## Paso 5 — Quitar solo el margen de arriba del título

Debajo de la regla `main`:

```css
main h1 {
  margin-top: 0;
}
```

`main h1` es un título que esté dentro de `main`, no cualquier `h1` que pudierais escribir en la cabecera. `margin-top: 0` anula el margen superior. El margen inferior se queda, así que entre «Bienvenido» y el párrafo sigue habiendo separación.

Recargad la portada. El título sube y queda cerca de la barra, con el aire del `padding` y ya sin aquel hueco de más. Recargad `ejer01`: «Página en su carpeta» hace lo mismo. Una regla, las tres páginas, porque el `h1` ya estaba en las tres.

---

## Paso 6 — El pie, primero solo azul

Debajo, una regla que de momento solo pinte el fondo:

```css
footer {
  background: #2a5aa3;
}
```

`#2a5aa3` es el mismo azul de la cabecera. El pie y la cabecera son las dos bandas que enmarcan la página. El menú se queda marrón, entre las dos.

Recargad. El texto del pie sigue negro, a la izquierda, y ahora está sobre una mancha azul pegada al párrafo. El negro sobre ese azul se lee mal. No corrijáis el HTML: el color de la letra es el paso siguiente, en la misma regla.

---

## Paso 6b — Letra clara, texto al centro, aire

Completad la regla. No creéis un segundo `footer`:

```css
footer {
  background: #2a5aa3;
  color: rgba(255, 250, 250, 0.9);
  text-align: center;
  padding: 20px;
}
```

`color` es el mismo casi blanco de la cabecera. Lo hereda el texto del pie. `text-align: center` centra esa línea dentro de la franja. `padding: 20px` deja más aire que los 5 píxeles de la cabecera: el pie es una banda ancha, no una franja prieta.

Recargad la portada. Franja azul, texto claro, centrado. Abrid `ejer01` y `ejer02`: la misma franja, sin haber escrito CSS dentro de esas carpetas. Si en un ejercicio el pie sigue negro y a la izquierda, ese HTML no está cargando la hoja de la carpeta `010e`, o el `<footer>` no es la etiqueta que habéis escrito (un `div` no obedece la regla `footer`).

---

## Si falla

| Qué veis | Qué revisar |
|----------|-------------|
| La portada no tiene «Bienvenido» | El `h1` está dentro de `section.intro`, en el `index.html` de 010e |
| Sobra un hueco grande sobre el título | `main h1 { margin-top: 0; }` al final de la hoja |
| Pie negro, a la izquierda | La regla `footer` tiene `color`, `text-align` y `background` |
| Hay pie en la portada y no en `ejer01` | El `<footer>` está escrito también en ese archivo, después de `</main>` |
| `ejer01` no recibe el CSS nuevo | El `<link>` sigue siendo `../../css/styles.css` |
| El submenú ya no cubre el párrafo | El `<footer>` no se ha metido dentro de `nav` |

---

## Entrega

La entrega es la carpeta `010e-Plantilla-main+footer`. En la portada se lee «Bienvenido», la frase de siempre y el pie azul centrado. En `ejer01` y en `ejer02` el pie es el mismo, y sus títulos no han cambiado. `styles.css` conserva los bloques anteriores y termina con el comentario `/* 010e — main + footer */`.

- [ ] El `<title>` de la portada es `010e-Plantilla-main+footer`
- [ ] La tagline de la portada es `Contenido con título y pie`
- [ ] Hay un solo `h1` en cada página, dentro de `main`
- [ ] El `<footer>` está en la portada y en los dos ejercicios
- [ ] Las reglas nuevas están al final, sin reescribir cabecera, barra ni submenú
