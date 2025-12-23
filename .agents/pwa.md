# PWA Agent Instructions

**Spec-ID:** `pwa::v1`

## Client State Management

### MUST

1. Treat the URL (path plus query parameters) as the durable source of truth for persistent UI state so the PWA remains bookmarkable, shareable, and resilient to reloads.
1. Synchronize transient state through the workspace store defined in `packages/pwa/src/store`, keeping derivations colocated with their feature modules.

### SHOULD

1. Evaluate state placement (URL, global store, local component scope) during feature planning to avoid unnecessary coupling.

### COULD

1. Expose selectors and action creators via the feature entry points so consumers avoid deep imports.

### WANT

1. None

## Data Access and Caching

### MUST

1. Follow the shared normalization approach described in `.agents/fullstack.md`, fetching collection endpoints first and loading detail queries by identifier.
1. Configure data-layer settings in line with `.agents/stack.md`, keeping environment-controlled base URLs documented in that spec.
1. Subscribe to the API event streams defined in `.agents/fullstack.md` and invalidate affected list and detail caches by identifier when events arrive.

### SHOULD

1. Compose selectors or query hooks within `packages/pwa/src/features` so shared caching logic remains reusable.
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
1. Mirror the URL hierarchy inside the pages components base folder using per-segment subdirectories and route exports, following the detailed structure documented in `.agents/stack.md`.
1. Document new cross-feature utilities or adapters in the workspace README so contributors understand their scope.

### SHOULD

1. Reuse existing feature building blocks before introducing new patterns to maintain consistency across the PWA.

### COULD

1. Promote widely adopted feature utilities into shared helper modules once multiple teams rely on them.

### WANT

1. None

## Accessibility and Localization

### MUST

1. Provide meaningful ARIA labels, roles, and keyboard flows for interactive components created within pages or features.
1. Keep copy centralization, localization hooks, and related tooling consistent with `.agents/stack.md` so strings remain translation-ready when localization is enabled.

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

### SHOULD

1. Apply breakpoint-driven adjustments consistently across features so shared components behave predictably.
1. Name CSS classes semantically to describe business purpose or UI state (for example, `.product-card`, `.is-active`) rather than appearance-only descriptors (for example, `.red-text`).
1. Handle all presentation exclusively via CSS, avoiding HTML or text hacks (for example, using `text-transform: uppercase;` instead of writing uppercase content directly).
1. Keep HTML structural by steering clear of layout-driven markup such as empty `div` spacers or content used solely for visual breaks.

### COULD

1. Capture responsive design guidelines in `docs/` when new layouts introduce reusable patterns.

### WANT

None

<!-- Future automation (for example, screenshot diffing or interaction recording) can be documented here once adopted. -->
