# SDLC Agent Instructions

**Spec-ID:** `sdlc::v1`

## Purpose

### MUST

1. Provide an end-to-end SDLC spine from vision and prototype inputs through delivery and release.
1. Maintain traceability from vision and prototypes to user stories, acceptance criteria, tasks, tests, and releases.
1. Align SDLC guidance with other `.agents/` specs and defer project-specific details to `docs/`.

### SHOULD

1. None

### COULD

1. None

### WANT

1. None

## Vision and Prototype Inputs

### MUST

1. Capture the current product vision, goals, and constraints in `docs/vision.md` before planning work.
1. Register prototype sources, fidelity level, and scope in `docs/prototypes.md` before implementation begins.
1. Confirm each work item references the relevant vision and prototype inputs so scope stays grounded.

### SHOULD

1. Highlight any vision or prototype gaps that block estimation or acceptance criteria definition.

### COULD

1. Track changes to vision or prototype baselines in the related `docs/` references.

### WANT

1. None

## User Stories and Acceptance Criteria

### MUST

1. Write user stories in the format: "as [user type] I [must | should | could | want] [action] so that [purpose | benefit | value]".
1. Define acceptance criteria for every user story and link them to the supporting vision and prototype inputs.
1. Maintain story identifiers and traceability using the work-management workflow described in `docs/tasks-management.md`.

### SHOULD

1. Capture constraints, edge cases, and non-functional requirements alongside acceptance criteria.

### COULD

1. Add story-specific risks or dependencies when they affect delivery sequencing.

### WANT

1. None

## BDD and Estimation

### MUST

1. Translate acceptance criteria into BDD scenarios (`Given/When/Then`) before implementation begins.
1. Assign a function point estimate to each scenario using the shared scale in `.agents/planning.md`.
1. Keep the scenario list and estimates synchronized with the plan as scope evolves.

### SHOULD

1. Capture representative inputs and outputs for each scenario to support test design.

### COULD

1. Reuse scenario archetypes to speed estimation when applicable.

### WANT

1. None

## Delivery Tasks and Traceability

### MUST

1. Decompose each story into tasks that cover development, documentation, testing, version control, change requests, CI/CD, and release steps.
1. Link tasks to their originating stories, acceptance criteria, and BDD scenarios to preserve traceability.
1. Ensure documentation updates reference the authoritative `docs/` sources for vision, prototypes, and delivery workflows.

### SHOULD

1. Maintain a traceability checklist or matrix when multiple stories ship together.

### COULD

1. Capture delivery learnings that can refine future SDLC guidance.

### WANT

1. None

## Delivery Workflow Alignment

### MUST

1. Follow the project workflows defined in `docs/tasks-management.md`, `docs/change-requests.md`, `docs/version-control.md`, and `docs/cicd.md` for work management, change requests, CI/CD, and releases.
1. Use the tooling (including CLI automation) described in the project docs to keep SDLC execution consistent.

### SHOULD

1. Propose updates to the project workflow docs when workflows or tooling evolve.

### COULD

1. Document reusable platform conventions in `docs/` when they improve delivery clarity.

### WANT

1. None

## Definition of Done

### MUST

1. Confirm acceptance criteria are satisfied and mapped to passing tests or validation steps.
1. Verify documentation is updated for user-facing or workflow changes and aligns with `docs/` references.
1. Ensure CI/CD checks and release steps defined in `docs/cicd.md` complete before declaring delivery.

### SHOULD

1. Validate prototype fidelity when relevant and document outcomes in QA notes.

### COULD

1. Capture post-release observations to inform future story sizing.

### WANT

1. None

## Approval Gates

### MUST

1. Require user approval before changing the documented vision, prototype baselines, or acceptance criteria scope.
1. Require user approval before executing history- or remote-altering git commands (`git commit`, `git push`, `git pull`, `git merge`, `git rebase`) or destructive commands.
1. Require user approval before edits that affect files matched by `.gitignore`.
1. Require user approval before release, deployment, or publication steps defined in `docs/cicd.md`.

### SHOULD

1. Escalate for confirmation when SDLC scope expands beyond the agreed stories or estimates.

### COULD

1. None

### WANT

1. None

## Contributor Competencies

### MUST

1. Translate vision and prototypes into user stories, acceptance criteria, and BDD scenarios.
1. Maintain traceability across planning, implementation, QA, and release steps.
1. Apply the project workflows captured in `docs/tasks-management.md`, `docs/change-requests.md`, `docs/version-control.md`, and `docs/cicd.md`.

### SHOULD

1. Maintain familiarity with the project documentation structure and update paths.

### COULD

1. None

### WANT

1. None
