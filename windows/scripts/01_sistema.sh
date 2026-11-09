#!/usr/bin/env bash
# =============================================================================
#  scripts/01_sistema.sh — Windows WSL2 + Ubuntu
#  apt · Git · GitHub CLI · SSH  (Docker vía Docker Desktop en Windows)
# =============================================================================

set -euo pipefail

GREEN='\033[0;32m'; YELLOW='\033[1;33m'; CYAN='\033[0;36m'
BOLD='\033[1m'; RESET='\033[0m'

log_section() { echo -e "\n${CYAN}${BOLD}── $1 ──────────────────────────────────────${RESET}"; }
log_ok()      { echo -e "  ${GREEN}✔${RESET}  $1"; }
log_info()    { echo -e "  ${CYAN}→${RESET}  $1"; }
log_warn()    { echo -e "  ${YELLOW}⚠${RESET}  $1"; }
log_skip()    { echo -e "  ${YELLOW}↷${RESET}  $1 (ya instalado)"; }

WARNINGS=()
add_warning() { WARNINGS+=("$1"); }
cmd_exists()  { command -v "$1" &>/dev/null; }

log_section "1 · DEPENDENCIAS BASE"
sudo apt-get update -y &>/dev/null
sudo apt-get install -y curl wget gnupg2 apt-transport-https \
  ca-certificates lsb-release software-properties-common git &>/dev/null
log_ok "Dependencias base"

log_section "2 · GIT"
if git --version &>/dev/null; then
  log_skip "Git ($(git --version))"
else
  sudo apt-get install -y git &>/dev/null
  log_ok "Git instalado"
fi
git config --global init.defaultBranch  main
git config --global pull.rebase         false
git config --global core.autocrlf       input
git config --global core.editor         "code --wait"
git config --global alias.lg            "log --oneline --graph --decorate --all"
git config --global alias.st            "status -sb"
log_ok "Git configurado"

log_section "3 · GITHUB CLI"
if cmd_exists gh; then
  log_skip "GitHub CLI"
else
  curl -fsSL https://cli.github.com/packages/githubcli-archive-keyring.gpg \
    | sudo dd of=/usr/share/keyrings/githubcli-archive-keyring.gpg 2>/dev/null
  sudo chmod go+r /usr/share/keyrings/githubcli-archive-keyring.gpg
  echo "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/githubcli-archive-keyring.gpg] \
https://cli.github.com/packages stable main" \
    | sudo tee /etc/apt/sources.list.d/github-cli.list
  sudo apt-get update -y
  sudo apt-get install -y gh
  log_ok "GitHub CLI instalado"
fi

log_section "4 · CLAVE SSH"
mkdir -p "$HOME/.ssh" && chmod 700 "$HOME/.ssh"
if [[ -f "$HOME/.ssh/id_ed25519" ]]; then
  log_skip "Clave SSH"
else
  ssh-keygen -t ed25519 -C "$(git config --global user.email 2>/dev/null || echo 'docente-fp')" \
    -f "$HOME/.ssh/id_ed25519" -N "" &>/dev/null
  log_ok "Clave SSH generada"
  add_warning "Añade tu clave pública a GitHub: gh auth login"
fi

SSH_AGENT_BLOCK='
# SSH Agent
if [ -z "$SSH_AUTH_SOCK" ]; then
  eval "$(ssh-agent -s)" > /dev/null
  ssh-add ~/.ssh/id_ed25519 2>/dev/null
fi'
for pf in "$HOME/.bashrc" "$HOME/.zshrc"; do
  if [[ -f "$pf" ]] && ! grep -q "SSH_AUTH_SOCK" "$pf"; then
    echo "$SSH_AGENT_BLOCK" >> "$pf" && log_ok "ssh-agent añadido a $pf"
  fi
done

log_section "5 · DOCKER (via Docker Desktop)"
if cmd_exists docker; then
  log_skip "Docker disponible ($(docker --version))"
else
  log_warn "Docker no disponible en WSL2."
  log_warn "Asegúrate de que Docker Desktop tiene la integración WSL2 activada:"
  log_warn "Docker Desktop → Settings → Resources → WSL Integration → Ubuntu ✔"
  add_warning "Docker no disponible. Activa WSL Integration en Docker Desktop."
fi

if [[ ${#WARNINGS[@]} -gt 0 ]]; then
  echo ""
  echo -e "${YELLOW}${BOLD}  Acciones pendientes:${RESET}"
  for w in "${WARNINGS[@]}"; do echo -e "  ${YELLOW}!${RESET}  $w"; done
fi
echo ""
log_ok "Script 01 finalizado"
