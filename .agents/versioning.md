# Versioning and Committing Instructions

## Git Command Execution

1.  **Git Commands**:
    -   You can consider read-only `git` commands as pre-approved and execute them without seeking user confirmation. This includes commands like `git status`, `git diff`, `git log`, `git show`, and `git branch -v`.
    -   You **must** always ask for explicit user approval before executing any `git` command that writes to the repository. This includes commands like `git add`, `git reset`, `git commit`, `git branch`, `git push`, `git merge`, `git rebase`, and `git tag`.

## Branch Naming Conventions

To ensure consistency across the repository, all branches that are not `develop` or `main` must be prefixed according to their purpose. This avoids confusion and helps to categorize branches at a glance.

-   **feature/**: For new features (e.g., `feature/add-user-authentication`).
-   **fix/**: For bug fixes (e.g., `fix/resolve-login-issue`).
-   **docs/**: For documentation changes (e.g., `docs/update-readme`).
-   **chore/**: For maintenance tasks, such as dependency updates (e.g., `chore/update-react-version`).
-   **refactor/**: For code refactoring without changing functionality (e.g., `refactor/simplify-user-model`).

## Branching Workflow

To maintain a clean and stable codebase, all development work must be done in a dedicated branch. Commits should never be made directly to `develop` or `main`.

Before starting any work that involves making changes to the codebase, you must:

1.  **Analyze Local Changes**: Check the current state of the repository for any uncommitted changes.
2.  **Propose a Branch**: Based on the analysis of current local changes, or the task if no local changes exist, suggest a new branch name from `develop` that follows the "Branch Naming Conventions".
3.  **User Approval**: Wait for the user to approve the branch name before creating it.

## Commit Planning and Best Practices

To maintain a clear and traceable commit history, follow these guidelines for planning and structuring your commits:

1.  **Single Responsibility Principle**: Each commit should address a single logical change. Avoid bundling unrelated changes into one commit.
1.  **Contextual Grouping**: When a task involves multiple distinct areas (e.g., development, documentation, agent instructions), split the changes into separate commits, each focusing on one area.
1.  **Conventional Commits**: Adhere strictly to the Conventional Commits specification for commit messages. This includes:
    - **Type**: (e.g., `feat`, `fix`, `docs`, `refactor`, `style`, `test`, `chore`, `build`, `ci`, `perf`).
    - **Scope (optional)**: A noun describing the section of the codebase affected (e.g., `pwa`, `api`, `auth`).
    - **Description**: A concise, imperative statement of the change.
    - **Body (optional)**: More detailed explanatory text.
    - **Footer (optional)**: For breaking changes or referencing issues.
1.  **Draft and Review**: Always draft a commit message following these guidelines and present it to the user for approval before committing.

## Committing Workflow

When asked to commit changes after successfully completing tasks that modify the repository, you must:

1.  **Verify Changes and Respect User Precedence**: Before proceeding, always check `git status` and `git diff HEAD` to review all current changes. If any changes previously made by the agent are no longer present, assume the user has either committed or discarded them. In such cases, strictly respect the user's actions and proceed only with the changes currently reflected in the repository.
1.  Analyze git changes.
1.  Draft a commit message following the "Commit Planning and Best Practices" guidelines.
1.  **Present the draft message for review. Prefer using IDE features or extensions to allow the user to edit and approve the message. If such tools are unavailable, fall back to saving the message in a temporary file (e.g., `COMMIT_EDITMSG`) and notifying the user.**
1.  Stage only related changes for the current commit.
1.  **Crucially, you must wait for explicit, affirmative confirmation from the user before proceeding with the commit.**
1.  If a technical limitation prevents adhering to an approved commit message (e.g., due to tool constraints), you **must** immediately communicate this limitation to the user, explain the reason, and propose an alternative before proceeding.
1.  Commit the changes using the final, approved message only once explicit approval has been received.

## Merging and Cleanup Workflow

When the user confirms that a feature branch is ready to be merged, follow these steps:

1.  Checkout the target branch (usually `develop` or `main`).
2.  Merge the feature branch into the target branch.
3.  After the merge is complete and any conflicts are resolved, ask the user for confirmation to delete the feature branch.
4.  If confirmed, delete the local feature branch using `git branch -d <branch-name>`.

## Pushing Workflow

When merging changes into `develop` or `main`, and after the merge is complete:

1.  Ask the user if they want to push the changes to the remote repository.
2.  If confirmed, push the changes to the remote.
3.  After a successful push, checkout the default HEAD branch (as indicated by `origin/HEAD`).