# 01 — Instalación del entorno

**Secuencia:** [README.md](README.md) → **01 instalación** → [02 flujo](README-02-flujo.md)

Si algo falla durante la instalación → [06 problemas](README-06-problemas.md)

---

En este documento instalas el entorno del curso en **Mac**, **Linux** o **Windows**.

Lee primero “Antes de empezar”. Después ve **solo a la parte de tu sistema**.

---

## Antes de empezar (todas las plataformas)

1. Descomprime el ZIP completo de `FP-DevSetup`.
2. Debe existir la carpeta `entorno/` con `docker-compose.yml` dentro.
3. Usa **siempre** `bash setup.sh` (aunque tu terminal sea zsh).
4. El script **instala herramientas**. **No** arranca los contenedores del curso.
5. Los contenedores se levantan después con `docker compose up -d` en `entorno/`.

### ¿Qué carpeta del script usas?

| Equipo | Carpeta |
|--------|---------|
| Mac Intel | `mac-intel/` |
| Mac chip M (ARM) | `mac-arm/` |
| Linux (nativo o VirtualBox) | `linux/` |
| Windows 10/11 | `windows/` (dentro de Ubuntu WSL) |

---

## Parte A — Mac (Intel o ARM)

### A.1 — Ejecutar el script

1. Abre **Terminal**.
2. Ve a la carpeta del proyecto (ajusta la ruta si hace falta):

```bash
cd ~/Descargas/FP-DevSetup/mac-intel    # o mac-arm
bash setup.sh
```

3. Responde `s` en los **4 bloques** (ENTER = omitir ese bloque).

### A.2 — Después del script

```bash
gh auth login
git config --global user.name  "Tu Nombre"
git config --global user.email "tu@email.com"
```

Abre **Docker Desktop** y espera a que esté listo (ballena estática).

```bash
docker run hello-world
cd ~/Descargas/FP-DevSetup/entorno
docker compose up -d
docker compose ps
```

### A.3 — Comprobar

Ve a la sección **Comprobación final** al final de este documento.

---

## Parte B — Linux (Ubuntu / Debian / Mint)

### B.1 — Dónde poner el proyecto

Copia `FP-DevSetup` dentro de una carpeta normal de Linux, por ejemplo:

```text
/home/usuario/Descargas/FP-DevSetup
```

**No ejecutes Docker del curso desde:**

- `/media/sf_*` (carpetas compartidas de VirtualBox)
- rutas con permisos incompletos tras copiar desde otro sistema

En VirtualBox: la carpeta compartida sirve para **pasar archivos**. El proyecto con el que trabajas debe estar **copiado en tu home** de Linux.

### B.2 — Ejecutar el script

```bash
cd ~/Descargas/FP-DevSetup/linux
bash setup.sh
```

Responde `s` en los 4 bloques.

El **bloque 03** crea subcarpetas y ajusta permisos básicos para MySQL y para las páginas vanilla.

### B.3 — Activar el grupo docker

Tras el bloque 01, **cierra sesión de usuario** en Linux (salir de la cuenta y volver a entrar).

- No basta con cerrar la terminal.
- Alternativa rápida: `newgrp docker`

### B.4 — Después del script

```bash
gh auth login
git config --global user.name  "Tu Nombre"
git config --global user.email "tu@email.com"
docker run hello-world
cd ~/Descargas/FP-DevSetup/entorno
docker compose up -d
docker compose ps
```

### B.5 — Comprobar

Ve a la sección **Comprobación final**.

---

## Parte C — Windows 10/11 (WSL2 + Ubuntu)

En Windows hay **dos entornos**:

| Sistema | Para qué |
|---------|----------|
| **Windows** | Instalar Docker Desktop, VS Code y WSL |
| **Ubuntu (WSL)** | Ejecutar `setup.sh`, Git y Docker del curso |

Usa la aplicación **Ubuntu** del menú Inicio. El prompt debe parecerse a:

```text
usuario@NOMBRE-PC:~$
```

No uses PowerShell + `wsl` para el trabajo diario del curso.

### C.1 — En Windows (una sola vez)

#### 1. WSL2 + Ubuntu

PowerShell **como administrador**:

```powershell
wsl --install -d Ubuntu
```

Reinicia si lo pide. Crea usuario y contraseña de Ubuntu.

#### 2. Docker Desktop

1. Instala [Docker Desktop](https://www.docker.com/products/docker-desktop).
2. Ábrelo y espera a que la ballena esté lista.
3. **Settings → Resources → WSL Integration → activar Ubuntu → Apply & Restart**.

#### 3. VS Code

1. Instala [VS Code](https://code.visualstudio.com) y marca **Add to PATH**.
2. Instala **solo** la extensión **WSL** de **Microsoft**.

Si VS Code muestra *"VS Code Server for WSL closed unexpectedly"*, pulsa **Ignorar** y sigue por la terminal de Ubuntu. No bloquea la instalación.

### C.2 — Copiar el proyecto dentro de Ubuntu

Abre la app **Ubuntu**:

```bash
ls /mnt/c/Users
mkdir -p ~/Descargas
cp -r /mnt/c/Users/TU_USUARIO/Downloads/FP-DevSetup ~/Descargas/
cd ~/Descargas/FP-DevSetup
ls
```

Debes ver carpetas como `windows`, `linux`, `entorno`.

Trabaja siempre en `~/Descargas/FP-DevSetup`, **no** en `/mnt/c/...`.

### C.3 — Ejecutar el script

Con **Docker Desktop abierto** en Windows:

```bash
cd ~/Descargas/FP-DevSetup/windows
bash setup.sh
```

Responde `s` en los 4 bloques.

### C.4 — Después del script

```bash
gh auth login
```

Si no se abre el navegador (es habitual en WSL):

1. Copia el código de un solo uso.
2. En el navegador de Windows abre: https://github.com/login/device
3. Pega el código y autoriza.

```bash
git config --global user.name  "Tu Nombre"
git config --global user.email "tu@email.com"
docker run hello-world
cd ~/Descargas/FP-DevSetup/entorno
docker compose up -d
docker compose ps
```

### C.5 — Comprobar

Ve a la sección **Comprobación final**.

---

## Comprobación final (Mac, Linux y Windows)

### En la terminal

```bash
cd ~/Descargas/FP-DevSetup/entorno
docker compose ps
```

Deben estar **Up** (MySQL en **healthy**):

- `mysql-db`
- `phpmyadmin`
- `nodejs-api`
- `vanilla-app`
- `angular22`
- `react19`

### En el navegador

| Qué probar | URL |
|------------|-----|
| Página vanilla | http://localhost:4300/ |
| Registro y login | http://localhost:4300/api-demo/ |
| phpMyAdmin | http://localhost:8081 (`root` / `dejame`) |

---

## Bloques del script (referencia)

| Bloque | Qué hace | Detalle |
|--------|----------|---------|
| 01 | Herramientas base | [03 comandos](README-03-comandos.md) |
| 02 | VS Code + extensiones | [04 extensiones](README-04-extensiones.md) |
| 03 | Carpetas de `entorno/` (+ permisos en Linux/WSL) | — |
| 04 | Aliases de terminal | [05 aliases](README-05-aliases.md) |

---

## Reinstalar desde cero

```bash
cd entorno
bash limpiar.sh          # ¿Continuar? → s
cd ../mac-intel          # o mac-arm / linux / windows
bash setup.sh
cd ../entorno
docker compose up -d
```

Si Git, Docker o VS Code ya están instalados, el script lo detecta y sigue adelante.

---

## Siguiente paso

Cuando la comprobación final funcione, continúa con el trabajo diario:

**→ [README-02-flujo.md](README-02-flujo.md)**

Si algo no arranca → [README-06-problemas.md](README-06-problemas.md)
