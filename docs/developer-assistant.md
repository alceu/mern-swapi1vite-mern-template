# Developer Assistant Guidance

**Spec-ID:** `docs-developer-assistant::v1`

## Developer Onboarding Overview

### MUST

1. Define onboarding overview content.
1. Summarize SDLC conventions and point to `docs/vision.md`, `docs/prototypes.md`, `docs/tasks-management.md`, `docs/testing.md`, `docs/verification.md`, `docs/version-control.md`, and `docs/cicd.md`.
1. Summarize software architecture conventions and repo navigation using `docs/stack.md`, and call out `packages/api`, `packages/pwa`, and `packages/domain`.
1. Explain `.agents/` vs `docs/` scope, emphasizing high cohesion and low coupling by keeping rules in `.agents/` and project specifics in `docs/`.
1. Point developers to the Foundational Setup, Developer Onboarding, and SDLC templates in `docs/queries.md`.

### SHOULD

1. None

### COULD

1. None

### WANT

1. None

## Local Environment Setup (Post-Clone)

### MUST

1. Define post-clone local setup guidance and default steps for this repository.
1. Ask whether the developer prefers Docker or local services.
1. Use `docs/stack.md` and `docs/verification.md` for canonical commands and verification steps.
1. Call out missing inputs (for example, required env values).
1. If setup steps are missing from `docs/`, propose updates before finalizing.
1. Provide the setup steps in "Setup Steps Reference" when relevant.

### SHOULD

1. None

### COULD

1. None

### WANT

1. None

## Setup Steps Reference

### MUST

1. Install dependencies:

   ```bash
   pnpm install
   ```

1. Optional editor config:

   ```bash
   cp -r sample-.vscode .vscode
   ```

1. Environment setup:

   - Development:

     ```bash
     cp sample-development.env .env
     ```

   - Production:

     ```bash
     cp sample-production.env .env
     ```

   - Create workspace symlinks:

     ```bash
     ln -s ../../.env packages/pwa/.env && ln -s ../../.env packages/api/.env
     ```

   Note: `.env` is ignored by Git; ensure values are set for your environment.

1. Docker development:

   ```bash
   docker compose up --build
   ```

   Production compose:

   ```bash
   docker compose -f docker-compose.yml -f docker-compose.production.yml up --build
   ```

   The `-d` flag can be added to run in detached mode.

1. Local development:

   Start the database:

   ```bash
   docker compose up mongo -d
   ```

   Update `MONGO_URI` in `.env` to replace `mongo:27017` with `localhost:27017`.

   Start the development servers:

   ```bash
   pnpm dev
   ```

   Or run them in separate terminals:

   ```bash
   pnpm dev:api
   pnpm dev:pwa
   ```

   Default access points (confirm against `.env`):

   - api: `http://localhost:5000`
   - pwa: `http://localhost:3000`
   - Docker production pwa: `http://localhost`

### SHOULD

1. None

### COULD

1. None

### WANT

1. None

## Approval Gates

### MUST

1. Follow the approval gates in `docs/verification.md` before running commands that alter container state, start background servers, or install dependencies.

### SHOULD

1. None

### COULD

1. None

### WANT

1. None

## Contributor Competencies

### MUST

1. Understand pnpm workspaces, Docker Compose workflows, and env template handling for this repository.

### SHOULD

1. None

### COULD

1. None

### WANT

1. None
