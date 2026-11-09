# 06 — Problemas frecuentes

**Secuencia:** [README.md](README.md) → … → **06 problemas** (consulta cuando haga falta)

Si aún no has instalado → [01 instalación](README-01-instalacion.md)  
Si ya está instalado y quieres el flujo de clase → [02 flujo](README-02-flujo.md)

---

## Docker no responde

**Mac / Windows:** abre Docker Desktop y espera a que la ballena esté lista (sin “Starting…”).

**Linux:** `sudo systemctl start docker` o `newgrp docker`.

**Windows:** Docker Desktop abierto **y** WSL Integration con Ubuntu activada.

---

## Linux: `permission denied` con Docker

Tras instalar Docker, cierra **sesión de usuario** (no basta cerrar la terminal) y vuelve a entrar.  
Alternativa: `newgrp docker`.

---

## Linux: MySQL no arranca — Permission denied en initdb

**Síntoma en logs:**

```text
ls: cannot open directory '/docker-entrypoint-initdb.d/': Permission denied
```

**Causas habituales:**

1. Proyecto en carpeta compartida de VirtualBox (`/media/sf_*`).
2. Carpeta `FP-DevSetup` con permisos demasiado cerrados.

**Solución:**

```bash
cp -r /media/sf_.../FP-DevSetup ~/Descargas/
cd ~/Descargas/FP-DevSetup/linux
bash setup.sh          # el bloque 03 ajusta permisos
cd ../entorno
docker compose down -v
docker compose up -d
```

O a mano:

```bash
chmod 755 ~/Descargas/FP-DevSetup
chmod 755 ~/Descargas/FP-DevSetup/entorno
chmod 755 ~/Descargas/FP-DevSetup/entorno/db
chmod 644 ~/Descargas/FP-DevSetup/entorno/db/mysql-db.sql
```

---

## Linux: Vanilla — 403 Forbidden o 404 en localhost:4300

MySQL puede ir bien y nginx no servir los archivos.

**Solución** (el bloque 03 de Linux/WSL también lo hace):

```bash
chmod 755 ~/Descargas/FP-DevSetup/entorno/vanilla-app
chmod -R a+rX ~/Descargas/FP-DevSetup/entorno/vanilla-app/sites
```

Recarga el navegador. No hace falta reiniciar Docker.

---

## Windows: hot reload no refresca

El proyecto debe estar en el home de Ubuntu (`~/Descargas/FP-DevSetup`), **no** en `/mnt/c/...`.

---

## Windows: terminal equivocada

Usa la app **Ubuntu** del menú Inicio (`usuario@PC:~$`).

No uses PowerShell + `wsl` para el día a día del curso (puede ser otra distro o rutas distintas).

---

## Windows: `gh auth login` no abre el navegador

Es habitual en WSL. Copia el código de un solo uso y abre a mano en el navegador de Windows:

https://github.com/login/device

---

## Git: `error: remoto origin ya existe`

Significa que el remoto **ya está configurado** (casi siempre porque usaste `gh repo create ... --push`).  
No vuelvas a ejecutar `git remote add origin ...`. Comprueba y sube así:

```bash
git remote -v
git push
```

Detalle del flujo A/B → [03 comandos](README-03-comandos.md#subir-tu-carpeta-fp-devsetup-a-github)

---

## Windows: VS Code — "VS Code Server for WSL closed unexpectedly"

Pulsa **Ignorar** y sigue con la instalación por la terminal de Ubuntu.  
No impide `setup.sh` ni `docker compose up -d`.

---

## MySQL: tabla ya existe / init falla

Solo debe haber **un** archivo `.sql` en `entorno/db/`.  
No dejes copias tipo `*_BACKUP.sql` ahí: Docker ejecuta **todos** los `.sql` al primer arranque.

```bash
cd entorno
docker compose down -v
docker compose up -d
```

---

## MySQL / Access denied

Reset completo del Docker del curso:

```bash
cd entorno
bash limpiar.sh
docker compose up -d
```

Credenciales de clase: `root` / `dejame`.

---

## Puerto ocupado

```bash
lsof -i :4222
kill -9 <PID>
```

---

## `ng-new` / `react-new` no existen

Has entrado con `sh`. Usa:

```bash
docker compose exec angular22 bash
```

---

## "bad substitution" en Mac

Usa `bash setup.sh`, no `sh setup.sh`.

---

## Aliases no funcionan

Abre una terminal nueva o escribe `reload`.

---

## Reinstalar todo desde cero

Ver [01 instalación](README-01-instalacion.md) → sección *Reinstalar desde cero*.

Vuelta al índice → [README.md](README.md)
