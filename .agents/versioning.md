# Versioning and Committing Instructions

**Spec-ID:** `versioning::v1`

## Git Command Execution

### MUST

1. Require explicit user approval for every history- or remote-altering command (for example, `git commit`, `git push`, `git pull`, `git merge`, `git rebase`), destructive command (for example, `git reset --hard`, `git stash drop|pop`), operation that writes to disk or alters history in a non-trivial way, or edit that touches files matched in `.gitignore`.

### SHOULD

1. When the criticality of an operation is uncertain, default to asking for user approval.

### COULD

1. Execute read-only and easily reversible git commands (for example, `git status`, `git diff`, `git add`, `git mv`) without user confirmation.

### WANT

None

## Branching

### MUST

1. Prefix every branch (except `develop` or `main`) with its purpose—for example, `feature/` for new features, `fix/` for bug fixes, `docs/` for documentation updates, `chore/` for maintenance tasks, and `refactor/` for code refactoring.
1. Propose a new branch name from `develop` that follows these naming conventions.

### SHOULD

1. Never commit directly to `develop` or `main`.
1. Before starting work, check for uncommitted local changes.

### COULD

None

### WANT

None

## Pre-Commit Verification

### MUST

1. Determine the impacted workspaces and file types, then run verification steps only for the scopes that changed (for example, documentation updates may need Markdown linting, while API code changes require type checks and tests).
1. Keep `README.md` and related debugging instructions aligned with the implemented behavior before seeking commit approval.
1. Run the lint, type-check, and test commands applicable to the affected packages (for example, `pnpm lint`, `pnpm check-types`, `pnpm --filter pwa test`) and skip steps irrelevant to the change scope.
1. Before running development-mode scripts, confirm the user is not already running the dev server, then launch the appropriate `pnpm` development command, redirect output to a log, and monitor the log for errors for up to 10 seconds when runtime behavior is affected.
1. When pnpm scripts, Dockerfiles, or container orchestration change, start the documented Docker Compose environments in detached mode, verify service health, inspect logs for failures, then tear down only the started containers, networks, volumes, and orphans via `docker compose down --volumes --remove-orphans`.

### SHOULD

1. Execute additional workspace commands relevant to the change scope before requesting commit approval when they extend beyond the defaults listed above.

<!-- Add future API or end-to-end verification commands here when the tooling lands. -->

### COULD

1. Run `pnpm build`.

### WANT

None

## Commit Message Drafting

### MUST

1. Adhere strictly to the [Conventional Commits](https://www.conventionalcommits.org/) specification.
1. Verify the current `git status` and `git diff` to draft a commit message.
1. Split changes into separate commits when a task involves multiple distinct areas (for example, development or documentation).
1. Scope commits by feature and domain (for example, `profiles`, `companies`, `projects`), considering a feature-scoped Full-Stack Domain-Driven approach, to keep context consistent across workspaces and each commit focused on a feature logical change.
1. Adopt `({project|package|fullstack/entity})` detailed prefix (for example, `api/events`, `web/events`, `fullstack/events`) to easily identify whether commmits are related to a single or cross projects/packages.
1. Write the draft commit message to a real `./COMMIT_EDITMSG` file, and commit using the message draft temporary file with `git commit -F <file>`.
1. Wait for explicit, affirmative confirmation from the user before proceeding with the commit. Unless explicitly said something like "just go ahead with all commits", do not assume approval.

### SHOULD

1. Stage only files relevant to the current commit's domain.
1. Commit shared UI or cross-domain changes separately.

### COULD

1. Avoid mixing multiple domains in a single commit.

### WANT

None

## Merging

### MUST

None

### SHOULD

1. After a successful merge, ask for user confirmation to delete the local feature branch.

### COULD

None

### WANT

None

## Pushing

### MUST

1. Before running `git push`, pause and wait for the user’s explicit confirmation.

### SHOULD

1. After merging to `develop` or `main`, ask the user if they want to push the changes.
1. After a successful push, check out the default `origin/HEAD` branch.

### COULD

None

### WANT

None
