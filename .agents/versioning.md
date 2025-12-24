# Versioning and Committing Instructions

**Spec-ID:** `versioning::v1`

## Git Command Execution

### MUST

1. Require explicit user approval for every history- or remote-altering command (for example, `git commit`, `git push`, `git pull`, `git merge`, `git rebase`) and destructive command (for example, `git reset --hard`, `git stash drop|pop`).
1. Require explicit user approval for operations that write to disk or alter history in a non-trivial way, plus any edits that touch files matched in `.gitignore`.
1. Prefer running git commands directly (e.g., via shell or terminal) rather than delegating to external MCP servers, to allow users to configure manual or automated approval workflows as needed.

### SHOULD

1. When the criticality of an operation is uncertain, default to asking for user approval.

### COULD

1. Execute read-only and easily reversible git commands (for example, `git status`, `git diff`, `git add`, `git mv`) without user confirmation.

### WANT

1. None

## Branching

### MUST

1. Prefix every branch (except `develop` or `main`) with its purpose—for example, `feature/` for new features, `fix/` for bug fixes, `docs/` for documentation updates, `chore/` for maintenance tasks, and `refactor/` for code refactoring.
1. Use feature branches that name the feature or entity after the `feature/` prefix (for example, `feature/posts-advanced-search`) to align with the feature-scoped Full-Stack Domain-Driven approach and related commits.
1. Propose a new branch name from `develop` that follows these naming conventions.

### SHOULD

1. Never commit directly to `develop` or `main`.
1. Before starting work, check for uncommitted local changes.

### COULD

1. None

### WANT

1. None

## Pre-Commit Verification

### MUST

1. Determine the impacted workspaces and file types, then run verification steps only for the scopes that changed (for example, documentation updates may need Markdown linting, while API code changes require type checks and tests).
1. Keep `README.md` and related debugging instructions aligned with the implemented behavior before seeking commit approval.
1. Run the lint, type-check, and test commands documented in `docs/verification.md` applicable to the affected packages and skip steps irrelevant to the change scope.
1. Before running development-mode scripts, confirm the user is not already running the dev server, then launch the appropriate development command documented in `docs/verification.md`, redirect output to a log, and monitor the log for errors for up to 10 seconds when runtime behavior is affected.
1. When package scripts, container images, or orchestration definitions change, start the documented container environments in detached mode, verify service health, inspect logs for failures, then tear down using the cleanup command documented in `docs/verification.md`.

### SHOULD

1. Execute additional workspace commands relevant to the change scope before requesting commit approval when they extend beyond the defaults listed above.

<!-- Add future API or end-to-end verification commands here when the tooling lands. -->

### COULD

1. Run `pnpm build`.

### WANT

1. None

## Commit Message Drafting

### MUST

1. Even after the commit plan is approved, wait for explicit, affirmative confirmation from the user before proceeding with each single commit. Unless the user explicitly says something like "just go ahead with all commits", do not assume blanket approval.
1. Verify the current `git status` and `git diff` to draft a commit message.
1. Adhere strictly to the [Conventional Commits](https://www.conventionalcommits.org/) specification.
1. Split changes into separate commits when a task involves multiple distinct areas (for example, development or documentation).
1. Keep commit subjects focused on the feature or entity (for example, `posts`, `events`) to reflect the feature-scoped Full-Stack Domain-Driven approach across workspaces.
1. Adopt `({scope})` as a hyphenated package list without spaces (for example, `(api)`, `(pwa)`, `(api-pwa)`), and pair it with a feature-focused subject (for example, `feat(api-pwa): add posts sort by relevance`) so titles stay Conventional Commits compliant and tooling-friendly.
1. Use `base` when the change affects root-level or cross-cutting files outside `packages/*` (for example, `.github/`, root `package.json`, `docs/`, or tooling configs).
1. Write the draft commit message to a real `./COMMIT_EDITMSG` file, and commit using the message draft temporary file with `git commit -F <file>`.

### SHOULD

1. Stage only files relevant to the current commit's domain.
1. Commit shared UI or cross-domain changes separately.

### COULD

1. Avoid mixing multiple domains in a single commit.

### WANT

1. None

## Merging

### MUST

1. None

### SHOULD

1. After a successful merge, ask for user confirmation to delete the local feature branch.

### COULD

1. None

### WANT

1. None

## Pushing

### MUST

1. Before running `git push`, pause and wait for the user’s explicit confirmation.

### SHOULD

1. After merging to `develop` or `main`, ask the user if they want to push the changes.
1. After a successful push, check out the default `origin/HEAD` branch.

### COULD

1. None

### WANT

1. None

## Contributor Competencies

### MUST

1. Understand Conventional Commits and commit scoping standards used in this repository.
1. Be comfortable with Git workflows that require explicit approval for history-altering commands.

### SHOULD

1. Keep feature branch naming and commit subjects aligned to feature entities for traceability.

### COULD

1. Maintain familiarity with monorepo package boundaries to select accurate scopes.

### WANT

1. None
