# Backend Agent Instructions

## General Principles

- Keep route files focused on API structure, validation, and middleware chaining.
- Keep controllers focused on business logic and service orchestration.
- Adhere to protocol best practices, such as using appropriate HTTP status codes (e.g., 204 No Content for successful requests with no response body) to avoid unnecessary data transfer.

## Entity-Driven File Organization

- To ensure a scalable and organized backend, files in all layers (controllers, services, validations, etc.) should be organized by model/schema names.
- This entity-driven approach groups related logic, making the codebase easier to navigate and maintain.

### Naming Conventions

To ensure consistency, follow these naming conventions for files and folders:

-   **Folders:** Use `lowercase` for all backend folders (e.g., `controllers`, `services`, `routes`).
-   **Models:** Use `PascalCase` for model files (e.g., `SearchQuery.ts`), as they typically export classes.
-   **Controllers, Services, and Validations:** Use `PascalCase` for the entity part of the filename (e.g., `controllers/SearchQuery.ts`, `services/TopSearch.ts`).
-   **Routes:** Use `lowercase` for route files (e.g., `routes/searches.ts`).

## Route, Middleware, and Controller Chaining

- **Routes files** must only define endpoint paths, HTTP methods, and all constraints validation logic for incoming requests.
- Validation, authentication, and other request constraints should be implemented as middleware functions in the route declaration.

- When adding new routes, always:

  - Place validation and other request constraints in the route file as middleware.
  - Delegate to a controller function for business logic and response.

- **Controllers** must only implement business logic by calling service functions and returning API-oriented responses.
