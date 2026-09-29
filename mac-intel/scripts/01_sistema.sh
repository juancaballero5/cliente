#!/usr/bin/env bash
# =============================================================================
#  scripts/01_sistema.sh — Mac Intel (x86_64)
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

ARCH="$(uname -m)"

# ── 1. XCODE COMMAND LINE TOOLS ───────────────────────────────────────────────
log_section "1 · XCODE COMMAND LINE TOOLS"

if xcode-select -p &>/dev/null; then
  log_skip "Xcode CLT ($(xcode-select -p))"
else
  log_info "Instalando Xcode Command Line Tools..."
  xcode-select --install 2>/dev/null || true
  log_warn "Acepta el diálogo emergente y vuelve a ejecutar este script cuando termine."
  exit 0
fi

# ── 2. HOMEBREW ───────────────────────────────────────────────────────────────
log_section "2 · HOMEBREW"

if cmd_exists brew; then
  log_skip "Homebrew ($(brew --version | head -1))"
else
  log_info "Instalando Homebrew..."
  NONINTERACTIVE=1 /bin/bash -c \
    "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
  eval "$(/usr/local/bin/brew shellenv)"
  log_ok "Homebrew instalado"
fi

brew update --quiet 2>/dev/null || true

# ── 3. DOCKER DESKTOP ─────────────────────────────────────────────────────────
log_section "3 · DOCKER DESKTOP"

if cmd_exists docker; then
  log_skip "Docker ($(docker --version 2>/dev/null || echo 'instalado'))"
else
  log_info "Instalando Docker Desktop via Homebrew..."
  brew install --cask docker-desktop
  log_ok "Docker Desktop instalado"
  add_warning "Abre Docker Desktop desde Aplicaciones y espera a que arranque antes de usar docker."
fi

# ── 4. GIT ────────────────────────────────────────────────────────────────────
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
log_ok "Git configurado (rama: main, editor: VS Code)"

# ── 5. GITHUB CLI ─────────────────────────────────────────────────────────────
log_section "5 · GITHUB CLI"

if cmd_exists gh; then
  log_skip "GitHub CLI ($(gh --version | head -1))"
else
  brew install gh &>/dev/null
  log_ok "GitHub CLI instalado"
fi

# ── 6. CLAVE SSH ──────────────────────────────────────────────────────────────
log_section "6 · CLAVE SSH"

mkdir -p "$HOME/.ssh" && chmod 700 "$HOME/.ssh"

if [[ -f "$HOME/.ssh/id_ed25519" ]]; then
  log_skip "Clave SSH (~/.ssh/id_ed25519 ya existe)"
else
  log_info "Generando clave SSH ed25519..."
  ssh-keygen -t ed25519 -C "$(git config --global user.email 2>/dev/null || echo 'docente-fp')" \
    -f "$HOME/.ssh/id_ed25519" -N "" &>/dev/null
  log_ok "Clave SSH generada"
  add_warning "Añade tu clave pública a GitHub: gh auth login o copia ~/.ssh/id_ed25519.pub"
fi

# ── 7. OH MY ZSH ─────────────────────────────────────────────────────────────
log_section "7 · OH MY ZSH"

OMZ_DIR="$HOME/.oh-my-zsh"

if [[ -d "$OMZ_DIR" ]]; then
  log_skip "Oh My Zsh (ya instalado)"
else
  log_info "Instalando Oh My Zsh..."
  RUNZSH=no CHSH=no \
    sh -c "$(curl -fsSL https://raw.githubusercontent.com/ohmyzsh/ohmyzsh/master/tools/install.sh)" \
    "" --unattended &>/dev/null
  log_ok "Oh My Zsh instalado"
fi

ZSH_CUSTOM="${ZSH_CUSTOM:-$OMZ_DIR/custom}"

if [[ ! -d "$ZSH_CUSTOM/plugins/zsh-autosuggestions" ]]; then
  log_info "Instalando zsh-autosuggestions..."
  git clone --depth=1 https://github.com/zsh-users/zsh-autosuggestions \
    "$ZSH_CUSTOM/plugins/zsh-autosuggestions" &>/dev/null
  log_ok "zsh-autosuggestions instalado"
else
  log_skip "zsh-autosuggestions"
fi

if [[ ! -d "$ZSH_CUSTOM/plugins/zsh-syntax-highlighting" ]]; then
  log_info "Instalando zsh-syntax-highlighting..."
  git clone --depth=1 https://github.com/zsh-users/zsh-syntax-highlighting \
    "$ZSH_CUSTOM/plugins/zsh-syntax-highlighting" &>/dev/null
  log_ok "zsh-syntax-highlighting instalado"
else
  log_skip "zsh-syntax-highlighting"
fi

ZSHRC="$HOME/.zshrc"
if [[ -f "$ZSHRC" ]]; then
  # CORRECCIÓN 2: Tema con ruta completa — usamos un tema personalizado
  # que muestra la ruta completa en lugar de la abreviada.
  # 'fino' muestra la ruta completa (%~) y la rama git.
  # Si prefieres uno inline, 'bira' también muestra la ruta completa.
  if grep -q "^ZSH_THEME=" "$ZSHRC"; then
    sed -i.bak 's/^ZSH_THEME=.*/ZSH_THEME="bira"/' "$ZSHRC"
    rm -f "$ZSHRC.bak"
    log_ok "Tema configurado: bira (ruta completa + rama git)"
  fi

  # Plugins
  if grep -q "^plugins=" "$ZSHRC"; then
    sed -i.bak 's/^plugins=.*/plugins=(git docker docker-compose node vscode zsh-autosuggestions zsh-syntax-highlighting)/' "$ZSHRC"
    rm -f "$ZSHRC.bak"
    log_ok "Plugins: git · docker · docker-compose · node · vscode · autosuggestions · syntax-highlighting"
  fi

  # Homebrew en PATH dentro de zsh
  BREW_EVAL='eval "$(/usr/local/bin/brew shellenv)"'
  if ! grep -q "brew shellenv" "$ZSHRC"; then
    echo "$BREW_EVAL" >> "$ZSHRC"
    log_ok "Homebrew PATH asegurado en .zshrc"
  fi
fi

# ssh-agent (después de Oh My Zsh, que crea ~/.zshrc)
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

# ── AVISOS FINALES ────────────────────────────────────────────────────────────
if [[ ${#WARNINGS[@]} -gt 0 ]]; then
  echo ""
  echo -e "${YELLOW}${BOLD}  Acciones pendientes:${RESET}"
  for w in "${WARNINGS[@]}"; do
    echo -e "  ${YELLOW}!${RESET}  $w"
  done
fi

echo ""
log_ok "Script 01 finalizado"
