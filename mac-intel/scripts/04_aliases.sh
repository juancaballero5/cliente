#!/usr/bin/env bash
# =============================================================================
#  scripts/04_aliases.sh — Aliases de terminal para Git, Docker y utilidades
#  Compatible con: Mac Intel · Mac ARM · Linux · Windows (WSL2)
# =============================================================================

set -euo pipefail

GREEN='\033[0;32m'; YELLOW='\033[1;33m'; CYAN='\033[0;36m'
BOLD='\033[1m'; RESET='\033[0m'

log_section() { echo -e "\n${CYAN}${BOLD}── $1 ──────────────────────────────────────${RESET}"; }
log_ok()      { echo -e "  ${GREEN}✔${RESET}  $1"; }
log_info()    { echo -e "  ${CYAN}→${RESET}  $1"; }
log_skip()    { echo -e "  ${YELLOW}↷${RESET}  $1 (ya configurado)"; }

# ── ALIASES ───────────────────────────────────────────────────────────────────
log_section "ALIASES DE TERMINAL"

ALIASES_BLOCK='
# ─────────────────────────────────────────────────────────────────────────────
# FP-DevSetup — Aliases de desarrollo
# ─────────────────────────────────────────────────────────────────────────────

# Docker compose
alias dcu="docker compose up -d"
alias dcud="docker compose up -d"
alias dcd="docker compose down"
alias dcdv="docker compose down -v"
alias dcl="docker compose logs -f"
alias dcs="docker compose ps"
alias dcb="docker compose up --build -d"
alias dce="docker compose exec"   # dce angular22 bash  → entra al contenedor

# Docker general
alias dps="docker ps"
alias dpsa="docker ps -a"
alias dimg="docker images"
alias drm="docker rm"
alias drmi="docker rmi"
alias dprune="docker system prune -f"

# Git
alias gs="git status -sb"
alias ga="git add ."
alias gc="git commit -m"
alias gp="git push"
alias gl="git log --oneline --graph --decorate --all"
alias gco="git checkout"
alias gb="git branch"
alias gbd="git branch -d"
alias gst="git stash"
alias gstp="git stash pop"

# Utilidades
alias ll="ls -lah"
alias ..="cd .."
alias ...="cd ../.."
alias reload="source ~/.zshrc 2>/dev/null || source ~/.bashrc 2>/dev/null"
alias ports="lsof -i -P -n | grep LISTEN"
alias myip="curl -s ifconfig.me && echo"
'

# Detectar perfiles (zsh en Mac, bash en Ubuntu/WSL; a veces hay los dos)
PROFILES=()
[[ -f "$HOME/.zshrc" ]] && PROFILES+=("$HOME/.zshrc")
[[ -f "$HOME/.bashrc" ]] && PROFILES+=("$HOME/.bashrc")
if [[ ${#PROFILES[@]} -eq 0 ]]; then
  touch "$HOME/.bashrc"
  PROFILES+=("$HOME/.bashrc")
fi

for PROFILE in "${PROFILES[@]}"; do
  if grep -q "FP-DevSetup — Aliases" "$PROFILE" 2>/dev/null; then
    log_skip "Aliases (ya presentes en $PROFILE)"
  else
    echo "$ALIASES_BLOCK" >> "$PROFILE"
    log_ok "Aliases añadidos a $PROFILE"
  fi
done

echo ""
echo -e "  ${BOLD}Aliases instalados:${RESET}"
echo -e "  ${CYAN}dcu / dcud${RESET}   — docker compose up -d"
echo -e "  ${CYAN}dcd${RESET}          — docker compose down"
echo -e "  ${CYAN}dcdv${RESET}         — docker compose down -v (reset BD)"
echo -e "  ${CYAN}dcl${RESET}          — docker compose logs -f"
echo -e "  ${CYAN}dce${RESET}          — docker compose exec  (p.ej: dce angular22 bash)"
echo -e "  ${CYAN}gs / ga / gc / gp / gl${RESET}  — git status/add/commit/push/log"
echo ""
log_ok "Script 04 finalizado — abre una terminal nueva para activar los aliases"
