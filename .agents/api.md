# API Agent Instructions

**Spec-ID:** `api::v1`

## General Principles

### MUST

1. Use appropriate HTTP status codes (for example, return `204 No Content` for successful requests without a response body) to avoid unnecessary data transfer.
1. Keep controllers focused on requests and responses logic and service orchestration.
1. Keep services focused on business logic and repository orchestration.
1. Organize files across controllers, services, repositories, validations, and other layers by model or schema name to keep the codebase navigable.

### SHOULD

1. Keep the API strictly stateless: each request must be self-contained without server-held session state, and long-lived streaming or event endpoints must emit identifiers without persisting client-specific context.

### COULD

1. None

### WANT

1. None

## Contributor Competencies

### MUST

1. Understand Git-based workflows and CI/CD pipelines used to deploy the API so changes remain shippable and traceable.
1. Be proficient with the API testing frameworks documented in `docs/testing.md` to keep controllers and services covered.
1. Apply performance profiling and monitoring basics to spot regressions introduced by new endpoints or aggregations.

### SHOULD

1. Stay familiar with security best practices (authentication, authorization, input validation) relevant to the API server and database layer documented in `docs/stack.md`.

### COULD

1. Share performance findings or CI/CD adjustments in `docs/` to help other contributors adopt improvements.

### WANT

1. None

## Data Normalization and Caching

### MUST

1. Ensure collection listing endpoints return array that only exposes document identifiers.
1. Collection listings may include calculated data not persisted as document properties (for example, `commentsCount`, `ratingAvg`) alongside the identifier.

### SHOULD

1. Ensure `byId` endpoints return flat documents, referencing related records strictly by ID, avoiding returning calculated, populated or nested documents so the web cache stays normalized.

### COULD

1. None

### WANT

1. None

## Collection Endpoints

### MUST

1. Keep resource discovery limited to dedicated collection listing routes (for example, `/collection`) and detail routes (`/[id|code|unique-identifier]`) so list and detail contracts stay predictable.
1. Mirror the aggregation and normalization patterns established by existing collection modules when implementing new resources, including soft-delete filtering and calculated fields.
1. Return listing payloads that include pagination metadata and ID-centric `items` arrays, deferring rich document data to the corresponding detail endpoint.
1. Implement request validation, controller orchestration, service logic, and repository queries for new collection endpoints in a way that preserves the clean-architecture boundaries.
1. Accompany every new listing and detail implementation with automated tests that exercise controllers, services, repositories, and DTO validation.

### SHOULD

1. Reuse existing aggregation utilities and filtering helpers where possible before introducing new abstractions.
1. Align default parameter handling (for example, `page`, `active`) with established conventions so clients can omit defaults without breaking behavior.

### COULD

1. Provide feature-flag hooks around expensive aggregations to allow gradual rollout when necessary.

### WANT

1. None

## Event Streaming

### MUST

1. Expose per-resource event endpoints (for example, Server-Sent Events) that emit changed document identifiers so the PWA can perform cache invalidation, following the contract documented in `.agents/fullstack.md`.

### SHOULD

1. Describe event endpoint payloads and subscription expectations in workspace docs before rolling out breaking changes.

### COULD

1. None

### WANT

1. None

## Fullstack Cohesion

### MUST

- None

### SHOULD

1. When API changes can affect the web (for example, route or payload adjustments), inspect the web codebase and apply the necessary updates to preserve compatibility.
1. Identify the web files touched by an API change before implementing backend updates.

### COULD

1. None

### WANT

1. None

## Parameter and Error Handling

### MUST

1. Repeat the parameter key for each value when accepting array query parameters (`param=value1&param=value2`) to stay URI-compliant and compatible with standard HTTP clients.
1. Throw `404 Not Found` responses whenever requested resources or query results are absent so the client data layer can rely on strict, non-null types.
1. Normalize complex types (for example, `ObjectId`, `Date`) through dedicated mapping or middleware layers before controllers consume them, keeping validation and serialization consistent.
1. Define explicit default limits for indexed or paginated queries instead of relying on `undefined` fallbacks to avoid unbounded loads.

### SHOULD

1. Centralize parameter parsing and error helpers so repeated logic stays uniform across controllers.

### COULD

1. Publish reusable validation utilities that enforce compliant array parameter encoding and limit selection.

### WANT

1. None
