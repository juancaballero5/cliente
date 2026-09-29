# Bloque 01 — Herramientas y comandos básicos

Lo que instala el script 01 (varía un poco según Mac / Linux / Windows).

---

## ¿Hace falta todo?

| Herramienta | ¿Para qué? | ¿Imprescindible? |
|-------------|------------|------------------|
| **Git** | Versionar el código, entregas, trabajo en equipo | Sí |
| **Docker** | Levantar API, MySQL, Angular, React… igual en todos | Sí |
| **GitHub CLI (`gh`)** | Login en GitHub, repos, PRs desde terminal | Sí (si usáis GitHub) |
| **SSH** | `git push` sin escribir contraseña cada vez | Sí (recomendado) |
| **VS Code** | Editor del curso | Sí (Linux lo instala en 01; Mac/Windows aparte) |
| **Homebrew** | Instalar cosas en Mac | Solo Mac |
| **Oh My Zsh** | Terminal más clara (ruta, rama git…) | Mac: útil, no obligatorio |

No instalamos cosas “de más” en el sentido de herramientas raras: todo encaja con Git + Docker + GitHub, que es lo que vais a usar.

---

## Git — comandos que usaréis

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

Eso no lo hace `gh auth login`. El login es para GitHub; el `user.name` / `user.email` es el autor de los commits.  
Si ya está: `git config --global --list`

Alias del bloque 04: `gs`, `ga`, `gc`, `gp`, `gl` → ver [README-aliases.md](README-aliases.md).

---

## GitHub CLI (`gh`)

```bash
gh auth login           # conectar con tu cuenta (una vez)
gh repo create          # crear repo (cuando toque)
gh pr create            # pull request (módulos avanzados)
```

En clase vale **HTTPS** + navegador (como has hecho). SSH es otra forma de lo mismo; no hace falta las dos.

`gh auth login` **no** sustituye a `git config user.name` / `user.email`.

---

## SSH — para qué sirve aquí

GitHub ya no acepta contraseña por HTTPS en muchos casos. Con SSH:

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

Más comandos y flujo de clase → [README-flujo.md](README-flujo.md).

---

## Linux: grupo `docker`

Tras instalar Docker en Linux, tu usuario entra en el grupo `docker`.  
Eso **no se aplica** hasta que cierras sesión del usuario (salir de Ubuntu y volver a entrar) o ejecutas `newgrp docker`.

No es “cerrar la terminal”: es **cerrar sesión** en el sistema (o reiniciar).
