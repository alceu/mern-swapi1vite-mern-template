# Testing Framework Reference

**Spec-ID:** `docs-testing::v1`

## Purpose

### MUST

1. Document the per-project testing stack, commands, and coverage expectations for each workspace.
1. Keep this file aligned with workspace configs and scripts so agents can auto-discover values before asking users.

### SHOULD

1. None

### COULD

1. None

### WANT

1. None

## Testing Stack

### MUST

1. API testing (`packages/api`): Jest and Supertest; commands `pnpm --filter api test` and `pnpm --filter api coverage`; thresholds in `packages/api/jest.config.cjs`.
1. PWA testing (`packages/pwa`): Vitest with React Testing Library and jsdom; commands `pnpm --filter pwa test` and `pnpm --filter pwa coverage`; thresholds in `packages/pwa/vite.config.ts`.
1. Domain testing (`packages/domain`): Vitest; commands `pnpm --filter domain test` and `pnpm --filter domain coverage` when needed.
1. Workspace coverage: `pnpm coverage` runs API, PWA, and domain coverage with summary output.

### SHOULD

1. Keep framework references aligned with package dependencies.

### COULD

1. None

### WANT

1. None

## Testing Patterns

### MUST

1. Unit tests focus on isolated logic and mock external dependencies.
1. Integration tests exercise multi-layer flows such as controller to service to repository.
1. Component tests use React Testing Library with accessible queries and user interactions.

### SHOULD

1. Use test data fixtures or factories when scenarios repeat across suites.

### COULD

1. None

### WANT

1. None

## Test Execution Workflows

### MUST

1. Use the verification commands in `docs/verification.md` for linting and type checks, then run:

   ```bash
   pnpm --filter pwa test
   pnpm --filter api test
   ```

1. Follow the QA bug resolution workflow from `.agents/qa.md` when fixing defects.

### SHOULD

1. Run coverage commands when acceptance criteria require updated baselines.

### COULD

1. None

### WANT

1. None

## Coverage Baselines

### MUST

1. Maintain coverage thresholds in workspace config files and keep them consistent with agreed baselines.
1. Coverage thresholds for API and PWA may be overridden with `COVERAGE_THRESHOLD` from the environment or `.env`.

### SHOULD

1. Review coverage reports when acceptance criteria reference new coverage goals.

### COULD

1. None

### WANT

1. None

## Docker Environment Testing

### MUST

1. Reset Docker environments before and after testing:

   ```bash
   docker compose down --volumes --remove-orphans
   docker compose up -d
   docker compose down --volumes --remove-orphans
   ```

### SHOULD

1. None

### COULD

1. None

### WANT

1. None

## Auto-Discovery

### MUST

1. Inspect `packages/api/jest.config.cjs`, `packages/pwa/vite.config.ts`, and workspace `package.json` files to confirm frameworks and command scripts.
1. Verify coverage thresholds in the relevant config files before updating this spec.
1. Use local CLI commands, for example:

   ```bash
   rg -n "jest|vitest|supertest|testing-library" packages/*/package.json
   rg -n "coverage" packages/api/jest.config.cjs packages/pwa/vite.config.ts
   ```

### SHOULD

1. Prefer local inspection over networked tooling unless the user approves remote access.

### COULD

1. None

### WANT

1. None

## Missing Inputs

### MUST

1. Ask the user to confirm any missing coverage thresholds, E2E testing plans, or test data seeding requirements not found in the repo.

### SHOULD

1. Clarify which scenarios require manual verification when automated coverage is not yet available.

### COULD

1. None

### WANT

1. None

## Approval Gates

### MUST

1. Require user approval before adding new testing frameworks or expanding CI test scope.

### SHOULD

1. Seek confirmation before enabling new coverage gates that could block merges.

### COULD

1. None

### WANT

1. None

## Related Specs

### MUST

1. `.agents/qa.md`
1. `.agents/api.md`
1. `.agents/pwa.md`
1. `docs/verification.md`

### SHOULD

1. None

### COULD

1. None

### WANT

1. None

## Contributor Competencies

### MUST

1. Be proficient with Jest, Supertest, Vitest, and React Testing Library for the relevant workspaces.
1. Understand how to run and interpret coverage reports.

### SHOULD

1. None

### COULD

1. None

### WANT

1. None
