#!/usr/bin/env bash
# =============================================================================
#  FP-DevSetup / linux/setup.sh
#  Entorno de desarrollo para Formación Profesional — DAW
#  Plataforma: Linux (Ubuntu / Debian / Linux Mint)
#  Curso 2026-2027
# =============================================================================

set -euo pipefail

RED='\033[0;31m'; YELLOW='\033[1;33m'; GREEN='\033[0;32m'
CYAN='\033[0;36m'; BOLD='\033[1m'; RESET='\033[0m'

log_ok()    { echo -e "  ${GREEN}✔${RESET}  $1"; }
log_skip()  { echo -e "  ${YELLOW}↷${RESET}  $1"; }
log_error() { echo -e "  ${RED}✘${RESET}  $1"; }

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
SCRIPTS_DIR="$SCRIPT_DIR/scripts"
ROOT_DIR="$(cd "$SCRIPT_DIR/.." && pwd)"

[[ $EUID -eq 0 ]] && { log_error "No ejecutes como root."; exit 1; }

clear
echo ""
echo -e "  ${CYAN}${BOLD}╔══════════════════════════════════════════════════════════════╗${RESET}"
echo -e "  ${CYAN}${BOLD}║   FP-DevSetup — Entorno Docente DAW                        ║${RESET}"
echo -e "  ${CYAN}${BOLD}║   Plataforma : Linux (Ubuntu / Debian / Mint)                ║${RESET}"
echo -e "  ${CYAN}${BOLD}║                                                              ║${RESET}"
echo -e "  ${CYAN}${BOLD}║   DAW · Módulo Cliente   : Angular 22                        ║${RESET}"
echo -e "  ${CYAN}${BOLD}║   DAW · Módulo Full-Stack: React 19 + Node.js 22 + MySQL 8   ║${RESET}"
echo -e "  ${CYAN}${BOLD}║                                                              ║${RESET}"
echo -e "  ${CYAN}${BOLD}║   Responde 's' para instalar · ENTER para omitir             ║${RESET}"
echo -e "  ${CYAN}${BOLD}╚══════════════════════════════════════════════════════════════╝${RESET}"
echo ""

run_step() {
  local num="$1" title="$2" script="$3" desc="$4"
  echo ""
  echo -e "  ${BOLD}── Bloque $num: $title ──${RESET}"
  echo -e "  $desc"
  echo ""
  read -rp "  ¿Ejecutar? [s/N]: " resp
  resp=$(echo "$resp" | tr '[:upper:]' '[:lower:]')
  if [[ "$resp" == "s" ]]; then
    local script_path="$SCRIPTS_DIR/$script"
    [[ ! -f "$script_path" ]] && { log_error "Script no encontrado: $script_path"; return 1; }
    bash "$script_path" "$SCRIPT_DIR"
    log_ok "Bloque $num completado"
  else
    log_skip "Bloque $num omitido"
  fi
}

run_step "01" "Sistema base" \
  "01_sistema.sh" \
  "apt · Docker Engine · Git · GitHub CLI · VS Code · SSH."

run_step "02" "Visual Studio Code" \
  "02_vscode.sh" \
  "Extensiones + settings.json configurado para docencia."

run_step "03" "Estructura del entorno Docker" \
  "03_estructura.sh" \
  "Crea las subcarpetas vacías que Docker necesita antes del primer up."

run_step "04" "Aliases de terminal" \
  "04_aliases.sh" \
  "Aliases para Git, Docker y utilidades."

echo ""
echo -e "  ${GREEN}${BOLD}╔══════════════════════════════════════════════════════════════╗${RESET}"
echo -e "  ${GREEN}${BOLD}║   Instalación completada                                     ║${RESET}"
echo -e "  ${GREEN}${BOLD}╚══════════════════════════════════════════════════════════════╝${RESET}"
echo ""
echo -e "  ${BOLD}Próximos pasos:${RESET}"
echo -e "  1. ${YELLOW}Cierra sesión y vuelve a entrar${RESET} (para activar el grupo docker)"
echo -e "  2. Autentícate en GitHub:  ${CYAN}gh auth login${RESET}"
echo -e "  3. ${CYAN}git config --global user.name  \"Tu Nombre\"${RESET}"
echo -e "  4. ${CYAN}git config --global user.email \"tu@email.com\"${RESET}"
echo -e "  5. ${CYAN}docker run hello-world${RESET}"
echo -e "  6. ${CYAN}cd $ROOT_DIR/entorno && docker compose up -d${RESET}"
echo ""
echo -e "  Guía completa: ${CYAN}README-01-instalacion.md${RESET} (VirtualBox: copia el proyecto a ~/Descargas)"
echo ""
