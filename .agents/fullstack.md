# Fullstack Agent Instructions

**Spec-ID:** `fullstack::v1`

## Modular Architecture

### MUST

1. Scope cross-cutting features across the API (`packages/api`), PWA (`packages/pwa`), and shared domain models (`packages/domain`) to maintain aligned contracts.
1. Apply the path aliases defined in the root and workspace type system configuration documented in `docs/stack.md` to avoid brittle relative imports.
1. Use the workspace aliases (`@api/...`, `@pwa/...`) for internal modules instead of `../`-style relative paths so imports remain stable during refactors.
1. Keep data contracts synchronized with the shared DTOs defined in `packages/domain/src`, updating that workspace first when new fields are introduced.

### SHOULD

1. Prefer additional alias or absolute imports when available to keep modules free of cascading `../` chains.
1. Reuse established pagination and filtering conventions when adding list endpoints or client views so fullstack flows remain predictable.

### COULD

1. Capture new architectural patterns in `docs/` when multiple teams begin adopting them.

### WANT

1. None

## Data Normalization and Caching Strategy

### MUST

1. Adhere to the full-stack data normalization and caching strategy.
1. Refer to `api.md` and `pwa.md` for detailed implementation instructions.
1. Load collections first to capture stable identifiers, then hydrate individual records through detail endpoints so caches stay normalized across layers.
1. Chain dependent requests with conditional or skipped queries until the required identifier is available, avoiding assumptions about nested document payloads.
1. Prevent UI or API responses from binding to mutable nested properties; rely on identifiers to retrieve secondary information when needed.

### SHOULD

1. None

### COULD

1. None

### WANT

1. None

## Debugging and Logging Hygiene

### MUST

1. Review `console.debug` and other debug statements during feature work, removing them or gating them behind environment checks before shipping.
1. Keep production logging limited to actionable info and errors, avoiding verbose debug output outside development.

### SHOULD

1. Prefer centralized logging helpers when debug output needs to be toggled or filtered across workspaces.

### COULD

1. Capture recurring debug workflows in `docs/` if teams rely on them.

### WANT

1. None

## Naming Conventions

### MUST

1. Avoid abbreviations for variable names, class names, or directory names; use descriptive, full-word names (for example, **good**: `userProfile`, `AuthenticationService`, `components`; **bad**: `usrProf`, `AuthSvc`, `comps`).

### SHOULD

1. Do not repeat the layer name in a filename because the directory already provides this context (for example, **good**: `controllers/Users.ts`, `services/Auth.ts`; **bad**: `controllers/UsersController.ts`, `services/AuthService.ts`).

### COULD

1. None

### WANT

1. None

## Contributor Competencies

### MUST

1. Understand Git workflows that support coordinated backend and frontend deliveries, including rebasing and release branch hygiene.
1. Navigate the project’s CI/CD pipelines to validate cross-workspace builds, tests, and deployments.
1. Evaluate performance implications across API and PWA layers when introducing new data flows or normalization rules.

### SHOULD

1. Share lessons learned from CI/CD or performance tuning in `docs/` so patterns scale across teams.

### COULD

1. Pilot improvements to developer tooling (for example, shared scripts) that streamline cross-stack verification.

### WANT

1. None
