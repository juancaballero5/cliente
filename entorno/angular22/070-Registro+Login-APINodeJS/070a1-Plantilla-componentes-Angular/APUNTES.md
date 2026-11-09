# 070a1 — Plantilla: componentes en Angular 22

## De qué va esta sesión

En Vanilla habéis construido ya una aplicación entera, desde la plantilla hasta el acceso con la API, y lo habéis hecho como un conjunto de páginas. Cada ejercicio era un `index.html`: el navegador lo pedía entero y, cuando el enlace llevaba a otra carpeta, pedía otro documento, otra vez con su cabecera, su menú y su pie. A eso se le llama aplicación de varias páginas. Funciona, y la habéis hecho funcionar. El peso aparece en cuanto la aplicación quiere comportarse como una sola herramienta, porque la misma cabecera vive copiada en cada documento, cada clic tira la página para montar la siguiente, y lo que una pantalla acaba de calcular desaparece en cuanto el navegador pide la otra.

Un framework entra justamente cuando ese modo de trabajar se queda corto. Angular trae ya la forma de una sola aplicación: un documento, una barra que no vuelve a nacer en cada clic, y unas pantallas que se relevan dentro de ella, de manera que el código de la cabecera se escribe una vez y las pantallas pueden compartir lo que saben. El navegador sigue pidiendo un documento, solo que ahora ese documento nace casi vacío y es Angular quien construye la página dentro de una etiqueta. Cuando el menú cambie de pantalla no se pedirá otro documento, sino que cambiará un hueco. A eso se le llama aplicación de una sola página. El nombre hace pensar que la dirección no cambia, y sí cambia, así que parece que haya varias páginas. Lo que no cambia es el documento que se pidió al entrar.

Hoy es el primer contacto con esa forma de trabajar. Vais a crear la aplicación y a colocar encima la plantilla que ya conocéis de `010f`, con su cabecera, su menú y su pie. El menú abrirá la portada y tres tarjetas, una por almacén. El formulario se verá igual en las tres, y los botones todavía no guardarán nada, porque guardar es el ejercicio siguiente y vive en otra carpeta.

Escribid vosotros cada trozo. Si os atascáis, comparad con el kit de esta carpeta, sin sustituir vuestro proyecto por una copia del kit entero.

**URL:** `http://localhost:4222`

---

## Dónde se abre la aplicación

Las páginas de Vanilla se abrían con el servidor del contenedor de sitios, en el puerto 4300. Esta aplicación no vive ahí. Tiene su propio contenedor, con Node y con la herramienta de línea de comandos de Angular 22, y el navegador del ordenador entra por el puerto 4222, que apunta al 4200 de dentro del contenedor.

Si se os ocurre abrir `index.html` con doble clic, o pasarlo por Live Server, el navegador cargaría el archivo como un documento suelto. Angular no habría arrancado y, más adelante, una dirección como `/crud-local-storage` no tendría quién le contestara. La aplicación se ve a través de su servidor de desarrollo.

Los comandos se lanzan dentro del contenedor, y siempre con bash, porque el alias del curso está en el arranque de bash. Con `sh` ese arranque no se lee y el alias no existe.

Desde la carpeta `entorno` del ordenador:

```bash
docker compose exec angular22 bash
```

---

## Paso 1 — Crear el proyecto

La herramienta de línea de comandos escribe el esqueleto, de modo que no creáis a mano el `index.html`, ni la carpeta `src`, ni el arranque. Situaos en la carpeta del bloque:

```bash
cd 070-Registro+Login-APINodeJS
```

Si existe una carpeta vacía `070a1-Plantilla-componentes-Angular`, borrarla con `rmdir`. `ng new` se niega a escribir dentro de una carpeta que ya existe, aunque esté vacía. Y si la carpeta ya tiene un `package.json`, no lancéis `ng new` otra vez, porque el proyecto ya está creado.

El nombre tiene dos caras. El paquete npm va en minúsculas, ya que npm no admite mayúsculas, mientras que la carpeta del curso lleva las mayúsculas de siempre, como el resto de carpetas del bloque. `--directory` separa las dos cosas. `--skip-git` evita un segundo repositorio, porque `FP-DevSetup` ya tiene el suyo, y si la CLI crea un `.git` aquí dentro el repositorio del curso deja de ver estos archivos como suyos.

El alias `ng-new` no basta para lanzar el comando con el nombre al final. Se expande a `ng new --style=css --no-ssr --ai-config=none`, y `--ai-config` admite varios valores, así que si escribís el nombre detrás la CLI se lo queda como si fuera otra herramienta de IA, dice que `ai-config` no acepta ese valor y ni siquiera crea la carpeta. El nombre tiene que ir delante de las opciones, y por eso el comando de clase es el largo:

```bash
ng new 070a1-plantilla-componentes-angular --directory=070a1-Plantilla-componentes-Angular --skip-git --style=css --no-ssr --ai-config=none
```

`--style=css` deja la misma hoja que en Vanilla. `--no-ssr` hace que la página se construya en el navegador. La otra opción, SSR, prepararía el HTML en el servidor antes de enviarlo, y en este módulo lo construye el navegador. `--ai-config=none` pide que no añada archivos de configuración de IA. El final bueno es la línea `Packages installed successfully`.

Entrad en la carpeta y abrid el proyecto en el editor del ordenador, no dentro del contenedor. El contenedor es donde corren los comandos, y los archivos están en el disco, en `entorno/angular22`.

```bash
cd 070a1-Plantilla-componentes-Angular
```

---

## Paso 2 — Cómo entra la aplicación

Antes de cambiar nada, seguid el camino que recorre la página la primera vez que el navegador la pide. En la aplicación de varias páginas ese camino era corto, porque el navegador pedía `index.html` y dentro ya estaban la cabecera y el menú. Aquí el documento llega vacío y Angular lo rellena. Son cuatro archivos, y cada uno espera al anterior.

`src/index.html` es el único documento. Trae el `head` y, en el `body`, una sola etiqueta:

```html
<app-root></app-root>
```

`<app-root>` no es una etiqueta de HTML. El navegador la ve y no sabe qué pintar, y tampoco es todavía un componente: es el sitio donde Angular va a colocar la aplicación. La cabecera y el menú no se escriben aquí. Si más adelante os veis pegando el `<header>` dentro de este archivo, la página enseñaría la plantilla fuera de Angular y el resto del framework no la vería.

Quien arranca Angular no es el HTML, sino `src/main.ts`, el primer archivo que se ejecuta:

```ts
import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { App } from './app/app';

bootstrapApplication(App, appConfig)
  .catch((err) => console.error(err));
```

`bootstrapApplication` pone la aplicación en marcha dentro del navegador. El primer argumento, `App`, es la clase del componente raíz, el que ocupa `<app-root>`. El segundo, `appConfig`, es la configuración de toda la aplicación. Si el arranque falla, `catch` escribe el error en la consola del navegador, la misma consola que ya usáis en Vanilla.

La clase está en `src/app/app.ts`. Al nacer, la CLI la deja parecida a esto:

```ts
import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('070a1-plantilla-componentes-angular');
}
```

`@Component` ata la clase a lo que se ve. `selector: 'app-root'` es el nombre de la etiqueta del `index.html`: Angular busca esa etiqueta y vuelca dentro la plantilla. `templateUrl` señala el HTML de este componente, `app.html`, y `styleUrl` señala su hoja, `app.css`, que ahora está vacía. La plantilla de un componente es su HTML. No es un `index.html` suelto, y no lleva `DOCTYPE` ni `<head>`.

Cabe pensar que la clase `App` es la página, y la página es la plantilla. La clase guarda los datos que esa plantilla quiera leer. En la bienvenida, `title` es uno de esos datos, una signal con el nombre del proyecto, y `app.html` la lee para escribir «Hello, 070a1-plantilla-componentes-angular». Una signal es un dato que la plantilla puede mostrar. Hoy no la estudiamos, porque la plantilla de `010f` no lee ningún dato de la clase, así que en el paso 4 la clase se queda vacía. Volverá cuando una lista tenga que cambiar en la pantalla después de guardar, y eso es otro ejercicio.

`src/app/app.html` es, por tanto, lo que vais a ver. El «Hello» está aquí, no en `index.html`. Buscad esa palabra en el documento y no la encontraréis: esa búsqueda es la comprobación de que el reparto ya se entiende.

`src/styles.css` es la hoja de toda la aplicación, el mismo papel que `css/styles.css` en Vanilla, y ahora solo tiene un comentario. `app.css` es otra hoja, la del componente `App`, y también está vacía. Las dos existen porque no pintan lo mismo: la global llega a toda la página, y la del componente se queda en su componente. Lo veréis cuando la tarjeta tenga su propio aspecto.

Si ya habéis visto Angular en otro curso, estaréis buscando `app.module.ts`. No está, y no hay que crearlo. Hasta la versión 16 era habitual un módulo que listaba los componentes y los servicios de la aplicación. Desde la 17, `ng new` entrega la aplicación de este otro modo, y en la 22 sigue siendo el camino de clase: cada componente declara, en su `@Component`, lo que su plantilla necesita, y lo que es de toda la aplicación va a `app.config.ts`.

```ts
import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes)
  ]
};
```

Este archivo no pinta nada. `providers` es la lista de piezas disponibles en toda la aplicación desde el arranque. `provideRouter(routes)` enciende el router y le entrega la tabla de direcciones. Sin esa línea, un enlace de Angular no tendría quién lo escuchara. `provideBrowserGlobalErrorListeners()` manda los errores del framework a la consola del navegador.

La tabla está en `src/app/app.routes.ts` y, al nacer, está vacía. El router ya está conectado y todavía no tiene pantallas. Hasta que las añadáis, la aplicación es un solo componente, `App`, y su plantilla ocupa toda la página.

`<base href="/">`, en el `head`, se queda. El router fabrica las direcciones a partir de ahí, y la barra significa «desde la raíz de esta aplicación». Si se quita, una ruta se calcula desde la dirección en la que estabais y el menú deja de encontrar la pantalla.

---

## Paso 3 — Ver la bienvenida

El esqueleto ya está y falta el servidor que se lo entrega al navegador. En otra terminal, entrad otra vez al contenedor y al proyecto. `ng-serve` deja esa terminal ocupada, así que no la cerréis mientras queráis ver la página.

```bash
ng-serve
```

El alias es `ng serve --host 0.0.0.0`. El `0.0.0.0` hace que el servidor escuche en el contenedor de forma que el navegador del ordenador pueda entrar. Sin él, el servidor solo atiende dentro del contenedor y `localhost:4222` no abre, aunque el comando parezca haber ido bien.

Abrid http://localhost:4222. Tiene que leerse **Hello, 070a1-plantilla-componentes-angular**. Ya sabéis dónde está esa frase: en `app.html`. Angular ha arrancado, ha encontrado `<app-root>` y ha volcado ahí la plantilla de `App`.

Guardad un archivo y la página se actualiza sola. Eso lo hace el servidor de desarrollo, que vuelve a preparar la aplicación y el navegador recarga. Todavía no es Angular cambiando un dato en caliente, porque de momento no hay datos.

---

## Paso 4 — La plantilla pasa a ser la de un componente

Abrid `entorno/vanilla-app/sites/010-Plantilla/010f-Plantilla-estilos/index.html`. Copiad solo lo que hay dentro de `<body>`, desde `<header class="header">` hasta `</footer>`, y sustituid con ello todo `src/app/app.html`.

No copiéis el `DOCTYPE`, ni `<html>`, ni `<head>`, ni las etiquetas `<body>`, porque esos ya viven en `index.html`. Si los pegáis dentro de la plantilla del componente quedaría un documento dentro de otro, y Angular espera un trozo de página, el que va a colocar dentro de `<app-root>`.

En lo copiado cambiad tres textos. El título de la cabecera pasa a «Ejercicios – Angular 22» y la tagline pasa a «Plantilla». El menú de documentación se queda, con w3schools, javascript.info y MDN. El desplegable «Ejercicios» de `010f` se sustituye por tres desplegables, con la misma estructura de Vanilla (`dropdown`, `aria-haspopup`, `aria-label`):

- localStorage, y dentro «CRUD localStorage»
- IndexedDB, y dentro «CRUD IndexedDB»
- APINodeJS, y dentro «CRUD APINodeJS»

Esos enlaces internos pueden seguir con `href="#"` un momento. Todavía no hay pantallas, y el enlace de Angular se explica cuando el hueco exista. Si lo escribís ahora, la plantilla usa una pieza que el componente no ha declarado y el servidor de desarrollo se para en rojo.

`app.ts` no tiene equivalente en Vanilla. La plantilla que acabáis de pegar no lee `title`, ni tiene el hueco del router, así que dejad la clase vacía y el import solo con `Component`:

```ts
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  imports: [],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {}
```

Si dejáis `signal` o `RouterOutlet`, el archivo importa algo que la plantilla no usa y el servidor se pone en rojo. La página no está mal construida: Angular, en este proyecto, no admite imports de más. Cuando el menú tenga que abrir pantallas, `RouterOutlet` vuelve. Hoy sobra.

Guardad. En el navegador desaparece el «Hello» y se leen la cabecera, los tres nombres y el pie. El aspecto sigue siendo el del navegador, sin la barra marrón ni las texturas, porque la plantilla ya es la de `010f` y la hoja que le daba el aspecto todavía no ha llegado.

---

## Paso 5 — La hoja y las imágenes

Copiad todo `010f-Plantilla-estilos/css/styles.css` en `src/styles.css`.

En `010f` ya visteis que `url()` se lee desde el archivo donde está escrita la regla, no desde el HTML. Allí la hoja estaba en `css/` y las imágenes en `img/`, un nivel por encima, y por eso la ruta era `url(../img/...)`. Aquí la hoja está en `src/styles.css`, de modo que si dejáis `../img/` el servidor busca la imagen al lado de `src`, no la encuentra y se para.

Las imágenes de esta aplicación no se sirven desde `src`, sino desde `public/`. Esa carpeta se publica en la raíz del sitio, y un archivo `public/img/user.png` se pide como `http://localhost:4222/img/user.png`. En las tres rutas (`bgwhite.png`, `bgblue.png` y `bglightblue.png`) cambiad `../img/` por `/img/`. La barra del principio significa «desde la raíz del sitio», que es justo donde ha quedado `public`.

Cread `public/img/` y copiad ahí, desde `010f-Plantilla-estilos/img/`:

- `bgwhite.png`
- `bgblue.png`
- `bglightblue.png`
- `user.png`

En la cabecera, la foto tiene que apuntar a `/img/user.png`. `./img/user.png` parece valer en la portada, porque la dirección es `http://localhost:4222/` y `./img` cae en la raíz. Cuando el menú abra una práctica, la dirección será `http://localhost:4222/crud-local-storage` y el navegador buscará la foto a partir de esa ruta, con lo que la imagen desaparece. Una ruta que empieza por `/` no depende de la pantalla en la que estéis.

El icono de la pestaña es `public/favicon.ico`. Copiad encima el `favicon.ico` de `010f-Plantilla-estilos/img/`, y no cambiéis el `<link>` del `index.html`: ya apunta a `favicon.ico`, y como `public` está en la raíz el navegador lo encuentra.

Recargad. Cabecera y pie con textura, barra marrón, y el submenú al pasar el ratón. El documento sigue teniendo un solo `<app-root>`. Lo que ha cambiado es la hoja global, que Angular incorpora porque `angular.json` la nombra. Por eso no habéis puesto un `<link>` en el `head`, y por eso tampoco hay que copiarlo desde `010f`.

---

## Paso 6 — El documento que sí se edita

`index.html` se queda corto. Lo que se toca es el `head`, para que la pestaña y el idioma sean los del curso. Traed de la cabecera de `010f` el idioma y dos metas, sin pisarlos entre sí.

`lang` pasa a `es`. El viewport se queda como en Vanilla, una etiqueta con `name="viewport"` y el ancho del aparato en `content`. La descripción es otra etiqueta, `name="description"`, y su `content` es «La Plantilla en Angular 22». Si juntáis las dos en una sola línea para ahorrar, el navegador se queda con una sola meta: el móvil pierde el viewport, o la descripción deja de llamarse `description`. Son dos informaciones distintas y van en dos etiquetas.

El `<title>` es el nombre de la carpeta, `070a1-Plantilla-componentes-Angular`. La CLI lo había dejado en minúsculas, con el nombre del paquete, y el título de la pestaña es el de la carpeta del curso, igual que en Vanilla.

No quitéis `<base href="/">` ni `<app-root>`, que ya visteis para qué está cada uno. La pestaña tiene que mostrar ese título y el icono del curso. Si el título no cambia, cerrad la pestaña y abridla de nuevo, porque el navegador se queda a veces con el anterior.

---

## Paso 7 — Una pantalla, un componente

La portada y cada CRUD van a ser una pantalla distinta. En Angular una pantalla de este tipo es un componente, con el mismo reparto que ya habéis visto en `App`: una clase, una plantilla y una hoja. `ng-serve` sigue en su terminal. En otra, dentro del proyecto:

```bash
ng generate component inicio --skip-tests
ng generate component crud-local-storage --skip-tests
ng generate component crud-indexed-db --skip-tests
ng generate component crud-api-node --skip-tests
```

`--skip-tests` no crea el archivo de pruebas, y en este módulo no escribimos esas pruebas. El comando no pregunta. Cada uno deja una carpeta en `src/app/`, al mismo nivel que `app.ts`, con tres archivos: `.ts`, `.html` y `.css`. El HTML trae una frase `works!`, para que sepáis que ese componente ya se ve. El CSS está vacío. En el `.ts`, `selector` es la etiqueta de ese componente, y el de la portada queda `app-inicio`. `imports` llega vacío, porque su plantilla, de momento, solo tiene esa frase. No aparece ningún módulo.

Si buscáis `<app-inicio>` dentro de `index.html`, no está, y no hay que escribirla. El `selector` existe para que Angular sepa crear el componente, y quien lo crea, en el paso siguiente, es el router, cuando la dirección corresponde a esa pantalla. La única etiqueta escrita a mano sigue siendo `<app-root>`.

`inicio` no es una palabra reservada. Si el editor subraya esa palabra en minúsculas y no la clase `Inicio`, es el diccionario inglés. Pasad el ratón: si dice que la palabra es desconocida, el proyecto está bien.

---

## Paso 8 — El menú cambia de pantalla sin pedir otro documento

En la aplicación de varias páginas, «CRUD localStorage» sería un enlace a otro `index.html`. El navegador pediría ese archivo, tiraría la página actual y montaría la nueva, cabecera incluida. Aquí la dirección va a cambiar y el documento no. `App` sigue montado dentro de `<app-root>`, su plantilla conserva la cabecera, el menú y el pie, y lo que se sustituye es el interior de `<main>`.

Ese interior es una etiqueta vacía, `<router-outlet />`. El router mira la dirección del navegador, busca en la tabla una ruta que encaje y crea ahí el componente de esa ruta, de modo que su plantilla aparece dentro del hueco. Al elegir otra ruta, ese componente se quita y entra el otro. La cabecera no se vuelve a pedir, porque no estaba dentro del hueco, sino en la plantilla de `App`, que no se ha ido. Es la misma cabecera que en Vanilla teníais que copiar en cada documento, escrita ahora una sola vez.

La tabla se escribe en `app.routes.ts`:

```ts
import { Routes } from '@angular/router';
import { CrudLocalStorage } from './crud-local-storage/crud-local-storage';
import { CrudIndexedDb } from './crud-indexed-db/crud-indexed-db';
import { CrudApiNode } from './crud-api-node/crud-api-node';
import { Inicio } from './inicio/inicio';

export const routes: Routes = [
  { path: 'crud-local-storage', component: CrudLocalStorage },
  { path: 'crud-indexed-db', component: CrudIndexedDb },
  { path: 'crud-api-node', component: CrudApiNode },
  { path: '', component: Inicio },
];
```

Cada `path` es el trozo de dirección que va después del puerto. `crud-local-storage` es `http://localhost:4222/crud-local-storage`. La ruta `''` no tiene trozo: es la portada, la que se abre en http://localhost:4222. Una ruta vacía no se come a las demás, porque `crud-local-storage` no es una dirección vacía. Angular elige la ruta cuyo `path` coincide.

`provideRouter(routes)` ya leía este archivo desde el paso 2. Entonces la tabla estaba vacía y el router no tenía dónde ir. Ahora la tabla tiene cuatro pantallas, y no hace falta tocar `app.config.ts`.

En `app.ts` la plantilla va a usar dos piezas que no son HTML, el enlace que cambia de ruta y el hueco donde entra la pantalla. Hay que declararlas en el componente dueño de esa plantilla, que es `App`:

```ts
import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  imports: [RouterLink, RouterOutlet],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App {}
```

Fijaos en las dos líneas que traen `RouterLink`. La de arriba es un `import` de TypeScript, y con ella el nombre entra en el archivo. La de dentro de `@Component` es otra lista, `imports`, y le dice a Angular que la plantilla de este componente puede usar ese nombre. Hacen falta las dos. Con la de arriba el archivo conoce la pieza, y con la de abajo la plantilla tiene permiso para usarla. Si falta la de abajo, escribís `routerLink` en el HTML y Angular lo ignora: el navegador ve un enlace normal y la dirección no cambia.

Cortad la sección de «Bienvenido» de `app.html` y pegadla en `inicio.html`, en lugar de `inicio works!`. Esa sección era el contenido de la portada, y ahora la portada es el componente `Inicio`, así que el texto vive en su plantilla. Dentro de `<main>`, en `app.html`, dejad solo el hueco:

```html
<router-outlet />
```

En los tres enlaces del submenú, cambiad `href="#"` por `routerLink`. localStorage apunta a `/crud-local-storage`, IndexedDB a `/crud-indexed-db` y APINodeJS a `/crud-api-node`. La barra inicial encaja con `<base href="/">`, porque la ruta se pide desde la raíz de la aplicación.

Los enlaces de w3schools, javascript.info y MDN siguen con `href`. Cabe pensar que, ya puestos, todos los enlaces deberían ser `routerLink`, y esos tres salen de la aplicación: el navegador tiene que pedir otro sitio, y eso lo hace `href`. `routerLink` se quedaría dentro, buscaría una ruta con esa dirección y no la encontraría en la tabla. Los títulos de los desplegables, «localStorage», «IndexedDB» y «APINodeJS», también siguen con `href="#"`. No abren una pantalla. Abren el submenú, y eso ya lo hacía el CSS de `010f`.

Abrid la portada. Tiene que verse «Bienvenido» y ninguna frase `works!`. Abrid un CRUD: «Bienvenido» desaparece y entra el `works!` de ese componente, mientras la cabecera sigue en su sitio. Abrid la pestaña Red, pulsad otra entrada del menú y mirad si el navegador pide otro documento. No lo pide. Ha cambiado la dirección, y `index.html` sigue siendo el que se cargó al entrar.

Volved a http://localhost:4222 para ver la portada. El enlace de vuelta, «Página principal», va en el pie de la tarjeta, como en Vanilla. Todavía no está la tarjeta, así que de momento se vuelve escribiendo la dirección. El título de la cabecera sigue siendo un `<p class="header-title">`. Si se os ocurre convertir ese título en un enlace a la portada, el curso deja ese papel al pie de la tarjeta.

Queda una duda que aparece en cuanto recargáis encima de un CRUD. La dirección es `http://localhost:4222/crud-local-storage` y el navegador, al recargar, pide esa ruta al servidor. No existe un archivo con ese nombre. `ng-serve` contesta con el mismo `index.html`, Angular arranca otra vez, lee la dirección y vuelve a crear el componente de esa ruta. Por eso la aplicación se abre con el servidor de desarrollo. Una dirección `file:///` no tiene a nadie para devolver `index.html` cuando la ruta no es un archivo real.

---

## Paso 9 — La misma tarjeta en las tres pantallas

El `works!` solo decía que el componente se ve. La pantalla de cada almacén es la tarjeta que ya conocéis. El formulario es el de IndexedDB, no el de `040a4`, que solo tiene el archivo de la foto. El que usamos está en `050a2-Usuario-APIweb/ejercicios/IndexedDB/ejer02/index.html`: archivo, vista previa, casilla y botón «Pedir a la API». Los tres almacenes van a compartir ese formulario. Lo que cambia, de una tarjeta a otra, es el texto que dice dónde se guardará la cuenta. Los botones, hoy, siguen sin guardar.

Copiad la caja de esa práctica, desde `<div class="container">` hasta el cierre de esa caja, en `crud-local-storage.html`, en lugar de la frase `works!`. No copiéis cabecera, menú, pie de página ni `<script>`. La cabecera ya está en `App`, escrita una vez para las tres pantallas. El `<script>` de Vanilla no tiene sitio aquí: el comportamiento, cuando llegue, vivirá en la clase del componente y en un servicio, no en un script del documento.

Los párrafos del principio no se copian igual en las tres tarjetas, porque dicen dónde se guarda y eso cambia. Los campos, la casilla y los botones sí son los mismos. Los `id` pueden repetirse. Un `id` duplicado es HTML inválido cuando los dos están en la página a la vez, y aquí el router solo pone un componente: al salir de localStorage, esa tarjeta se quita del documento y entra la otra. Nunca hay dos formularios a la vez.

En localStorage:

```html
<h1 class="cardTitle">Usuarios en localStorage</h1>
```

```html
<p>Guardamos las cuentas juntas en <code>localStorage</code>.</p>
<p>Clave: <code>usuarios</code>. El valor es un objeto JSON con todas las cuentas.</p>
<p>Cada cuenta añade la dirección. <br>La foto se guarda como texto. <br>Si la casilla pide un <code>Blob</code>, se convierte antes de guardar.</p>
```

En IndexedDB el título es «Usuarios en IndexedDB». El almacén se llama `usuarios` y la clave primaria es el campo `usuario`. Si la casilla está marcada, la foto se guarda como `Blob`. Si no, como texto.

En la API de Node el título es «Usuarios en APINodeJS». La cuenta va a MySQL, base `accesoDB`, tabla `usuarios`. La foto se guarda como texto. Si la casilla pide un `Blob`, se convierte antes de guardar.

Este párrafo va en las tres. Habla del formulario, no del almacén:

```html
<p>Pedir a la API rellena el formulario. <br>El nombre, el teléfono y la dirección salen de randomuser. <br>La casilla elige la foto: <br>  - marcada, un <code>Blob</code> de otra API; <br>  - sin marcar, la dirección de la miniatura de randomuser.</p>
```

En el pie, «Página principal» deja de apuntar a `../../../index.html`. Esa ruta relativa tenía sentido cuando cada práctica era una carpeta de la aplicación de varias páginas. Aquí la portada es la ruta vacía, y el enlace pasa a `routerLink="/"`.

La hoja de la tarjeta es `040a4-Usuarios-imagen-Base64/ejercicios/css/styles.css`. En Vanilla había una hoja para la página y otra para la tarjeta, y aquí el reparto se parece, con una diferencia. `src/styles.css` es la hoja de la aplicación, la de la cabecera, el menú, el fondo y el pie. La hoja de un componente solo pinta ese componente, así que si copiáis la tarjeta solo en `crud-local-storage.css`, IndexedDB y la API de Node salen sin caja aunque su HTML sea el mismo. Copiad la hoja en el `.css` de cada CRUD. El contenido es el mismo tres veces, y cada componente necesita el suyo.

Dejarla una sola vez en `styles.css` también pintaría la tarjeta, porque esa hoja llega a toda la aplicación, y cualquier elemento con esas clases recibiría el aspecto de la tarjeta, también fuera de ella. En la hoja del componente, las clases se quedan dentro.

`routerLink` del pie no funciona solo con escribirlo. La plantilla que lo usa es la del CRUD, no la de `App`. `App` ya importa `RouterLink`, y con eso el menú navega. La tarjeta es otro componente y tiene su propia lista `imports`. En cada `.ts` de CRUD:

```ts
import { RouterLink } from '@angular/router';
```

y `imports: [RouterLink]`. Sin eso, el `<a>` no navega, y no veréis un error en el `.ts`, porque el `.ts` no menciona `routerLink`: el atributo está en el HTML. El HTML admite un atributo desconocido y no se queja. El editor, además, a menudo no revisa estas plantillas, porque el `angular.json` del proyecto no está en la raíz del workspace. El aviso, cuando sale, sale en el `.html`, sobre `routerLink`.

Entrad en cada CRUD. La tarjeta se ve, con su caja. «Página principal» vuelve a «Bienvenido», y la cabecera no se ha recargado, porque habéis cambiado de ruta dentro de la misma aplicación. Guardar, Leer, Borrar, la espera y Pedir a la API no hacen nada todavía. El componente muestra el formulario, y todavía no hay nadie que recoja el clic y escriba en un almacén.

---

## Si falla

Si `ng-new` seguido del nombre dice que `ai-config` no acepta el nombre del proyecto, el nombre ha quedado detrás del alias. Usad el comando del paso 1, con el nombre delante.

Si `Package install failed` y el texto es `edgesOut`, la imagen no es la reconstruida con el Dockerfile del curso. No volváis a lanzar `ng new` si la carpeta ya tiene `package.json`. Entrad en ella y lanzad `npm install`.

Si el servidor arranca y el navegador no abre, mirad que hayáis usado `ng-serve` y la dirección `http://localhost:4222`. Una dirección que empiece por `file:///` no está hablando con el contenedor, y Angular no ha arrancado.

Si un fondo o la foto rompen el servidor, la ruta sigue en `../img/`. Tiene que ser `/img/`, y el archivo tiene que estar en `public/img/`.

Si «Página principal» no vuelve a la portada, abrid el `.ts` de esa tarjeta, no el de `App`. La lista tiene que ser `imports: [RouterLink]`.

Si al recargar un CRUD el navegador dice que no encuentra la página, la está pidiendo como archivo. La dirección tiene que seguir siendo la del servidor de desarrollo.

---

## Siguiente

Este ejercicio se cierra aquí. Donde en Vanilla había muchos documentos, ahora hay uno, un componente raíz y un hueco que cambia de pantalla. Lo que falta es la memoria. El servicio que guarda en `localStorage` es `070a2-Servicio-localStorage`. Esa carpeta copia el `src` y `public` de esta, y allí los botones se enganchan.
