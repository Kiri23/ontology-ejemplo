#!/bin/sh
# Rearma docs/_catalogo/ con lo que nombra docs/incluir.txt; con --check solo dice si está atrasado.
# El armador es el de DocsifyTemplate, fijado al mismo commit que el site.js de docs/index.html:
# al cambiar el SHA, cambialo en los dos. Necesita Node (npx).
#   ./armar-docs.sh            # rearma
#   ./armar-docs.sh --check    # sale con 1 si docs/_catalogo/ no está al día
set -e
cd "$(dirname "$0")"
exec npx -y --package=https://codeload.github.com/Kiri23/DocsifyTemplate/tar.gz/4b8348440d96447528b945111bb8f95d6c115c5d docs-armar "$@" docs
