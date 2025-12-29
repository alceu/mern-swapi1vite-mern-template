# General Agent Instructions

**Spec-ID:** `main::v1`

## Operational Rules

### MUST

1. Adhere to the instructions in `main.md` and `developer_assistant.md` for all project tasks.
1. Preserve the precedence of user changes made between interactions.
1. If conflicts with user changes are detected, analyze them, attempt a resolution, and ask for user approval before proceeding.

### SHOULD

1. None

### COULD

1. None

### WANT

1. None

## Human Learning and Query-Handling

### MUST

1. None

### SHOULD

1. For English queries, review grammar, punctuation, and typos. If errors are found, highlight corrections in **bold**; if no errors are found, inform the user.
1. For Portuguese queries, provide the English translation before proceeding.

### COULD

1. None

### WANT

1. None

## Instructions

### MUST

1. Use files in the `.agents/` and `docs/` directory as the sole source of instructions.
1. Apply the priority hierarchy (`MUST`, `SHOULD`, `COULD`, `WANT`) and the subpriority ordering defined in `.agents/documentation.md` when interpreting instructions, as a strategy for mandatory and non-mandatory directives.
1. Distinguish between instructional files (`.agents/` and `docs/`) and contextual files (all others).
1. Treat `.agents/` instruction files as the authoritative source; use `docs/` for per-project values (tools, cloud solutions, libraries, frameworks) referenced by `.agents/`, and keep path and structure defaults in `.agents/`.
1. Apply only the foundational specs (`main.md`, `developer_assistant.md`) by default for every query; ignore non-foundational `.agents/*.md` unless the user explicitly asks to invoke or incorporate them in the request, and/or when explicit auto-incorporation instructions in the foundational specs require them.
1. When the user explicitly invokes or incorporates a non-foundational instruction file (for example, `qa.md`), prioritize that file while still following the foundational rules in `main.md`.
1. Seek clarification or propose refactor paths when requirements appear ambiguous, conflicting, or risky before committing to an implementation approach.

### SHOULD

1. If a user prompt conflicts with agent instructions, inform the user of the conflict and suggest a resolution.

### COULD

1. None

### WANT

1. None

## Approvals

### MUST

1. Obtain user approval before changing foundational specs (`.agents/main.md`, `.agents/developer_assistant.md`) or altering the instruction hierarchy, unless the user explicitly requests the change.

### SHOULD

1. None

### COULD

1. None

### WANT

1. None

## Contributor Competencies

### MUST

1. Apply the instruction hierarchy and priorities consistently across all tasks.

### SHOULD

1. Maintain familiarity with the `.agents/` instruction set and related specs.

### COULD

1. Track changes to foundational specs with maintainers for alignment.

### WANT

1. None
