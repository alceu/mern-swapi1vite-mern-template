# Repository Stack Reference

**Spec-ID:** `docs-stack::v1`

## Purpose

### MUST

1. Capture the per-project stack values (tooling, services, workspace layout, and verification hooks) referenced by `.agents/*` specs.
1. Keep this file aligned with manifests, configs, and Compose files so agents can auto-discover values before asking users.

### SHOULD

1. None

### COULD

1. None

### WANT

1. None

## Monorepo Overview

### MUST

1. Package management uses pnpm workspaces with shared config in `package.json`, `pnpm-workspace.yaml`, and `tsconfig.base.json`.
1. Source language is TypeScript; confirm the exact version from workspace manifests.
1. Runtime configuration uses `sample-development.env` and `sample-production.env` as templates.
1. Docker Compose (`docker-compose.yml`, `docker-compose.production.yml`) orchestrates MongoDB, the API, and the PWA services.

### SHOULD

1. None

### COULD

1. None

### WANT

1. None

## Workspace Packages

### MUST

1. API workspace (`packages/api`): Express 4 HTTP server, Mongoose 8 ODM, node-cron for scheduled tasks, `tsx` for development, `tsc` plus `tsc-alias` for production builds, Argon2 and JWT for auth when enabled, file layout per `.agents/api.md`.
1. PWA workspace (`packages/pwa`): React 18 with Vite 5, Redux Toolkit with RTK Query, React Router DOM 6, Tailwind CSS plus CSS modules, environment variables `VITE_SWAPI_API_URL` and `VITE_SEARCHES_STATS_API_URL`.
1. Domain workspace (`packages/domain`): shared DTOs and types exported via `@swapi-mern/domain` for API and PWA contract alignment.
1. Testing frameworks per workspace are defined in `docs/testing.md`.

### SHOULD

1. Keep workspace descriptions aligned with their `package.json` dependencies.

### COULD

1. None

### WANT

1. None

## Type System and Module Conventions

### MUST

1. Path aliases: `@api/*` in `packages/api/tsconfig.json`, `@pwa/*` in `packages/pwa/tsconfig.json`, and `@swapi-mern/domain` in the domain package.
1. Sync alias changes across TypeScript, ESLint, Jest/Vitest, and Vite configs.
1. Record alias changes here and in `.agents/fullstack.md`.

### SHOULD

1. None

### COULD

1. None

### WANT

1. None

## Environment and Configuration

### MUST

1. Use the following command to start API and PWA concurrently in development:

   ```bash
   pnpm dev
   ```

1. For container-based verification, run the cleanup command from `docs/verification.md` before and after using Docker.
1. Keep env templates aligned with service expectations in Compose and application configs.
1. PWA base URLs are configured via `VITE_SWAPI_API_URL` and `VITE_SEARCHES_STATS_API_URL`.

### SHOULD

1. Keep env template values consistent across development and production samples unless explicitly documented.

### COULD

1. None

### WANT

1. None

## Tooling and Automation

### MUST

1. CI uses GitHub Actions; record workflow names and required checks in `docs/cicd.md`.
1. The coverage workflow runs `pnpm coverage` on push and change requests, if configured in `.github/workflows/`.

### SHOULD

1. None

### COULD

1. None

### WANT

1. None

## Testing and Quality Gates

### MUST

1. Use the following verification commands as the project baseline:

   ```bash
   pnpm check-types
   pnpm lint
   pnpm coverage
   pnpm --filter pwa test
   pnpm --filter api test
   pnpm --filter pwa coverage
   pnpm --filter api coverage
   ```

1. Run only the commands scoped to the affected workspaces as defined in `docs/verification.md`.

### SHOULD

1. None

### COULD

1. None

### WANT

1. None

## Data Architecture

### MUST

1. Collection endpoints return identifier-centric `items` arrays plus calculated metadata; detail endpoints return full documents.
1. RTK Query maintains normalized cache, and cache invalidation uses identifier-based updates and API event streams.
1. API base URLs for the PWA use `VITE_SWAPI_API_URL` and `VITE_SEARCHES_STATS_API_URL`.

### SHOULD

1. Keep normalization rules aligned with `.agents/fullstack.md`.

### COULD

1. None

### WANT

1. None

## Change Checklist

### MUST

1. Compare proposed updates against `package.json` files, `pnpm-workspace.yaml`, `tsconfig*.json`, `docker-compose*.yml`, and env templates before editing this spec.

### SHOULD

1. None

### COULD

1. None

### WANT

1. None

## Auto-Discovery

### MUST

1. Inspect `package.json`, `pnpm-workspace.yaml`, `tsconfig.base.json`, and `packages/*/package.json` to confirm tooling, versions, and scripts.
1. Inspect `docker-compose.yml`, `docker-compose.production.yml`, and env templates to confirm service topology and configuration.
1. Inspect `packages/api` and `packages/pwa` configs to confirm framework versions and build outputs.
1. Use local CLI commands only, for example:

   ```bash
   cat package.json
   cat packages/api/package.json
   cat packages/pwa/package.json
   rg "VITE_" sample-development.env sample-production.env
   ```

### SHOULD

1. Prefer local inspection over networked lookups unless the user approves remote access.

### COULD

1. None

### WANT

1. None

## Missing Inputs

### MUST

1. Ask the user to confirm any stack value that cannot be verified locally, such as required Node or pnpm versions, environment-specific overrides, or new services not present in Compose.

### SHOULD

1. Clarify any ambiguity about build output locations when config files do not specify them.

### COULD

1. None

### WANT

1. None

## Approval Gates

### MUST

1. Require user approval before changing documented stack values, adding or removing services, or renaming environment variable keys.

### SHOULD

1. Seek confirmation before altering data normalization or caching strategy.

### COULD

1. None

### WANT

1. None

## Related Specs

### MUST

1. `.agents/documentation.md`
1. `.agents/fullstack.md`
1. `.agents/api.md`
1. `.agents/pwa.md`
1. `docs/testing.md`
1. `docs/verification.md`

### SHOULD

1. None

### COULD

1. None

### WANT

1. None

## Contributor Competencies

### MUST

1. Understand pnpm workspaces, TypeScript configuration, and Docker Compose workflows.
1. Be able to trace build, test, and runtime settings across the repo.

### SHOULD

1. None

### COULD

1. None

### WANT

1. None
