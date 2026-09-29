# Bloque 02 — Extensiones VS Code

El script **solo instala** las del curso y deja un `settings.json` sencillo.  
No desinstala nada: si el alumno tiene más, las quita a mano en Extensiones.

---

## Extensiones instaladas

| Extensión | Para qué | Cuándo |
|-----------|----------|--------|
| **Docker** | Ver contenedores y logs | Desde `docker compose up` |
| **WSL** | Abrir proyecto en Ubuntu | Solo Windows (WSL) |
| **GitLens** | Historial git en el editor | Cuando usáis Git |
| **Angular Language Service** | Autocompletado Angular | Módulo Angular |
| **React Snippets** | Atajos JSX/TS | Módulo React |
| **HTML CSS Support** | Ayuda en HTML/CSS | Vanilla y frontends |
| **Prettier** | Formatear al guardar | Siempre |
| **Database Client** | Consultar MySQL | Trabajo con BBDD |

---

## No instalamos (a propósito)

| Extensión | Motivo |
|-----------|--------|
| **GitHub Copilot** | Requiere licencia del centro |
| Temas, iconos, Tailwind, ESLint… | No son imprescindibles para enseñar |

---

## settings.json

Fuente 14, tabulación 2, Prettier al guardar.  
Si ya existía un `settings.json`, se guarda copia en `settings.json.bak`.
