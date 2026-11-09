# 05 — Aliases de terminal (bloque 04)

**Secuencia:** [README.md](README.md) → … → **05 aliases**

Si aún no has instalado → [01 instalación](README-01-instalacion.md)

Los aliases se añaden a `~/.zshrc` (Mac) y/o `~/.bashrc` (Linux/WSL).  
**Abre una terminal nueva** (o escribe `reload`) para que funcionen.

---

## Docker Compose (día a día)

| Alias | Comando real | Para qué |
|-------|--------------|----------|
| `dcu` / `dcud` | `docker compose up -d` | Levantar servicios en segundo plano |
| `dcd` | `docker compose down` | Parar (MySQL conserva datos) |
| `dcdv` | `docker compose down -v` | Parar y **borrar** datos MySQL |
| `dcl` | `docker compose logs -f` | Ver logs en vivo |
| `dcs` | `docker compose ps` | Estado de los contenedores |
| `dcb` | `docker compose up --build -d` | Reconstruir imágenes y levantar |
| `dce` | `docker compose exec` | Entrar a un contenedor → `dce angular22 bash` |

---

## Docker general

| Alias | Para qué |
|-------|----------|
| `dps` | Contenedores en marcha |
| `dpsa` | Todos los contenedores |
| `dimg` | Imágenes descargadas |
| `dprune` | Limpiar recursos no usados |

---

## Git

| Alias | Comando real |
|-------|--------------|
| `gs` | `git status -sb` |
| `ga` | `git add .` |
| `gc` | `git commit -m` → uso: `gc "mensaje"` |
| `gp` | `git push` |
| `gl` | `git log --oneline --graph --decorate --all` |
| `gco` | `git checkout` |
| `gb` | `git branch` |
| `gbd` | `git branch -d` |
| `gst` | `git stash` |
| `gstp` | `git stash pop` |

---

## Utilidades

| Alias | Para qué |
|-------|----------|
| `ll` | `ls -lah` |
| `..` / `...` | Subir carpetas |
| `reload` | Recargar `.zshrc` o `.bashrc` |
| `ports` | Puertos en escucha |
| `myip` | IP pública |

---

## Dentro de los contenedores

Estos no son aliases del script 04. Están definidos en los Dockerfiles y solo funcionan **dentro** de `angular22` / `react19`:

| Comando | Para qué |
|---------|----------|
| `ng-new nombre` | Crear proyecto Angular |
| `ng-serve` | Servidor de desarrollo Angular |
| `react-new nombre` | Crear proyecto React (Vite) |
| `react-start` | Servidor de desarrollo React |

Entrar siempre con:

```bash
docker compose exec angular22 bash
```

---

## Siguiente consulta

- Problemas → [06 problemas](README-06-problemas.md)
- Flujo en clase → [02 flujo](README-02-flujo.md)
- Índice → [README.md](README.md)
