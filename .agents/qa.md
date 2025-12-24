# QA Agent Instructions

**Spec-ID:** `qa::v1`

## Bug Resolution Workflow

When a request describes errors or undesired behaviors and asks for a fix.

### MUST

1. Add a failing test in the affected workspace that captures the reported behavior using the testing framework documented in `docs/testing.md`.
1. Run the package-level test command documented in `docs/verification.md` to confirm the failure reproduces before applying fixes.
1. Implement the code change that resolves the failing scenario, keeping implementations aligned with `.agents/api.md` and `.agents/pwa.md` as applicable.
1. Re-run the same test command to verify the new behavior passes alongside existing suites.
1. When the defect spans multiple layers (for example, API plus PWA), repeat the add-test → reproduce → fix → verify cycle in each impacted workspace before closing the issue.
1. Reset any running container environments using the cleanup command documented in `docs/verification.md` before executing reproduction or verification commands to avoid stale state.

### SHOULD

1. Prefer the smallest effective test scope, escalating from unit to integration coverage only when the discrepancy remains unresolved.
1. Document manual reproduction steps in the issue or PR description if an automated harness is not yet available for the affected area.
1. Run the relevant coverage command documented in `docs/verification.md` when fixes touch instrumentation or when acceptance criteria call for updated coverage baselines.

### COULD

1. Introduce shared fixtures or utilities in the `packages/domain` workspace when a regression touches cross-package DTOs.

### WANT

1. None

## Future E2E Readiness

Guidance for introducing automated visual or end-to-end regression suites once the project adopts them.

### MUST

1. Document proposed tooling, required environment variables, and execution commands in this section before enabling the suite in CI or release workflows.
1. Align new automation dependencies with `docs/stack.md`, ensuring each package `package.json` declares the necessary libraries and scripts.

### SHOULD

1. Prototype new automation in isolated branches and capture outcomes under `docs/qa/` before enforcing runs on shared branches.

### COULD

1. Reuse findings from prototype runs to establish coding standards or page-object conventions for future contributors.

### WANT

1. None

## Debugging Workflow

### MUST

1. Begin every debugging session by running the container cleanup command documented in `docs/verification.md` to guarantee clean containers, networks, and volumes before launching services.
1. Mirror BDD scenarios from `.agents/plan.md` when reproducing defects so traced expectations stay aligned with automated coverage.

### SHOULD

1. Capture logs or traces that connect the failing BDD scenario to the observed runtime behavior before applying fixes.

### COULD

1. Maintain a shared checklist of recurring debugging steps that link back to the associated specs for quick reference.

### WANT

1. None

## Prototype Fidelity Validation

When an issue references mismatches between the implementation and the approved prototype.

### MUST

1. Collect the approved design reference (for example, Figma frame URL or design doc) and document the target UI state in the task notes.
1. Capture the current implementation via screenshots or screen recordings that highlight the reported deviation.
1. Enumerate the UI deltas (layout, spacing, copy, interactions) in the fix plan, referencing the exact components or styles to adjust.
1. Apply the fix and gather updated captures alongside notes confirming the UI now matches the reference.
1. Store the before/after evidence in the issue, PR, or a `docs/qa/` note so future regressions can reuse the investigation context.

### SHOULD

1. Note any environmental prerequisites (seed data, route params, environment variables) necessary to reproduce the prototype state so the fix remains repeatable.
1. Define the verification command or manual steps required to revisit the view after changes ship.

### COULD

1. Store comparison artifacts (for example, annotated screenshots or CSS audit notes) alongside QA documentation when historical reference is helpful.
1. Pilot automated visual or end-to-end tooling documented in `docs/testing.md` in an experiment branch before formal adoption.

### WANT

1. None

## Contributor Competencies

### MUST

1. Master the testing frameworks documented in `docs/testing.md` to write, extend, and debug automated coverage.
1. Understand CI/CD verification gates so QA workflows integrate with pipelines and block regressions effectively.

### SHOULD

1. Track accessibility and performance considerations raised during QA and route them to the owning specs.

### COULD

1. Document reusable troubleshooting recipes in `docs/qa/` to speed future investigations.

### WANT

1. None
