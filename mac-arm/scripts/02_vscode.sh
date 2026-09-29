#!/usr/bin/env bash
# =============================================================================
#  scripts/02_vscode.sh — Visual Studio Code + extensiones + settings.json
#  Compatible con: Mac Intel · Mac ARM · Linux · Windows (WSL2)
# =============================================================================

set -euo pipefail

GREEN='\033[0;32m'; YELLOW='\033[1;33m'; CYAN='\033[0;36m'; RED='\033[0;31m'
BOLD='\033[1m'; RESET='\033[0m'

log_section() { echo -e "\n${CYAN}${BOLD}── $1 ──────────────────────────────────────${RESET}"; }
log_ok()      { echo -e "  ${GREEN}✔${RESET}  $1"; }
log_info()    { echo -e "  ${CYAN}→${RESET}  $1"; }
log_warn()    { echo -e "  ${YELLOW}⚠${RESET}  $1"; }
log_skip()    { echo -e "  ${YELLOW}↷${RESET}  $1 (ya instalado)"; }

WARNINGS=()
add_warning() { WARNINGS+=("$1"); }
cmd_exists()  { command -v "$1" &>/dev/null; }

log_section "VS CODE"

if ! cmd_exists code; then
  log_warn "VS Code no está en el PATH."
  log_warn "Asegúrate de haber ejecutado el script 01 primero."
  add_warning "Instala VS Code y vuelve a ejecutar este script."
  exit 1
fi

log_skip "VS Code ($(code --version | head -1))"

log_section "EXTENSIONES"

install_ext() {
  local id="$1"
  local label="${2:-$id}"
  if code --list-extensions 2>/dev/null | grep -qi "^${id}$"; then
    log_skip "Ext: $label"
  else
    if code --install-extension "$id" --force &>/dev/null; then
      log_ok "Ext: $label"
    else
      log_warn "No instalada: $label"
      add_warning "Instala manualmente en VS Code: $id"
    fi
  fi
}

log_info "Instalando extensiones del curso..."

install_ext "ms-azuretools.vscode-docker"     "Docker"
if grep -qi microsoft /proc/version 2>/dev/null; then
  install_ext "ms-vscode-remote.remote-wsl"   "WSL"
fi

install_ext "eamodio.gitlens"                 "GitLens"
install_ext "angular.ng-template"             "Angular Language Service"
install_ext "dsznajder.es7-react-js-snippets" "React Snippets"
install_ext "ecmel.vscode-html-css"           "HTML CSS Support"
install_ext "esbenp.prettier-vscode"          "Prettier"
install_ext "cweijan.vscode-database-client2" "Database Client"

log_ok "Extensiones instaladas"

log_section "SETTINGS.JSON"

VSCODE_SETTINGS_DIR="$HOME/Library/Application Support/Code/User"
if [[ "$(uname -s)" != "Darwin" ]]; then
  VSCODE_SETTINGS_DIR="$HOME/.config/Code/User"
fi

mkdir -p "$VSCODE_SETTINGS_DIR"
SETTINGS_FILE="$VSCODE_SETTINGS_DIR/settings.json"

if [[ -f "$SETTINGS_FILE" ]]; then
  log_info "settings.json ya existe — copia de seguridad..."
  cp "$SETTINGS_FILE" "${SETTINGS_FILE}.bak"
  log_ok "Copia guardada en settings.json.bak"
fi

cat > "$SETTINGS_FILE" << 'EOF'
{
  "editor.fontSize": 14,
  "editor.tabSize": 2,
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.wordWrap": "on",
  "editor.minimap.enabled": false,
  "editor.lineHeight": 1.6,

  "terminal.integrated.fontSize": 13,

  "git.autofetch": true,
  "git.confirmSync": false,

  "docker.showStartPage": false,

  "files.trimTrailingWhitespace": true,
  "files.insertFinalNewline": true,
  "files.autoSave": "onFocusChange",

  "prettier.singleQuote": true,
  "prettier.semi": true,
  "prettier.trailingComma": "es5",
  "prettier.printWidth": 100,

  "[typescript]":      { "editor.defaultFormatter": "esbenp.prettier-vscode" },
  "[typescriptreact]": { "editor.defaultFormatter": "esbenp.prettier-vscode" },
  "[html]":            { "editor.defaultFormatter": "esbenp.prettier-vscode" },
  "[json]":            { "editor.defaultFormatter": "esbenp.prettier-vscode" }
}
EOF
log_ok "settings.json configurado"

if [[ ${#WARNINGS[@]} -gt 0 ]]; then
  echo ""
  echo -e "${YELLOW}${BOLD}  Acciones pendientes:${RESET}"
  for w in "${WARNINGS[@]}"; do
    echo -e "  ${YELLOW}!${RESET}  $w"
  done
fi

echo ""
log_ok "Script 02 finalizado"
