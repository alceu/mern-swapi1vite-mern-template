# Verification Commands Reference

This document captures the verification workflows and commands required before commits, merges, and releases. All agents must reference this file for specific command syntax and execution patterns.

## Core Verification Commands

### Type Checking

```bash
# Root-level type check across all workspaces
pnpm check-types

# Package-specific type checking
pnpm --filter api check-types
pnpm --filter pwa check-types
pnpm --filter domain check-types
```

### Linting

```bash
# Root-level linting
pnpm lint

# Package-specific linting
pnpm --filter api lint
pnpm --filter pwa lint
```

### Testing

```bash
# PWA tests
pnpm --filter pwa test

# PWA coverage
pnpm --filter pwa coverage

# Workspace coverage bundle (API + PWA)
pnpm coverage

# API tests
pnpm --filter api test
pnpm --filter api coverage

# Domain tests (when needed)
pnpm --filter domain test
```

### Building

```bash
# Build all packages
pnpm build

# Package-specific builds
pnpm --filter api build
pnpm --filter pwa build
pnpm --filter domain build
```

## Pre-Commit Verification Workflow

As mandated by `.agents/versioning.md`, run verification steps scoped to changed files:

1. **Documentation-only changes**: Markdown linting (if configured)
2. **API changes**: `pnpm check-types`, `pnpm lint`, `pnpm --filter api test`
3. **PWA changes**: `pnpm check-types`, `pnpm lint`, `pnpm --filter pwa test`
4. **Domain changes**: `pnpm check-types`, `pnpm lint`, affected package tests
5. **Cross-package changes**: Full workspace verification bundle

### Minimum Default Verification

The default verification step required by `.agents/developer_assistant.md`:

```bash
pnpm check-types
```

### Extended Verification

For changes affecting runtime behavior:

```bash
pnpm lint
pnpm check-types
pnpm --filter pwa test
pnpm build  # optional but recommended
```

## Docker Environment Verification

### Container Cleanup Command

Before and after Docker-based verification (`.agents/developer_assistant.md`, `.agents/qa.md`):

```bash
docker compose down --volumes --remove-orphans
```

This ensures:

- All containers are stopped
- Volumes are removed (clean database state)
- Orphaned containers are cleaned up
- No stale state affects verification

### Development Environment Startup

```bash
# Start all services (MongoDB, API, PWA)
docker compose up -d

# Check service health
docker compose ps

# View logs
docker compose logs -f

# Verify API health
curl http://localhost:3000/health

# Verify PWA is serving
curl http://localhost:5173
```

### Production Environment Verification

```bash
# Use production compose file
docker compose -f docker-compose.production.yml up -d

# Verify and tear down
docker compose -f docker-compose.production.yml down --volumes --remove-orphans
```

## Development Server Verification

### Check if Dev Server is Running

Before starting verification that requires a dev server (`.agents/versioning.md`):

```bash
# Check if API is running
lsof -ti:3000

# Check if PWA is running
lsof -ti:5173

# Check if MongoDB is running
lsof -ti:27017
```

### Start Development Servers

```bash
# Start both API and PWA concurrently
pnpm dev

# Start individual packages
pnpm --filter api dev
pnpm --filter pwa dev
```

### Monitor Development Logs

Redirect output to logs and monitor for errors:

```bash
pnpm dev > dev.log 2>&1 &
tail -f dev.log

# Monitor for up to 10 seconds for errors
timeout 10s tail -f dev.log | grep -i "error\|fail\|exception"
```

## Configuration File Validation

When verifying stack changes (`.agents/documentation.md`):

```bash
# Validate JSON syntax
cat package.json | jq empty
cat packages/*/package.json | jq empty

# Check TypeScript configs compile
pnpm check-types

# Validate docker-compose files
docker compose config
docker compose -f docker-compose.production.yml config

# Check environment file templates exist
test -f sample-development.env && echo "Dev env template OK"
test -f sample-production.env && echo "Prod env template OK"
```

## Change Scope Detection

Determine which verification commands to run based on changed files:

```bash
# Get changed files since last commit
git diff --name-only HEAD

# Get changed files in current branch vs develop
git diff --name-only develop...HEAD

# Filter by workspace
git diff --name-only develop...HEAD | grep "^packages/api/"
git diff --name-only develop...HEAD | grep "^packages/pwa/"
git diff --name-only develop...HEAD | grep "^\.agents/"
```

## Verification Bundle by Change Type

| Change Type               | Required Commands                                         |
| ------------------------- | --------------------------------------------------------- |
| `.agents/*.md` changes    | `pnpm check-types`, review docs consistency               |
| `docs/*.md` changes       | Review against manifests, `pnpm check-types`              |
| API source changes        | `pnpm lint`, `pnpm check-types`, `pnpm --filter api test` |
| PWA source changes        | `pnpm lint`, `pnpm check-types`, `pnpm --filter pwa test` |
| Domain changes            | `pnpm lint`, `pnpm check-types`, affected package tests   |
| Docker changes            | Docker Compose validation, container startup/teardown     |
| Package.json changes      | `pnpm install`, `pnpm check-types`, `pnpm build`          |
| TypeScript config changes | `pnpm check-types`, `pnpm build`                          |

## Related Specifications

- `.agents/developer_assistant.md` — Default verification requirements
- `.agents/versioning.md` — Pre-commit verification workflow
- `.agents/documentation.md` — Stack documentation verification
- `.agents/qa.md` — Bug resolution verification
- `docs/stack.md` — Workspace structure and tooling
- `docs/testing.md` — Testing framework details
