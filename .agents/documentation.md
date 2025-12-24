# Agent Documentation Instructions

**Spec-ID:** `documentation::v1`

## Purpose

### MUST

1. Provide a spec-driven template so every agent instruction file communicates scope, rules, and verification in a predictable format.
1. Enable reuse by future tooling without restructuring the content.

### SHOULD

1. None

### COULD

1. None

### WANT

1. None

## Markdown Structure Checklist

### MUST

1. Keep all agent instructions in `.agents/` using Markdown; do not mix formats across the repo.
1. Use ATX headings (`#`, `##`, `###`) to mirror the spec hierarchy.
1. Wrap command sequences or templates in fenced code blocks with language hints.

### SHOULD

1. Keep ordered lists in the `1.` style to simplify reordering and automated renumbering.
1. Prefer hyphen bullets (`-`) for unordered lists and avoid more than one level of indentation.

### COULD

1. Reserve `*italics*` for clarifications.

### WANT

1. None

## Plan the Spec

### MUST

1. Structure each topic with priority as the final sub-topics (`MUST`, `SHOULD`, `COULD`, `WANT`).
1. Inside each priority sub-topic, order the checklist items by their subpriority so the most critical guidance appears first.
1. Define `MUST` directives as mandatory and non-negotiable instructions that must be followed exactly.
1. Define `SHOULD` for instructions that warrant a warning when the user explicitly authorizes an exception, documenting any approved deviation instead of following them exactly.
1. Capture relevant cross-layer requirements and reference the specs that enforce them so related instructions stay aligned.

### SHOULD

1. Log dependencies on other specs.
1. Avoid redundant instructions by referencing existing specs instead of restating overlapping guidance during planning.

### COULD

1. Define measurable outcomes, guardrails, and required verification steps in a scratch outline.
1. Confirm the spec answers three questions: What does the agent do? Which rules are mandatory? How is compliance verified?

### WANT

1. Collect the agent’s purpose, persona, and scope.

## Write and Review the Spec

### MUST

1. Each topic must conclude with the four priority sub-topics (`MUST`, `SHOULD`, `COULD`, `WANT`).
1. Priority must always be the last subtopics. Use a "None" placeholder for any empty priority.
1. Write instructions in outcome-focused language; prefer checklists over narrative paragraphs.
1. Keep each instruction item pragmatic and concise, near 300 characters; if it becomes long, shorten it by trimming non-essential motivation while preserving clarity, so the rationale remains implicit. If meaning is lost, split the instruction into smaller items without losing intent.
1. Proofread grammar and spelling before committing updates.
1. Explicitly list actions that require user approval so automation can enforce pauses consistently.
1. Within every priority sub-topic, keep the checklist ordered and formatted with Markdown ordered-list markers (for example, `1.`) to preserve canonical numbering.
1. Keep `AGENTS.md` and `.agents/` specs stack-agnostic; relocate stack- or command-specific guidance to the appropriate `docs/` references.
1. Ensure each spec documents the contributor competencies it depends on as the last section, so team members know which skills are required.

### SHOULD

1. Reference foundational specs (for example, `.agents/main.md`) instead of repeating their content; link to shared rules when needed.
1. Assign or reuse spec identifiers (for example, `Spec-ID: documentation::v1`) so downstream tools can reference the document.
1. Revisit the spec when upstream files change, updating links and requirements to stay aligned.
1. Summarize spec changes in PR descriptions (what changed, why, and how it was verified) for audit trails.
1. Remove obsolete mandates entirely; migration history belongs in ADRs or commit messages, not the live spec.

### COULD

1. Use cross-links to related specs (`[Versioning](./versioning.md)`) when additional context is necessary.
1. Validate that heading order, list styles, and spec identifiers make the file straightforward to parse programmatically.
1. Ensure instructions are actionable without relying on institutional knowledge; link to context documents when broader background is helpful.

### WANT

1. None

## Documentation Stack

### MUST

1. Author and maintain the repository stack reference at `docs/stack.md`, capturing package-level tooling, scripts, and verification flows specific to this project.
1. Cross-check every update against active manifests (package manifests, workspace configurations, type system configs) and infrastructure blueprints (container orchestration files, environment templates) documented in `docs/stack.md` before publishing changes.
1. Record required verification commands documented in `docs/verification.md` whenever `docs/stack.md` changes so reviewers can confirm compatibility.
1. Link back to governing specs (for example, `.agents/main.md`, `.agents/api.md`, `.agents/pwa.md`) rather than duplicating their mandates, keeping `docs/stack.md` focused on project specifics.

### SHOULD

1. Capture expected environment variables, path aliases, and cross-package dependencies so agents can trace configuration impacts quickly.
1. Reference supporting runbooks or ADRs in `docs/` when stack changes need deeper operational context.

### COULD

1. Include change history notes summarizing stack evolutions to accelerate onboarding.

### WANT

1. None

## Contributor Competencies

### MUST

1. Apply spec-writing conventions to keep instructions consistent, testable, and easy to audit.

### SHOULD

1. Maintain familiarity with Markdown and documentation tooling used in this repository.

### COULD

1. Cross-check specs against related files to avoid duplicated or conflicting guidance.

### WANT

1. None
