# Fullstack Agent Instructions

## Modular Architecture

This project employs a modular architecture with distinct modules for the frontend and backend, using path aliases to enforce clear boundaries and simplify imports.

### Pragmatic Path Aliases

To maintain a clean and manageable codebase, use path aliases to simplify import statements.

#### Backend (`@api` alias)

- **Unified Alias**: The backend uses a single `@api` alias for all internal modules.
- **Usage**: When importing backend modules, use the `@api` alias (e.g., `import { MyService } from '@api/services/MyService'`).

#### Frontend (`@pwa` alias)

- **Unified Alias**: The frontend uses a single `@pwa` alias for all internal modules.
- **Usage**: When importing frontend modules, use the `@pwa` alias (e.g., `import { MyComponent } from '@pwa/components/MyComponent'`).

#### Benefits

- **Simplicity**: This avoids deeply nested relative paths (e.g., `../../../../module`), also described as "import path hell".
- **Readability**: Imports are cleaner and easier to understand.
- **Maintainability**: Simplifies refactoring; moving files rarely requires updating import paths.
- **Consistency**: Enforces a standardized import structure across the project.

## Naming Conventions

To ensure clarity and consistency across the codebase, please adhere to the following naming conventions:

1.  **Avoid Abbreviations**: Do not use abbreviations for variable names, class names, or layer/directory names. Always prefer descriptive, full-word names.
    -   **Good**: `userProfile`, `AuthenticationService`, `components`
    -   **Bad**: `usrProf`, `AuthSvc`, `comps`

2.  **Avoid Redundancy in File Names**: Do not repeat the layer's name in the filename. The directory already provides that context.
    -   **Good**: `controllers/Users.ts` (for a controller handling users)
    -   **Bad**: `controllers/UsersController.ts`
    -   **Good**: `services/Auth.ts`
    -   **Bad**: `services/AuthService.ts`