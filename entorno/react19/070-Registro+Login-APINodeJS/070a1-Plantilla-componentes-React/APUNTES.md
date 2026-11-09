# 070a1 — Plantilla: componentes en React 19

## De qué va esta sesión

En Vanilla habéis construido ya una aplicación entera, desde la plantilla hasta el acceso con la API, y lo habéis hecho como un conjunto de páginas. Cada ejercicio era un `index.html`: el navegador lo pedía entero y, cuando el enlace llevaba a otra carpeta, pedía otro documento, otra vez con su cabecera, su menú y su pie. A eso se le llama aplicación de varias páginas. Funciona, y la habéis hecho funcionar. El peso aparece en cuanto la aplicación quiere comportarse como una sola herramienta, porque la misma cabecera vive copiada en cada documento, cada clic tira la página para montar la siguiente, y lo que una pantalla acaba de calcular desaparece en cuanto el navegador pide la otra.

Un framework entra justamente cuando ese modo de trabajar se queda corto. React trae la forma de una sola aplicación: un documento, una barra que no vuelve a nacer en cada clic, y unas pantallas que se relevan dentro de ella. El código de la cabecera se escribe una vez y las pantallas pueden compartir lo que saben. El navegador sigue pidiendo un documento, solo que ahora ese documento nace casi vacío y es React quien construye la página dentro de un hueco. Cuando el menú cambie de pantalla no se pedirá otro documento, sino que cambiará ese hueco. A eso se le llama aplicación de una sola página. El nombre hace pensar que la dirección no cambia, y sí cambia, así que parece que haya varias páginas. Lo que no cambia es el documento que se pidió al entrar.

Hoy es el primer contacto con esa forma de trabajar. Vais a crear la aplicación y a colocar encima la plantilla que ya conocéis de `010f`, con su cabecera, su menú y su pie. El menú abrirá la portada y tres tarjetas, una por almacén. El formulario se verá igual en las tres, y los botones todavía no guardarán nada, porque guardar es el ejercicio siguiente y vive en otra carpeta.

Escribid vosotros cada trozo. Si os atascáis, comparad con el kit de esta carpeta, sin sustituir vuestro proyecto por una copia del kit entero.

**URL:** `http://localhost:4319`

---

## Dónde se abre la aplicación

Las páginas de Vanilla se abrían con el servidor del contenedor de sitios, en el puerto 4300. Esta aplicación no vive ahí. Tiene su propio contenedor, con Node y con Vite, y el navegador del ordenador entra por el puerto 4319, que apunta al 5173 de dentro del contenedor.

Si se os ocurre abrir `index.html` con doble clic, o pasarlo por Live Server, el navegador cargaría el archivo como un documento suelto. React no habría arrancado y, más adelante, una dirección como `/crud-local-storage` no tendría quién le contestara. La aplicación se ve a través de su servidor de desarrollo.

Los comandos se lanzan dentro del contenedor, y siempre con bash, porque el alias del curso está en el arranque de bash. Con `sh` ese arranque no se lee y el alias no existe.

Desde la carpeta `entorno` del ordenador:

```bash
docker compose exec react19 bash
```

---

## Paso 1 — Crear el proyecto

Vite escribe el esqueleto, de modo que no creáis a mano el `index.html`, ni la carpeta `src`, ni el arranque. Situaos en la carpeta del bloque:

```bash
cd 070-Registro+Login-APINodeJS
```

Si existe una carpeta vacía `070a1-Plantilla-componentes-React`, dejadla: Vite escribe dentro cuando no hay archivos. Si esa carpeta ya tiene un `package.json`, no lancéis el comando otra vez, porque el proyecto ya está creado.

```bash
react-new 070a1-Plantilla-componentes-React
```

El alias se expande a `npx --yes create-vite@latest --template react-ts` y el nombre de la carpeta va detrás. Si la pregunta que sale es **Project name:**, el nombre no ha entrado. Parad y revisad que habéis entrado con bash.

Si el nombre ha entrado, npm no admite mayúsculas en el paquete y preguntará **Package name:**. Pulsad Enter y dejad `070a1-plantilla-componentes-react`. La carpeta del curso sigue con mayúsculas. Son dos nombres a propósito: el del paquete, en minúsculas, y el de la carpeta, como el resto del bloque.

Después pregunta qué revisor de código queréis. Un revisor lee los archivos y avisa de restos que la página puede seguir mostrando: una variable que declarasteis y no usáis, un import que no llamáis. No arranca la aplicación. Elegid **Oxlint**, que es el que trae la plantilla. No forma parte de los ejercicios. Si un tutorial antiguo dice que hay que instalar ESLint, está hablando del otro revisor.

La última pregunta es **Install with npm and start now?** Responded que no. Si aceptáis, arranca `npm run dev` sin `0.0.0.0` y el navegador del ordenador no llega al contenedor. Cuando termine, todavía en esa shell:

```bash
cd 070a1-Plantilla-componentes-React
npm install
```

En `package.json`, la dependencia `react` tiene que ser la 19. En el listado de `ls -la` no tiene que aparecer un `.git`. Vite no crea un repositorio. El único es el de `FP-DevSetup`. Si aparece un `.git` dentro del proyecto, parad: el repositorio del curso dejaría de ver estos archivos como suyos.

---

## Paso 2 — Cómo entra la aplicación

Antes de cambiar nada, seguid el camino que recorre la página la primera vez que el navegador la pide. En la aplicación de varias páginas ese camino era corto, porque el navegador pedía `index.html` y dentro ya estaban la cabecera y el menú. Aquí el documento llega casi vacío y React lo rellena. Son tres archivos, y cada uno espera al anterior.

`index.html` es el único documento. Trae el `head` y, en el `body`, un hueco y el script que arranca la aplicación:

```html
<div id="root"></div>
<script type="module" src="/src/main.tsx"></script>
```

Ese `div` no es la página. Es el sitio donde React va a pintar. La cabecera y el menú no se escriben aquí. Si más adelante os veis pegando el `<header>` dentro de este archivo, la página enseñaría la plantilla fuera de React y el resto del framework no la vería.

Quien arranca React no es el HTML, sino `src/main.tsx`, el primer archivo que se ejecuta. Busca el hueco y le dice a React que pinte dentro el componente `App`:

```tsx
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
```

`createRoot` engancha React a ese `div`. `App` es el componente raíz: una función, en `src/App.tsx`, y lo que devuelve es lo que se ve. El signo `!` detrás de `getElementById('root')` es de TypeScript. Le dice que ese `div` está en el documento, como acabáis de ver en el HTML. `StrictMode` es un modo de desarrollo: React revisa el componente para avisaros de fallos mientras programáis. En la página se ve una sola vez. Se queda como está.

Lo que devuelve `App` al nacer es la bienvenida que ha puesto Vite: los logos, el texto «Get started» y un botón que cuenta clics. Ese botón es un ejemplo del esqueleto. En este ejercicio lo quitaremos, porque la plantilla del curso no cuenta clics. El contador guarda un número que la pantalla puede cambiar. Cómo se guarda ese número lo veréis cuando un botón tenga que guardar una cuenta y mostrar la lista.

En el HTML de Vanilla la página visible iba en el propio documento. Aquí el trozo visible va dentro de la función, escrito con etiquetas. A eso se le llama JSX, y por eso el archivo se llama `App.tsx` y no `App.html`. No hace falta importar React para escribir esas etiquetas: este proyecto ya sabe convertirlas. Si un tutorial antiguo empieza por `import React from 'react'`, es de cuando eso era obligatorio.

Vite no ha instalado un router. No hay archivo de rutas. El menú, cuando lo peguéis, no podrá abrir las pantallas hasta que lo añadáis. Sigue siendo este ejercicio, más adelante.

El título de la pestaña es el nombre del paquete, en minúsculas. Lo cambiaréis cuando editéis el documento.

---

## Paso 3 — Ver la bienvenida

El esqueleto ya está y falta el servidor que se lo entrega al navegador. `react-start` deja esa terminal ocupada, así que no la cerréis mientras queráis ver la página.

```bash
react-start
```

El alias es `npm run dev -- --host 0.0.0.0`. Vite, dentro del contenedor, escucha en el puerto 5173. El `0.0.0.0` hace que acepte conexiones que vienen de fuera del contenedor. Docker publica ese puerto en el ordenador como 4319. En el navegador del ordenador abrid http://localhost:4319. La dirección `localhost:5173` que imprime la terminal es la de dentro del contenedor, y desde el ordenador no abre.

Tiene que salir la bienvenida de Vite: los logos, el texto «Get started» y un botón «Count is 0». Ese texto está en `App.tsx`, no en `index.html`. Pulsad el botón: el número sube y la página no se recarga. El botón cambia un número que guarda `App`, y React vuelve a pintar ese trozo.

Para comprobar que el servidor vigila el disco, cambiad en `App.tsx` el texto `Get started` por `Bienvenida` y guardad. El navegador tiene que enseñar la palabra nueva sin que pulséis recargar. Al guardar, Vite prepara otra vez ese archivo y el navegador sustituye el trozo. En la propia página lo llaman HMR: son las siglas en inglés de sustituir el módulo en caliente. En clase basta decir que, al guardar, se actualiza solo. Ese texto lo sustituiréis entero en el paso siguiente.

---

## Paso 4 — La plantilla pasa a ser la de un componente

Abrid `entorno/vanilla-app/sites/010-Plantilla/010f-Plantilla-estilos/index.html`. Copiad solo lo que hay dentro de `<body>`, desde `<header class="header">` hasta `</footer>`, y sustituid con ello todo lo que hay dentro de `return` en `src/App.tsx`.

No copiéis el `DOCTYPE`, ni `<html>`, ni `<head>`, ni las etiquetas `<body>`, porque esos ya viven en `index.html`. Si los pegáis dentro de la función quedaría un documento dentro de otro, y React espera el trozo que va a colocar dentro del `div`.

El `return` tiene que devolver una sola cosa, y la plantilla son cuatro bloques seguidos: cabecera, menú, contenido y pie. En JavaScript no se pueden devolver cuatro cosas sueltas. Se envuelven en `<>` y `</>`, un agrupador vacío: React los junta y en la página no aparece un `div` de más. La bienvenida de Vite ya usaba ese agrupador. Se queda, y dentro va la plantilla.

En el HTML copiado el atributo se llama `class`. Dentro de `App` estáis en JavaScript, y `class` ya es una palabra del lenguaje: sirve para declarar una clase. React usa `className` para el mismo papel que `class` en HTML. Cada `class="header"` pasa a `className="header"`. Si dejáis `class`, el editor lo marca y el navegador no aplica esa clase. Cuando terminéis, buscad `class=` en `App.tsx`. No tiene que quedar ninguno. En la hoja de estilos no hagáis ese cambio: ahí una clase se escribe `.header`, como en Vanilla.

En lo copiado cambiad tres textos. El título de la cabecera pasa a «Ejercicios – React 19» y la tagline pasa a «Plantilla». El menú de documentación se queda, con w3schools, javascript.info y MDN. El desplegable «Ejercicios» de `010f` se sustituye por tres, con la misma forma. Uno de ellos queda así, y los otros dos cambian el nombre:

```tsx
<li className="dropdown">
  <a href="#" aria-haspopup="true">localStorage</a>
  <ul className="dropdown-content" aria-label="Submenú de localStorage">
    <li><a href="#">CRUD localStorage</a></li>
  </ul>
</li>
```

IndexedDB lleva «CRUD IndexedDB». APINodeJS lleva «CRUD APINodeJS». Esos enlaces internos siguen con `href="#"`. Un `href` pide una dirección al navegador, y `#` se queda en esta misma página. El enlace que cambia de pantalla sin pedir otro documento todavía no está en el proyecto. Cuando lo añadáis, en este mismo ejercicio, esos tres `href` se sustituyen.

El `main` de `010f`, con «Bienvenido», se queda de momento en `App`. Esa frase es la portada. La foto de la cabecera podéis dejarla como en el HTML copiado. El archivo todavía no está en este proyecto, así que no se verá. La ruta se arregla en el paso siguiente.

En `index.html` una `<img>` puede ir sin cierre, porque el navegador sabe que no lleva nada dentro. En `App.tsx` las etiquetas las lee el traductor de JSX, y cada una tiene que decir dónde termina. Una etiqueta con contenido se cierra con su pareja, como `</p>`. Una etiqueta vacía, como `img`, se cierra con `/>`. No todas las etiquetas llevan `/>`. Si más adelante pegáis un `input`, un `br` o un `hr`, les pasará lo mismo. La foto de la cabecera queda así:

```tsx
<img src="/img/user.png" alt="Foto de perfil" />
```

La ruta con la barra inicial es la del paso siguiente. Podéis dejarla ya escrita.

Arriba del archivo sobran los `import` de la bienvenida: `useState`, las imágenes y `App.css`. La plantilla no los usa. El proyecto está configurado para marcar un nombre que se importa y no se usa, y el editor lo subraya. La función se queda sin ningún `import`.

En `src/main.tsx` quitad la línea `import './index.css'`. Esa hoja es la de la bienvenida de Vite. Si sigue cargada, aprieta la página en una columna estrecha y agranda el título, y no podréis reconocer la plantilla. El archivo `index.css` se queda en la carpeta. La hoja del curso llega en el paso siguiente.

Al guardar, en http://localhost:4319 tienen que leerse la cabecera, los tres nombres del menú, «Bienvenido» y el pie. El aspecto es el del navegador, sin barra marrón ni texturas. Los submenús no se abren al pasar el ratón: eso lo hacía la hoja de `010f`. Si la página se queda en blanco, el aviso señala la línea. Lo habitual es un bloque sin cerrar, los cuatro bloques del `return` sin el agrupador `<>`, o una `img` sin `/>`.

---

## Paso 5 — La hoja y las imágenes

La terminal de `react-start` se queda como está. La copia de archivos se hace en el ordenador, en otra terminal: dentro del contenedor no está la carpeta de Vanilla.

Desde la carpeta del proyecto, `070a1-Plantilla-componentes-React`:

```bash
mkdir -p public/img
cp ../../../../vanilla-app/sites/010-Plantilla/010f-Plantilla-estilos/img/bgwhite.png \
   ../../../../vanilla-app/sites/010-Plantilla/010f-Plantilla-estilos/img/bgblue.png \
   ../../../../vanilla-app/sites/010-Plantilla/010f-Plantilla-estilos/img/bglightblue.png \
   ../../../../vanilla-app/sites/010-Plantilla/010f-Plantilla-estilos/img/user.png \
   public/img/
cp ../../../../vanilla-app/sites/010-Plantilla/010f-Plantilla-estilos/img/favicon.ico public/
```

`public` es la carpeta que Vite publica en la raíz del sitio, tal cual. Un archivo `public/img/user.png` se pide como `http://localhost:4319/img/user.png`. La barra del principio significa «desde la raíz del sitio». En la portada, `./img/user.png` parece valer, porque la dirección es `http://localhost:4319/` y `./img` cae en la raíz. Cuando el menú abra una pantalla, la dirección será `http://localhost:4319/crud-local-storage` y el navegador buscará la foto a partir de esa ruta. Con la barra inicial, la foto no depende de la pantalla en la que estéis. En la cabecera, la foto tiene que apuntar a `/img/user.png`.

La hoja se copia entera. Sustituid todo `src/index.css` por el contenido de `010f-Plantilla-estilos/css/styles.css`.

En `010f` la hoja estaba en `css/` y las imágenes en `img/`, un nivel por encima, y por eso ponía `url(../img/...)`. `url()` se lee desde el archivo donde está escrita la regla. Si dejáis `../img/` aquí, Vite busca la imagen al lado de `src`, no la encuentra y el servidor se para. Las imágenes están en `public`, en la raíz del sitio. En `bgwhite.png`, `bgblue.png` y `bglightblue.png` cambiad `../img/` por `/img/`. Quedan `url(/img/bgwhite.png)`, `url(/img/bgblue.png)` y `url(/img/bglightblue.png)`.

En el paso anterior quitasteis de `src/main.tsx` la línea que cargaba `index.css`, porque era la hoja de la bienvenida. Ahora el archivo ya es la hoja del curso, y hay que volver a cargarla. Sin un `<link>` en el `head`: Vite incorpora la hoja cuando un archivo de la aplicación la importa. `main.tsx` es el primero que se ejecuta, así que el import va ahí, con los demás:

```tsx
import './index.css'
```

El icono de la pestaña sigue siendo el de Vite. En `index.html` el enlace apunta a `/favicon.svg`. Cambiadlo para que pida el icono del curso, también desde la raíz:

```html
<link rel="icon" type="image/x-icon" href="/favicon.ico" />
```

Ese archivo es HTML. El `/>` que ya traía la plantilla de Vite puede quedarse.

Vite lee la lista de `public` al arrancar. `favicon.svg` e `icons.svg` ya estaban, y se sirven. `public/img/` y `favicon.ico` los habéis copiado con el servidor en marcha. Dentro de Docker el disco es el del ordenador, montado en el contenedor, y el aviso de «se ha creado este archivo» a veces no llega. La lista sigue siendo la del arranque. Cuando la foto no está en la lista, Vite responde con `index.html`. El navegador espera una imagen y recibe la página, y por eso no se ven ni la foto ni las texturas. `favicon.ico` responde que no existe.

No cambiéis las rutas. En la terminal donde está `react-start`, pulsad Ctrl+C y volved a lanzarlo:

```bash
react-start
```

Al arrancar lee `public` otra vez. Entonces http://localhost:4319/img/user.png tiene que descargarse como imagen, y en la página se ven la cabecera azul con textura, la foto redonda, la barra marrón y el pie con textura. Al pasar el ratón por localStorage, IndexedDB o APINodeJS se abre su submenú. La pestaña muestra el icono del curso.

---

## Paso 6 — El documento que sí se edita

`index.html` se queda corto. Lo que se toca es el `head`, para que la pestaña y el idioma sean los del curso.

`lang` pasa de `en` a `es`. El viewport ya está y se queda: es la etiqueta con `name="viewport"` y el ancho del aparato en `content`. La descripción es otra etiqueta. Añadidla, sin juntarla con la del viewport:

```html
<meta name="description" content="La Plantilla en React 19" />
```

Son dos informaciones distintas. Si las metéis en una sola etiqueta, el navegador se queda con una: el móvil pierde el viewport, o la descripción deja de llamarse `description`.

El `<title>` es el nombre de la carpeta, `070a1-Plantilla-componentes-React`. Vite lo había dejado en minúsculas, con el nombre del paquete. El paquete sigue en minúsculas en `package.json`, porque npm no admite mayúsculas. El título de la pestaña es el de la carpeta del curso, igual que en Vanilla.

No quitéis el `<div id="root">` ni el `<script>` que carga `main.tsx`. Si desaparecen, React no tiene dónde pintar y la página se queda en blanco. El enlace del icono se queda como está.

Al guardar, la pestaña tiene que mostrar `070a1-Plantilla-componentes-React` y el icono del curso. Si el título no cambia, cerrad la pestaña y abridla de nuevo: el navegador a veces se queda con el anterior.

---

## Paso 7 — Una pantalla, un componente

La portada y cada CRUD van a ser una pantalla distinta. En React una pantalla de este tipo es un componente: una función en su propio archivo, que devuelve el trozo que se tiene que ver. `App` sigue siendo la plantilla, con la cabecera, el menú y el pie. Estas cuatro no se escriben en `index.html`. El navegador no las pide. Todavía no las pinta nadie, así que la página no cambia. El menú las abrirá cuando esté el router.

Cread estos cuatro archivos. La carpeta lleva el nombre que tendrá la dirección, con guiones. La función no puede llevar un guión: en JavaScript el guión es una resta. Por eso la carpeta es `crud-local-storage` y la función es `CrudLocalStorage`.

`src/inicio/Inicio.tsx`

```tsx
function Inicio() {
  return (
    <p>Inicio está en pantalla.</p>
  )
}

export default Inicio
```

`export default` deja la función disponible para otro archivo. Sin eso, el router no podría usarla. No hace falta importar React. Una sola etiqueta no necesita el agrupador `<>`.

Los otros tres son la misma forma. Cambiad el nombre de la función, el del `export` y la frase.

`src/crud-local-storage/CrudLocalStorage.tsx` devuelve `CRUD localStorage está en pantalla.`

`src/crud-indexed-db/CrudIndexedDb.tsx` devuelve `CRUD IndexedDB está en pantalla.`

`src/crud-api-node/CrudApiNode.tsx` devuelve `CRUD APINodeJS está en pantalla.`

No hace falta una hoja por componente. La hoja del curso ya está en `index.css` y llega a toda la página. La hoja de la tarjeta llegará cuando la caja tenga su propio aspecto.

`Inicio` no es una palabra reservada. Si el editor subraya esas letras y el aviso es el diccionario inglés, el archivo está bien.

Al guardar, http://localhost:4319 sigue igual: cabecera, menú, «Bienvenido» y pie. Estas frases no salen todavía. Si el servidor se pone en rojo, el fallo está en un archivo que ya se usa, `App.tsx` o `main.tsx`. Un error dentro de estos cuatro no se ve hasta que alguien los importe.

---

## Paso 8 — El menú cambia de pantalla sin pedir otro documento

En la aplicación de varias páginas, «CRUD localStorage» sería un enlace a otro `index.html`. El navegador pediría ese archivo, tiraría la página actual y montaría la nueva, cabecera incluida. Aquí la dirección va a cambiar y el documento no. `App` sigue montado dentro del `div`, su función conserva la cabecera, el menú y el pie, y lo que se sustituye es el interior de `<main>`.

El router no venía en el esqueleto. Hay que instalarlo. La terminal de `react-start` sigue ocupada. El install va en otra, dentro del contenedor. Si lo lanzáis en el Mac, los paquetes pueden quedar para el Mac, y el contenedor es Linux.

Desde `entorno`:

```bash
docker compose exec react19 bash
cd 070-Registro+Login-APINodeJS/070a1-Plantilla-componentes-React
npm install react-router
```

El paquete se llama `react-router`. En la versión anterior se llamaba `react-router-dom`. Si un tutorial dice ese nombre, es de entonces. Aquí los import salen de `'react-router'`.

React Router también tiene un modo que se adueña del proyecto, con un plugin de Vite y sus propios archivos de rutas. No es el de clase. El de clase es el otro: el proyecto sigue siendo el vuestro, y vosotros colocáis el router.

Quien escucha la barra de direcciones es `BrowserRouter`. Tiene que envolver a `App`, porque el menú y el hueco viven dentro de `App`. Eso se hace en `src/main.tsx`:

```tsx
import { BrowserRouter } from 'react-router'
```

y el render queda así:

```tsx
<StrictMode>
  <BrowserRouter>
    <App />
  </BrowserRouter>
</StrictMode>
```

En `App.tsx` entran las cuatro pantallas y las piezas del router:

```tsx
import { Link, Route, Routes } from 'react-router'
import Inicio from './inicio/Inicio.tsx'
import CrudLocalStorage from './crud-local-storage/CrudLocalStorage.tsx'
import CrudIndexedDb from './crud-indexed-db/CrudIndexedDb.tsx'
import CrudApiNode from './crud-api-node/CrudApiNode.tsx'
```

La sección de «Bienvenido» sale de `App` y pasa a `Inicio`, en lugar de la frase «Inicio está en pantalla». La portada de este ejercicio es la de la plantilla. El párrafo largo de Vanilla que habla de sesión, registro y admin llega cuando esas pantallas existan. Hoy `Inicio` queda así:

```tsx
function Inicio() {
  return (
    <section className="intro">
      <h1>Bienvenido</h1>
      <p>Selecciona un ejercicio desde el menú superior para empezar.</p>
    </section>
  )
}

export default Inicio
```

En `App`, donde estaba esa sección, queda el hueco. `Routes` mira la dirección y elige una `Route`. Lo que pinta es el `element` de la que coincide. La cabecera no se mueve, porque está fuera del hueco:

```tsx
<main>
  <Routes>
    <Route path="/" element={<Inicio />} />
    <Route path="/crud-local-storage" element={<CrudLocalStorage />} />
    <Route path="/crud-indexed-db" element={<CrudIndexedDb />} />
    <Route path="/crud-api-node" element={<CrudApiNode />} />
  </Routes>
</main>
```

`path="/"` es la portada, `http://localhost:4319/`. Cuando la dirección es `/crud-local-storage`, esa ruta es la que coincide, y en el hueco entra el componente de localStorage. La portada y el CRUD no se pintan a la vez.

En los tres enlaces del submenú, el `<a href="#">` pasa a `Link`. `Link` se dibuja como un `<a>`, así que la hoja del menú le sigue aplicando el estilo. localStorage apunta a `/crud-local-storage`, IndexedDB a `/crud-indexed-db` y APINodeJS a `/crud-api-node`:

```tsx
<li><Link to="/crud-local-storage">CRUD localStorage</Link></li>
```

Los de w3schools, javascript.info y MDN siguen con `<a href>`. Esos enlaces piden otro sitio, y el navegador tiene que salir de esta aplicación para cargarlo. Los títulos «localStorage», «IndexedDB» y «APINodeJS» también siguen con `href="#"`. No abren una pantalla. Abren el submenú, y eso ya lo hace la hoja al pasar el ratón.

Un `<a href="/crud-local-storage">` también cambiaría la dirección, y el servidor devolvería otra vez `index.html`. La aplicación arrancaría de cero y la cabecera nacería otra vez. `Link` cambia la dirección desde la página que ya está abierta. `Routes` quita una pantalla y pone la otra. La cabecera sigue en su sitio.

Para volver a la portada, abrid http://localhost:4319. El enlace «Página principal» llega con la tarjeta, en el paso siguiente. El título de la cabecera sigue siendo un párrafo.

Al guardar, la portada dice «Bienvenido» y no «está en pantalla». Un CRUD muestra su frase, y la cabecera sigue en su sitio. Abrid la pestaña Red, pulsad otra entrada del menú y mirad si el navegador pide otro documento. No lo pide.

Si recargáis encima de un CRUD, la dirección no es un archivo. Vite contesta con el mismo `index.html`, React arranca, lee la dirección y vuelve a pintar esa pantalla. Es el mismo comportamiento que visteis cuando la foto aún no estaba en la lista de `public` y la dirección devolvía la página. Por eso la aplicación se abre con el servidor de desarrollo.

Si la página se queda en blanco y la consola dice que el enlace tiene que estar dentro de un Router, falta `BrowserRouter` en `main.tsx`. Si dice que no encuentra `react-router`, parad el servidor con Ctrl+C y volved a lanzar `react-start`.

---

## Paso 9 — La misma tarjeta en las tres pantallas

La frase «está en pantalla» solo decía que el componente se ve. La pantalla de cada almacén es la tarjeta que ya conocéis. El formulario es el de `050a2-Usuario-APIweb/ejercicios/IndexedDB/ejer02/index.html`: archivo, vista previa, casilla y botón «Pedir a la API». Los tres almacenes comparten ese formulario. Lo que cambia, de una tarjeta a otra, es el texto que dice dónde se guardará la cuenta. Los botones, hoy, siguen sin guardar.

Copiad la caja de esa práctica, desde `<div class="container">` hasta el cierre de esa caja, en cada componente de CRUD, en lugar de la frase. No copiéis cabecera, menú, pie de página ni `<script>`. La cabecera ya está en `App`, escrita una vez para las tres pantallas. El `<script>` de Vanilla no tiene sitio aquí: el comportamiento, cuando llegue, vivirá en la función del componente y en un servicio, no en un script del documento.

Al pegar, el archivo se pone rojo, porque ese HTML ha entrado dentro de la función. Recorred `CrudIndexedDb.tsx`, que es el que ya habla de IndexedDB, y aplicad tres cambios.

El primer `div` pone `class="container"`. Escribid `className="container"`, y lo mismo en `card`, `cardTitle`, `cardBody` y `cardFooter`. Cuando terminéis, buscad `class=` en el archivo. No tiene que quedar ninguno.

En `<label for="nombre">`, `for` es la palabra del bucle. El lazo entre la etiqueta y el campo se escribe `htmlFor="nombre"`. Cambiad cada `for=` de los `label`, también el de la casilla.

Los `input` están cerrados como en HTML, con un `>` solo. El traductor se queda esperando el final de la etiqueta. Un `input` no lleva nada dentro, así que termina en `/>`. Cerrad así cada `input`, la `img` de la vista previa y cada `br`. La imagen queda en una sola línea:

```tsx
<img id="preview" alt="Vista previa de la foto" width="80" height="80" hidden />
```

Repetid `className`, `htmlFor` y el cierre de las etiquetas vacías en los otros dos archivos.

El título y los tres párrafos de debajo tienen que hablar del almacén de ese archivo. Si al pegar se cruzan, la pantalla de localStorage acaba contando MySQL.

En localStorage el título es «Usuarios en localStorage», con la L minúscula, como el menú:

```tsx
<p>Guardamos las cuentas juntas en <code>localStorage</code>.</p>
<p>Clave: <code>usuarios</code>. El valor es un objeto JSON con todas las cuentas.</p>
<p>Cada cuenta añade la dirección. <br />La foto se guarda como texto. <br />Si la casilla pide un <code>Blob</code>, se convierte antes de guardar.</p>
```

En IndexedDB el título es «Usuarios en IndexedDB». El almacén se llama `usuarios` y la clave primaria es el campo `usuario`. Si la casilla está marcada, la foto se guarda como `Blob`. Si no, como texto.

En la API de Node el título es «Usuarios en APINodeJS». La cuenta va a MySQL, base `accesoDB`, tabla `usuarios`. La dirección va agrupada. La foto se guarda como texto. Si la casilla pide un `Blob`, se convierte antes de guardar.

Este párrafo va en las tres. Habla del formulario, no del almacén:

```tsx
<p>Pedir a la API rellena el formulario. <br />El nombre, el teléfono y la dirección salen de randomuser. <br />La casilla elige la foto: <br />  - marcada, un <code>Blob</code> de otra API; <br />  - sin marcar, la dirección de la miniatura de randomuser.</p>
```

En el pie, «Página principal» deja de apuntar a `../../../index.html`. Esa ruta relativa tenía sentido cuando cada práctica era una carpeta de la aplicación de varias páginas. Aquí la portada es la dirección `/`. El enlace ya lo conocéis del menú:

```tsx
import { Link } from 'react-router'
```

```tsx
<Link to="/">&gt;&gt; Página principal</Link>
```

Al pulsarlo, la dirección pasa a ser la de la portada y en el hueco vuelve «Bienvenido». La cabecera sigue donde está, porque vive en `App`, fuera de ese hueco.

La caja se ve todavía con el aspecto del navegador, porque las reglas de la tarjeta no están en `index.css`. Están en `040a4-Usuarios-imagen-Base64/ejercicios/css/styles.css`. Copiad ese archivo entero en `src/tarjeta.css`, al lado de `index.css`.

En React, cuando un componente importa una hoja, esas reglas se suman a la página. No se quedan encerradas en el componente. Las tres pantallas usan las mismas clases, así que las tres importan la misma hoja. Debajo del import de `Link`, en cada uno de los tres archivos:

```tsx
import '../tarjeta.css'
```

La portada no usa esas clases, así que sigue viéndose como hasta ahora. `index.css` sigue siendo la hoja de la cabecera, el menú, el fondo y el pie.

Guardad y abrid cada CRUD desde el menú. Tiene que verse la caja blanca, los campos, la casilla y los botones. Los botones todavía no guardan nada. «Página principal» vuelve a «Bienvenido». Si una pantalla sigue en blanco, el aviso del editor señala la línea: suele ser un `class`, un `for` o una etiqueta vacía sin `/>`.

---

## Si falla

Si `react-new` pregunta **Project name:**, el nombre no ha ido detrás del alias. Entrad con bash y lanzad otra vez el comando del paso 1.

Si el servidor arranca y el navegador no abre, mirad que hayáis usado `react-start` y la dirección `http://localhost:4319`. La dirección `localhost:5173` es la de dentro del contenedor. Una dirección que empiece por `file:///` no está hablando con el contenedor, y React no ha arrancado.

Si al pegar la plantilla la página se queda en blanco, abrid el aviso. Una `img` o un `input` sin `/>`, un `class` donde tiene que ir `className`, o los cuatro bloques del `return` sin `<>` dejan el archivo a medias.

Si un fondo o la foto no se ven, y `http://localhost:4319/img/user.png` devuelve la página HTML, las rutas pueden estar bien y la lista de `public` ser la del arranque. Parad `react-start` con Ctrl+C y volved a lanzarlo. Si el servidor se pone en rojo y el aviso habla de `../img/`, alguna textura de `index.css` no se ha cambiado a `/img/`.

Si la consola dice que un enlace tiene que estar dentro de un Router, falta `BrowserRouter` en `main.tsx`, envolviendo a `App`. Si dice que no encuentra `react-router`, el install se hizo fuera del contenedor o el servidor no ha vuelto a arrancar después de instalar.

Si «Página principal» no vuelve a la portada, abrid el archivo de esa tarjeta. Tiene que importar `Link` y el enlace tiene que ser `to="/"`.

Si la tarjeta de localStorage habla de MySQL, o la de la API habla de la clave `usuarios`, los párrafos se cruzaron al pegar. Cada archivo cuenta su almacén. El párrafo que empieza por «Pedir a la API» es el mismo en las tres.

Si al recargar un CRUD el navegador dice que no encuentra la página, la está pidiendo como archivo. La dirección tiene que seguir siendo la del servidor de desarrollo.

---

## Siguiente

Este ejercicio se cierra aquí. Donde en Vanilla había muchos documentos, ahora hay uno, un componente raíz y un hueco que cambia de pantalla. Lo que falta es la memoria. El servicio que guarda en `localStorage` es `070a2-Servicio-localStorage`. Esa carpeta copia el código de esta, y allí los botones se enganchan.
