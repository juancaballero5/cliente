# Entorno Docker del curso — DAW 2026-2027

> Materiales de la raíz: [README.md](../README.md) · Instalación: [README-01](../README-01-instalacion.md)  
> Diapositivas de esta carpeta: [README.slides.md](README.slides.md)

**Objetivo:** entender **cómo está montado** el laboratorio dentro de `entorno/`: el `docker-compose.yml`, cada servicio, los volúmenes y los `Dockerfile`. No es instalar el PC (eso ya lo hicisteis en el README-01); es **leer y comprender** la plataforma donde vais a programar.

**Duración orientativa (profesor):** una sesión de explicación + comprobaciones en vivo. Id paso a paso; no hace falta memorizar el YAML entero.

---

## Antes de empezar

**Qué hacer:** abrid una terminal y entrad en esta carpeta:

```bash
cd ~/Descargas/FP-DevSetup/entorno
pwd
ls
```

**Por qué:** todos los comandos de este manual se ejecutan **desde `entorno/`**, porque aquí está el `docker-compose.yml`.

**Comprueba:** `pwd` termina en `.../FP-DevSetup/entorno` y veis `docker-compose.yml`, `angular22/`, `react19/`, `nodejs-api/`, `db/`, `vanilla-app/`, `limpiar.sh`.

Si Docker no está levantado: `docker compose up -d` y `docker compose ps` (seis **Up**, MySQL **healthy**).

---

## Paso 1 — Compose, carpetas y servicios

**Qué hacer:** abrid `docker-compose.yml` y relacionad carpetas + bloques `services:`.

| Carpeta / archivo | Papel |
|-------------------|--------|
| `docker-compose.yml` | Orquesta todos los servicios |
| `db/` | Dump SQL (solo la **primera** vez) |
| `nodejs-api/` | API Express + `Dockerfile` |
| `vanilla-app/sites/` | Ejercicios Vanilla |
| `angular22/` / `react19/` | CLI + proyectos |
| `limpiar.sh` | Borra el Docker de **este** proyecto |

Servicios: `angular22`, `react19`, `nodejs-api`, `mysql-db`, `phpmyadmin`, `vanilla-app`, `angular-app`.

**Por qué:** un archivo describe varios contenedores (`build:` o `image:`). El código lo editáis en el **host**; Docker lo ejecuta.

**Comprueba:** `docker compose ps` — la columna `SERVICE` coincide. En `sites/` veis `010-Plantilla`, `020-DOM`…

---

## Paso 2 — Vanilla: nginx sirve vuestros HTML

**Qué hacer:** mirad el servicio `vanilla-app`:

```yaml
vanilla-app:
  image: nginx:alpine
  volumes:
    - ./vanilla-app/sites:/usr/share/nginx/html:ro
  ports:
    - "4300:80"
```

**Por qué:** nginx Alpine + volumen de `sites/` (solo lectura) + puerto **4300** en el PC → **80** en el contenedor. Vanilla son archivos estáticos: no hace falta Node.

**Comprueba:** abrid http://localhost:4300/ y debéis ver el índice de ejercicios.

---

## Paso 3 — MySQL: datos y dump inicial

**Qué hacer:** mirad `mysql-db` (contraseña, volúmenes, puerto, healthcheck) y el contenido de `entorno/db/`.

```yaml
image: mysql:8.4
environment:
  MYSQL_ROOT_PASSWORD: dejame
volumes:
  - mysql_data:/var/lib/mysql
  - ./db:/docker-entrypoint-initdb.d
ports:
  - "3306:3306"
```

**Por qué:** `dejame` es la contraseña de clase; `mysql_data` conserva datos tras `down`; `./db` solo se carga la **primera** vez. Docker ejecuta **todos** los `.sql` de esa carpeta: no dejéis un `*_BACKUP.sql`.

**Comprueba:** `mysql-db` **healthy**. En phpMyAdmin (http://localhost:8081): `root` / `dejame`. Solo el dump oficial en `db/`.

---

## Paso 4 — phpMyAdmin y la API esperan a MySQL

**Qué hacer:** mirad `phpmyadmin` y `nodejs-api`: ambos tienen

```yaml
depends_on:
  mysql-db:
    condition: service_healthy
```

**Por qué:** si la API arrancara antes que MySQL, fallarían las conexiones. Compose espera al healthcheck.  
`PMA_HOST: mysql-db` y `DB_HOST: mysql-db` usan el **nombre del servicio** como nombre de máquina dentro de la red de Compose (no `localhost` desde dentro del contenedor).

**Comprueba:** con todo Up, registrad un usuario en http://localhost:4300/api-demo/ y vedlo en phpMyAdmin (base `accesoDB` o la que use la demo).

---

## Paso 5 — Volúmenes del código: editar en el host, ejecutar en Docker

**Qué hacer:** en `angular22`, `react19` y `nodejs-api` veréis algo así:

```yaml
volumes:
  - ./angular22:/usr/src/app
  - /usr/src/app/node_modules
```

**Por qué:**

1. La primera línea **sincroniza** la carpeta del host con `/usr/src/app` del contenedor.
2. La segunda es un volumen **anónimo** para `node_modules`: evita que una carpeta vacía del host pise las dependencias del contenedor.

**Comprueba:** `node_modules` del host a menudo está vacío o no se sube a Git. Las dependencias viven sobre todo en el contenedor.

---

## Paso 6 — Dockerfile de la API (`nodejs-api`)

**Qué hacer:** abrid `nodejs-api/Dockerfile`.

```dockerfile
FROM node:22-alpine
RUN npm install -g nodemon
WORKDIR /usr/src/app
COPY package.json .
RUN npm install
COPY . .
CMD ["nodemon", "server.js"]
```

**Por qué:** Node 22 → dependencias en la imagen → `nodemon` recarga al guardar. El volumen del compose monta el código del host.

**Comprueba:** http://localhost:3000/ da 404 en la raíz (normal). Demo: http://localhost:4300/api-demo/. Logs: `docker compose logs -f nodejs-api`.

---

## Paso 7 — Dockerfile de Angular (`angular22`)

**Qué hacer:** abrid `angular22/Dockerfile`.

**Por qué:**

- Misma base `node:22-alpine` (Angular 22 necesita Node 22).
- Instala `bash`, `git` y `@angular/cli@22`.
- Alias del curso: `ng-new` (CSS, sin SSR) y `ng-serve` en `0.0.0.0`.
- `CMD ["bash"]` → el contenedor espera; vosotros entráis con `exec`.
- En el compose, `CHOKIDAR_USEPOLLING=true` ayuda al hot reload en VirtualBox/WSL.

**Comprueba:**

```bash
docker compose exec angular22 bash
ng version
exit
```

---

## Paso 8 — Dockerfile de React (`react19`)

**Qué hacer:** abrid `react19/Dockerfile`.

**Por qué:** igual idea que Angular, pero con Vite:

- Alias `react-new` → `create-vite` plantilla React+TS
- Alias `react-start` → `npm run dev -- --host 0.0.0.0`
- Polling (`CHOKIDAR` / `WATCHPACK`) para recarga en entornos virtualizados

**Comprueba:**

```bash
docker compose exec react19 bash
node -v
exit
```

---

## Paso 9 — Puertos: host ↔ contenedor

**Qué hacer:** memorizad la tabla del curso (también en los comentarios del compose):

| Servicio | URL en el navegador | Puerto dentro |
|----------|---------------------|---------------|
| Vanilla | http://localhost:4300 | 80 |
| Angular (dev) | http://localhost:4222 | 4200 |
| React (dev) | http://localhost:4319 | 5173 |
| API | http://localhost:3000 | 3000 |
| phpMyAdmin | http://localhost:8081 | 80 |
| MySQL | localhost:3306 | 3306 |

**Por qué:** `"4222:4200"` = en el PC abrís el **4222**; Docker lo reenvía al **4200** del contenedor.

**Comprueba:** con los seis servicios Up, abrid al menos 4300 y 8081.

---

## Paso 9b — Qué esperar al abrir cada puerto

Tras un `docker compose up -d` normal:

| URL | ¿Qué pasa? |
|-----|------------|
| `:4300/` | **Sí:** índice Vanilla |
| `:8081/` | **Sí:** phpMyAdmin (`root` / `dejame`) |
| `:3000/` | API en marcha, pero **404 en `/`** (normal). Usad rutas o api-demo |
| `:4222/` / `:4319/` | Contenedor Up; hace falta `ng-serve` / `react-start` |

**Por qué:** Vanilla y phpMyAdmin arrancan solos. Angular y React esperan en `bash`. La API responde en sus rutas, no en la raíz.

**Comprueba:** `:4300` y `:8081` se ven; `:3000/` da 404; `:4222` no conecta hasta `ng-serve`.

---

## Paso 10 — Comandos del día a día (y perfil opcional)

**Qué hacer:** practicad estos comandos desde `entorno/`:

```bash
docker compose up -d          # levantar
docker compose ps             # estado
docker compose logs -f nodejs-api
docker compose exec angular22 bash
docker compose down           # parar (MySQL conserva datos)
```

Reset: `bash limpiar.sh` (¿Continuar? → `s`) y `docker compose up -d`.  
El servicio `angular-app` (`profiles: [produccion]`) **no** arranca con un `up -d` normal: en clase diaria casi no lo usaréis.

**Por qué:** `down` para; `limpiar.sh` puede borrar volúmenes (y MySQL). Usad el reset solo cuando haga falta.

**Comprueba:** `ps` muestra seis servicios (sin `angular-app`). Tras un reset, MySQL vuelve a cargar el dump de `db/`.

---

## Paso 11 — Relación con Git

**Qué hacer:** recordad qué **no** se sube al repo (ya está en el `.gitignore` de la raíz):

- `node_modules/`
- builds (`dist/`, etc.)
- material `DOCENTE-*` y PDF

**Por qué:** el repo guarda el **código y la receta Docker**. Las dependencias se regeneran al construir/arrancar. Vuestro trabajo de clase (proyectos en `angular22/`, `react19/`, sitios vanilla) **sí** debe versionarse cuando hagáis `git push` a **vuestra** cuenta.

**Comprueba:** `git status` desde la raíz del proyecto no debería listar `node_modules` ni PDF docentes.

---

## Autoevaluación y siguiente paso

1. ¿Desde qué carpeta ejecutáis `docker compose up -d`?
2. ¿Por qué Vanilla no necesita un `Dockerfile` propio en este kit?
3. ¿Cuándo se ejecutan los `.sql` de `db/`?
4. ¿Para qué sirve el volumen anónimo de `node_modules`?
5. ¿Qué diferencia hay entre el puerto 4222 y el 4200 en Angular?

Cuando este mapa os quede claro → ejercicios en `vanilla-app/sites/` (http://localhost:4300/).

Instalación: [README-01](../README-01-instalacion.md) · Flujo: [README-02](../README-02-flujo.md) · Problemas: [README-06](../README-06-problemas.md)
