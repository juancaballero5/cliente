# 010d — Plantilla: submenú y otras páginas

## De qué va esta sesión

Ayer «Ejercicios» pedía una carpeta que no existía y el servicio respondía que no encontraba la página. Hoy ese ítem deja de ser un destino. Al pasar el ratón se abre una lista, y cada entrada de esa lista abre otro HTML, con su propia dirección. Son dos páginas, `ejer01` y `ejer02`, cada una en su carpeta. No son trozos pegados en la portada: el navegador cambia de archivo.

La cabecera y la barra marrón se copian. No se reescriben. Lo nuevo del CSS va al final, bajo un comentario `010d`. La tagline de la portada sí cambia, porque este paso ya no es «el menú en fila»: es el submenú que abre esas páginas.

**URL:** `http://localhost:4300/010-Plantilla/010d-Plantilla-nav+enlaces/`

---

## Partís de 010c

Duplicad `010c-Plantilla-nav` y renombrad la copia a `010d-Plantilla-nav+enlaces`. Cambiad el título de la pestaña y la tagline:

```html
<title>010d-Plantilla-nav+enlaces</title>
```

```html
<p class="header-tagline">Submenú que abre otras páginas</p>
```

Las dos primeras frases de la cabecera siguen igual. `styles.css` trae los bloques `010b` y `010c`, y nada más. No creéis todavía la carpeta `ejercicios`.

Abrid la URL de hoy. La página tiene que verse como la de ayer, con la tagline nueva. Pulsad «Ejercicios»: sigue sin encontrar la página. Ese fallo desaparece en el paso siguiente, no porque creéis la carpeta, sino porque el enlace deja de apuntar a ella.

---

## Paso 1 — La lista dentro del ítem, siempre visible

Sustituid el cuarto `li` de la barra por este. El enlace ya no va a `./ejercicios/`. Va a `#`, y debajo, todavía dentro del mismo `li`, hay otra lista:

```html
<li class="dropdown">
  <a href="#" aria-haspopup="true">Ejercicios</a>
  <ul class="dropdown-content" aria-label="Submenú de ejercicios">
    <li><a href="./ejercicios/ejer01/index.html">Página en su carpeta</a></li>
    <li><a href="./ejercicios/ejer02/index.html">Otra página, otra URL</a></li>
  </ul>
</li>
```

`href="#"` significa «esta misma página». Al pulsarlo no pedís otro archivo: la dirección gana una `#` al final y os quedáis donde estabais. El ítem ya no es un destino. Es el asa de la lista. `aria-haspopup` y `aria-label` no se ven. Le dicen a quien usa un lector de pantalla que aquí se abre un submenú y cómo se llama esa lista. Si al recargar no notáis nada nuevo por esos dos atributos, están bien puestos.

Debajo del `nav`, antes del comentario, escribid una frase. Va a servir de referencia: cuando el submenú empuje la página, esta frase se moverá.

```html
<main>
  <section class="intro">
    <p>Selecciona un ejercicio desde el menú superior para empezar.</p>
  </section>
</main>
```

`main` es la zona de contenido. `section` agrupa esa frase. La clase `intro` todavía no tiene regla: igual que las clases de la cabecera el primer día, el nombre está puesto y el aspecto no cambia. El `h1` de la portada no se escribe hoy. Llegará con el pie. En las páginas de ejercicio sí habrá un `h1`, porque allí el título es el de esa página.

El comentario pasa a reservar solo el pie:

```html
<!-- footer en 010e -->
```

Recargad. «Ejercicios» sigue en la barra, y debajo de esa palabra, dentro del marrón, aparecen las dos frases nuevas con su punto de lista y en azul subrayado. La frase de `main` ha bajado para hacerles sitio. Pulsad «Ejercicios»: no hay aviso de página no encontrada. Mirad la dirección: termina en `#`. Pulsad «Página en su carpeta»: eso sí falla, porque `ejercicios/ejer01/index.html` aún no existe. Volved atrás.

Esas dos frases se ven siempre, y no han heredado el color claro ni el relleno de la barra. Ayer el selector era `.navbar > li > a`, con `>`, o sea solo el hijo directo. Los enlaces de hoy están más adentro, en la lista interior, y por eso el navegador los pinta como un enlace normal. Si los vierais claros y sin subrayar, el `>` se habría perdido y la regla de ayer estaría alcanzando también a estos.

---

## Paso 2 — Esconder la lista

Al final de `styles.css`, sin tocar lo de arriba:

```css
/* 010d — submenús */

.dropdown-content {
  display: none;
}
```

`display: none` saca la lista de la página. No ocupa sitio y no se puede pulsar.

Recargad. Las dos frases desaparecen y el párrafo de `main` sube hasta quedar justo bajo la barra. Pasad el ratón por «Ejercicios»: no vuelve a salir nada. El HTML sigue ahí; lo estáis ocultando.

---

## Paso 3 — Mostrarla al pasar el ratón, y ver que empuja

Debajo de la regla anterior:

```css
.dropdown:hover .dropdown-content {
  display: block;
}
```

Esta regla se lee desde la derecha. `.dropdown-content` es la lista. `.dropdown:hover` es el `li` con clase `dropdown` mientras el ratón está encima de él. Juntas dicen: cuando el ratón entra en ese `li`, la lista pasa de `none` a `block` y vuelve a ocupar sitio.

Recargad y entrad con el ratón en «Ejercicios». La lista reaparece y el párrafo de abajo baja. Salid del ítem: la lista se esconde y el párrafo sube. El menú funciona, pero empuja el contenido. Un submenú tiene que dibujarse encima, no apartar lo que hay debajo. Todavía no lo apartéis con otra idea: el paso siguiente cambia solo la posición.

---

## Paso 4 — Sacarla de la fila y verla en el sitio equivocado

Sustituid la regla `.dropdown-content` por esta, y añadid la de `nav`. Dejad la regla del `:hover` como está.

```css
.dropdown-content {
  display: none;
  position: absolute;
  top: 100%;
  left: 0;
}

nav {
  position: relative;
}
```

`position: absolute` saca la lista del flujo. Ya no empuja al párrafo: se coloca respecto al ancestro más cercano que tenga posición distinta de `static`. Ahora ese ancestro es `nav`, porque le acabáis de poner `position: relative`. `top: 100%` significa «justo debajo de ese ancestro». `left: 0` significa «en su borde izquierdo».

Recargad y abrid el submenú. El párrafo ya no baja. La lista aparece pegada al borde izquierdo de toda la barra, no debajo de la palabra «Ejercicios». Es lo esperado: la referencia es el `nav` entero, y el `nav` empieza a la izquierda. No corrijáis el `left`. La referencia se cambia en el paso siguiente.

---

## Paso 4b — La referencia pasa a ser el propio ítem

Antes de la regla `nav`, escribid otra regla. No añadáis `position` a la que ya tenéis en el bloque `010c`: aquella se queda con su `margin: 0`. Esta es distinta, aunque el selector se repita, y el navegador junta las dos.

```css
.navbar li {
  position: relative;
}
```

Cada `li` de la barra pasa a ser una referencia posible. La lista absoluta busca el ancestro posicionado más cercano, y ahora lo encuentra enseguida: el `li` de «Ejercicios», que es su padre. `top: 100%` y `left: 0` se miden contra ese `li`, no contra la barra.

Recargad y abrid el submenú. Las dos frases salen debajo de «Ejercicios». El párrafo de `main` no se mueve, y la lista se dibuja encima de él. Si sigue pegada a la izquierda de la barra, `position: relative` no está en el `li`, o está solo en `nav`.

---

## Paso 5 — Una caja blanca encima del párrafo

La lista ya flota, pero sigue pareciendo dos enlaces sueltos, con punto y sin fondo. Completad `.dropdown-content`. El orden queda así:

```css
.dropdown-content {
  display: none;
  position: absolute;
  top: 100%;
  left: 0;
  min-width: 200px;
  background: #ffffff;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  margin: 0;
  padding: 0;
  list-style: none;
}
```

`min-width: 200px` reserva un ancho mínimo para que la caja no se encoja a la palabra más corta. El fondo blanco tapa el párrafo que queda debajo, para que las frases se lean. La sombra separa esa caja blanca de lo que cubre. `margin`, `padding` y `list-style` hacen con esta lista interior lo mismo que ayer con `.navbar`: sin punto y sin la sangría del navegador. Hay que repetirlo porque aquella regla era de `.navbar`, y esta lista es otra `ul`.

Recargad. Al abrir «Ejercicios» veis un rectángulo blanco encima del párrafo, con las dos frases dentro. Siguen azules y subrayadas. El color de la barra no les llega, por el `>` de ayer.

---

## Paso 6 — El color de estos enlaces, y la capa

Estos enlaces necesitan su propia regla, distinta de la de la barra:

```css
.dropdown-content a {
  display: block;
  padding: 12px 16px;
  color: #111;
  text-decoration: none;
}

.dropdown-content a:hover {
  background: #eee;
}
```

`#111` es casi negro, para leerse sobre el blanco. `:hover` aclara el ítem mientras el ratón está encima, igual que en la barra, con otro color porque el fondo aquí es blanco y no marrón.

Recargad. Las dos frases se leen en oscuro, sin subrayar, y al pasar el ratón el fondo del ítem se vuelve gris claro. Pulsad una: sigue el aviso de página no encontrada. Las páginas se crean después de dejar el panel cerrado.

Añadid ahora las capas. `z-index` solo actúa si el elemento tiene posición, y las dos reglas ya la tienen. Sustituid `nav` y completad `.dropdown-content` para que el `z-index` quede entre la sombra y el `margin`:

```css
nav {
  position: relative;
  z-index: 1000;
}
```

```css
.dropdown-content {
  display: none;
  position: absolute;
  top: 100%;
  left: 0;
  min-width: 200px;
  background: #ffffff;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  z-index: 1001;
  margin: 0;
  padding: 0;
  list-style: none;
}
```

Hoy el clic en las dos frases probablemente ya llegaba, porque la lista está posicionada y el párrafo de `main` no. Aun así las dos cifras se quedan. `1000` sube toda la barra, panel incluido, por encima de `main`. `1001` mantiene el panel por encima de lo demás que haya en la barra. Cuando el contenido crezca, un párrafo sin esta capa puede pintarse encima del panel y el clic caerá en el texto en vez de en el enlace. Si al recargar no veis cambio, las líneas están haciendo justo eso: reservar el orden, no pintar un color nuevo.

---

## Paso 7 — Abrirlo sin ratón

La regla que muestra la lista solo mira `:hover`. Quien llega con el tabulador no pone el ratón encima, y la lista no se abre. Sustituid esa regla por las dos condiciones:

```css
.dropdown:hover .dropdown-content,
.dropdown:focus-within .dropdown-content {
  display: block;
}
```

La coma significa «o». `:focus-within` se cumple cuando el foco del teclado está dentro de ese `li`: en el enlace «Ejercicios» o, ya abierta la lista, en una de las dos entradas.

Recargad. Haced clic en el párrafo de `main` para salir del menú. Pulsad Tab hasta que el foco llegue a «Ejercicios». La caja blanca tiene que abrirse sin haber movido el ratón. Un Tab más entra en la primera frase del submenú. Si Tab pasa de MDN al párrafo y la caja no aparece, falta `:focus-within` o el foco no está cayendo en ese enlace.

---

## Paso 8 — La primera página, con la ruta corta a propósito

Cread la carpeta `ejercicios`, y dentro `ejer01`. Cread ahí un `index.html`. Copiad el documento de la portada y cambiad, de momento, solo el título de la pestaña. Dejad las rutas como en la portada, con `./`:

```html
<title>ejer01</title>
```

El `<title>` es el nombre de la carpeta donde está este archivo, igual que en la portada. Aquí la carpeta se llama `ejer01`, no «Ejercicio 01».

Desde la portada, abrid «Página en su carpeta». La dirección cambia a `…/ejercicios/ejer01/index.html`. Eso es cambiar de página: otro archivo, otra URL. La página se ve sin cabecera azul y sin barra. Abrid la pestaña Red del inspector y buscad `styles.css` y `user.png`. Están en rojo, 404.

No es que falten los archivos. Están en la carpeta del ejercicio, junto al `index.html` de la portada. Este HTML está dos niveles más abajo, en `ejercicios/ejer01/`. `./css/styles.css` significa «una carpeta `css` al lado de este archivo», y ahí no hay ninguna. El navegador pide `…/ejercicios/ejer01/css/styles.css` y no la encuentra. El mismo fallo es el de la foto y el del icono.

---

## Paso 8b — Subir dos niveles

En el `head` de `ejer01`, cambiad las dos rutas. `../` sube un nivel. `../../` sube dos: de `ejer01` a `ejercicios`, y de `ejercicios` a la carpeta del `010d`, que es donde viven `css` e `img`.

```html
<link rel="icon" type="image/x-icon" href="../../img/favicon.ico">
<link rel="stylesheet" href="../../css/styles.css">
```

Recargad. Vuelve la cabecera y vuelve la barra, porque la hoja de ayer ya se está aplicando. Si siguen en 404, una de las dos rutas se ha quedado con un solo `../` o con `./`.

Cambiad también la descripción, la tagline y la foto. La descripción de la portada era «La Plantilla en HTML5». Aquí el resumen es el de esta práctica, la misma frase que la tagline. Sigue sin verse en la página. La foto usa el mismo doble salto:

```html
<meta name="description" content="Página en su carpeta">
```

```html
<p class="header-tagline">Página en su carpeta</p>
```

```html
<img src="../../img/user.png" alt="Foto de perfil">
```

No copiéis `user.png` dentro de `ejer01`. Si lo copiáis y además escribís `../../img/`, estaréis mirando el archivo de arriba, no la copia. Una sola imagen, la de la carpeta del ejercicio.

Recargad. La tagline dice «Página en su carpeta» y la foto vuelve a verse. La barra todavía muestra el submenú de la portada, con direcciones `./ejercicios/…`. Esas direcciones, leídas desde aquí, piden `ejercicios/ejercicios/`, que no existe. El menú de esta página no lleva submenú. Dejad solo los tres enlaces de documentación:

```html
<nav>
  <ul class="navbar">
    <li><a href="https://www.w3schools.com/js/default.asp">w3schools</a></li>
    <li><a href="https://es.javascript.info/js">javascript.info</a></li>
    <li><a href="https://developer.mozilla.org/es/docs/Web/JavaScript">MDN</a></li>
  </ul>
</nav>
```

Esos tres `href` empiezan por `https://`, así que dan igual la carpeta en la que estéis. No llevan `../`.

Sustituid el `main` por el contenido de esta página. Aquí sí va el `h1`: nombra lo que estáis viendo, no la marca del curso.

```html
<main>
  <section class="intro">
    <h1>Página en su carpeta</h1>
    <p>Esta página es otro <code>index.html</code>, dentro de <code>ejercicios/ejer01/</code>. No es un trozo de la portada.</p>
    <p><a href="../../index.html">&gt;&gt; Página principal</a></p>
  </section>
</main>
```

`../../index.html` sube los dos niveles y abre la portada. Recargad. Leed el `h1` y pulsad «>> Página principal». La dirección vuelve a la de la portada, sin `ejercicios` en medio. Desde ahí, abrid otra vez el submenú y comprobad que «Página en su carpeta» regresa a `ejer01`.

---

## Paso 9 — La segunda página es una copia con otro nombre

Duplicad la carpeta `ejer01` y renombrad la copia a `ejer02`. No dupliquéis `css` ni `img`: esta página usa los de arriba, con `../../`, igual que la primera.

Dentro de su `index.html` cambiad el título, la descripción, la tagline, el `h1` y el párrafo. Las rutas no se tocan: `ejer02` está al mismo nivel que `ejer01`, así que sube los mismos dos niveles.

```html
<title>ejer02</title>
```

```html
<meta name="description" content="Otra página, otra URL">
```

```html
<p class="header-tagline">Otra página, otra URL</p>
```

```html
<h1>Otra página, otra URL</h1>
<p>Misma plantilla, otra carpeta: <code>ejercicios/ejer02/</code>. La barra de direcciones no es la de ejer01.</p>
```

Desde la portada, abrid «Otra página, otra URL». La dirección tiene que contener `ejer02`, no `ejer01`. La pestaña dice `ejer02`. «>> Página principal» vuelve a la portada. Si esta segunda página sale sin estilos, las rutas se han quedado en `./` al copiar, o la copia se ha hecho dentro de `ejer01` en vez de al lado.

---

## Si falla

| Qué veis | Qué revisar |
|----------|-------------|
| «Ejercicios» sigue dando 404 | El `href` de ese ítem es `#`, no `./ejercicios/` |
| La lista se ve siempre | `.dropdown-content` tiene `display: none` |
| Al abrirla, el párrafo baja | Falta `position: absolute` en la lista |
| La caja sale a la izquierda de la barra | `.navbar li` tiene `position: relative` |
| Los enlaces del panel son claros, como la barra | Se ha perdido el `>` de `.navbar > li > a` |
| Con Tab no se abre | La regla del `display` incluye `:focus-within` |
| `ejer01` sin cabecera | Las rutas del `head` y de la foto son `../../` |
| El submenú dentro de `ejer01` pide otra vez `ejercicios/` | En esa página el `nav` lleva solo los tres enlaces externos |

---

## Entrega

La entrega es la carpeta `010d-Plantilla-nav+enlaces`, con `ejercicios/ejer01/index.html` y `ejercicios/ejer02/index.html`. En la portada, el submenú se abre con el ratón y con Tab, y no empuja el párrafo. Cada entrada cambia la URL. Desde cada página, «>> Página principal» vuelve. `styles.css` conserva los bloques `010b` y `010c`, y termina con el comentario `/* 010d — submenús */`.

- [ ] El `<title>` de la portada es `010d-Plantilla-nav+enlaces`
- [ ] El `<title>` de cada práctica es el nombre de su carpeta: `ejer01` y `ejer02`
- [ ] La tagline de la portada es `Submenú que abre otras páginas`
- [ ] Las reglas nuevas están al final, sin reescribir la cabecera ni la barra
