#!/usr/bin/env bash
# Mirrors HighLevel docs from a sibling repo into ./ghl-docs/.
# Usage: ./scripts/sync-ghl-docs.sh [source_path]
# Default source: ../ghl-docs-watcher-repo/docs  (sibling of this repo)
# The local ghl-docs/README.md is preserved across the mirror.
# No package installs, no network calls.

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
REPO_ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"
SRC="${1:-$REPO_ROOT/../ghl-docs-watcher-repo/docs}"
DEST="$REPO_ROOT/ghl-docs"

if [ ! -d "$SRC" ]; then
  echo "Source path not found: $SRC" >&2
  exit 1
fi

SRC_ABS="$(cd "$SRC" && pwd)"

echo "Source: $SRC_ABS"
echo "Dest  : $DEST"
echo

mkdir -p "$DEST"

# Preserve the local README.md across the mirror sweep.
README="$DEST/README.md"
README_BACKUP=""
if [ -f "$README" ]; then
  README_BACKUP="$(mktemp)"
  cp "$README" "$README_BACKUP"
fi

if command -v rsync >/dev/null 2>&1; then
  rsync -a --delete --exclude 'README.md' "$SRC_ABS"/ "$DEST"/
else
  # Fallback: purge dest (except README.md), then copy source over.
  find "$DEST" -mindepth 1 -not -path "$DEST/README.md" -delete
  cp -R "$SRC_ABS"/. "$DEST"/
fi

# Restore the local README.md
if [ -n "$README_BACKUP" ]; then
  cp "$README_BACKUP" "$README"
  rm -f "$README_BACKUP"
fi

echo
echo "Sync complete."
