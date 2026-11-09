# 010d — Plantilla: submenú y otras páginas

Cuarto paso del bloque. Se parte de la carpeta de 010c. «Ejercicios» deja de apuntar a una carpeta que no existe: al pasar el ratón, o al llegar con Tab, se abre una lista con dos entradas. Cada una abre otro `index.html`, en `ejercicios/ejer01/` y `ejercicios/ejer02/`. Esas páginas no llevan submenú. Suben dos niveles (`../../`) para usar el CSS, el icono y la foto de esta carpeta, y vuelven a la portada con el mismo salto. La tagline de la portada es «Submenú que abre otras páginas». El CSS de la cabecera y de la barra no se toca; lo nuevo va al final, bajo `/* 010d — submenús */`.

Se abre con el servicio Docker, no con Live Server ni con doble clic:

http://localhost:4300/010-Plantilla/010d-Plantilla-nav+enlaces/

El camino de clase está en `APUNTES.md`, en esta misma carpeta.
