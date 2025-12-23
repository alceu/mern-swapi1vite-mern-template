# Pull Request Agent Instructions

**Spec-ID:** `pull_requests::v1`

## Purpose

### MUST

1. Provide clear guidance for planning, opening, and reviewing pull requests in this monorepo.
1. Ensure agents follow consistent workflows that align with the broader `.agents/` mandate.

### SHOULD

1. None

### COULD

1. None

### WANT

1. None

## Git Structure Checklist

### MUST

1. Always follow the committing workflow in `.agents/versioning.md`, mainly the commit message draft file and the pauses for user approval before `git commit` and `git push`.

### SHOULD

1. Treat `.github/` automation guidance to simulate copilot pr online review.
1. Complete work on the relevant `feature/<name>` branch, keeping changes scoped to the task.
1. Limit each pull request to a single logical feature or fix to keep reviews efficient.

### COULD

1. None

### WANT

1. None

## Pre-Merge Preparation

### MUST

1. None

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

1. Confirm commit messages remain in the imperative mood and explain the “why,” per `.agents/versioning.md`.
1. Verify locally with `pnpm build` (and contextual additional tests when helpful)
1. Incorporate `.github/*` automation prompts instructions to simulate copilot pr online review, before pushing feature branch and raising a pull request, so anticipated feedback can be addressed proactively.

### SHOULD

1. None

### COULD

1. None

### WANT

1. None

## Push, Describe, and Open the Pull Request

### MUST

1. Inspect diffs with `git diff develop` to ensure only intentional files change.
1. Review commits with `git log --oneline develop..HEAD`.
1. After pushing the branch, draft the pull request body.
1. Use feature branch commit messages as the primary source of context for the pull request body.
1. Request from the user any external references, manual testing notes, or additional context needed for the pull request body.
1. Populate the template with a title containing the ticket identifier when applicable, a summary of changes and motivation, testing instructions referencing the verification commands from `docs/verification.md` that you executed, and links to related tickets or issues. Reference `docs/stack.md` when new tooling is involved.
1. Save the drafted description to a temporary Markdown file (for example `./PR_BODY.md`) and pause until the user edits or approves it.
1. Open the pull request targeting `develop`, then proceed through review and merge via the GitHub interface or linked CI tooling.
1. Do not run `gh pr create` until both the feature branch has been pushed and the user confirms the pull request body.
1. Remove the temporary pull request body file after the pull request has been opened.

### SHOULD

1. None

### COULD

1. None

### WANT

1. None

## Pull Request online review, posting and resolving conversation threads

### MUST

1. When the user requests fixes for review findings, git pull feature branch to fetch conversations inline resolutions. Then, gather unresolved threads with `gh pr view <number> --json reviewThreads`, implement the changes, follow the full committing workflow, and resolve the threads via `gh pr review-thread resolve <thread-id>` once pushed.
1. Rely on `.github/` automation guidance and tooling for formatting concerns where possible.
1. Approve only after confirming guidelines are satisfied, tests pass, and outstanding issues are resolved.

### SHOULD

1. Break down reviews into manageable contextual commits. Commits should cover the files related to each review, with the commit message pointing the review id.
1. Prioritize functional correctness, architectural soundness, security, and maintainability when reviewing.
1. Offer constructive, respectful feedback framed as questions or suggestions.

### COULD

1. Aim to review within 24 hours to keep delivery flowing once the pull request is awaiting feedback.
1. Check out the branch locally, following the author’s instructions:
   ```bash
   git fetch origin pull/XYZ/head:pr_branch
   git checkout pr_branch
   ```

### WANT

1. Move protracted discussions to synchronous channels when threads grow long.
