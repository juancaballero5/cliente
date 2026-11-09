# 02 — Flujo de trabajo en clase

**Secuencia:** [README.md](README.md) → [01 instalación](README-01-instalacion.md) → **02 flujo**

Si aún no has instalado el entorno → [01 instalación](README-01-instalacion.md)  
Si algo falla → [06 problemas](README-06-problemas.md)

---

Este documento es el del **día a día**: qué hacer cuando el entorno ya está instalado.

---

## 1. Después de `bash setup.sh` (una sola vez)

```bash
gh auth login

git config --global user.name  "Tu Nombre"
git config --global user.email "tu@email.com"
```

- `gh auth login` te conecta a GitHub (push, repos…).
- `git config user.name` / `user.email` es **quién aparece en cada commit**. No es lo mismo: el login no rellena el nombre.
- Si ya lo tienes: `git config --global --list`

```bash
# Mac / Windows: Docker Desktop abierto
docker run hello-world

cd ~/Descargas/FP-DevSetup/entorno
docker compose up -d
docker compose ps
```

Con `up -d` arrancan: **MySQL, phpMyAdmin, API, Vanilla, Angular y React**.

---

## 2. Primer día — comprobar que todo va

1. `cd entorno && docker compose up -d`
2. [http://localhost:4300/](http://localhost:4300/) — índice de ejercicios
3. [http://localhost:4300/api-demo/](http://localhost:4300/api-demo/) — registra un usuario y haz login
4. [http://localhost:8081](http://localhost:8081) — phpMyAdmin (`root` / `dejame`)

---

## 3. Vanilla JS

- Archivos en `entorno/vanilla-app/sites/`
- Navegador: [http://localhost:4300](http://localhost:4300)

Cómo está montado Docker en `entorno/` (compose, volúmenes, Dockerfiles) →  
[entorno/README.md](entorno/README.md) · [slides](entorno/README.slides.md)

---

## 4. Angular 22

```bash
cd entorno
docker compose exec angular22 bash

ng-new mi-proyecto
cd mi-proyecto
ng-serve
```

En otra terminal: `code ./angular22/mi-proyecto`  
Navegador: [http://localhost:4222](http://localhost:4222)

`ng-new` crea el proyecto con CSS, sin SSR y sin configuración de IA. Entra siempre con **bash**.

---

## 5. React 19

```bash
cd entorno
docker compose exec react19 bash

react-new mi-app
cd mi-app
npm install
react-start
```

En otra terminal: `code ./react19/mi-app`  
Navegador: [http://localhost:4319](http://localhost:4319)

---

## 6. Solo API + MySQL

```bash
docker compose up -d mysql-db phpmyadmin nodejs-api
```

- API: [http://localhost:3000](http://localhost:3000)
- Editar: `code ./nodejs-api/server.js` (nodemon recarga solo)

---

## 7. Puertos

| Servicio | URL |
|----------|-----|
| Vanilla | http://localhost:4300 |
| Demo API | http://localhost:4300/api-demo/ |
| Angular | http://localhost:4222 |
| React | http://localhost:4319 |
| API Node | http://localhost:3000 |
| phpMyAdmin | http://localhost:8081 |
| MySQL | localhost:3306 |

**MySQL (solo clase):** usuario `root`, contraseña `dejame`.

| BD | Uso |
|----|-----|
| `accesoDB` | Login / registro |
| `dbzDB` | Dragon Ball |
| `superheroDB` | Superhéroes |

Reset de la BD (y de todo el Docker de `entorno`):

```bash
cd entorno
bash limpiar.sh
docker compose up -d
```

---

## 8. Comandos Docker habituales

```bash
docker compose up -d
docker compose down
docker compose down -v
docker compose ps
docker compose logs -f nodejs-api
docker compose exec angular22 bash
```

Atajos de terminal → [05 aliases](README-05-aliases.md)

---

## 9. Empezar de cero (Docker + herramientas)

**1. Borrar el Docker de `entorno`:**

```bash
cd entorno
bash limpiar.sh          # ¿Continuar? → s
```

**2. Repetir herramientas del PC (si hace falta):**

```bash
cd ../mac-intel          # o mac-arm / linux / windows
bash setup.sh
```

**3. Levantar el laboratorio:**

```bash
cd ../entorno
docker compose up -d
```

`setup.sh` no arranca contenedores. Si Git, Docker y VS Code ya están, el script omite lo instalado.

---

## 10. Copia en GitHub (periódico)

Sube tu carpeta `FP-DevSetup` a **tu** repositorio de GitHub de vez en cuando  
(proyectos Vanilla, Angular, React, API…).

Resumen:

| Ya tienes repo en GitHub | Comandos |
|--------------------------|----------|
| Sí, mismo PC | `git add .` → `git commit -m "..."` → `git push` |
| No | Primera vez: camino A o B en el documento 03 |
| Otro PC | `git clone ...` y luego instalación |

Pasos exactos y diferencia entre camino A y B →  
[03 comandos — Subir a GitHub](README-03-comandos.md#subir-tu-carpeta-fp-devsetup-a-github)

---

## Consultas útiles

| Tema | Documento |
|------|-----------|
| Git, GitHub, SSH, **subir a GitHub** | [03 comandos](README-03-comandos.md) |
| Extensiones VS Code | [04 extensiones](README-04-extensiones.md) |
| Aliases | [05 aliases](README-05-aliases.md) |
| Errores | [06 problemas](README-06-problemas.md) |

Vuelta al índice → [README.md](README.md)
