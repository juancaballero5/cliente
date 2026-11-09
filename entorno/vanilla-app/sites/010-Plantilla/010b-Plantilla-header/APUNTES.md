# 010b — Plantilla: la cabecera

## De qué va esta sesión

Ayer la página estaba en blanco a propósito. Hoy vais a ocupar solo la franja de arriba: tres líneas con los textos del curso y una foto a la derecha, sobre un azul. El menú, el contenido y el pie siguen sin existir. Si al recargar veis algo debajo de esa franja, os habéis adelantado.

El `head` no se vuelve a montar. Se copia del ejercicio anterior y solo cambia el título de la pestaña, para que coincida con la carpeta nueva. La hoja `styles.css` sigue siendo la misma idea: un archivo enlazado desde el HTML. Ayer estaba vacío. Hoy escribís dentro la primera tanda de reglas, bajo un comentario que pone `010b`, y no borréis ese comentario cuando acabéis. Las sesiones siguientes añadirán las suyas debajo.

**URL:** `http://localhost:4300/010-Plantilla/010b-Plantilla-header/`

---

## Partís de 010a

Duplicad la carpeta `010a-Plantilla-HTML5` y renombrad la copia a `010b-Plantilla-header`. Si preferís partir del kit, abrid esa carpeta y vaciad el `body` y `styles.css` antes de seguir: si dejáis la cabecera ya pintada, no veréis qué cambia en cada paso.

En el `index.html` copiado, cambiad únicamente el texto del `<title>`:

```html
<title>010b-Plantilla-header</title>
```

El resto del `head` se queda igual: charset, viewport, descripción, icono y el `<link>` de `./css/styles.css`. `styles.css` sigue vacío. Copiad también `user.png` dentro de `img/`, junto al icono que ya trajisteis de 010a. La foto es un cuadrado de 512 píxeles. Ahora mismo no se usa, y por eso no la veis.

Abrid la URL de hoy, no la de ayer. La barra tiene que seguir empezando por `http://localhost:4300`. La página está en blanco y la pestaña dice `010b-Plantilla-header`. Si la pestaña dice `010a-Plantilla-HTML5`, estáis mirando el ejercicio anterior.

---

## Paso 1 — Tres frases, todavía negras

Sustituid el contenido del `body` por una cabecera con tres párrafos. Todavía sin clases y sin foto:

```html
<body>
  <header>
    <p>Ejercicios – FUNDAMENTOS DE JS (ES6)</p>
    <p>Desarrollo WEB en entorno cliente</p>
    <p>Cabecera con textos y foto</p>
  </header>
</body>
```

Guardad y recargad. Arriba a la izquierda aparecen las tres frases, en negro, una debajo de otra, con un hueco entre ellas. Ese hueco no lo habéis escrito. Lo pone el navegador: todo párrafo trae un margen de serie. Dentro de un rato lo vais a anular, y entonces veréis las tres líneas juntas. Si ahora ya estuvieran pegadas, el margen no estaría actuando y habría que mirar si el CSS de ayer dejó alguna regla. Tiene que estar vacío.

---

## Paso 1b — Por qué son párrafos, y por qué la clase aún no se nota

Esas tres líneas no son el título de esta página. El título de la página ya está en la pestaña. Las dos primeras se van a repetir en todas las prácticas del curso: son la marca, no el nombre del ejercicio. La tercera, la tagline, no se repite. Resume lo que estáis construyendo en este paso. Hoy es la cabecera, con los textos y la foto. En la sesión siguiente la cambiaréis por una frase de ese día.

Por eso no uséis `h1`, ni `h2`, ni `h3` dentro de la cabecera. El `h1` llegará más adelante, dentro del contenido, y nombrará la página que estéis viendo. Si lo gastáis hoy en la franja azul, ese hueco ya no estará libre.

Envolved los tres párrafos y ponedles clase. La clase es el nombre con el que el CSS los va a encontrar:

```html
<header>
  <div class="header-content">
    <p class="header-title">Ejercicios – FUNDAMENTOS DE JS (ES6)</p>
    <p class="header-subtitle">Desarrollo WEB en entorno cliente</p>
    <p class="header-tagline">Cabecera con textos y foto</p>
  </div>
</header>
```

Recargad. El aspecto no cambia: siguen negras, con el mismo hueco. Es lo esperado. Una clase no pinta nada hasta que una regla la usa. Si estabais esperando la franja azul en este momento, todavía no hay CSS.

El guion de la primera frase es la raya `–`, no el guion corto del teclado. Si copiáis el texto de estos apuntes, la raya ya viene puesta.

---

## Paso 2 — La foto, a tamaño real

Debajo del `div` de los textos, todavía dentro de `header`, añadid la foto:

```html
  <div class="header-profile">
    <img src="./img/user.png" alt="Foto de perfil">
  </div>
```

`./img/user.png` se lee igual que el icono de ayer: desde la carpeta de este HTML, entrad en `img`. `alt` es el texto que queda si la imagen no carga. No es un adorno. Quien no vea la foto lee «Foto de perfil» en su lugar. `<img>` tampoco lleva `/>` al final.

Recargad. Debajo de las tres frases aparece un cuadrado grande, de unos 512 píxeles. Esa es la foto sin órdenes: el navegador la muestra a su tamaño de archivo. La franja todavía no existe. Si en vez de la foto veis el texto «Foto de perfil» o un icono roto, la ruta no llega al archivo. Comprobad que `user.png` está en `img/` de esta carpeta, no en la de 010a.

Dejad, debajo del `header`, el comentario actualizado. Ayer reservaba cuatro huecos. La cabecera ya está escrita; quedan tres:

```html
<!-- Aquí irán nav, main y footer en los siguientes bloques -->
```

Recargad otra vez. El comentario no se ve, igual que ayer. Si la frase aparece en la página, faltan `<!--` y `-->`.

---

## Paso 3 — Solo el azul

Abrid `css/styles.css`. Tiene que seguir vacío. Escribid el comentario de esta sesión y una regla que, de momento, solo pinte el fondo:

```css
/* 010b — header */

header {
  padding: 5px;
  background: #2a5aa3;
}
```

`#2a5aa3` es el azul de la cabecera. Lo volveréis a usar en el pie, varias sesiones más adelante. `padding: 5px` deja un poco de aire entre el borde de esa mancha y lo que hay dentro. Cinco píxeles es poco: la franja queda prieta a propósito.

Guardad y recargad. El fondo de la cabecera pasa a azul. El texto sigue negro, el hueco entre frases sigue ahí, y la foto sigue enorme. Si no veis el azul, el `<link>` de `./css/styles.css` no está en el `head`, o estáis recargando la URL de 010a. Forzad la recarga con Ctrl+F5 (en Mac, Cmd+Shift+R) por si el navegador conserva la hoja vacía de antes.

---

## Paso 4 — El texto claro

Dentro de la misma regla `header`, añadid el color de la letra. No creéis una segunda regla `header`:

```css
header {
  padding: 5px;
  background: #2a5aa3;
  color: rgba(255, 250, 250, 0.9);
}
```

`color` lo heredan los párrafos que están dentro. No hace falta pintarlos uno a uno. `rgba` son cuatro cifras: rojo, verde, azul y opacidad. 255, 250, 250 es casi blanco. 0.9 lo deja un poco transparente, así que el azul del fondo se transparenta levemente en las letras.

Recargad. Las tres frases se leen en claro sobre el azul. La foto no cambia de color: una imagen no hereda el `color` del texto.

---

## Paso 5 — Quitar el hueco que puso el navegador

Debajo de la regla `header`, escribid:

```css
.header-content p {
  margin: 0;
}
```

Esa regla solo afecta a los párrafos que están dentro de `.header-content`. Un párrafo que escribáis mañana en otra zona de la página conservará su margen. Si quitarais el margen de todos los `p` del documento, el día del contenido os faltaría el aire y no sabríais dónde se perdió.

Recargad. Las tres líneas quedan juntas, dentro del azul. La foto sigue debajo, grande. Si el hueco no desaparece, el selector no coincide con el HTML: la clase del `div` tiene que ser `header-content`, y los textos tienen que ser `p` dentro de ese `div`.

---

## Paso 6 — Tres tamaños, un dato cada uno

Añadid una regla por línea. Cada clase cambia solo el tamaño, y en las dos primeras también el grosor:

```css
.header-title {
  font-size: 1.25rem;
  font-weight: 700;
}

.header-subtitle {
  font-size: 1rem;
  font-weight: 600;
}

.header-tagline {
  font-size: 0.875rem;
}
```

`rem` toma como referencia el tamaño de letra del documento, que en el navegador suele ser 16 píxeles. `1rem` es ese tamaño. `1.25rem` es un poco mayor. `0.875rem` es un poco menor. Si alguien agranda la letra del navegador, estas tres medidas crecen con ella.

`700` es negrita. `600` es un poco menos fuerte. La tercera línea no lleva `font-weight`. El párrafo ya se pinta en grosor normal, y escribir `400` sería repetir ese valor sin cambiar nada.

Recargad. La primera frase destaca, la segunda queda en medio y «Cabecera con textos y foto» se lee más pequeña. Seguís sin fila: la foto continúa debajo.

---

## Paso 7 — Texto a un lado, foto al otro

Volved a la regla `header` y añadid tres propiedades. El bloque queda así:

```css
header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 5px;
  background: #2a5aa3;
  color: rgba(255, 250, 250, 0.9);
}
```

`display: flex` convierte la cabecera en una fila. Sus dos hijos —el bloque de textos y el bloque de la foto— se colocan uno al lado del otro, no uno debajo del otro. `justify-content: space-between` empuja el espacio libre hacia el centro: los textos se quedan a la izquierda y la foto a la derecha. `align-items: center` los alinea en vertical por el medio de la franja, no por el borde de arriba.

Recargad. La foto salta a la derecha. Sigue midiendo 512 píxeles, así que la franja se vuelve altísima y la página parece rota. No borréis el flex. El fallo es el tamaño de la imagen, y se corrige en el paso siguiente.

Debajo de `.header-content p`, añadid la regla del bloque de texto:

```css
.header-content {
  flex-grow: 1;
}
```

`flex-grow: 1` hace que ese bloque crezca y ocupe el ancho que la foto no necesita. Con `space-between` la foto ya estaba en la derecha; este crecimiento reserva el centro para los textos, en vez de dejar que el cuadro de las frases se encoja a lo que ocupan las palabras. Recargad. El cambio se nota poco mientras la foto siga siendo enorme. Se verá mejor en cuanto la foto mida 60 píxeles.

---

## Paso 8 — La foto, pequeña y redonda

Al final de `styles.css`:

```css
.header-profile img {
  width: 60px;
  height: 60px;
}
```

Recargad. La franja baja a una altura normal y la foto es un cuadrado de 60 píxeles, a la derecha. Este archivo ya era cuadrado, así que no se deforma. Si más adelante cambiáis `user.png` por una foto apaisada, el cuadrado la estiraría. Por eso la regla no se queda solo en el tamaño.

Completadla:

```css
.header-profile img {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid rgba(255, 255, 255, 0.7);
}
```

`border-radius: 50%` redondea cada esquina hasta la mitad del lado. En un cuadrado, el resultado es un círculo. `object-fit: cover` rellena ese cuadrado con la foto y, si sobra imagen, la recorta en lugar de estirarla. Con la foto de hoy, que ya es cuadrada, no veréis recorte: la propiedad queda escrita para la foto que pongáis después. El `border` es un aro blanco, un poco transparente, para separar el círculo del azul.

Recargad. Cabecera azul, tres líneas juntas con tres tamaños, foto circular a la derecha. Debajo, nada. Así se termina el día.

---

## Si falla

| Qué veis | Qué revisar |
|----------|-------------|
| Página en blanco | El `header` está en el `body` de 010b, y la URL es la de hoy |
| Pestaña con el nombre de 010a | Habéis abierto la carpeta de ayer |
| Texto negro sobre azul | Falta `color` dentro de la regla `header` |
| Hueco entre las tres frases | `.header-content p { margin: 0; }` y las clases del HTML |
| Foto enorme a la derecha | Faltan `width` y `height` en `.header-profile img` |
| Foto debajo del texto | Falta `display: flex` en `header` |
| Foto rota o el texto del `alt` | `user.png` está en `img/` y el `src` empieza por `./img/` |
| El azul no cambia al guardar | Ctrl+F5. El `<link>` sigue apuntando a `./css/styles.css` |

---

## Entrega

La entrega es la carpeta `010b-Plantilla-header`. En la URL de hoy se ve la franja azul, las tres frases y la foto circular. Debajo de la cabecera no hay menú, ni contenido, ni pie. `styles.css` empieza por el comentario `/* 010b — header */` y no contiene más reglas que las de esta sesión.

- [ ] El `<title>` es `010b-Plantilla-header`
- [ ] En la cabecera no hay `h1`, `h2` ni `h3`
- [ ] La foto usa `./img/user.png` y mide 60 por 60, en círculo
- [ ] El comentario `/* 010b — header */` está al principio de la hoja
