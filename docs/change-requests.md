# Change Request Guide

**Spec-ID:** `docs-change-requests::v1`

## Purpose

### MUST

1. Define the per-project change request workflow details for this repo.
1. Keep this file aligned with repository templates and CI requirements so agents can auto-discover values before asking users.

### SHOULD

1. None

### COULD

1. None

### WANT

1. None

## Principles

### MUST

1. Use `.github/PULL_REQUEST_TEMPLATE.md` as the baseline structure for change requests in this repo.
1. Use change requests as the review gate before merging to `develop` or `main`.
1. Prefer GitHub CLI (`gh`) for repeatable automation when workflows are documented and approved.

### SHOULD

1. None

### COULD

1. None

### WANT

1. None

## Change Request Metadata

### MUST

1. Document the title format, required description sections, linked issue format, labels, default reviewers, required checks, merge strategy, and draft usage rules for this repo once confirmed.

### SHOULD

1. Align metadata requirements with `.github/PULL_REQUEST_TEMPLATE.md` when present.

### COULD

1. None

### WANT

1. None

## Change Request Content

### MUST

1. Use the required sections from `.github/PULL_REQUEST_TEMPLATE.md` and keep their headings unless the template changes.
1. Include prototype references when UI changes are involved (`docs/prototypes.md`).
1. Include tooling or stack changes with references to `docs/stack.md` and the executed commands from `docs/verification.md`.

### SHOULD

1. None

### COULD

1. None

### WANT

1. None

## Required Checks and Policies

### MUST

1. Document required status checks, required approvals, merge strategy, draft usage rules, and CI retry policy for this repo once confirmed.

### SHOULD

1. Keep required checks aligned with `.github/workflows/` definitions.

### COULD

1. None

### WANT

1. None

## Review and Approval

### MUST

1. Document required reviewers and approval policy for this repo once confirmed.

### SHOULD

1. None

### COULD

1. None

### WANT

1. None

## Merge and Follow-up

### MUST

1. Document merge and follow-up requirements for this repo once confirmed.
1. Record release notes or deployment details in `docs/cicd.md` when applicable.

### SHOULD

1. None

### COULD

1. None

### WANT

1. None

## GH CLI Usage

### MUST

1. Use the following commands as the baseline for change request operations:

   ```bash
   gh pr create --title "<title>" --body-file CHANGE_REQUEST_BODY.md
   gh pr view <number>
   gh pr checks <number>
   ```

### SHOULD

1. None

### COULD

1. None

### WANT

1. None

## Auto-Discovery

### MUST

1. Inspect `.github/PULL_REQUEST_TEMPLATE.md`, `.github/CODEOWNERS`, and `.github/workflows/` to discover required sections, reviewers, and checks.
1. Inspect `.github/copilot-instructions.md` to confirm it points to `AGENTS.md` as the canonical entrypoint.
1. Confirm any repository automation guidance referenced in `docs/tasks-management.md`.
1. Use local CLI commands, for example:

   ```bash
   ls .github
   test -f .github/PULL_REQUEST_TEMPLATE.md && cat .github/PULL_REQUEST_TEMPLATE.md
   test -f .github/copilot-instructions.md && cat .github/copilot-instructions.md
   ls .github/workflows
   ```

### SHOULD

1. None

### COULD

1. None

### WANT

1. None

## Approval Gates

### MUST

1. Document change request approval gates for this repo once confirmed.

### SHOULD

1. Seek confirmation before adopting new change request templates.

### COULD

1. None

### WANT

1. None

## Related Specs

### MUST

1. `docs/verification.md`
1. `docs/tasks-management.md`

### SHOULD

1. None

### COULD

1. None

### WANT

1. None

## Contributor Competencies

### MUST

1. Understand the change request lifecycle and required review checks for this repository.

### SHOULD

1. Be comfortable using GitHub CLI when approved.

### COULD

1. None

### WANT

1. None
