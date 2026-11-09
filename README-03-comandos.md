# 03 — Herramientas y comandos (bloque 01)

**Secuencia:** [README.md](README.md) → [01](README-01-instalacion.md) → [02](README-02-flujo.md) → **03 comandos**

Este documento explica **qué instalas en el bloque 01** y los comandos que usarás en clase.  
Si aún no has instalado → [01 instalación](README-01-instalacion.md)

---

## ¿Hace falta todo?

| Herramienta | ¿Para qué? | ¿Imprescindible? |
|-------------|------------|------------------|
| **Git** | Versionar el código, entregas, trabajo en equipo | Sí |
| **Docker** | Levantar API, MySQL, Angular, React… igual en todos | Sí |
| **GitHub CLI (`gh`)** | Login en GitHub, repos, PRs desde terminal | Sí (si usáis GitHub) |
| **SSH** | `git push` sin escribir contraseña cada vez | Sí (recomendado) |
| **VS Code** | Editor del curso | Sí |
| **Homebrew** | Instalar cosas en Mac | Solo Mac |
| **Oh My Zsh** | Terminal más clara (ruta, rama git…) | Mac: útil, no obligatorio |

No instalamos herramientas de más: todo encaja con Git + Docker + GitHub.

---

## Git — comandos del curso

```bash
git status              # qué ha cambiado
git add .               # preparar cambios
git commit -m "mensaje" # guardar versión
git push                # subir a GitHub
git log --oneline       # historial corto
git pull                # bajar cambios del remoto
```

Configuración (una vez):

```bash
git config --global user.name  "Tu Nombre"
git config --global user.email "tu@email.com"
```

Eso **no** lo hace `gh auth login`. El login es para GitHub; el nombre y el email son el autor de los commits.  
Si ya está: `git config --global --list`

Atajos: `gs`, `ga`, `gc`, `gp`, `gl` → [05 aliases](README-05-aliases.md)

---

## GitHub CLI (`gh`)

```bash
gh auth login           # conectar con tu cuenta (una vez)
gh repo create          # crear repo (cuando toque)
gh pr create            # pull request (más adelante)
```

En clase: **HTTPS** + navegador. SSH es otra forma de lo mismo; no hace falta las dos.

**Windows (WSL):** si no se abre el navegador, copia el código y entra a mano: https://github.com/login/device

`gh auth login` **no** sustituye a `git config user.name` / `user.email`.

---

## SSH — para qué sirve aquí

1. El script crea `~/.ssh/id_ed25519` (si no existía).
2. Añades la clave pública a GitHub (`gh auth login` o copiar `~/.ssh/id_ed25519.pub`).
3. `git push` funciona sin pedir contraseña cada vez.

---

## Docker — lo mínimo del curso

```bash
docker run hello-world          # comprobar que Docker responde
cd entorno
docker compose up -d            # levantar servicios del curso
docker compose ps               # ver qué está corriendo
docker compose down             # parar
```

Más flujo de clase → [02 flujo](README-02-flujo.md)

---

## Subir tu carpeta `FP-DevSetup` a GitHub

En clase trabajarás dentro de `FP-DevSetup` (Vanilla, Angular, React, API…).  
Conviene subir el trabajo a **tu propio repositorio** de GitHub de vez en cuando: así tienes copia en la nube y el profesor puede clonarlo para revisarlo.

### Mapa rápido: ¿qué comando toca ahora?

| Situación | Qué hacer |
|-----------|-----------|
| Primera vez: aún **no** tienes repo en GitHub | **Camino A** (abajo) — solo una vez |
| Primera vez: el repo en GitHub **ya existe vacío** | **Camino B** (abajo) — solo una vez |
| Ya subiste el repo; sigues en **el mismo PC** | `git add` → `commit` → `git push` |
| Empiezas en **otro PC** (o clonas el kit) | `git clone` → luego instalación ([01](README-01-instalacion.md)) |
| Error `remoto origin ya existe` | Normal si ya hiciste el camino A: **no** vuelvas a hacer `git remote add` |

**Importante:** el camino A y el camino B son **alternativas**. Haces **uno u otro**, no los dos seguidos.

### Qué NO se sube (ya está en `.gitignore`)

- `node_modules/` — se regeneran con Docker / `npm install`
- `dist/` y builds
- archivos `DOCENTE-*`, PDF y PPTX (solo del profesor)
- `.env` y secretos

En `git status` no deben aparecer esas cosas.

---

### Camino A — Crear el repo y subirlo (lo habitual)

Úsalo si en GitHub **todavía no** existe `FP-DevSetup` (o el nombre que uses).

```bash
cd ~/Descargas/FP-DevSetup    # ajusta la ruta si hace falta

# Solo si hubo un git a medias y quieres empezar limpio:
# rm -rf .git

git init -b main
git add .
git status
git commit -m "Primer commit: entorno DAW"

gh repo create FP-DevSetup --public --source=. --remote=origin --push
```

Eso crea el repo, configura `origin` y hace el primer `push`.  
**No** ejecutes después `git remote add origin ...`.

Abre: `https://github.com/TU_USUARIO/FP-DevSetup`

---

### Camino B — El repo vacío ya existe en GitHub

Úsalo **solo** si creaste el repositorio vacío en la web de GitHub y aún no lo enlazaste.

```bash
cd ~/Descargas/FP-DevSetup
git init -b main
git add .
git status
git commit -m "Primer commit: entorno DAW"

git remote add origin https://github.com/TU_USUARIO/FP-DevSetup.git
git push -u origin main
```

Si sale `error: remoto origin ya existe`, es que ya está enlazado (por ejemplo porque usaste el camino A). En ese caso:

```bash
git remote -v          # comprueba la URL
git push -u origin main
```

---

### Cada vez que avances en clase (mismo PC)

Cuando el repo **ya está** en GitHub y sigues trabajando en esa máquina:

```bash
cd ~/Descargas/FP-DevSetup
git add .
git status
git commit -m "Clase: breve descripción de lo que hiciste"
git push
```

No hace falta `git init`, ni `gh repo create`, ni `git remote add`.

Si no hay cambios, `git commit` dirá que no hay nada que guardar: es normal.

---

### Empezar en otro PC (clonar)

```bash
cd ~/Descargas
git clone https://github.com/TU_USUARIO/FP-DevSetup.git
cd FP-DevSetup
```

Luego instala y levanta el entorno → [01 instalación](README-01-instalacion.md)  
y `cd entorno && docker compose up -d`.

---

### Kit del curso vs tu trabajo

| Quién | Repo | Para qué |
|-------|------|----------|
| Profesor | p. ej. `jgarmay674/FP-DevSetup` | Kit base: clonar o descargar para empezar |
| Alumno | **su propia cuenta** (`TU_USUARIO/FP-DevSetup`) | Copia de **su** trabajo de clase |

Los alumnos **no** hacen `push` al repo del profesor.  
Flujo típico del alumno:

1. Clonar (o copiar) el kit del curso una vez.
2. Crear **su** repo con el camino A (en su cuenta).
3. Ir haciendo `git push` periódicos.

El profesor revisa clonando el repo de cada alumno:

```bash
git clone https://github.com/USUARIO_DEL_ALUMNO/FP-DevSetup.git
```

---

## Linux: grupo `docker`

Tras instalar Docker en Linux, tu usuario entra en el grupo `docker`.  
Eso **no se aplica** hasta que cierras sesión del usuario (salir y volver a entrar) o ejecutas `newgrp docker`.

No es “cerrar la terminal”: es **cerrar sesión** en el sistema.

---

## Siguiente consulta

- Extensiones VS Code → [04 extensiones](README-04-extensiones.md)
- Aliases → [05 aliases](README-05-aliases.md)
- Problemas → [06 problemas](README-06-problemas.md)
- Índice → [README.md](README.md)
