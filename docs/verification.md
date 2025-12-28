# Verification Commands Reference

**Spec-ID:** `docs-verification::v1`

## Purpose

### MUST

1. Define the verification commands and workflows required before commits, merges, and releases.
1. Keep command syntax aligned with workspace scripts in `package.json` files and any container workflows.

### SHOULD

1. None

### COULD

1. None

### WANT

1. None

## Verification Commands

### MUST

1. Use the following commands for type checking:

   ```bash
   pnpm check-types
   pnpm --filter api check-types
   pnpm --filter pwa check-types
   pnpm --filter domain check-types
   ```

1. Use the following commands for linting:

   ```bash
   pnpm lint
   pnpm --filter api lint
   pnpm --filter pwa lint
   ```

1. Use the following commands for testing and coverage:

   ```bash
   pnpm --filter pwa test
   pnpm --filter pwa coverage
   pnpm coverage
   pnpm --filter api test
   pnpm --filter api coverage
   pnpm --filter domain test
   pnpm --filter domain coverage
   ```

1. Use the following commands for builds:

   ```bash
   pnpm build
   pnpm --filter api build
   pnpm --filter pwa build
   pnpm --filter domain build
   ```

### SHOULD

1. None

### COULD

1. None

### WANT

1. None

## Verification Workflows

### MUST

1. The minimum default verification step is:

   ```bash
   pnpm check-types
   ```

1. For documentation-only changes, run the minimum default verification and any configured Markdown linting.
1. For runtime behavior changes, add linting and the relevant package tests.
1. For container-based verification, run the cleanup command before and after using Docker:

   ```bash
   docker compose down --volumes --remove-orphans
   ```

1. Use the following dev server checks and start commands when runtime behavior is affected:

   ```bash
   lsof -ti:3000
   lsof -ti:5173
   lsof -ti:27017
   pnpm dev
   pnpm --filter api dev
   pnpm --filter pwa dev
   ```

### SHOULD

1. Redirect dev server logs to a file and scan for failures when troubleshooting:

   ```bash
   pnpm dev > dev.log 2>&1 &
   tail -f dev.log
   timeout 10s tail -f dev.log | rg -i "error|fail|exception"
   ```

### COULD

1. Run `pnpm build` after cross-package changes when time allows.

### WANT

1. None

## Change Scope Detection

### MUST

1. Use the following commands to map change scope:

   ```bash
   git diff --name-only HEAD
   git diff --name-only develop...HEAD
   git diff --name-only develop...HEAD | rg "^packages/api/"
   git diff --name-only develop...HEAD | rg "^packages/pwa/"
   git diff --name-only develop...HEAD | rg "^\.agents/"
   ```

### SHOULD

1. None

### COULD

1. None

### WANT

1. None

## Verification Bundle by Change Type

### MUST

1. Use the following mapping to select verification commands:

   ```text
   .agents/*.md changes    -> pnpm check-types, review docs consistency
   docs/*.md changes       -> pnpm check-types, review against manifests
   API source changes      -> pnpm lint, pnpm check-types, pnpm --filter api test
   PWA source changes      -> pnpm lint, pnpm check-types, pnpm --filter pwa test
   Domain changes          -> pnpm lint, pnpm check-types, affected package tests
   Docker changes          -> docker compose config, container startup/teardown
   package.json changes    -> pnpm install, pnpm check-types, pnpm build
   TypeScript config       -> pnpm check-types, pnpm build
   ```

### SHOULD

1. None

### COULD

1. None

### WANT

1. None

## Docker Environment Verification

### MUST

1. Use the following commands for Docker-based verification:

   ```bash
   docker compose down --volumes --remove-orphans
   docker compose up -d
   docker compose ps
   docker compose logs -f
   curl http://localhost:3000/health
   curl http://localhost:5173
   docker compose down --volumes --remove-orphans
   ```

1. Use the following commands for production Compose verification:

   ```bash
   docker compose -f docker-compose.production.yml up -d
   docker compose -f docker-compose.production.yml down --volumes --remove-orphans
   ```

### SHOULD

1. None

### COULD

1. None

### WANT

1. None

## Configuration File Validation

### MUST

1. Use the following commands to validate config syntax and templates when stack changes occur:

   ```bash
   cat package.json | jq empty
   cat packages/*/package.json | jq empty
   pnpm check-types
   docker compose config
   docker compose -f docker-compose.production.yml config
   test -f sample-development.env && echo "Dev env template OK"
   test -f sample-production.env && echo "Prod env template OK"
   ```

### SHOULD

1. None

### COULD

1. None

### WANT

1. None

## Auto-Discovery

### MUST

1. Confirm available scripts in root and workspace `package.json` files before editing command lists.
1. Check Docker Compose files for service names and ports before adding verification commands.
1. Use local CLI commands, for example:

   ```bash
   rg -n "\"(check-types|lint|test|coverage|build)\"" package.json packages/*/package.json
   rg -n "services:" docker-compose*.yml
   ```

### SHOULD

1. Prefer local inspection over networked tooling unless the user approves remote access.

### COULD

1. None

### WANT

1. None

## Missing Inputs

### MUST

1. Ask the user for any verification steps that are required but not present in workspace scripts, such as Markdown linting or additional QA tooling.
1. Ask the user to confirm whether any health checks or service URLs differ from the defaults listed here.

### SHOULD

1. Clarify whether any verification steps require network access or credentials.

### COULD

1. None

### WANT

1. None

## Approval Gates

### MUST

1. Require user approval before running commands that alter container state, start background dev servers, or install dependencies.

### SHOULD

1. Confirm with the user before running verification steps that may take significant time.

### COULD

1. None

### WANT

1. None

## Related Specs

### MUST

1. `.agents/developer_assistant.md`
1. `.agents/version-control.md`
1. `.agents/qa.md`
1. `docs/stack.md`
1. `docs/testing.md`

### SHOULD

1. None

### COULD

1. None

### WANT

1. None

## Contributor Competencies

### MUST

1. Be able to run workspace scripts and interpret CLI output for failures.
1. Understand when to scope verification to specific packages.

### SHOULD

1. None

### COULD

1. None

### WANT

1. None
