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
- Express 4 service written in TypeScript, executed with `tsx` in development and compiled via `tsc` + `tsc-alias` for builds.
- MongoDB access provided by Mongoose 8; scheduled tasks run through `node-cron` (see `src/tasks/TopSearch.ts`).
- DTO contracts consumed from `@swapi-mern/domain` keep server/client payloads aligned.
- File layout expectations match `.agents/api.md`: lowercase folders for runtime loaders (`controllers`, `services`, `routes`, `tasks`, `validations`).
- Authentication stack is prepared for Argon2 hashing and JWT issuance; enable via env toggles when security requirements arrive.

### PWA (`packages/pwa`)
- React 18 + Vite 5 front-end with Redux Toolkit and RTK Query for state and API access.
- Routing handled with React Router DOM 6, assembled in `src/pages/index.ts` with route segment directories under `src/pages/*`.
- Styling combines Tailwind CSS (configured via `tailwind.config.cjs` and `postcss.config.cjs`) with CSS modules.
- Environment variables (`VITE_SWAPI_API_URL`, `VITE_SEARCHES_STATS_API_URL`) feed the RTK Query base URLs and must be surfaced in Docker Compose services.

### Domain (`packages/domain`)
- Shared TypeScript DTOs (`Film`, `Person`, `Search`, `TopSearch`) distributed through the workspace using `workspace:*` dependencies.
- Keep models framework-agnostic so both API and PWA can consume them without additional adapters.

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
- Root scripts: `pnpm dev`, `pnpm build`, `pnpm lint`, `pnpm check-types` (aggregates `tsc --noEmit` across packages).
- Package scripts: `pnpm --filter api dev`, `pnpm --filter pwa dev`, `pnpm --filter domain build` enable focused workflows.
- Formatting/Linting: ESLint 8.57.x and Prettier 3.2.x pinned per package; reference `.eslintrc` variants for shared rules.

## Testing & Quality Gates
- Type safety: `pnpm check-types` (required default verification step).
- Client coverage: `pnpm --filter pwa test` and optionally `pnpm --filter pwa coverage` (Vitest + Testing Library + jsdom).
- API tests: add suites via Vitest/Jest as features expand; follow `.agents/api.md` for structure and update this list when commands land.
- Linting: `pnpm lint` to enforce workspace-wide rules.

## Change Checklist
1. Compare proposed updates against:
   - `package.json`, package-level `package.json` files
   - `pnpm-workspace.yaml`
   - `tsconfig.base.json` plus package-specific `tsconfig*.json`
   - `docker-compose.yml`, `docker-compose.production.yml`
   - `sample-development.env`, `sample-production.env`
2. Update cross-links in `.agents/*.md`, `README.md`, and other docs if stack responsibilities shift.
3. Run verification commands relevant to the change (minimum: `pnpm lint` and `pnpm check-types`; include package tests as appropriate).
4. Note follow-up work or approvals (for example, infrastructure additions) in the PR description or docs runbooks.

## Related Specifications
- `.agents/main.md` — global agent mandates
- `.agents/documentation.md` — documentation authoring rules
- `.agents/api.md`, `.agents/pwa.md`, `.agents/fullstack.md` — layer-specific governance
- `docs/pending-agents-instructions.md`, `docs/pending-app-instructions.md` — staging areas for upcoming spec updates

```sh
# Default verification bundle after stack edits
pnpm lint
pnpm check-types
pnpm --filter pwa test   # when front-end behaviour changes
pnpm --filter api test   # add once API test suites land
```
