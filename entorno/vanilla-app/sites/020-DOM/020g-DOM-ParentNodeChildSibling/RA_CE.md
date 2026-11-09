# 020g — RA y CE

## Resumen técnico

Desde un elemento se leen el padre, los hijos del padre y los hermanos anterior y siguiente, tanto el nodo como el elemento. El tipo de nodo decide el mensaje.

## Resultados de Aprendizaje trabajados

RA2, RA5 y RA6. Cierra el bloque DOM.

## Criterios de Evaluación acreditados

- **RA2.e** Se distingue si el hermano es un elemento (`nodeType === 1`) o un nodo de texto.
- **RA2.f** Un bucle recorre `childNodes`.
- **RA5.d** Cada relación del árbol tiene su botón y su manejador.
- **RA6.a** Se tratan nodo, elemento, `nodeName` y `nodeType`. El modelo deja de ser solo «la etiqueta que se ve».
- **RA6.b** Entran `parentNode`, `childNodes`, `previousSibling`, `nextSibling` y las variantes que saltan al elemento.
- **RA6.c** Se recorre alrededor de un nodo: hacia el padre, hacia los hijos y hacia los lados.

No entra RA6.f ni RA6.g: no hay prueba de compatibilidad entre navegadores ni código alternativo por agente. Las prácticas DOM de los bloques siguientes copian este bloque y no lo vuelven a acreditar.
