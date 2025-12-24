# Change Request Guide

This guide defines how this repository manages change requests (GitHub pull requests). It complements `.agents/change_requests.md` and captures the per-project workflow.

## Principles

- Use change requests as the required review gate before merging to `develop` or `main`.
- Prefer GitHub CLI (`gh`) for repeatable automation when workflows are documented and approved.
- Keep change request status synchronized with related issues in `docs/tasks-management.md`.

## Change Request Metadata

- Title format:
- Required description sections:
- Linked issue format:
- Labels or tags:
- Default reviewers or teams:

## Change Request Content

- Link the originating issue and reference acceptance criteria and BDD scenarios.
- Summarize scope, motivation, and verification steps executed from `docs/verification.md`.
- Include prototype references when UI changes are involved (`docs/prototypes.md`).

## Required Checks and Policies

- Required status checks:
- Required approvals:
- Merge strategy (merge, squash, rebase):
- Draft usage rules:
- CI retry policy:

## Review and Approval

- Request reviews aligned to the owning area or code ownership.
- Ensure required checks pass before merge.
- Resolve review threads with documented evidence or test updates.

## Merge and Follow-up

- Confirm the change request title and description remain accurate after updates.
- Close or update related issues once the change request merges.
- Record release notes or deployment details in `docs/cicd.md` when applicable.

## GH CLI Usage

Use the GitHub CLI as the default interface for change request operations:

```bash
# Change requests (pull requests)
gh pr create --title "<title>" --body-file CHANGE_REQUEST_BODY.md
gh pr view <number>
gh pr checks <number>
```

## Templates and References

- Update `.github/PULL_REQUEST_TEMPLATE.md` when change request structure or verification requirements evolve.
