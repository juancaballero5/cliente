# FP-DevSetup

## Entorno de desarrollo — DAW · Curso 2026-2027

Kit para que **todas las máquinas del aula** trabajen igual.

Editas el código en VS Code. Docker ejecuta los servicios del curso.

**Orden del curso:** Vanilla JS → Angular → React + API.

### ¿Qué es cada cosa? (muy breve)


| Tecnología     | Qué es                                          | En este proyecto                       |
| -------------- | ----------------------------------------------- | -------------------------------------- |
| **Vanilla JS** | JavaScript en HTML, sin framework               | Ejercicios en `vanilla-app/sites/`     |
| **Angular**    | Framework para aplicaciones web (cliente)       | Proyectos en el contenedor `angular22` |
| **React**      | Librería para interfaces de usuario             | Proyectos en el contenedor `react19`   |
| **Node.js**    | Entorno para ejecutar JavaScript en el servidor | API `nodejs-api` (Express + MySQL)     |
| **MySQL**      | Base de datos relacional                        | Datos del curso (`accesoDB`, `dbzDB`…) |
| **Docker**     | Contenedores: mismo entorno en todos los PCs    | Carpeta `entorno/`                     |
| **nginx**      | Servidor web estático                           | Sirve los ejercicios vanilla           |


---

## 1. ¿Qué carpeta uso?


| Equipo     | Carpeta      |
| ---------- | ------------ |
| Mac Intel  | `mac-intel/` |
| Mac chip M | `mac-arm/`   |
| Linux      | `linux/`     |
| Windows    | `windows/`   |


---

## 2. Instalación

Responde `s` en cada bloque (ENTER = omitir).  
Usa **siempre** `bash setup.sh` (aunque tu terminal sea zsh).

### Mac

```bash
cd mac-intel        # o mac-arm
bash setup.sh
```

### Linux

```bash
cd linux
bash setup.sh
```

> **Linux:** al terminar el bloque 01, cierra **sesión de usuario** (no basta con cerrar la terminal) y vuelve a entrar. Así se activa el grupo `docker` y podrás usar Docker sin `sudo`. Alternativa rápida: `newgrp docker`.
>
> **Linux (Docker + MySQL):** copia `FP-DevSetup` dentro de una carpeta normal de Linux (`/home/...`). El script ajusta permisos básicos del proyecto para que MySQL pueda leer `entorno/db/mysql-db.sql`.

### Windows

1. PowerShell como administrador: `wsl --install -d Ubuntu` → reinicia si pide.
2. Instala [Docker Desktop](https://www.docker.com/products/docker-desktop) → WSL Integration → Ubuntu.
3. Instala [VS Code](https://code.visualstudio.com) (Add to PATH) + extensión **WSL**.
4. Dentro de Ubuntu:

```bash
cd ~/FP-DevSetup/windows
bash setup.sh
```

> En Windows, trabaja con el proyecto **dentro de Ubuntu** (`~/...`), no en `C:\`.

---

## 3. Bloques del script


| Bloque | Qué hace               | Detalle                                        |
| ------ | ---------------------- | ---------------------------------------------- |
| 01     | Herramientas base      | [README-comandos.md](README-comandos.md)       |
| 02     | VS Code + extensiones  | [README-extensiones.md](README-extensiones.md) |
| 03     | Carpetas de `entorno/` | Crea subcarpetas vacías si faltan              |
| 04     | Aliases de terminal    | [README-aliases.md](README-aliases.md)         |


El script **no** arranca Docker del curso. Eso va en el siguiente paso → [README-flujo.md](README-flujo.md).

**phpMyAdmin / MySQL (clase):** usuario `root` · contraseña `dejame`  
→ [http://localhost:8081](http://localhost:8081)

---

## 4. Documentación del curso


| Archivo                                        | Contenido                                           |
| ---------------------------------------------- | --------------------------------------------------- |
| [README-flujo.md](README-flujo.md)             | Después del script, flujo en clase, puertos, Docker |
| [README-comandos.md](README-comandos.md)       | Git, GitHub CLI, SSH y bloque 01                    |
| [README-extensiones.md](README-extensiones.md) | Extensiones VS Code: para qué sirven                |
| [README-aliases.md](README-aliases.md)         | Aliases del bloque 04                               |
| [README-problemas.md](README-problemas.md)     | Errores frecuentes                                  |


---

## 5. Estructura del proyecto

```
FP-DevSetup/
├── README.md                 ← estás aquí
├── README-flujo.md
├── README-comandos.md
├── README-extensiones.md
├── README-aliases.md
├── README-problemas.md
├── mac-intel/ | mac-arm/ | linux/ | windows/
└── entorno/                  ← Docker del curso
    ├── docker-compose.yml
    ├── limpiar.sh            ← reset del proyecto Docker
    ├── angular22/
    ├── react19/
    ├── nodejs-api/
    ├── db/
    └── vanilla-app/sites/
```

