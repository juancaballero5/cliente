# 010a — Plantilla: esqueleto HTML5

## De qué va esta sesión

Este es el primer bloque del curso. No hay una carpeta anterior que copiar: la página se escribe desde cero.

Hoy no vais a ver una página con aspecto de curso. Vais a dejar en pie el esqueleto sobre el que, en las sesiones siguientes, iréis colocando la cabecera, el menú, el contenido y el pie. Si al terminar recargáis y la página sale en blanco, el trabajo de hoy está bien: dentro del cuerpo todavía no hay nada que el navegador pueda mostrar.

Lo que sí tiene que existir es un documento HTML5 reconocible. La pestaña llevará el nombre de la carpeta, un icono al lado, y el documento estará enlazado a una hoja de estilos que aún no contiene ni una regla. Esa hoja vacía es deliberada. A partir de la próxima sesión escribiréis el CSS al final de ese mismo archivo, y el enlace que pongáis hoy seguirá sirviendo sin tocarlo.

Escribid vosotros cada trozo. Si os atascáis, comparad con el kit de esta carpeta. No sustituyáis vuestro archivo por una copia del proyecto entero: si lo pegáis de golpe, no veréis qué cambia en cada paso y el siguiente día no sabréis qué tocar.

**URL:** `http://localhost:4300/010-Plantilla/010a-Plantilla-HTML5/`

---

## Dónde se abre la página

En este curso las páginas no se abren con la extensión Live Server, ni haciendo doble clic en el archivo. Hay un servicio en Docker que publica la carpeta `vanilla-app/sites/` en el puerto 4300 del ordenador. El navegador le pide la página a ese servicio, y el camino de la URL repite las carpetas que hay dentro de `sites/`. Por eso la dirección de hoy es la del apartado anterior.

Mirad la barra de direcciones antes de juzgar el ejercicio. Tiene que empezar por `http://localhost:4300`. Si empieza por `file:///`, habéis abierto el archivo del disco: el navegador no está hablando con el servicio, y más adelante las rutas y los avisos no serán los de clase. Cerrad esa pestaña y volved a escribir la URL.

Si `localhost:4300` no llega a abrir, el contenedor no está arrancado. Eso no se corrige cambiando el HTML. Comprobad que el servicio está en marcha y, hasta que la dirección responda, no busquéis el fallo en el documento.

---

## Paso 1 — La carpeta y el hueco de las imágenes

Cread la carpeta `010a-Plantilla-HTML5` dentro de `010-Plantilla`. Dentro, otras dos: `css` e `img`.

En `img` copiad el archivo `favicon.ico` del material de la sesión. El icono de la pestaña no se dibuja: es un archivo que el navegador ya sabe colocar junto al título. Dejad `css` creada y, de momento, vacía. El archivo `styles.css` lo vais a crear un poco más tarde, a propósito, para ver qué ocurre cuando el HTML lo pide y todavía no está.

Abrid la URL de la sesión. Como aún no existe `index.html`, el servicio no tiene una página que entregar. Veréis un aviso de que no encuentra el recurso, o un listado de lo que hay en la carpeta. Es lo esperado. La página en blanco llegará en cuanto guardéis el documento del paso siguiente.

---

## Paso 2 — El documento, todavía sin cabeza útil

Cread `index.html` al mismo nivel que las carpetas `css` e `img`. Escribid solo esto:

```html
<!DOCTYPE html>
<html lang="es">

<head>
</head>

<body>
</body>

</html>
```

Guardad y recargad la URL. La página está en blanco. Mirad la pestaña: no pone un título vuestro. Sale la propia dirección, o la palabra localhost. Eso es lo que vamos a sustituir cuando el `head` tenga un `<title>`. Si seguís en el aviso de «no encontrado», el archivo no se llama `index.html` o no está dentro de `010a-Plantilla-HTML5`.

---

## Paso 2b — Qué acaban de hacer esas cuatro líneas

`<!DOCTYPE html>` le dice al navegador que el documento es HTML5. Sin esa primera línea, algunos navegadores tratan la página como un documento antiguo y, cuando más adelante haya CSS, no calculan los tamaños igual. Hoy, con la página vacía, no lo notaréis. Se escribe al principio para no tener que acordarse el día en que el diseño ya esté montado.

`<html lang="es">` abre el documento y declara que el idioma es el español. No traduce nada. Le sirve al lector de pantalla y al navegador para saber en qué idioma está el texto cuando lo haya. `lang="es"` va en la etiqueta `html`, no dentro del `head`.

`<head>` es la zona de datos de la página: título, icono, hojas de estilos. Nada de lo que escribáis ahí sale en el cuerpo de la página. `<body>` es lo que sí se muestra. Ahora mismo los dos están vacíos, y por eso veis blanco.

---

## Paso 3 — El juego de caracteres

Dentro de `<head>`, como primera línea, escribid:

```html
<meta charset="UTF-8">
```

Esa etiqueta no se ve en la página. Le dice al navegador que las letras del archivo están guardadas en UTF-8, el juego de caracteres con el que escribimos las tildes y la eñe. Si más adelante ponéis una palabra con tilde y el navegador adivina mal, veréis símbolos raros en lugar de la vocal. Hoy el título todavía no lleva tilde, así que la página sigue igual de blanca. La declaración se pone ahora, antes de cualquier texto, porque tiene que ir al principio del `head`.

Recargad. Abrid las herramientas del navegador con el botón derecho, Inspeccionar, y quedaos en la pestaña Elementos. Desplegad `<head>`: el `meta` del charset está ahí. Si no aparece, no habéis guardado el archivo que el servicio está entregando, o estáis inspeccionando otra pestaña.

Fijaos en cómo está escrita la etiqueta. En HTML5, `<meta>` no se cierra con `/>`. La barra final es de otra forma de marcar el mismo documento, y en este curso no la usamos. Lo mismo vale, en los pasos siguientes, para `<link>`.

---

## Paso 4 — El ancho en el móvil

Justo debajo del charset, añadid:

```html
<meta name="viewport" content="width=device-width, initial-scale=1.0">
```

Un móvil, si nadie le dice lo contrario, finge ser una pantalla de escritorio muy ancha y luego encoge la página para que quepa. Esta línea le dice que el ancho es el del propio aparato y que el zoom inicial es 1, es decir, sin alejar la página. Hoy no hay cabecera ni columnas. Si estrecháis la ventana, no veréis un cambio, y es normal. La línea se queda puesta para que, cuando llegue el diseño, no empecéis con el móvil descuadrado y penséis que el fallo está en el CSS.

Recargad. En Elementos, el `head` lleva ya dos `meta`, en este orden: primero el charset, después el viewport. El orden importa menos que en otros casos, pero el charset queremos verlo siempre el primero, porque es lo que evita las tildes rotas desde la primera letra.

---

## Paso 5 — La descripción, que tampoco se ve

Debajo del viewport, añadid:

```html
<meta name="description" content="La Plantilla en HTML5">
```

Tampoco sale dibujada en la página. Es el resumen que usan los buscadores, y algunas vistas previas, cuando alguien comparte el enlace. En clase os sirve para reconocer el ejercicio al abrir el `head` en el inspector. El texto es «La Plantilla en HTML5», con la pe de Plantilla en mayúscula, igual que en el resto del bloque.

Si estáis pensando que esta frase ya podría ser el título de la pestaña, son dos datos distintos. La descripción no sustituye al `<title>`. Recargad y mirad la pestaña: seguís sin un título vuestro. En Elementos, en cambio, el tercer `meta` ya está debajo de los otros dos.

---

## Paso 6 — El título de la pestaña

Añadid, debajo de los tres `meta`:

```html
<title>010a-Plantilla-HTML5</title>
```

El texto interior es el nombre de la carpeta en la que está este `index.html`, carácter por carácter, con las mismas mayúsculas y el mismo guion. No escribáis «Plantilla» a secas, ni «Ejercicio 1». Dentro de poco tendréis varias prácticas abiertas a la vez, y la pestaña es lo único que las distingue sin tener que leer la URL entera.

Guardad y recargad. La pestaña deja de mostrar la dirección y pasa a mostrar `010a-Plantilla-HTML5`. Si no cambia, estáis viendo otra pestaña, u otro archivo: el de una carpeta distinta, o el que abristeis con `file://`. Volved a la URL de la sesión y recargad esa.

---

## Paso 7 — El icono de la pestaña

El archivo `favicon.ico` ya está dentro de `img`, desde el paso 1. Ahora decidle al documento dónde encontrarlo. Debajo del `title`:

```html
<link rel="icon" type="image/x-icon" href="./img/favicon.ico">
```

`./` significa «empezando en la carpeta de este HTML». Desde `index.html`, hay que entrar en `img` y ahí está el icono. Vais a ver la misma forma de escribir en la hoja de estilos (`./css/styles.css`). Usad el `./` también aquí, para que las dos rutas se lean igual.

Si estáis pensando en escribir `/img/favicon.ico`, con la barra pegada al principio, esa barra no significa «esta carpeta». Significa «la raíz del servicio», es decir `http://localhost:4300/img/`, y ahí no habéis copiado el icono. El archivo está junto a este ejercicio, no en la raíz de todos los ejercicios.

Recargad. Junto al título de la pestaña aparece el icono. Si el título está bien y el icono no, abrid la pestaña Red del inspector y buscad `favicon.ico`. Un 404 quiere decir que la ruta no coincide con el archivo. Si el estado es 200 y aun así veis el icono de otro día, el navegador está reutilizando el que guardó antes: recargad sin usar esa copia, con Ctrl+F5 (en Mac, Cmd+Shift+R).

---

## Paso 8 — Pedir la hoja de estilos antes de crearla

Añadid esta línea al final del `head`. No creéis todavía el archivo:

```html
<link rel="stylesheet" href="./css/styles.css">
```

Guardad y recargad. Abrid el inspector y entrad en la consola. Ahí aparece un aviso de que `styles.css` no se ha podido cargar. En la pestaña Red, la misma petición sale en rojo, con estado 404: el HTML la está pidiendo en `./css/styles.css` y en esa carpeta no hay ningún archivo con ese nombre.

La página sigue en blanco. El 404 de la hoja no rompe el documento; solo os dice que el enlace apunta a un sitio vacío. Dejad el `<link>` como está. El fallo se quita creando el archivo, no borrando la línea.

---

## Paso 8b — El archivo vacío, y el aviso que desaparece

Ahora sí: dentro de `css`, cread `styles.css`. No escribáis ninguna regla. Ni un comentario. Guardad ese archivo vacío.

Volved al navegador y recargad. Mirad otra vez la consola: el aviso del 404 ya no está. En Red, `styles.css` responde 200 y el tamaño es 0, porque el archivo no contiene nada. La página continúa en blanco. Es el resultado de hoy. El enlace no pinta nada porque no hay reglas que aplicar.

Si os parece raro enlazar una hoja vacía, pensad en el día siguiente. Si esperáis a tener CSS «de verdad» para crear el archivo, un 404 de la ruta y un diseño que no se aplica se parecen mucho, y no sabréis cuál de los dos estáis mirando. Hoy la ruta ya está comprobada. Mañana solo añadiréis reglas al final de ese archivo.

La ruta, igual que la del icono, se lee desde la carpeta del HTML. `./css/styles.css` entra en `css` y abre `styles.css`. No usa una barra inicial.

---

## Paso 9 — El cuerpo, vacío a propósito

Dentro de `<body>` dejad un comentario y nada más:

```html
<body>
  <!-- Aquí irán header, nav, main y footer en los siguientes bloques -->
</body>
```

Un comentario no se muestra. Dentro de unas semanas, al abrir el archivo, ese texto os recuerda que el hueco está reservado y no es un olvido. `header` será la cabecera, `nav` el menú, `main` el contenido y `footer` el pie. Hoy no los escribís. Si los añadís ahora, la sesión siguiente parte de un documento distinto al del resto de la clase.

Recargad. La página sigue en blanco, y la pestaña conserva el título y el icono. Abrid el código fuente (botón derecho, Ver código fuente de la página) y comprobad que el comentario está dentro del `body`. En la página normal no puede leerse. Si veis esa frase escrita en la página, faltan `<!--` al empezar y `-->` al terminar, y el navegador la está tratando como texto visible.

---

## Si falla

| Qué veis | Qué revisar |
|----------|-------------|
| `localhost:4300` no abre | El servicio Docker, no el HTML |
| La barra pone `file://` | Volved a la URL de la sesión |
| Sigue el «no encontrado» | `index.html` está en `010a-Plantilla-HTML5/` |
| Pestaña sin vuestro título | Hay un `<title>` y habéis recargado esa pestaña |
| Tildes raras más adelante | `<meta charset="UTF-8">` es la primera línea del `head` |
| Icono o CSS en 404 | La ruta lleva `./` y el archivo está en `img/` o en `css/` |
| El comentario se lee en la página | Faltan `<!--` y `-->` |

---

## Entrega

La entrega de hoy es la carpeta `010a-Plantilla-HTML5` con tres cosas: `index.html`, `css/styles.css` vacío e `img/favicon.ico`. En el navegador, por la URL de la sesión, la página está en blanco, la pestaña dice `010a-Plantilla-HTML5` y lleva el icono, y en la pestaña Red `styles.css` responde 200.

- [ ] El `<title>` es el nombre de la carpeta
- [ ] `styles.css` existe, está vacío y el `<link>` usa `./css/styles.css`
- [ ] El cuerpo no muestra ningún texto
