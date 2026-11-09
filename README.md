# FP-DevSetup

## Entorno de desarrollo — DAW · Curso 2026-2027

Bienvenido. Este kit sirve para que **todas las máquinas del aula** trabajen igual.

Tú editas el código en VS Code. Docker ejecuta los servicios del curso.

**Orden del curso:** Vanilla JS → Angular → React + API.

---

## Por dónde empezar

**Empieza por este archivo (`README.md`).**  
Después sigue la secuencia numerada:

| Orden | Documento | Cuándo |
|-------|-----------|--------|
| 0 | **Este archivo** · [slides](README.slides.md) | Ahora: visión general |
| 1 | [README-01-instalacion.md](README-01-instalacion.md) · [slides](README-01-instalacion.slides.md) | Instalar el entorno en tu PC |
| 2 | [README-02-flujo.md](README-02-flujo.md) · [slides](README-02-flujo.slides.md) | Cuando ya esté instalado: trabajo en clase |
| 3 | [README-03-comandos.md](README-03-comandos.md) · [slides](README-03-comandos.slides.md) | Consulta: Git, GitHub, Docker; **subir tu trabajo a GitHub** |
| 4 | [README-04-extensiones.md](README-04-extensiones.md) · [slides](README-04-extensiones.slides.md) | Consulta: extensiones de VS Code |
| 5 | [README-05-aliases.md](README-05-aliases.md) · [slides](README-05-aliases.slides.md) | Consulta: atajos de terminal |
| 6 | [README-06-problemas.md](README-06-problemas.md) · [slides](README-06-problemas.slides.md) | Si algo falla |

Cada `*.slides.md` es la versión **Marp** para proyectar en clase (VS Code → Export Slide Deck…).  
El texto completo para leer o seguir paso a paso sigue en el `.md` sin `.slides`.

Si te saltas un paso y te pierdes, vuelve aquí o abre el documento que toque según la tabla.

---

## ¿Qué es cada cosa? (muy breve)

| Tecnología | Qué es | En este proyecto |
|------------|--------|------------------|
| **Vanilla JS** | JavaScript en HTML, sin framework | Ejercicios en `vanilla-app/sites/` |
| **Angular** | Framework para aplicaciones web (cliente) | Contenedor `angular22` |
| **React** | Librería para interfaces de usuario | Contenedor `react19` |
| **Node.js** | JavaScript en el servidor | API `nodejs-api` (Express + MySQL) |
| **MySQL** | Base de datos | Datos del curso (`accesoDB`, `dbzDB`…) |
| **Docker** | Contenedores: mismo entorno en todos los PCs | Carpeta `entorno/` |
| **nginx** | Servidor web estático | Sirve los ejercicios vanilla |

---

## Resumen de instalación

Elige tu equipo y abre el manual completo:

**→ [README-01-instalacion.md](README-01-instalacion.md)**

Cuando el laboratorio ya arranca y quieres **entender** `entorno/` (compose, Dockerfiles, volúmenes):

**→ [entorno/README.md](entorno/README.md)** · [slides](entorno/README.slides.md)

| Equipo | Carpeta del script | Nota |
|--------|-------------------|------|
| Mac Intel | `mac-intel/` | Docker Desktop abierto |
| Mac chip M | `mac-arm/` | Docker Desktop abierto |
| Linux | `linux/` | Proyecto en `/home/...`, no en `/media/sf_*` |
| Windows | `windows/` | Dentro de la app **Ubuntu**, no en `C:\` |

En todas: `bash setup.sh` → luego `cd entorno && docker compose up -d`.

**phpMyAdmin / MySQL (clase):** usuario `root` · contraseña `dejame`  
→ [http://localhost:8081](http://localhost:8081)

---

## GitHub: copia del trabajo

| Situación | Qué hacer |
|-----------|-----------|
| Primera vez (crear y subir tu repo) | [03 — camino A o B](README-03-comandos.md#subir-tu-carpeta-fp-devsetup-a-github) (**uno u otro**, no los dos) |
| Seguir en el mismo PC | `git add` · `git commit` · `git push` |
| Empezar en otro PC | `git clone` + [01 instalación](README-01-instalacion.md) |
| Alumno | Repo en **su** cuenta; no hacer push al repo del profesor |

Detalle completo → [README-03-comandos.md](README-03-comandos.md)

---

## Estructura del proyecto

```
FP-DevSetup/
├── README.md                    ← estás aquí (empieza aquí)
├── README.slides.md             ← diapositivas Marp del índice
├── README-01-instalacion.md (+ .slides.md)
├── README-02-flujo.md (+ .slides.md)
├── README-03-comandos.md (+ .slides.md)
├── README-04-extensiones.md (+ .slides.md)
├── README-05-aliases.md (+ .slides.md)
├── README-06-problemas.md (+ .slides.md)
├── marp-slides.css
├── build-marp-slides-readme.sh  ← refresca el CSS de los .slides.md
├── mac-intel/ | mac-arm/ | linux/ | windows/
└── entorno/                     ← Docker del curso
    ├── README.md (+ .slides.md) ← cómo funciona compose / Dockerfiles
    ├── docker-compose.yml
    ├── limpiar.sh
    ├── angular22/
    ├── react19/
    ├── nodejs-api/
    ├── db/
    └── vanilla-app/sites/
```

---

## Siguiente paso

Cuando hayas leído esta página, continúa con:

**→ [README-01-instalacion.md](README-01-instalacion.md)**
