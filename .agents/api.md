# API Agent Instructions

**Spec-ID:** `api::v1`

## General Principles

### MUST

1. Use appropriate HTTP status codes (for example, return `204 No Content` for successful requests without a response body) to avoid unnecessary data transfer.
1. Keep controllers focused on requests and responses logic and service orchestration.
1. Keep services focused on business logic and repository orchestration.
1. Organize files across controllers, services, repositories, validations, and other layers by model or schema name to keep the codebase navigable.

### SHOULD

1. Keep the API strictly stateless so every request carries all data required for processing without server-side session storage.

### COULD

- None

### WANT

- None

## Data Normalization and Caching

### MUST

1. Ensure collection listing endpoints return array that only exposes document identifiers. 
1. Collection listings may include calculated data not persisted as document properties (for example, `commentsCount`, `ratingAvg`) alongside the identifier.

### SHOULD

1. Ensure `byId` endpoints return flat documents, referencing related records strictly by ID, avoiding returning calculated, populated or nested documents so the web cache stays normalized.

### COULD


### WANT


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

None

## Fullstack Cohesion

### MUST

- None

### SHOULD

1. When API changes can affect the web (for example, route or payload adjustments), inspect the web codebase and apply the necessary updates to preserve compatibility.
1. Identify the web files touched by an API change before implementing backend updates.

### COULD

- None

### WANT

- None

