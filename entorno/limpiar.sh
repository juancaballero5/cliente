#!/usr/bin/env bash
# =============================================================================
#  entorno/limpiar.sh
#  Elimina por completo el proyecto Docker de esta carpeta (entorno).
#
#  Uso:
#    cd entorno
#    bash limpiar.sh
#
#  Después (herramientas del PC):
#    cd ../mac-intel    # o mac-arm / linux / windows
#    bash setup.sh
#
#  Y para volver a levantar el laboratorio:
#    cd ../entorno
#    docker compose up -d
# =============================================================================

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$SCRIPT_DIR"

if [[ ! -f docker-compose.yml ]]; then
  echo "No se encontró docker-compose.yml en: $SCRIPT_DIR"
  exit 1
fi

PROYECTO="$(basename "$SCRIPT_DIR")"

echo ""
echo "  Se va a eliminar TODO el Docker de: ${PROYECTO}"
echo "  (contenedores, volúmenes/MySQL, imágenes de este proyecto)"
echo ""
echo "  Otros proyectos Docker no se tocan."
echo ""

read -rp "¿Continuar? [s/N]: " ok
if [[ ! "$ok" =~ ^[sS]$ ]]; then
  echo "Cancelado."
  exit 0
fi

echo ""
echo "Parando y borrando..."
echo ""

docker compose --profile produccion \
  down -v --remove-orphans --rmi all

echo ""
echo "Listo. El proyecto Docker '${PROYECTO}' ya no está."
echo ""
echo "Siguiente paso — instalar herramientas del PC (si hace falta):"
echo "  cd ${SCRIPT_DIR}/../mac-intel    # o mac-arm / linux / windows"
echo "  bash setup.sh"
echo ""
echo "Luego levantar el laboratorio:"
echo "  cd ${SCRIPT_DIR}"
echo "  docker compose up -d"
echo ""
