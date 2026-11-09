#!/usr/bin/env bash
# =============================================================================
#  FP-DevSetup / mac-intel/setup.sh
#  Entorno de desarrollo para Formación Profesional — DAW
#  Plataforma: Mac Intel (x86_64)
#  Curso 2026-2027
#
#  Uso:

#    ./setup.sh
# =============================================================================

set -euo pipefail

RED='\033[0;31m'; YELLOW='\033[1;33m'; GREEN='\033[0;32m'
CYAN='\033[0;36m'; BOLD='\033[1m'; RESET='\033[0m'

log_title() { echo -e "\n${CYAN}${BOLD}$1${RESET}"; }
log_ok()    { echo -e "  ${GREEN}✔${RESET}  $1"; }
log_skip()  { echo -e "  ${YELLOW}↷${RESET}  $1"; }
log_error() { echo -e "  ${RED}✘${RESET}  $1"; }

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
SCRIPTS_DIR="$SCRIPT_DIR/scripts"
ROOT_DIR="$(cd "$SCRIPT_DIR/.." && pwd)"

# ── Comprobaciones previas ────────────────────────────────────────────────────
if [[ $EUID -eq 0 ]]; then
  log_error "No ejecutes este script como root. Usa un usuario normal con sudo."
  exit 1
fi

clear
echo ""
echo -e "  ${CYAN}${BOLD}╔══════════════════════════════════════════════════════════════╗${RESET}"
echo -e "  ${CYAN}${BOLD}║   FP-DevSetup — Entorno Docente DAW                        ║${RESET}"
echo -e "  ${CYAN}${BOLD}║   Plataforma : Mac Intel (x86_64)                            ║${RESET}"
echo -e "  ${CYAN}${BOLD}║                                                              ║${RESET}"
echo -e "  ${CYAN}${BOLD}║   DAW · Módulo Cliente   : Angular 22                        ║${RESET}"
echo -e "  ${CYAN}${BOLD}║   DAW · Módulo Full-Stack: React 19 + Node.js 22 + MySQL 8   ║${RESET}"
echo -e "  ${CYAN}${BOLD}║                                                              ║${RESET}"
echo -e "  ${CYAN}${BOLD}║   Responde 's' para instalar · ENTER para omitir             ║${RESET}"
echo -e "  ${CYAN}${BOLD}╚══════════════════════════════════════════════════════════════╝${RESET}"
echo ""

# ── Función para ejecutar cada bloque ────────────────────────────────────────
run_step() {
  local num="$1"
  local title="$2"
  local script="$3"
  local desc="$4"

  echo ""
  echo -e "  ${BOLD}── Bloque $num: $title ──${RESET}"
  echo -e "  $desc"
  echo ""
  read -rp "  ¿Ejecutar? [s/N]: " resp
  resp=$(echo "$resp" | tr '[:upper:]' '[:lower:]')

  if [[ "$resp" == "s" ]]; then
    local script_path="$SCRIPTS_DIR/$script"
    if [[ ! -f "$script_path" ]]; then
      log_error "Script no encontrado: $script_path"
      return 1
    fi
    bash "$script_path" "$SCRIPT_DIR"
    log_ok "Bloque $num completado"
  else
    log_skip "Bloque $num omitido"
  fi
}

# ── Bloques ───────────────────────────────────────────────────────────────────
run_step "01" "Sistema base" \
  "01_sistema.sh" \
  "Homebrew · Docker Desktop · Git · GitHub CLI · SSH · Oh My Zsh."

run_step "02" "Visual Studio Code" \
  "02_vscode.sh" \
  "VS Code + extensiones + settings.json configurado para docencia."

run_step "03" "Estructura del entorno Docker" \
  "03_estructura.sh" \
  "Comprueba entorno/ y crea subcarpetas vacías si faltan."

run_step "04" "Aliases de terminal" \
  "04_aliases.sh" \
  "Aliases para Git, Docker y utilidades en zsh/bash."

# ── Resumen final ─────────────────────────────────────────────────────────────
echo ""
echo -e "  ${GREEN}${BOLD}╔══════════════════════════════════════════════════════════════╗${RESET}"
echo -e "  ${GREEN}${BOLD}║   Instalación completada                                     ║${RESET}"
echo -e "  ${GREEN}${BOLD}╚══════════════════════════════════════════════════════════════╝${RESET}"
echo ""
echo -e "  ${BOLD}Próximos pasos:${RESET}"
echo -e "  1. ${YELLOW}Abre Docker Desktop${RESET} y espera a que la ballena quede estática"
echo -e "  2. ${YELLOW}Abre una terminal nueva${RESET} — verás el nuevo prompt con Oh My Zsh"
echo -e "  3. Autentícate en GitHub:   ${CYAN}gh auth login${RESET}"
echo -e "  4. Configura tu identidad:"
echo -e "       ${CYAN}git config --global user.name  \"Tu Nombre\"${RESET}"
echo -e "       ${CYAN}git config --global user.email \"tu@email.com\"${RESET}"
echo -e "  5. Verifica Docker:         ${CYAN}docker run hello-world${RESET}"
echo -e "  6. Levanta el entorno:"
echo -e "       ${CYAN}cd $ROOT_DIR/entorno && docker compose up -d${RESET}"
echo ""
echo -e "  Guía completa: ${CYAN}README-01-instalacion.md${RESET}"
echo ""
echo -e "  ${BOLD}Oh My Zsh — prompt en clase:${RESET}"
echo -e "  · Ruta completa activa:     ${CYAN}entorno/angular22/mi-proyecto${RESET}"
echo -e "  · Rama git:                 ${CYAN}git:(main)${RESET}"
echo -e "  · Cambios sin commitear:    ${CYAN}git:(main) ✗${RESET}"
echo ""
