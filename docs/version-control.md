# Version Control Guide

**Spec-ID:** `docs-version-control::v1`

## Purpose

### MUST

1. Capture repository-specific version control conventions that complement `.agents/version-control.md`.
1. Keep this file aligned with branch protections and merge settings so agents can auto-discover values before asking users.

### SHOULD

1. None

### COULD

1. None

### WANT

1. None

## Branching

### MUST

1. Default branches are `main` and `develop`.
1. Feature work must live on purpose-prefixed branches such as `feature/`, `fix/`, `docs/`, `chore/`, and `refactor/`.
1. Keep branches scoped to a single change request whenever possible.

### SHOULD

1. None

### COULD

1. None

### WANT

1. None

## Branch Protection and Policies

### MUST

1. Document protected branches, required reviews, required status checks, force-push policy, and admin override policy in this section once confirmed.

### SHOULD

1. Align policies with repository settings in the hosting provider.

### COULD

1. None

### WANT

1. None

## Pre-Commit Verification

### MUST

1. For all changed file types, use the commands documented in `docs/verification.md`.
1. Run the scoped verification steps required for the change type before requesting commit approval.

### SHOULD

1. None

### COULD

1. None

### WANT

1. None

## Commit Messages

### MUST

1. Follow Conventional Commits and scope guidance in `.agents/version-control.md`.
1. Draft commit messages in `./COMMIT_EDITMSG` before committing.

### SHOULD

1. None

### COULD

1. None

### WANT

1. None

## Merge Strategy

### MUST

1. Document the default merge method, backport policy, and hotfix policy once confirmed.

### SHOULD

1. Align merge strategy with change request workflows in `docs/change-requests.md`.

### COULD

1. None

### WANT

1. None

## Integration with Change Requests

### MUST

1. Open change requests from feature branches targeting `develop` unless release policy dictates otherwise.
1. Merge only after required checks defined in `docs/cicd.md` pass.

### SHOULD

1. None

### COULD

1. None

### WANT

1. None

## Tagging and Release Branches

### MUST

1. Document the tag format, versioning scheme, and release branch naming once confirmed.

### SHOULD

1. Align tagging with the release workflow in `docs/cicd.md`.

### COULD

1. None

### WANT

1. None

## Auto-Discovery

### MUST

1. Inspect local git config and branch listings to confirm default branches and naming conventions.
1. Review `.github` configuration files for merge and release guidance.
1. Use local CLI commands, for example:

   ```bash
   git branch -a
   git symbolic-ref refs/remotes/origin/HEAD
   ls .github
   ```

### SHOULD

1. Prefer local inspection over networked tooling unless the user approves remote access.

### COULD

1. None

### WANT

1. None

## Missing Inputs

### MUST

1. Ask the user to provide protected branch rules, required checks, merge strategy, tag format, and release branch naming if they are not discoverable locally.

### SHOULD

1. Confirm whether any repository rules require additional approval gates beyond `.agents/version-control.md`.

### COULD

1. None

### WANT

1. None

## Approval Gates

### MUST

1. Require user approval before executing history- or remote-altering git commands as defined in `.agents/version-control.md`.

### SHOULD

1. Seek confirmation before changing documented branch or tagging conventions.

### COULD

1. None

### WANT

1. None

## Related Specs

### MUST

1. `.agents/version-control.md`
1. `.agents/change_requests.md`
1. `docs/change-requests.md`
1. `docs/cicd.md`

### SHOULD

1. None

### COULD

1. None

### WANT

1. None

## Contributor Competencies

### MUST

1. Understand Conventional Commits and branch naming conventions used in this repository.

### SHOULD

1. Be comfortable reviewing branch protections and merge strategies with repository maintainers.

### COULD

1. None

### WANT

1. None
