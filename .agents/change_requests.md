# Change Request Agent Instructions

**Spec-ID:** `change_requests::v1`

## Purpose

### MUST

1. Provide clear guidance for planning, opening, and reviewing change requests in this monorepo.
1. Ensure agents follow consistent workflows that align with the broader `.agents/` mandate.

### SHOULD

1. None

### COULD

1. None

### WANT

1. None

## Git Structure Checklist

### MUST

1. Always follow the committing workflow in `.agents/version-control.md`, mainly the commit message draft file and the pauses for user approval before `git commit` and `git push`.

### SHOULD

1. Treat repository automation guidance documented in `docs/change-requests.md` as input to simulate automated change-request review.
1. Complete work on the relevant `feature/<name>` branch, keeping changes scoped to the task.
1. Limit each change request to a single logical feature or fix to keep reviews efficient.

### COULD

1. None

### WANT

1. None

## Defaults and Missing Inputs

### MUST

1. Use the per-project discovery sources in `docs/change-requests.md` to gather title format, required sections, linked issue format, labels, default reviewers, required checks, merge strategy, and draft usage rules.
1. When values remain undefined after discovery, propose defaults using conventional best practices and pause for user review before creating or updating the change request.
1. Ask the user to confirm or supply missing metadata plus any compliance or release-notes sections before submission.

### SHOULD

1. Confirm whether any compliance or release notes sections are mandatory.
1. Prefer local inspection over networked tooling unless the user approves remote access.

### COULD

1. None

### WANT

1. None

## Pre-Merge Preparation

### MUST

1. Define change-request verification commands based on the full feature branch diff (all commits), not just the last commit.

### SHOULD

1. Perform a self-review to ensure alignment with `.agents/fullstack.md`, `.agents/pwa.md`, and `.agents/api.md`, and confirm tests pass locally.
1. Run the scoped verification commands documented in `docs/verification.md` for the touched workspaces and resolve failures before proceeding.

<!-- When API or end-to-end suites are introduced, update docs/verification.md and docs/testing.md. -->

### COULD

1. None

### WANT

1. None

## Merge Develop Into Feature Branch

### MUST

1. Update local `develop` and refresh the feature branch as needed:
   ```bash
   git checkout develop
   git pull origin develop
   git checkout feature/<name>
   git pull origin feature/<name>
   git merge develop
   ```
1. Preserve feature-branch commit history when syncing `develop` by using merge (no squash or rebase).
1. When conflicts appear, draft a summary covering the files involved, the conflicting intent, and your proposed resolution.
1. Document conflict resolutions and pause for user direction whenever merge conflicts arise.
1. Resolve conflicts in line with the committing workflow, stage only related files, and document context in the commit body when helpful.

### SHOULD

1. After conflicts are resolved, rerun only the affected workspace tests and fix any regressions.

### COULD

1. None

### WANT

1. None

## Post-Merge Commits

### MUST

1. Confirm commit messages remain in the imperative mood and explain the “why,” per `.agents/version-control.md`.
1. Verify locally with the default build command documented in `docs/verification.md` (and contextual additional tests when helpful).
1. Run a change-request review simulation after merging `develop` into the feature branch and before pushing or submitting the change request.
1. Use the review inputs defined in `docs/change-requests.md` (required sections, required checks, diff scope) to validate readiness.
1. Incorporate repository automation prompts documented in `docs/change-requests.md` before pushing the feature branch and raising a change request, so anticipated feedback can be addressed proactively.

### SHOULD

1. None

### COULD

1. None

### WANT

1. None

## Create, Describe, and Open the Change Request

### MUST

1. Inspect diffs with `git diff develop` to ensure only intentional files change.
1. Review commits with `git log --oneline develop..HEAD`.
1. After pushing the branch, draft the change request description.
1. Use feature branch commit messages as the primary source of context for the change request description.
1. Link the change request to the relevant user stories, acceptance criteria, and BDD scenarios referenced in `.agents/sdlc.md`.
1. Request from the user any external references, manual testing notes, or additional context needed for the change request description.
1. Populate the template with a title containing the ticket identifier when applicable, plus a summary of changes and motivation.
1. Include testing instructions referencing the verification commands from `docs/verification.md` that you executed and links to related tickets or issues. Reference `docs/stack.md` when new tooling is involved.
1. Follow the change request formatting and workflow documented in `docs/change-requests.md`.
1. Save the drafted description to a temporary Markdown file (for example `./CHANGE_REQUEST_BODY.md`) and pause until the user edits or approves it.
1. Open the change request targeting `develop`, then proceed through review and merge via the configured platform or tooling.
1. Do not submit the change request until both the feature branch has been pushed and the user confirms the change request body.
1. Remove the temporary change request body file after the change request has been opened.

### SHOULD

1. None

### COULD

1. None

### WANT

1. None

## Change Request Review and Thread Resolution

### MUST

1. When the user requests fixes for review findings, git pull the feature branch to fetch inline conversation resolutions.
1. Gather unresolved review threads using the tooling documented in `docs/change-requests.md`, implement the changes, follow the full committing workflow, and resolve the threads with the same tooling once pushed.
1. Rely on repository automation guidance and tooling documented in `docs/change-requests.md` for formatting concerns where possible.
1. Approve only after confirming guidelines are satisfied, tests pass, and outstanding issues are resolved.

### SHOULD

1. Request the configured AI change-request review once the change request is ready when the repo/account has AI review enabled.
1. Break down reviews into manageable contextual commits. Commits should cover the files related to each review, with the commit message pointing the review id.
1. Prioritize functional correctness, architectural soundness, security, and maintainability when reviewing.
1. Offer constructive, respectful feedback framed as questions or suggestions.

### COULD

1. Aim to review within 24 hours to keep delivery flowing once the change request is awaiting feedback.
1. Check out the branch locally, following the author’s instructions or platform guidance:
   ```bash
   git fetch origin <change-request-ref>
   git checkout <branch>
   ```

### WANT

1. Move protracted discussions to synchronous channels when threads grow long.

## Approval Gates

### MUST

1. Require user approval before executing history- or remote-altering git commands (`git commit`, `git push`, `git pull`, `git merge`, `git rebase`) or destructive commands.
1. Require user approval before edits that affect files matched by `.gitignore`.
1. Require user approval before opening a change request or posting reviews that finalize acceptance criteria status.

### SHOULD

1. Pause for confirmation before adopting new change-request tooling or templates that alter review expectations.

### COULD

1. None

### WANT

1. None

## Contributor Competencies

### MUST

1. Understand the change request workflow and commit policy in `.agents/version-control.md`.

### SHOULD

1. Maintain familiarity with repository automation prompts or templates documented in `docs/change-requests.md`.

### COULD

1. Capture review learnings in `docs/` when they affect team practices.

### WANT

1. None
