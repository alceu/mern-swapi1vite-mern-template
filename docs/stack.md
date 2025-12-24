# Repository Stack Reference

This guide captures the active tooling across the MERN SWAPI template so agents and contributors can reason about dependencies, environments, and verification flows without re-reading every spec.

## How to Use This Document

- Follow the authoring rules in `.agents/documentation.md`, especially the "Documentation Stack" section, when updating this file.
- Treat this as the project-facing view; cross-link to `.agents/*.md` files for governance detail instead of duplicating mandates.
- Validate any edits against the manifests and infrastructure files listed in the change checklist below before merging.

## Monorepo Overview

- Package management uses pnpm workspaces with shared configuration in `package.json`, `pnpm-workspace.yaml`, and `tsconfig.base.json`.
- Source language is TypeScript 5.9.x across packages; compiled output lands under each package’s `build/` directory.
- Runtime configuration flows through environment files derived from `sample-development.env` and `sample-production.env`.
- Docker Compose definitions (`docker-compose.yml`, `docker-compose.production.yml`) orchestrate MongoDB, the Express API, and the Vite PWA containers.

## Workspace Packages

### API (`packages/api`)

- **Framework**: Express 4 HTTP server with middleware-based request processing
- **Database**: MongoDB accessed via Mongoose 8 ODM
- **Scheduled Tasks**: node-cron for periodic jobs (see `src/tasks/TopSearch.ts`)
- **Build**: TypeScript compiled with `tsx` in development, `tsc` + `tsc-alias` for production
- **Security**: Argon2 for password hashing, JWT for token issuance (enable via env toggles)
- **File Structure**: Lowercase folders per `.agents/api.md` (`controllers`, `services`, `routes`, `tasks`, `validations`)
- **Testing**: Jest + Supertest (see `docs/testing.md`)

### PWA (`packages/pwa`)

- **Framework**: React 18 with hooks and concurrent rendering
- **Build Tool**: Vite 5 for fast HMR and optimized production builds
- **State Management**: Redux Toolkit with RTK Query for server state caching
- **Routing**: React Router DOM 6 with segment-based page organization under `src/pages/*`
- **Styling**: Tailwind CSS utility-first framework with CSS modules
- **Environment**: `VITE_SWAPI_API_URL`, `VITE_SEARCHES_STATS_API_URL` for API base URLs
- **Testing**: Vitest + React Testing Library + jsdom (see `docs/testing.md`)

## Type System & Module Conventions

- **Language**: TypeScript 5.9.x with strict mode enabled across all workspaces
- **Path Aliases**:
  - `@api/*` — API internal imports (defined in `packages/api/tsconfig.json`)
  - `@pwa/*` — PWA internal imports (defined in `packages/pwa/tsconfig.json`)
  - `@swapi-mern/domain` — Shared DTOs (imported by both API and PWA)
- **Build**: `tsc` + `tsc-alias` for API compilation, Vite handles PWA transpilation
- **Config Sync**: Mirror alias updates in ESLint, Vitest/Jest, ts-node, and Vite configs
- **Change Protocol**: Record any alias changes in `.agents/fullstack.md` and update this document

## Path & Module Conventions

- API imports: use the `@api/*` alias defined in `packages/api/tsconfig.json`; mirror updates in ESLint, Vitest/Jest, and ts-node configs when alias paths change.
- PWA imports: use the `@pwa/*` alias configured in `packages/pwa/tsconfig.json`; ensure Vite (`vite.config.ts`) and Vitest respect any adjustments.
- Shared models: import via `@swapi-mern/domain` to guarantee API and PWA stay in sync.
- Record any alias changes in `.agents/fullstack.md` and update this document accordingly.

## Environments & Configuration

- Default development: run `pnpm dev` to start API + PWA concurrently (uses `concurrently` under the hood).
- Docker-first workflows: `docker-compose.yml` starts MongoDB, the API, and the PWA; always run `docker compose down --volumes --remove-orphans` before and after verification per `.agents/developer_assistant.md`.
- Environment templates list required variables; keep `sample-development.env` and `sample-production.env` aligned with actual service expectations.

## Tooling & Automation

- GitHub Actions coverage workflow runs `pnpm coverage` on push and change requests.

## Testing & Quality Gates

See `docs/testing.md` for framework details and `docs/verification.md` for command reference.

- **Type Safety**: `pnpm check-types` (required default verification step)
- **Linting**: `pnpm lint` to enforce workspace-wide rules (ESLint 8.57.x + Prettier 3.2.x)
- **Workspace Coverage**: `pnpm coverage` (API + PWA summary output)
- **PWA Tests**: `pnpm --filter pwa test` (Vitest + React Testing Library + jsdom)
- **PWA Coverage**: `pnpm --filter pwa coverage`
- **API Tests**: `pnpm --filter api test` (Jest + Supertest)
- **API Coverage**: `pnpm --filter api coverage`

## Change Checklist

1. Compare proposed updates against:
   - `package.json`, package-level `package.json` files

## Data Architecture

### Normalization Strategy

- **Collection Endpoints**: Return arrays of identifiers plus calculated metadata (not full documents)
- **Detail Endpoints**: Return complete documents referenced by ID
- **Client Caching**: RTK Query maintains normalized cache with automatic refetching
- **Cache Invalidation**: API event streams trigger identifier-based cache updates
- **Base URLs**: `VITE_SWAPI_API_URL` and `VITE_SEARCHES_STATS_API_URL` environment variables

See `.agents/fullstack.md` for cross-layer normalization rules and `.agents/pwa.md` for client caching patterns. for API, Vite handles PWA transpilation

### Testing Frameworks

See `docs/testing.md` for comprehensive testing stack details:

- API: Jest + Supertest
- PWA: Vitest + React Testing Library + jsdom
- E2E: Playwright (future adoption)

## Related Specifications

- `.agents/main.md` — global agent mandates
- `.agents/documentation.md` — documentation authoring rules
- `.agents/api.md`, `.agents/pwa.md`, `.agents/fullstack.md` — layer-specific governance
- `docs/testing.md` — testing frameworks and patterns
- `docs/verification.md` — verification commands and workflows
- `docs/pending-agents-instructions.md`, `docs/pending-app-instructions.md` — staging areas for upcoming spec updates

```sh
# Default verification bundle after stack edits
# See docs/verification.md for complete command reference
pnpm lint
pnpm check-types
pnpm --filter pwa test   # when front-end behaviour changes
pnpm --filter api test   # add once API test suites land
```
