#!/usr/bin/env bash
# =============================================================================
#  scripts/01_sistema.sh — Mac ARM (M1/M2/M3/M4)
#  Homebrew · Docker Desktop · Git · GitHub CLI · SSH · Oh My Zsh
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

log_section "1 · XCODE COMMAND LINE TOOLS"
if xcode-select -p &>/dev/null; then
  log_skip "Xcode CLT"
else
  log_info "Instalando Xcode Command Line Tools..."
  xcode-select --install 2>/dev/null || true
  log_warn "Acepta el diálogo emergente y vuelve a ejecutar el script."
  exit 0
fi

log_section "2 · HOMEBREW"
if cmd_exists brew; then
  log_skip "Homebrew ($(brew --version | head -1))"
else
  log_info "Instalando Homebrew..."
  NONINTERACTIVE=1 /bin/bash -c \
    "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
  eval "$(/opt/homebrew/bin/brew shellenv)"
  log_ok "Homebrew instalado"
fi
brew update --quiet 2>/dev/null || true

log_section "3 · DOCKER DESKTOP"
if cmd_exists docker; then
  log_skip "Docker"
else
  log_info "Instalando Docker Desktop..."
  brew install --cask docker-desktop
  log_ok "Docker Desktop instalado"
  add_warning "Abre Docker Desktop y espera a que arranque antes de usar docker."
fi

log_section "4 · GIT"
if cmd_exists git; then
  log_skip "Git ($(git --version))"
else
  brew install git &>/dev/null
  log_ok "Git instalado"
fi
git config --global init.defaultBranch  main
git config --global pull.rebase         false
git config --global core.autocrlf       input
git config --global core.editor         "code --wait"
git config --global alias.lg            "log --oneline --graph --decorate --all"
git config --global alias.st            "status -sb"
log_ok "Git configurado"

log_section "5 · GITHUB CLI"
if cmd_exists gh; then
  log_skip "GitHub CLI"
else
  brew install gh &>/dev/null
  log_ok "GitHub CLI instalado"
fi

log_section "6 · CLAVE SSH"
mkdir -p "$HOME/.ssh" && chmod 700 "$HOME/.ssh"
if [[ -f "$HOME/.ssh/id_ed25519" ]]; then
  log_skip "Clave SSH"
else
  ssh-keygen -t ed25519 -C "$(git config --global user.email 2>/dev/null || echo 'docente-fp')" \
    -f "$HOME/.ssh/id_ed25519" -N "" &>/dev/null
  log_ok "Clave SSH generada"
  add_warning "Añade tu clave pública a GitHub: gh auth login"
fi

log_section "7 · OH MY ZSH"
OMZ_DIR="$HOME/.oh-my-zsh"
if [[ -d "$OMZ_DIR" ]]; then
  log_skip "Oh My Zsh"
else
  log_info "Instalando Oh My Zsh..."
  RUNZSH=no CHSH=no \
    sh -c "$(curl -fsSL https://raw.githubusercontent.com/ohmyzsh/ohmyzsh/master/tools/install.sh)" \
    "" --unattended &>/dev/null
  log_ok "Oh My Zsh instalado"
fi

ZSH_CUSTOM="${ZSH_CUSTOM:-$OMZ_DIR/custom}"
if [[ ! -d "$ZSH_CUSTOM/plugins/zsh-autosuggestions" ]]; then
  git clone --depth=1 https://github.com/zsh-users/zsh-autosuggestions \
    "$ZSH_CUSTOM/plugins/zsh-autosuggestions" &>/dev/null
  log_ok "zsh-autosuggestions instalado"
else
  log_skip "zsh-autosuggestions"
fi
if [[ ! -d "$ZSH_CUSTOM/plugins/zsh-syntax-highlighting" ]]; then
  git clone --depth=1 https://github.com/zsh-users/zsh-syntax-highlighting \
    "$ZSH_CUSTOM/plugins/zsh-syntax-highlighting" &>/dev/null
  log_ok "zsh-syntax-highlighting instalado"
else
  log_skip "zsh-syntax-highlighting"
fi

ZSHRC="$HOME/.zshrc"
if [[ -f "$ZSHRC" ]]; then
  # CORRECCIÓN 2: tema bira — muestra la ruta completa en el prompt
  grep -q "^ZSH_THEME=" "$ZSHRC" && \
    sed -i.bak 's/^ZSH_THEME=.*/ZSH_THEME="bira"/' "$ZSHRC" && \
    rm -f "$ZSHRC.bak" && log_ok "Tema: bira (ruta completa + rama git)"

  grep -q "^plugins=" "$ZSHRC" && \
    sed -i.bak 's/^plugins=.*/plugins=(git docker docker-compose node vscode zsh-autosuggestions zsh-syntax-highlighting)/' "$ZSHRC" && \
    rm -f "$ZSHRC.bak" && log_ok "Plugins configurados"

  # Homebrew ARM en PATH
  BREW_EVAL='eval "$(/opt/homebrew/bin/brew shellenv)"'
  grep -q "brew shellenv" "$ZSHRC" || { echo "$BREW_EVAL" >> "$ZSHRC"; log_ok "Homebrew PATH (ARM) asegurado"; }
fi

SSH_AGENT_BLOCK='
# SSH Agent
if [ -z "$SSH_AUTH_SOCK" ]; then
  eval "$(ssh-agent -s)" > /dev/null
  ssh-add --apple-use-keychain ~/.ssh/id_ed25519 2>/dev/null
fi'
if [[ -f "$HOME/.zshrc" ]] && ! grep -q "SSH_AUTH_SOCK" "$HOME/.zshrc"; then
  echo "$SSH_AGENT_BLOCK" >> "$HOME/.zshrc"
  log_ok "ssh-agent añadido a ~/.zshrc"
fi

if [[ ${#WARNINGS[@]} -gt 0 ]]; then
  echo ""
  echo -e "${YELLOW}${BOLD}  Acciones pendientes:${RESET}"
  for w in "${WARNINGS[@]}"; do echo -e "  ${YELLOW}!${RESET}  $w"; done
fi
echo ""
log_ok "Script 01 finalizado"
