# Prototype Sources

**Spec-ID:** `docs-prototypes::v1`

## Purpose

### MUST

1. Record approved prototypes and design references that define acceptance criteria for UI work.
1. Keep this file aligned with `docs/vision.md` and `.agents/sdlc.md`.

### SHOULD

1. None

### COULD

1. None

### WANT

1. None

## Prototype Inventory

### MUST

1. Maintain the prototype inventory in the table below and keep each row complete:

   ```text
   | Prototype ID | Link | Fidelity | Scope | Status | Notes |
   | --- | --- | --- | --- | --- | --- |
   | proto-001 |  | low |  | proposed |  |
   ```

### SHOULD

1. Use unique, stable identifiers for each prototype.

### COULD

1. None

### WANT

1. None

## Fidelity Levels

### MUST

1. Low: wireframes or sketches that define layout intent.
1. Medium: structured UI with baseline interactions.
1. High: production-ready visuals and interaction details.

### SHOULD

1. None

### COULD

1. None

### WANT

1. None

## Usage Guidance

### MUST

1. Reference the prototype ID in related user stories and acceptance criteria.
1. Capture deviations and approvals before implementation.
1. Update this document when prototypes are superseded or deprecated.

### SHOULD

1. None

### COULD

1. None

### WANT

1. None

## Auto-Discovery

### MUST

1. Check `docs/vision.md`, `docs/queries.md`, and issue descriptions for prototype identifiers already in use.
1. Use local CLI commands, for example:

   ```bash
   rg -n "proto-|prototype|figma" docs -g "*.md"
   ```

### SHOULD

1. Prefer local inspection over networked tooling unless the user approves remote access.

### COULD

1. None

### WANT

1. None

## Missing Inputs

### MUST

1. Ask the user to provide missing prototype links, scope descriptions, fidelity levels, and approval status when they are not documented locally.

### SHOULD

1. Confirm whether any prototype references are restricted or require access credentials.

### COULD

1. None

### WANT

1. None

## Approval Gates

### MUST

1. Require user approval before adding, removing, or updating approved prototype references.

### SHOULD

1. Seek confirmation before marking a prototype as deprecated.

### COULD

1. None

### WANT

1. None

## Related Specs

### MUST

1. `.agents/sdlc.md`
1. `docs/vision.md`

### SHOULD

1. None

### COULD

1. None

### WANT

1. None

## Contributor Competencies

### MUST

1. Be able to interpret prototype fidelity expectations and translate them into acceptance criteria.

### SHOULD

1. None

### COULD

1. None

### WANT

1. None
