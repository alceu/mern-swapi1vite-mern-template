# Testing Framework Reference

This document captures testing tools, conventions, and verification flows for the MERN SWAPI template. Refer to this file when implementing or debugging automated test coverage.

## Testing Stack

### API Testing (`packages/api`)

- **Framework**: Jest and Supertest for API endpoint testing
- **Location**: Tests will be organized alongside source files or in dedicated test directories
- **Command**: `pnpm --filter api test`
- **Coverage**: `pnpm --filter api coverage`
- **Scope**: Controllers, services, repositories, and validation logic
- **Thresholds**: Configured in `packages/api/jest.config.cjs`

### PWA Testing (`packages/pwa`)

- **Framework**: Vitest with React Testing Library and jsdom
- **Location**: Tests colocated with components in `src/` directories
- **Command**: `pnpm --filter pwa test`
- **Coverage**: `pnpm --filter pwa coverage`
- **Scope**: Components, hooks, RTK Query flows, and feature modules
- **Thresholds**: Configured in `packages/pwa/vite.config.ts`

### Domain Testing (`packages/domain`)

- **Framework**: Vitest for DTO validation and type guards
- **Location**: Tests in `src/` alongside domain models
- **Command**: `pnpm --filter domain test` (when needed)
- **Scope**: Data transfer objects, transformations, and validation utilities

### Workspace Coverage

- **Command**: `pnpm coverage` (runs API + PWA coverage with summary output)

## Testing Patterns

### Unit Tests

- Focus on isolated logic: pure functions, utilities, and business rules
- Mock external dependencies (API calls, database access)
- Target quick execution for fast feedback loops

### Integration Tests

- Exercise multi-layer flows: controller → service → repository
- Use test databases or in-memory stores when feasible
- Verify data contracts between layers

### Component Tests (PWA)

- Render components with React Testing Library
- Simulate user interactions (clicks, typing, navigation)
- Assert on accessible queries (roles, labels, text content)
- Mock data layer hooks and store state

### E2E/Visual Testing (Future)

- **Proposed Tool**: Playwright for browser automation
- **Scope**: Critical user journeys, cross-browser compatibility
- **Status**: Not yet implemented; see `.agents/qa.md` for adoption guidance

## Competency Requirements

Contributors working on test coverage should be proficient with:

1. **API Layer**: Jest, Supertest, HTTP assertions, test data seeding
2. **PWA Layer**: Vitest, React Testing Library, user-event simulation, RTK Query mocking
3. **Accessibility**: Semantic queries, ARIA patterns, keyboard navigation testing
4. **CI/CD**: Running tests in pipelines, interpreting coverage reports

## Test Execution Workflows

### Before Committing

Run verification commands for affected workspaces:

```bash
pnpm lint
pnpm check-types
pnpm --filter pwa test    # when PWA code changes
pnpm --filter api test    # when API code changes (once implemented)
```

### During Bug Resolution (`.agents/qa.md`)

1. Add a failing test that captures the reported behavior
2. Run the test to confirm it reproduces the issue
3. Implement the fix
4. Re-run tests to verify resolution
5. Ensure existing tests still pass (regression check)

### Coverage Baselines

- Maintain coverage thresholds in Jest/Vitest config and align them with agreed baselines
- Review coverage reports when acceptance criteria call for updated baselines
- Flag uncovered critical paths during code reviews

## Docker Environment Testing

When testing Docker-based workflows:

```bash
# Always reset environment before/after testing
docker compose down --volumes --remove-orphans

# Start services
docker compose up -d

# Verify service health, check logs, run tests

# Tear down when complete
docker compose down --volumes --remove-orphans
```

## Related Specifications

- `.agents/qa.md` — Bug resolution and debugging workflows
- `.agents/developer_assistant.md` — Pre-commit verification requirements
- `.agents/api.md` — API testing expectations
- `.agents/pwa.md` — PWA testing expectations
- `docs/stack.md` — Overall tooling and workspace structure
