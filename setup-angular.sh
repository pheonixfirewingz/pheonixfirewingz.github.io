#!/usr/bin/env bash
set -euo pipefail

# Angular static-site bootstrap.
# Everything is installed/run locally through npm/npx. Nothing is installed globally.

PROJECT_DIR="${1:-$PWD}"
cd "$PROJECT_DIR"

if ! command -v node >/dev/null 2>&1; then
    echo "Error: Node.js is not installed or not in PATH."
    exit 1
fi

if ! command -v npm >/dev/null 2>&1; then
    echo "Error: npm is not installed or not in PATH."
    exit 1
fi

# Use the repository name as the Angular project name, stripping common
# GitHub Pages suffixes and replacing invalid characters.
REPO_NAME="$(basename "$PWD")"
PROJECT_NAME="${ANGULAR_PROJECT_NAME:-${REPO_NAME%.github.io}}"
PROJECT_NAME="$(printf '%s' "$PROJECT_NAME" \
    | tr '[:upper:]' '[:lower:]' \
    | sed -E 's/[^a-z0-9-]+/-/g; s/^-+//; s/-+$//')"

if [[ -z "$PROJECT_NAME" ]]; then
    PROJECT_NAME="angular-site"
fi

echo "Project directory: $PWD"
echo "Angular project name: $PROJECT_NAME"
echo

# Create the Angular workspace only if one does not already exist.
if [[ ! -f angular.json ]]; then
    echo "Creating Angular workspace..."

    npx -y @angular/cli@latest new "$PROJECT_NAME" \
        --directory . \
        --skip-git \
        --package-manager npm \
        --routing \
        --style scss \
        --standalone \
        --strict \
        --ssr=false \
        --defaults
else
    echo "Angular workspace already exists; installing existing dependencies..."
    npm install
fi

echo
echo "Adding Angular Material..."
npx ng add @angular/material \
    --skip-confirmation \
    --defaults

echo
echo "Installing the official Angular Agent Skills at project scope..."
DISABLE_TELEMETRY=1 npx -y skills add https://github.com/angular/skills --yes

echo
echo "Installed skills:"
DISABLE_TELEMETRY=1 npx -y skills ls || true

# Ensure useful project-local files are not accidentally ignored.
touch .gitignore

append_ignore() {
    local entry="$1"
    if ! grep -Fxq "$entry" .gitignore 2>/dev/null; then
        printf '%s\n' "$entry" >> .gitignore
    fi
}

append_ignore ""
append_ignore "# Local environment / secrets"
append_ignore ".env"
append_ignore ".env.*"
append_ignore "!.env.example"
append_ignore ""
append_ignore "# Editor / OS state"
append_ignore ".idea/"
append_ignore ".DS_Store"
append_ignore "Thumbs.db"

# Angular's generated .gitignore already covers node_modules, dist,
# .angular/cache and common tooling output.

if [[ ! -d .git ]]; then
    echo
    echo "Initialising Git repository..."
    git init
fi

echo
echo "Checking the production build..."
npm run build

echo
echo "Setup complete."
echo
echo "Development server:"
echo "  npm start"
echo
echo "Production build:"
echo "  npm run build"
echo
echo "Angular CLI without a global install:"
echo "  npx ng <command>"
