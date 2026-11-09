# Criterio para elaborar README.md y APUNTES.md

El profesor se centra en el código del kit y en repartir al alumnado, dentro de cada carpeta de ejercicio, `README.md` + `APUNTES.md`.
El agente escribe esos dos archivos siguiendo **este archivo**.
No se generan transparencias. No se ejecuta `build-marp-slides.sh`.
Si al elaborar un ejercicio la carpeta todavía tiene `APUNTES.slides.md`, `APUNTES.slides.pdf` o un `.zip` de diapositivas, se borran en ese momento.
Si el criterio no convence, el profesor pide modificar este archivo.

## Archivos en esta carpeta (`sites/`)

| Archivo | Rol | ¿Al alumnado? |
|---------|-----|----------------|
| `APUNTES-CRITERIO.md` | Cómo redactar apuntes | No |

**No** usar GUIA-COMUN en el flujo de clase. Un solo hilo: un `README.md` y un `APUNTES.md` por ejercicio, dentro de su carpeta (`010a-…`, `020a-…`), no en la raíz del bloque.

## Qué entregar al alumnado

| Archivo | Dónde | Quién lo edita |
|---------|-------|----------------|
| `README.md` | Carpeta del ejercicio | Agente (el profesor valida) |
| `APUNTES.md` | Carpeta del ejercicio | Agente (el profesor valida) |

El `README.md` dice qué hace ese paso, de qué carpeta se parte y la URL Docker. El camino de clase está en el `APUNTES.md` de la misma carpeta.

## Cómo redactar APUNTES.md

- Español de España. En el material: **vosotros**. En el chat con el profesor: tuteo.
- Narrativa que **construye el ejercicio paso a paso**. No telegráfica.
- **No** presuponer conceptos clave (cookies, tamaño de Storage, promesas IndexedDB, etc.). Explicarlos cuando toque. El profesor remarca esos puntos al pedir cada módulo.
- **Sin** rótulos fijos *Qué hacer / Por qué / Comprueba*.
- **Sin** enlaces a GUIA-COMUN ni saltos a otro documento en mitad de la clase.
- Una idea nueva por paso. Lo ya visto: recordatorio corto.
- Código del trozo nuevo **en el apunte**.
- Duda típica: una frase que la nombre y la resuelva.

Estructura orientativa:

1. De qué va esta sesión / de dónde partís  
2. Pasos numerados que montan el ejercicio  
3. Si falla · Entrega · Siguiente (o cierre del bloque)

## Páginas del kit (desde 020)

Vale para todos los bloques: DOM, Cookies, Storage, IndexedDB y API Node.JS. Un paso cada vez. La base visual es la plantilla cerrada en `010f`. No se reescribe.

Cada `index.html`:

- El `<title>` es el nombre de la carpeta donde está ese archivo.
- La cabecera lleva «Ejercicios – FUNDAMENTOS DE JS (ES6)» y el subtítulo «Desarrollo WEB en entorno cliente».
- La tagline de la **portada** dice de qué va el bloque («Leer y cambiar el DOM»). Esa frase se mantiene en la portada de todos los pasos del bloque, hasta cambiar de bloque.
- La tagline de **cada práctica** dice de qué va esa práctica («Localizar un elemento por su id»). No dice «Plantilla» ni «Ejercicio 01».

CSS, dos hojas y cada una con su sitio:

- Todas las páginas enlazan el `css/styles.css` de la raíz del paso. De ahí salen cabecera, menú, fondo y pie. El tramo ya hecho es el del paso anterior; lo nuevo se engancha al final.
- Si el `main` lleva una tarjeta, la práctica enlaza además `ejercicios/css/styles.css`, después de la hoja raíz. Esa hoja solo pinta la tarjeta: contenedor, caja, título, cuerpo y pie de la tarjeta, con la sombra que la hace flotar. No define `.footer`, ni `.header`, ni una media query de la página. Si lo hace, el pie de la práctica deja de ser el de la portada.

Menú, el mismo en la portada y en cada práctica, para abrir cualquier ejercicio desde cualquiera:

- La etiqueta del desplegable es el nombre del bloque: DOM, Cookies, Storage, IndexedDB o API Node.JS. No es «Ejercicios».
- Cada entrada dice, en corto, qué hace esa práctica.
- La práctica abierta sigue en la lista, sin `href`, con `aria-current="page"`. Así no se vuelve a pulsar y el menú no cambia de forma. Las demás llevan `href` a la carpeta hermana (`../ejer02/index.html`).
- El estilo de esa entrada va al final de la hoja raíz, seleccionando `a[aria-current="page"]`, con `pointer-events: none`. No va en la hoja de la tarjeta.
- El enlace «Página principal» del pie de la tarjeta vuelve al `index.html` del paso.

Estos tres atributos se explican en el apunte. No basta con pegarlos:

- `aria-haspopup="true"`, en el enlace que abre la lista: no se ve; le dice a un lector de pantalla que ahí se despliega un submenú.
- `aria-label`, en la `ul` («Submenú DOM», o el bloque que toque): la lista no tiene título visible y el lector usa este nombre. Tiene que coincidir con la etiqueta del bloque.
- `aria-current="page"`, solo en la entrada de la práctica abierta: quitar el `href` impide el salto; este atributo dice que esa entrada es la página actual.

Tras el trozo, se mira donde se note el fallo: la página, el inspector o la consola. Un atributo `aria-*` no se ve en la página; se comprueba en el inspector.

Las páginas se abren en `http://localhost:4300/…` con el servicio Docker. En los apuntes no se usa Live Server ni `file://`.

## JavaScript que se queda

En `020a` se ven varias formas de enganchar un clic. Cada una va en su botón, para que no se pisen. A partir de ahí, la forma de los ejercicios es `addEventListener` con una función flecha que escribe en otro elemento:

```javascript
const boton = document.getElementById("boton");
const resultado = document.getElementById("resultado");

boton.addEventListener("click", () => {
  resultado.textContent = "¡Has pulsado el botón correctamente!";
});
```

La flecha no tiene `this` propio: usa el del sitio donde está escrita. En un script de página, ese `this` es `window`, no el botón. `this.disabled = true` dentro de la flecha no desactiva el botón. Para hablar del elemento donde se colgó el oyente, la flecha usa el evento: `e.currentTarget`. En una función normal, `this` sí es ese elemento.

Un `<input type="button">` pinta `value`, no `textContent`. `textContent` escribe dentro del nodo y se ve en el inspector, no en el rótulo. Para ver el cambio en la página como en el resto: `resultado.textContent` si el destino es el párrafo, o `e.currentTarget.value` si el destino es el propio botón.

## Cortes en el apunte

Una línea `---` sola separa partes del `APUNTES.md`. No es una diapositiva.

## Ritmo

Un módulo cada vez. Tras cada uno: breve cierre y esperar «siguiente» o correcciones.
