# Después del script y flujo en clase

---

## 1. Después de `bash setup.sh` (una vez)

```bash
# Terminal nueva (carga aliases)
gh auth login

# Identidad en los commits (si aún no la tienes):
git config --global user.name  "Tu Nombre"
git config --global user.email "tu@email.com"
```

`gh auth login` te conecta a GitHub (push, `gh repo`…).  
`git config user.name` / `user.email` es **quién aparece en cada commit**. No es lo mismo: el login no rellena el nombre.  
Si ya lo configuraste, puedes omitirlo: `git config --global --list`

```bash
# Mac/Windows: Docker Desktop abierto
docker run hello-world

cd /ruta/a/FP-DevSetup/entorno
docker compose up -d
docker compose ps
```

Con `up -d` arrancan: **MySQL, phpMyAdmin, API, Vanilla, Angular y React**.

---

## 2. Primer día — comprobar que todo va

1. `cd entorno && docker compose up -d`
2. [http://localhost:4300/](http://localhost:4300/) → **api-demo**
3. Registra un usuario y haz login
4. [http://localhost:8081](http://localhost:8081) → phpMyAdmin (`root` / `dejame`)

---

## 3. Vanilla JS

- Archivos en `entorno/vanilla-app/sites/`
- Navegador: [http://localhost:4300](http://localhost:4300)

---

## 4. Angular 22

```bash
cd entorno
docker compose up -d angular22
docker compose exec angular22 bash

ng-new mi-proyecto
cd mi-proyecto
ng-serve
```

Otra terminal: `code ./angular22/mi-proyecto`  
Navegador: [http://localhost:4222](http://localhost:4222)

`ng-new` = CSS, sin SSR, sin archivos de IA. Entra con **bash**.

---

## 5. React 19

```bash
cd entorno
docker compose up -d react19
docker compose exec react19 bash

react-new mi-app
cd mi-app
npm install
react-start
```

Otra terminal: `code ./react19/mi-app`  
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

**MySQL:** usuario `root`, contraseña `dejame` (solo clase).

| BD | Uso |
|----|-----|
| `accesoDB` | Login/registro |
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
docker compose up -d angular22
docker compose down
docker compose down -v
docker compose ps
docker compose logs -f nodejs-api
docker compose exec angular22 bash
```

Aliases: [README-aliases.md](README-aliases.md)

---

## 9. Empezar de cero (Docker + herramientas)

**1. Borrar todo el Docker de `entorno`** (contenedores, MySQL, imágenes de este proyecto):

```bash
cd entorno
bash limpiar.sh          # pregunta una vez: ¿Continuar? → s
```

**2. Instalar (o repetir) las herramientas del PC:**

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
