#!/usr/bin/env bash
# =============================================================================
#  scripts/03_estructura.sh
#  Crea las subcarpetas vacías que Docker necesita antes del primer "up".
#  La carpeta entorno/ ya viene completa en el ZIP — no hay nada que copiar
#  ni ninguna ruta que elegir.
#  Compatible con: Mac Intel · Mac ARM · Linux · Windows (WSL2)
# =============================================================================

set -euo pipefail

GREEN='\033[0;32m'; YELLOW='\033[1;33m'; CYAN='\033[0;36m'
BOLD='\033[1m'; RESET='\033[0m'

log_section() { echo -e "\n${CYAN}${BOLD}── $1 ──────────────────────────────────────${RESET}"; }
log_ok()      { echo -e "  ${GREEN}✔${RESET}  $1"; }
log_skip()    { echo -e "  ${YELLOW}↷${RESET}  $1 (ya existe)"; }
log_warn()    { echo -e "  ${YELLOW}⚠${RESET}  $1"; }

# $1 = carpeta de plataforma (p.ej. .../FP-DevSetup/mac-intel/)
# entorno/ está un nivel por encima
PLATFORM_DIR="${1:-$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)}"
ENTORNO_DIR="$(cd "$PLATFORM_DIR/.." && pwd)/entorno"

# ── VERIFICAR QUE entorno/ EXISTE ────────────────────────────────────────────
if [[ ! -f "$ENTORNO_DIR/docker-compose.yml" ]]; then
  log_warn "No se encontró entorno/docker-compose.yml en: $ENTORNO_DIR"
  log_warn "Asegúrate de haber descomprimido el ZIP completo de FP-DevSetup."
  exit 1
fi

log_section "ENTORNO DOCKER"
echo ""
echo -e "  Ubicación: ${CYAN}$ENTORNO_DIR${RESET}"
echo ""

# ── SUBCARPETAS VACÍAS ────────────────────────────────────────────────────────
# Docker monta estas carpetas como volúmenes. Si no existen antes del primer
# "docker compose up", Docker las crea como root y los permisos fallan.
log_section "SUBCARPETAS DE TRABAJO"

DIRS=(
  "$ENTORNO_DIR/angular22"
  "$ENTORNO_DIR/react19"
  "$ENTORNO_DIR/nodejs-api"
  "$ENTORNO_DIR/angular-app/dist"
  "$ENTORNO_DIR/vanilla-app/sites"
)

for dir in "${DIRS[@]}"; do
  if [[ -d "$dir" ]]; then
    log_skip "${dir#$ENTORNO_DIR/}"
  else
    mkdir -p "$dir"
    log_ok "Creada: ${dir#$ENTORNO_DIR/}"
  fi
done

# ── RESUMEN ───────────────────────────────────────────────────────────────────
echo ""
echo -e "  ${BOLD}Para arrancar el entorno:${RESET}"
echo -e "  ${CYAN}cd $ENTORNO_DIR${RESET}"
echo -e "  ${CYAN}docker compose up -d${RESET}"
echo ""
log_ok "Script 03 finalizado"
