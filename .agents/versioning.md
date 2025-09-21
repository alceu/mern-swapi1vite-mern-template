# Versioning and Committing Instructions

## Commit Planning and Best Practices

To maintain a clear and traceable commit history, follow these guidelines for planning and structuring your commits:

1.  **Single Responsibility Principle**: Each commit should address a single logical change. Avoid bundling unrelated changes into one commit.
2.  **Contextual Grouping**: When a task involves multiple distinct areas (e.g., development, documentation, agent instructions), split the changes into separate commits, each focusing on one area.
3.  **Conventional Commits**: Adhere strictly to the Conventional Commits specification for commit messages. This includes:
    - **Type**: (e.g., `feat`, `fix`, `docs`, `refactor`, `style`, `test`, `chore`, `build`, `ci`, `perf`).
    - **Scope (optional)**: A noun describing the section of the codebase affected (e.g., `frontend`, `backend`, `auth`, `api`).
    - **Description**: A concise, imperative statement of the change.
    - **Body (optional)**: More detailed explanatory text.
    - **Footer (optional)**: For breaking changes or referencing issues.
4.  **Draft and Review**: Always draft a commit message following these guidelines and present it to the user for approval before committing.

## Committing Workflow

When asked to commit changes after successfully completing tasks that modifies the repository, you must:

1.  Analyse git changes.
1.  Draft a commit message following the "Commit Planning and Best Practices" guidelines, ensuring it is 300 characters or less, and present it to the user for approval.
1.  Stage only related changes for the current commit.
1.  **Crucially, you must wait for explicit, affirmative confirmation from the user before proceeding with the commit.**
1.  Commit the changes only once explicit approval has been received.
