# 010f — Plantilla: texturas y tipografía

## De qué va esta sesión

La estructura ya está completa: cabecera, menú, submenú, contenido, pie y dos páginas. Hoy no añadís zonas nuevas. Cerráis el aspecto. La página gana una letra común, el texto de la portada se centra en una columna, y la cabecera y el pie cambian el azul liso por una textura.

Esas texturas no se pintan reescribiendo las reglas de `010b` y de `010e`. Esas reglas se quedan. La textura entra con una clase: `header` en la cabecera y `footer` en el pie. La clase gana al color de la etiqueta porque es más concreta, y el flex, el menú y el submenú siguen donde estaban.

La tagline de la portada cambia. Las de `ejer01` y `ejer02` no: esas páginas siguen diciendo lo que son. Lo que hay que repetir en ellas es la clase, igual que ayer hubo que repetir el `<footer>`.

**URL:** `http://localhost:4300/010-Plantilla/010f-Plantilla-estilos/`

---

## Partís de 010e

Duplicad `010e-Plantilla-main+footer` y renombrad la copia a `010f-Plantilla-estilos`. En el `index.html` de la portada cambiad el título y la tagline:

```html
<title>010f-Plantilla-estilos</title>
```

```html
<p class="header-tagline">Texturas y tipografía</p>
```

Copiad en `img/`, junto a `favicon.ico` y `user.png`, tres archivos: `bgwhite.png`, `bgblue.png` y `bglightblue.png`. Son baldosas pequeñas, de 16 píxeles. No son una foto grande. Todavía no las usa nadie.

Abrid la URL de hoy. Tiene que verse igual que ayer: azul liso, pie azul liso, submenú abriendo las dos páginas. Si ya veis textura, el CSS de `010f` se ha colado en la copia antes de tiempo. Borrad ese bloque final y dejad la hoja terminando en `/* 010e — main + footer */`.

---

## Paso 1 — Pedir la textura desde la carpeta equivocada

Al final de `styles.css`:

```css
/* 010f — estilos globales e imágenes de fondo */

body {
  background: url(./img/bgwhite.png) repeat;
}
```

`url()` no se lee desde el HTML. Se lee desde el archivo donde está escrita la regla, y ese archivo es `css/styles.css`. `./img/` significa «una carpeta `img` al lado de `styles.css`», o sea `css/img/`. Ahí no habéis copiado nada.

Guardad y recargad. La página sigue como ayer. Abrid la pestaña Red y buscad `bgwhite.png`. Sale en rojo, 404, y la ruta contiene `css/img/`. El fallo es el mismo de `ejer01` cuando el HTML pedía `./css/` desde dos niveles más abajo: el punto de partida no es el que creíais. No borréis la regla.

---

## Paso 1b — Salir de `css` y entrar en `img`

Sustituid la ruta. `../` sale de `css` y vuelve a la carpeta del ejercicio, donde sí está `img`:

```css
body {
  background: url(../img/bgwhite.png) repeat;
}
```

`repeat` repite la baldosa hasta llenar la página. Sin eso, una imagen de 16 píxeles se vería una sola vez.

Recargad con Ctrl+F5 (en Mac, Cmd+Shift+R). En Red, `bgwhite.png` tiene que responder 200. El cambio en la página es leve: la baldosa es casi blanca. Si la fuente aún no ha cambiado, es normal; el fondo claro no sustituye a la letra. Lo que confirma la regla es el 200, no un cambio dramático.

Esta ruta no se reescribe en `ejer01`. El navegador resuelve `../img/` desde `css/styles.css`, esté el HTML en la portada o dos carpetas más abajo. Si más adelante una práctica no muestra la textura y la portada sí, el fallo es el `<link>` de esa práctica, no un `../../../img/` dentro de la hoja.

---

## Paso 2 — La letra de toda la página

Completad la regla `body`:

```css
body {
  background: url(../img/bgwhite.png) repeat;
  font-family: Tahoma, Geneva, sans-serif;
  font-size: 14px;
}
```

`font-family` prueba las letras por orden. Si el ordenador tiene Tahoma, usa esa. Si no, Geneva. Si tampoco, una sans-serif, es decir una letra sin remates. `14px` es el tamaño del texto que hereda lo que no trae su propio tamaño. Los párrafos de `main` y el pie lo heredan. Las tres frases de la cabecera no: llevan `rem`, y el `rem` mira el tamaño de la raíz del documento, no el de `body`. Por eso la cabecera no encoge al poner 14 píxeles aquí.

Recargad la portada y ensanchad la ventana. El párrafo se lee en Tahoma, un poco más pequeño. Las tres líneas de la cabecera conservan su tamaño. Abrid `ejer01`: la misma letra, sin haber tocado su HTML. `body` no necesita una clase. La regla vale para las tres páginas en cuanto cargan esta hoja.

---

## Paso 3 — La columna se queda a la izquierda

Debajo de `body`:

```css
.intro {
  max-width: 720px;
}
```

`section.intro` ya estaba en la portada y en las dos prácticas desde el submenú. Hoy la clase por fin tiene regla. `max-width` impide que la sección crezca más de 720 píxeles. No la centra.

Recargad con la ventana bien ancha. «Bienvenido» y el párrafo forman una columna que no llega al borde derecho, y esa columna sigue pegada a la izquierda. Si la ventana es estrecha, no veréis el límite: 720 píxeles no caben y la sección ocupa todo el ancho. Ensanchar es parte de la comprobación.

---

## Paso 3b — Centrar la columna, y luego las palabras

Añadid el margen. `0` arriba y abajo, `auto` a los lados. El automático reparte el hueco que sobra a izquierda y derecha, y la columna se coloca en el centro. Sustituid la regla:

```css
.intro {
  max-width: 720px;
  margin: 0 auto;
}
```

Recargad, con la ventana ancha. La columna se ha ido al centro. Las palabras, dentro de ella, siguen alineadas a la izquierda. Son dos cosas distintas: el margen mueve la caja, no el texto.

Completad la regla:

```css
.intro {
  max-width: 720px;
  margin: 0 auto;
  padding: 1.5rem 1rem;
  text-align: center;
}
```

`text-align: center` centra las líneas dentro de la caja. El `padding` añade aire interior, además del que `main` ya tenía. Recargad. Título y párrafo quedan centrados en la columna. La cabecera no: está fuera de `.intro` y sigue en fila, con la foto a la derecha. Abrid `ejer01`: su `h1` también se centra, porque su `section` ya tenía la clase `intro`.

---

## Paso 4 — La textura de la cabecera, todavía sin clase

Debajo de `.intro`, escribid la regla y no toquéis el HTML:

```css
.header {
  background: url(../img/bgblue.png) repeat;
}
```

Recargad. La cabecera sigue azul lisa, la de `#2a5aa3`. La regla no ha fallado: no hay ningún elemento con `class="header"`. Igual que el primer día de las clases en los párrafos, el nombre no pinta hasta que el HTML lo usa. En Red podéis ver que `bgblue.png` ni siquiera se pide.

En la portada, añadid la clase a la etiqueta que ya existía. No creéis otra cabecera:

```html
<header class="header">
```

Recargad. El azul cambia: la baldosa es un azul más claro que el de ayer. Las tres frases siguen en el casi blanco de la regla `header` de `010b`, y sobre este azul claro se leen peor. La foto y la fila no se han perdido. La clase ha sustituido el `background`. No ha borrado el `display: flex` ni el `color`, porque vuestra regla nueva no los menciona. Una propiedad que no repetís sigue valiendo desde la regla antigua.

---

## Paso 4b — Blanco sólido y sombra, para que la letra tenga relieve

El casi blanco de `010b` es un poco transparente: el azul claro de la baldosa se transparenta en los trazos y las frases se lavan. No hace falta pintarlas de negro. Hace falta un blanco opaco y una sombra detrás.

Completad `.header`. No creéis otra regla, y no repitáis la sombra en cada párrafo: `text-shadow` se hereda, y los tres `p` están dentro de la cabecera.

```css
.header {
  background: url(../img/bgblue.png) repeat;
  color: #fff;
  text-align: center;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.75);
}
```

`#fff` es blanco del todo. Gana al color de la etiqueta `header`. `text-align: center` centra las tres frases dentro del hueco que deja la foto. No centra la foto: la fila de `010b` sigue empujándola a la derecha, y el bloque de texto, que ocupa el resto, alinea las palabras en su centro. La sombra se desplaza 2 píxeles a la derecha y 2 hacia abajo, y se difumina 4. El `0.75` la deja oscura sin volverla un borrón negro. Esa sombra es el relieve: separa la letra de la baldosa. No añadáis `font-weight` ni `opacity` a la tagline. La tercera línea ya va en grosor normal, y otra transparencia volvería a lavar el blanco que acabáis de afirmar. Tampoco repitáis `text-align` en cada párrafo: lo heredan de `.header`.

Recargad. Las tres frases se leen en blanco, centradas, con sombra, sobre el azul claro. La foto sigue a la derecha y no lleva sombra: no es texto. El pie no ha cambiado: sigue en el azul liso, con la letra clara.

---

## Paso 4c — Un velo uniforme encima de la baldosa

La letra ya se lee. La baldosa sigue siendo clara. Encima de ella va una capa negra muy transparente, la misma en toda la franja. Sustituid solo el `background` de `.header`. El color, el centrado y la sombra se quedan:

```css
.header {
  background:
    linear-gradient(0deg, rgba(0, 0, 0, 0.12), rgba(0, 0, 0, 0.12)),
    url(../img/bgblue.png) repeat;
  color: #fff;
  text-align: center;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.75);
}
```

Van dos fondos, en este orden: primero el que se pinta encima, después la imagen. `rgba(0, 0, 0, 0.12)` es negro al 12 %. Los dos extremos del `linear-gradient` son ese mismo color, así que no hay un degradado de oscuro a claro: es un velo plano. El ángulo `0deg` no cambia nada cuando los dos colores son iguales. Sirve para oscurecer un poco la baldosa y que el blanco y la sombra se separen de ella.

Recargad. El azul de la cabecera queda un punto más hondo. Si veis una franja que se aclara hacia un lado, los dos `rgba` no son iguales. Abrid `ejer01`. Su cabecera sigue como ayer, lisa y sin relieve. Esa etiqueta no tiene `class="header"`. La hoja sí ha llegado, porque la letra Tahoma y la columna centrada ya se ven. Lo que no se copia solo es el atributo `class` de cada archivo.

---

## Paso 5 — El pie, con la misma sombra y un velo más cerrado

En la portada, añadid la clase al pie:

```html
<footer class="footer">
```

Y la regla, de momento solo con la imagen:

```css
.footer {
  background: url(../img/bglightblue.png) repeat;
}
```

Recargad. El pie se vuelve un azul muy claro, casi blanco. La letra sigue siendo el casi blanco de la regla `footer` de ayer, porque esta regla nueva aún no dice `color`. Claro sobre claro no se lee. Es el mismo problema de la cabecera, más evidente.

Completad `.footer` con el mismo blanco y la misma sombra que la cabecera. El velo no puede ser el del 12 %: esta baldosa es casi blanca, y con esa capa la letra blanca seguiría sin leerse. Aquí el negro va al 55 %, plano otra vez, los dos extremos iguales. No copiéis `text-align` ni `padding`. Eso ya está en la regla `footer` de `010e`.

```css
.footer {
  background:
    linear-gradient(0deg, rgba(0, 0, 0, 0.55), rgba(0, 0, 0, 0.55)),
    url(../img/bglightblue.png) repeat;
  color: #fff;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.75);
}
```

Recargad. El nombre del pie se lee en blanco, centrado, con la misma sombra que las frases de la cabecera. La franja queda más oscura que la cabecera, a propósito: si no, el blanco se pierde. El centrado y los 20 píxeles de aire siguen viniendo de la regla `footer`, no de la clase.

---

## Paso 5b — La misma sombra en la barra

Los enlaces de la barra ya son claros sobre marrón. No hace falta cambiarles el color ni el relleno: eso quedó en `010c`. Solo se añade la sombra, en una regla que no repite lo demás.

```css
.navbar > li > a {
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.75);
}
```

El `>` es el de ayer: solo los enlaces de la barra, no los del submenú. Esos van en negro sobre blanco, y esta sombra negra ahí no se vería.

Recargad. Pasad el ratón por w3schools, javascript.info y MDN. La letra tiene el mismo relieve que la cabecera y el pie. Abrid `ejer01`: la barra también, sin tocar su HTML, porque la regla está en la hoja compartida.

---

## Paso 6 — Las clases en las dos páginas

Abrid `ejer01`. Tahoma, fondo claro y título centrado ya están. La cabecera y el pie, no. Añadid las dos clases en ese archivo, con las rutas que ya tenía:

```html
<header class="header">
```

```html
<footer class="footer">
```

Recargad `ejer01`. Cabecera y pie con textura, velo, letra blanca y sombra. Haced lo mismo en `ejer02`. No dupliquéis las imágenes dentro de `ejercicios`: `../img/` dentro de la hoja ya sube a la `img` de `010f`.

Volved a la portada. Abrid el submenú con el ratón y con Tab. Tiene que cubrir el párrafo y las dos entradas tienen que cambiar la URL. El bloque `/* 010d — submenús */` no se ha tocado. Si el panel queda detrás del texto, ese bloque se ha perdido al copiar la hoja.

---

## Si falla

| Qué veis | Qué revisar |
|----------|-------------|
| `bgwhite.png` en 404 dentro de `css/img/` | La ruta de la hoja es `../img/`, no `./img/` |
| La letra cambió y el fondo no | En Red, la baldosa tiene que estar en 200. Ctrl+F5 |
| La cabecera sigue azul lisa | La etiqueta lleva `class="header"` en ese HTML |
| La letra de la cabecera se lava sobre la textura | `.header` tiene `color: #fff` y `text-shadow` |
| El pie sigue ilegible sobre la baldosa clara | El velo de `.footer` es `0.55`, no el `0.12` de la cabecera, y la letra es `#fff` con `text-shadow` |
| La portada tiene textura y `ejer01` no | Las clases están también en el HTML de `ejer01` y de `ejer02` |
| El submenú ya no se abre | El comentario `/* 010d — submenús */` sigue en la hoja |

---

## Entrega

La entrega es la carpeta `010f-Plantilla-estilos`. En la portada y en las dos prácticas se ven la letra común, la columna centrada, y la cabecera y el pie con textura, velo, letra blanca y sombra. El submenú sigue abriendo `ejer01` y `ejer02`. `styles.css` conserva los bloques `010b` a `010e` y termina con el comentario `/* 010f — estilos globales e imágenes de fondo */`.

- [ ] El `<title>` de la portada es `010f-Plantilla-estilos`
- [ ] La tagline de la portada es `Texturas y tipografía`
- [ ] Las tres baldosas están en `img/` y la hoja las pide con `../img/`
- [ ] `class="header"` y `class="footer"` están en la portada y en los dos ejercicios
- [ ] No se han reescrito los bloques anteriores para meter las texturas

Aquí se cierra el bloque de la plantilla. La página que habéis montado es la base de lo que viene después. No se vuelve a construir desde cero.
