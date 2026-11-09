#!/usr/bin/env bash
# Genera APUNTES.slides.md a partir de APUNTES.md (cabecera Marp + contenido).
#
# Uso (desde esta carpeta sites/):
#   ./build-marp-slides.sh 030-Registro+Login-cookies/030a-…/APUNTES.md
#   ./build-marp-slides.sh 030-Registro+Login-cookies          # todos los APUNTES.md del bloque
#   ./build-marp-slides.sh                                    # todos los APUNTES.md bajo sites/
#
# No procesa GUIA-COMUN.md. Edita solo el APUNTES.md; luego exporta el PDF a mano con Marp.

set -euo pipefail

ROOT="$(cd "$(dirname "$0")" && pwd)"
CSS="$ROOT/marp-slides.css"

if [[ ! -f "$CSS" ]]; then
  echo "Falta: $CSS" >&2
  exit 1
fi

write_slides() {
  local source="$1"
  # Normalizar a ruta absoluta si viene relativa
  if [[ "$source" != /* ]]; then
    source="$ROOT/$source"
  fi
  local slides="${source%.md}.slides.md"

  if [[ ! -f "$source" ]]; then
    echo "No existe: $source" >&2
    exit 1
  fi

  case "$(basename "$source")" in
    GUIA-COMUN.md|*.slides.md)
      echo "Omitido: $source" >&2
      return 0
      ;;
  esac

  {
    echo "---"
    echo "marp: true"
    echo "theme: default"
    echo "paginate: true"
    echo "style: |"
    sed 's/^/  /' "$CSS"
    echo "---"
    echo ""
    cat "$source"
  } > "$slides"

  echo "OK: $slides"
}

collect_apuntes() {
  local dir="$1"
  find "$dir" -type f -name 'APUNTES.md' ! -path '*/.*' | sort
}

if [[ "$#" -eq 0 ]]; then
  while IFS= read -r f; do
    write_slides "$f"
  done < <(collect_apuntes "$ROOT")
  exit 0
fi

for arg in "$@"; do
  target="$arg"
  if [[ "$target" != /* ]]; then
    target="$ROOT/$target"
  fi

  if [[ -d "$target" ]]; then
    while IFS= read -r f; do
      write_slides "$f"
    done < <(collect_apuntes "$target")
  elif [[ -f "$target" ]]; then
    write_slides "$target"
  else
    echo "No existe: $arg" >&2
    exit 1
  fi
done
