# Change Request Guide

**Spec-ID:** `docs-change-requests::v1`

## Purpose

### MUST

1. Define the per-project change request workflow that complements `.agents/change_requests.md`.
1. Keep this file aligned with repository templates and CI requirements so agents can auto-discover values before asking users.

### SHOULD

1. None

### COULD

1. None

### WANT

1. None

## Principles

### MUST

1. Use change requests as the review gate before merging to `develop` or `main`.
1. Prefer GitHub CLI (`gh`) for repeatable automation when workflows are documented and approved.
1. Keep change request status synchronized with related issues in `docs/tasks-management.md`.

### SHOULD

1. None

### COULD

1. None

### WANT

1. None

## Change Request Metadata

### MUST

1. Define the title format, required description sections, linked issue format, labels, and default reviewers in this section once confirmed.

### SHOULD

1. Align metadata requirements with `.github/PULL_REQUEST_TEMPLATE.md` when present.

### COULD

1. None

### WANT

1. None

## Change Request Content

### MUST

1. Link the originating issue and reference acceptance criteria and BDD scenarios.
1. Summarize scope, motivation, and verification steps executed from `docs/verification.md`.
1. Include prototype references when UI changes are involved (`docs/prototypes.md`).

### SHOULD

1. None

### COULD

1. None

### WANT

1. None

## Required Checks and Policies

### MUST

1. Document required status checks, required approvals, merge strategy, draft usage rules, and CI retry policy for this repo.

### SHOULD

1. Keep required checks aligned with `.github/workflows/` definitions.

### COULD

1. None

### WANT

1. None

## Review and Approval

### MUST

1. Request reviews aligned to the owning area or code ownership.
1. Ensure required checks pass before merge.
1. Resolve review threads with documented evidence or test updates.

### SHOULD

1. None

### COULD

1. None

### WANT

1. None

## AI Review (GitHub Copilot)

### MUST

1. Request a GitHub Copilot change-request review for every feature branch once the change request is ready for review.
1. Keep `.github/copilot-instructions.md` minimal and focused on pointing to `AGENTS.md` as the canonical entrypoint.
1. Use `.github/copilot-instructions.md` to include a short change-request review query that invokes the foundational, version-control, and change-request instruction files.
1. Avoid duplicating detailed instructions in `.github/copilot-instructions.md`; centralize guidance in `AGENTS.md` and the referenced `.agents/` and `docs/` files instead.

### SHOULD

1. None

### COULD

1. None

### WANT

1. None

## Merge and Follow-up

### MUST

1. Confirm the change request title and description remain accurate after updates.
1. Close or update related issues once the change request merges.
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
1. Inspect `.github/copilot-instructions.md` to confirm the AI review instructions point to the authoritative `.agents/` and `docs/` guidance.
1. Confirm any repository automation guidance referenced in `docs/tasks-management.md`.
1. Use local CLI commands, for example:

   ```bash
   ls .github
   test -f .github/PULL_REQUEST_TEMPLATE.md && cat .github/PULL_REQUEST_TEMPLATE.md
   test -f .github/copilot-instructions.md && cat .github/copilot-instructions.md
   ls .github/workflows
   ```

### SHOULD

1. Prefer local inspection over networked tooling unless the user approves remote access.

### COULD

1. None

### WANT

1. None

## Missing Inputs

### MUST

1. Ask the user to provide the change request title format, required description sections, linked issue format, labels, default reviewers, required checks, merge strategy, and draft usage rules if they are not discoverable locally.

### SHOULD

1. Confirm whether any compliance or release notes sections are mandatory.

### COULD

1. None

### WANT

1. None

## Approval Gates

### MUST

1. Require user approval before creating, updating, or merging a change request via CLI or UI.
1. Require user approval before applying new labels or reviewers that alter review expectations.

### SHOULD

1. Seek confirmation before adopting new change request templates.

### COULD

1. None

### WANT

1. None

## Related Specs

### MUST

1. `.agents/change_requests.md`
1. `.agents/version-control.md`
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
