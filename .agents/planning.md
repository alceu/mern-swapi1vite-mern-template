# Planning Agent Instructions

**Spec-ID:** `plan::v1`

## Planning Workflow

### MUST

1. Map every user request to the applicable agent specifications before drafting work, listing each spec by filename to keep ownership traceable.
1. Break the task into ordered steps grouped by workspace or domain so downstream edits follow a predictable sequence.
1. Capture verification commands documented in `docs/verification.md` that will be required before delivery and flag any missing automation.
1. Highlight outstanding questions or ambiguous requirements immediately so they can be resolved before work begins.

### SHOULD

1. Note assumptions alongside the plan and confirm them with the user when feasible.
1. Reference prior related tasks or docs that might accelerate the upcoming work.

### COULD

1. Maintain a running risk log for long-lived efforts, updating it as the plan evolves.

### WANT

1. None

## SDLC Inputs and User Stories

### MUST

1. Record vision inputs from `docs/vision.md` and prototype references from `docs/prototypes.md` before drafting the plan.
1. Capture user stories in the format required by `.agents/sdlc.md` and track them using the work-management workflow in `docs/tasks-management.md`.
1. Define acceptance criteria for each story before translating them into BDD scenarios.

### SHOULD

1. Note stakeholders, dependencies, and constraints that may affect story sequencing.

### COULD

1. Map stories to releases or milestones when the delivery plan spans multiple iterations.

### WANT

1. None

## BDD-Driven Breakdown

### MUST

1. Translate functional goals into explicit BDD scenarios (`Given/When/Then`) before implementation begins.
1. Associate each scenario with the files, specs, acceptance criteria, and verifications it will touch so coverage stays synchronized across layers.
1. Update the plan when new scenarios emerge during implementation, keeping the scenario list authoritative for follow-up work.

### SHOULD

1. Capture acceptance data inputs and expected outputs for each scenario to support automated test creation later.

### COULD

1. Link scenarios to existing regression tests or fixtures that can be reused.

### WANT

1. None

## Function Point Estimation

### MUST

1. Provide a function point estimate for every BDD scenario using a shared scale (`0.5` trivial adjustment, `1` standard change, `2` multi-module change, `3+` extensive cross-cutting work).
1. Document the drivers for the estimate (complexity, integrations, validation rules) so reviewers can evaluate the sizing rationale.
1. Roll up scenario estimates into a total for the task plan and flag when the total exceeds the effort initially discussed.

### SHOULD

1. Compare actual effort against the estimate after delivery and note learnings that could calibrate future sizing.

### COULD

1. Track recurring scenario archetypes (for example, CRUD detail update, caching fix) with baseline function point guidance for quicker sizing.

### WANT

1. None

## Clarification and Hand-off

### MUST

1. Escalate uncertainties, conflicting specs, or suspected refactor opportunities before implementation, proposing options when possible.
1. Summarize the agreed plan, scenarios, and estimates before starting work to confirm alignment with stakeholders.
1. Confirm the plan covers SDLC deliverables (development, documentation, testing, version control, change requests, CI/CD, release) per `.agents/sdlc.md`.

### SHOULD

1. Record clarifications in the task notes or change request description so the history remains visible to later contributors.

### COULD

1. Provide suggested refactor follow-ups when large improvements are identified but out of scope for the current task.

### WANT

1. None

## Approval Gates

### MUST

1. Require user approval before changing agreed story scope, acceptance criteria, or function point estimates.
1. Require user approval before executing history- or remote-altering git commands (`git commit`, `git push`, `git pull`, `git merge`, `git rebase`) or destructive commands.
1. Require user approval before edits that affect files matched by `.gitignore`.

### SHOULD

1. Pause for confirmation when plan changes introduce new milestones or release targets.

### COULD

1. None

### WANT

1. None

## Contributor Competencies

### MUST

1. Translate requirements into BDD scenarios and function point estimates.

### SHOULD

1. Maintain familiarity with verification commands in `docs/verification.md`.

### COULD

1. Capture planning assumptions and risks in task notes when helpful.

### WANT

1. None
