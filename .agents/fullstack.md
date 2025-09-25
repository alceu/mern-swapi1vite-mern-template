# Fullstack Agent Instructions

## Pragmatic Path Aliases

To maintain a clean and manageable codebase, use path aliases to simplify import statements.

### Benefits

- **Simplicity**: This avoids deeply nested relative paths (e.g., `../../../../module`), also described as "import path hell".
- **Readability**: Imports are cleaner and easier to understand.
- **Maintainability**: Simplifies refactoring; moving files rarely requires updating import paths.
- **Consistency**: Enforces a standardized import structure across the project.

## Development Workflow

1.  **Live Reload for Development**: When working in a development environment and changes are made to a running service, ensure that the service is configured for live reload. If live reload is not enabled or properly configured, you must inform the user that the service needs to be restarted manually to apply the affected changes.
