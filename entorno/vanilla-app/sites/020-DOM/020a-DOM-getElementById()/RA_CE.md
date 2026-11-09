# 020a — RA y CE

## Resumen técnico

Se localizan botones por `id` y el clic se engancha de seis formas: propiedad `onclick`, función con nombre, función anónima, `addEventListener`, función flecha y uso del evento. El resultado se escribe en un párrafo y en la consola.

## Resultados de Aprendizaje trabajados

RA1, RA2, RA4, RA5 y RA6.

## Criterios de Evaluación acreditados

- **RA1.b** El navegador ejecuta el script al cargar la página.
- **RA1.d** El mismo clic se programa de varias formas. La propiedad `onclick` pisa al manejador anterior. `addEventListener` no. El ejercicio contrapone esas dos maneras de escribir el guion.
- **RA1.c** El lenguaje de cliente es JavaScript.
- **RA1.e** El HTML de los botones enlaza el script. El guion no sustituye al documento.
- **RA1.f** La prueba es pulsar cada botón y mirar el párrafo y la consola (`console.log`).
- **RA2.b** Los nodos se guardan en constantes.
- **RA2.g** Cada forma de enganchar el clic va comentada en el propio script.
- **RA4.b** Hay funciones definidas en el script, con nombre y anónimas, y una función flecha.
- **RA5.b** El clic se gestiona en JavaScript, no con un atributo de evento en el HTML.
- **RA5.c** El evento trabajado es `click`.
- **RA5.d** El manejador escribe en `#resultado` y, en un botón, cambia el texto del propio control con `e.currentTarget`.
- **RA6.b** `getElementById` localiza cada botón y el párrafo de salida. `textContent` cambia el texto.
- **RA6.e** Cada botón queda asociado a una acción.
- **RA6.h** Los botones están en el HTML, el aspecto en la hoja de la plantilla y el comportamiento en el script.

No entran formularios, almacenamiento, expresiones regulares ni comunicación asíncrona. La plantilla visual no se vuelve a acreditar.
