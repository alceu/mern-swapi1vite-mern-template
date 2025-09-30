# Backend Agent Instructions

## General Principles

- Keep route files focused on API structure, validation, and middleware chaining.
- Keep controllers focused on business logic and service orchestration.
- Maintain clear separation for maintainability, testability, and scalability.

## Route, Middleware, and Controller Chaining

- **Routes files** must only define endpoint paths, HTTP methods, and all constraints validation logic for incoming requests.
- Validation, authentication, and other request constraints should be implemented as middleware functions in the route declaration.

- When adding new routes, always:

  - Place validation and other request constraints in the route file as middleware.
  - Delegate to a controller function for business logic and response.

- **Controllers** must only implement business logic by calling service functions and returning API-oriented responses.
