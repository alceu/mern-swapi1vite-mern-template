# Stack Specification

**Spec-ID:** `stack::v1`

## Purpose

### MUST

1. Document the current workspace technical stack so agents can reason about dependencies and integration points quickly.
1. Provide authoritative references when introducing new tools or evaluating stack changes, keeping details aligned with the active manifests.

### SHOULD

1. None

### COULD

1. None

### WANT

1. None

## Operational Rules

### MUST

1. Keep this spec in sync with active package manifests (for example, each workspace `package.json`) and align with `.agents/documentation.md` requirements.
1. Reference existing specs such as `.agents/main.md`, `.agents/pwa.md`, and `.agents/api.md` instead of restating their mandates.
1. Validate stack updates against current configurations (for example, `docker-compose.yml`, environment templates) and record deviations in project notes or ADRs before updating this file.
1. Flag stack components that require user approval (for example, new infrastructure services) so automation can pause appropriately.

### SHOULD

1. None

### COULD

1. None

### WANT

1. None

## Domain Guidelines

### Web PWA (`packages/pwa`)

#### MUST

1. Build the web client with React 18, React DOM 18, and Vite 5 using ECMAScript modules (`type: "module"`).
1. Manage state with Redux Toolkit, using RTK Query APIs defined under `packages/pwa/src/api` and store setup in `packages/pwa/src/store`.
1. Handle routing with React Router DOM 6 via `createBrowserRouter` and route definitions in `packages/pwa/src/pages`.
1. Compose forms with Formik and validate with Yup for consistent client-side schema enforcement.
1. Style the application with Tailwind CSS (PostCSS + Autoprefixer) and CSS modules, leveraging Vite plugins (`@vitejs/plugin-react`, `vite-plugin-svgr`, `vite-tsconfig-paths`).
1. Configure RTK Query base URLs through environment variables (`VITE_SWAPI_API_URL`, `VITE_SEARCHES_STATS_API_URL`) surfaced in `vite.config.ts` and docker compose.

#### SHOULD

1. Reuse shared domain types from `@swapi-mern/domain` when defining API contracts to avoid drift between client and server models.

#### COULD

1. None

#### WANT

1. None

### API Platform (`packages/api`)

#### MUST

1. Serve the API with Express 4, using TypeScript and `tsx` for development (`pnpm --filter api dev`) and compiling with `tsc` plus `tsc-alias` for builds.
1. Persist data in MongoDB through Mongoose 8 with connection bootstrap in `packages/api/src/index.ts` and environment variables sourced by `dotenv`.
1. Hash credentials with Argon2, issue JSON Web Tokens with `jsonwebtoken`, and enforce input rules through `express-validator`.
1. Run scheduled jobs with `node-cron`, orchestrated via `initTopSearchScheduler` under `packages/api/src/tasks`.
1. Share DTO contracts by consuming `@swapi-mern/domain`, mirroring the structures expected by the PWA.

#### SHOULD

1. Structure controllers, services, tasks, models, and validations by resource (for example, `TopSearch`, `SearchQuery`) to align with `.agents/api.md` guidance.

#### COULD

1. None

#### WANT

1. None

### Shared Packages (`packages/*`)

#### MUST

1. Expose shared DTOs (for example, `Person`, `Film`, `TopSearch`) compiled from TypeScript source under `packages/domain/src`.
1. Build with the package-local `tsc` pipeline and publish artifacts to `dist` consumed by other workspaces via `workspace:*` dependencies.
1. Keep the domain models framework-agnostic so both the API and PWA share a single source of truth.

#### SHOULD

1. None

#### COULD

1. None

#### WANT

1. None

### Testing & QA

#### MUST

1. Execute PWA unit and integration tests with Vitest (`pnpm --filter pwa test`) alongside Testing Library and `jsdom` for DOM simulation.
1. Generate coverage for the PWA with `pnpm --filter pwa coverage` when validating feature completeness.
1. Maintain type safety across workspaces by running `pnpm check-types` (which shells into each package's `tsc --noEmit`).
1. Lint all packages with `pnpm lint`, relying on ESLint 8.57.x and shared TypeScript ESLint tooling.

#### SHOULD

1. Backfill API integration or unit tests in Vitest or Jest when new services, controllers, or schedulers are introduced.

#### COULD

1. None

#### WANT

1. None

### DevOps & Tooling

#### MUST

1. Manage dependencies with the pnpm workspace defined at the repo root, respecting the scripts exposed in the top-level `package.json`.
1. Use TypeScript 5.9.x, ESLint 8.57.x, and Prettier 3.2.x as pinned in each package for compilation, linting, and formatting.
1. Run local environments with Docker Compose (`docker-compose.yml`) to bootstrap MongoDB, the Express API, and the Vite PWA containers.
1. Surface runtime configuration through `.env` files (`packages/api/.env`, `packages/pwa/.env`) and sample templates (`sample-development.env`, `sample-production.env`).
1. Use `concurrently` and workspace scripts (`pnpm dev`, `pnpm build`, `pnpm start`) to coordinate multi-package workflows.

#### SHOULD

1. Capture infrastructure or script changes in `docs/` so stack consumers have up-to-date operational runbooks.

#### COULD

1. None

#### WANT

1. None

## Quality Review

### MUST

1. Verify each stack component here matches the versions declared in workspace manifests before merging stack changes.
1. Update related documentation (for example, `docs/` guidance) and specs when introducing new dependencies or removing existing ones.
1. Describe required verification steps (for example, `pnpm check-types`, `pnpm lint`, `pnpm --filter pwa test`) in change discussions or PR descriptions.

### SHOULD

1. None

### COULD

1. None

### WANT

1. None
