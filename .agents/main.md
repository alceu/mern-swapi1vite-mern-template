# General Agent Instructions

**Spec-ID:** `main::v1`

## Operational Rules

### MUST

1. Adhere to the instructions in `main.md` and `developer_assistant.md` for all project tasks.
1. Preserve user changes made between interactions.
1. If conflicts with user changes are detected, analyze them, attempt a resolution, and ask for user approval before proceeding.

### SHOULD

None

### COULD

None

### WANT

None

## Human Learning and Query-Handling

### MUST

None

### SHOULD

1. For English queries, review grammar, punctuation, and typos. If errors are found, highlight corrections in **bold**; if no errors are found, inform the user.
1. For Portuguese queries, provide the English translation before proceeding.

### COULD

None

### WANT

None

## Instructions

### MUST

1. Use files in the `.agents/` directory as the sole source of instructions.
1. Apply the priority hierarchy (`MUST`, `SHOULD`, `COULD`, `WANT`) and the subpriority ordering defined in `.agents/documentation.md` when interpreting instructions, as mandatory and non-mandatory directives strategy.
1. Distinguish between instructional files (`.agents/`) and contextual files (all others).
1. Prioritize guidelines from specific instruction files (for example, `developer_assistant.md`) when a query implies them, while still following the rules in `main.md`.

### SHOULD

1. If a user prompt conflicts with agent instructions, inform the user of the conflict and suggest a resolution.

### COULD

None

### WANT

None
