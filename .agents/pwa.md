# PWA Agent Instructions

**Spec-ID:** `pwa::v1`

## Client State Management

### MUST

1. Treat the URL (path plus query parameters) as the durable source of truth for persistent UI state so the PWA remains bookmarkable, shareable, and resilient to reloads.
1. Synchronize transient state through the workspace store defined in `packages/pwa/src/store`, keeping derivations colocated with their feature modules.

### SHOULD

1. Evaluate state placement (URL, global store, local component scope) during feature planning to avoid unnecessary coupling.

### COULD

1. None

### WANT

1. None

## Data Access and Caching

### MUST

1. Follow the shared normalization approach described in `.agents/fullstack.md`, loading collections through the shared data layer before requesting detail queries by identifier.
1. Implement item-level feature components that own their own detail fetching, using `skip` or equivalent flags until a stable identifier is available.
1. Configure the data access layer settings in line with `docs/stack.md`, keeping environment-controlled base URLs documented in that reference.
1. Subscribe to the API event streams defined in `.agents/fullstack.md` and invalidate affected list and detail caches by identifier when events arrive.

### SHOULD

1. Compose selectors or data access hooks within `packages/pwa/src/features` so shared caching logic remains reusable.
1. Shape composed data needed for single-prop consumers (for example, chart payloads) as feature-scoped view models derived from normalized sources before passing them to components.

### COULD

1. Capture presentation-specific shapes (for example, composed top search view models) within the PWA workspace while persisting normalized data in caches.
1. Document widely reused composed view models in the workspace README or `docs/` to help other features adopt them.

### WANT

1. None

## Module Boundaries

### MUST

1. Keep route definitions and page orchestration in `packages/pwa/src/pages`, translating URL parameters into props for downstream features.
1. Encapsulate business flows inside feature modules (`packages/pwa/src/features`), housing data fetching, store wiring, and view composition together.
1. Reserve shared presentational components for `packages/pwa/src/components`, ensuring they remain stateless and receive all data via props.
1. Avoid importing feature state or data hooks directly inside page modules; instead, pass props from pages to features so navigation and business logic stay separated.
1. Mirror the URL hierarchy inside the pages components base folder using per-segment subdirectories and route exports, following the detailed structure documented in `docs/stack.md`.
1. Document new cross-feature utilities or adapters in the workspace README so contributors understand their scope.

### SHOULD

1. Reuse existing feature building blocks before introducing new patterns to maintain consistency across the PWA.

### COULD

1. None

### WANT

1. None

## Tooling and Framework Updates

### MUST

1. Defer to `docs/stack.md` for workspace tooling and update that reference before adopting new frameworks or libraries.

### SHOULD

1. None

### COULD

1. None

### WANT

1. None

## Accessibility and Localization

### MUST

1. Provide meaningful ARIA labels, roles, and keyboard flows for interactive components created within pages or features.
1. Keep copy centralization, localization hooks, and related tooling consistent with `docs/stack.md` so strings remain translation-ready when localization is enabled.

### SHOULD

1. Reuse existing accessibility helpers before inventing new abstractions.

### COULD

1. Perform manual accessibility spot checks (for example, keyboard-only navigation) after shipping interactive features.

### WANT

1. None

## Responsive Layout and Styling

### MUST

1. Favor relative units for typography and spacing to respect user settings and scale across devices.
1. Build layout primitives with flexible CSS patterns (for example, grid or flex utilities) so modules expand to available width while enforcing sane constraints.
1. Keep markup structural and delegate visual styling to CSS modules or utility classes maintained in `packages/pwa/src`.
1. Name CSS classes semantically to reflect business purpose or UI state (for example, `.product-card`, `.is-active`) instead of visual-only descriptors.
1. Apply visual transformations through CSS (for example, `text-transform`) rather than hardcoding presentation in markup or copy.

### SHOULD

1. Apply breakpoint-driven adjustments consistently across features so shared components behave predictably.
1. Keep HTML structural by steering clear of layout-driven markup such as empty `div` spacers or content used solely for visual breaks.

### COULD

1. Capture responsive design guidelines in `docs/` when new layouts introduce reusable patterns.

### WANT

1. None

## Business Data Orchestration

### MUST

1. Treat routes and feature stores as the single source of truth for business data, exposing state changes and derived selectors through those modules instead of duplicating logic in pages or components.
1. Align feature store contracts with API normalization rules so cached data remains consistent across navigations.

### SHOULD

1. Document shared route or store contracts in workspace docs when features depend on them across teams.

### COULD

1. Provide migration notes when reorganizing feature stores or routes so downstream consumers can update quickly.

### WANT

1. None

## Type Safety

### MUST

1. Enforce strict type definitions for components, hooks, and store slices, preferring typed data access hooks and selectors over `any` or implicit inference.
1. Reuse shared domain types from `@swapi-mern/domain` or local feature models to keep API and UI contracts aligned.

### SHOULD

1. Extend local typing helpers when new UI states emerge, ensuring discriminated unions or enums cover the full business workflow.

### COULD

1. Capture complex front-end types in dedicated `types.ts` modules within each feature for reuse.

### WANT

1. None

## Contributor Competencies

### MUST

1. Stay proficient with the client testing frameworks documented in `docs/testing.md` to maintain automated coverage for components, hooks, and data access flows.
1. Apply accessibility (a11y) best practices across features, ensuring semantic markup, ARIA usage, and keyboard support.
1. Monitor and optimize web performance metrics (for example, bundle size, hydration time) during feature work.

### SHOULD

1. Share accessibility and performance checklists in workspace docs when new patterns emerge.

### COULD

1. Collaborate with QA to align coverage expectations and adopt shared testing utilities.

### WANT

1. None

<!-- Future automation (for example, screenshot diffing or interaction recording) can be documented here once adopted. -->
