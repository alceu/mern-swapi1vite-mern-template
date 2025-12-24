# Docker Port Strategy

**Spec-ID:** `docs-docker-ports::v1`

## Purpose

### MUST

1. Define the per-project host and container port mapping rules for Docker Compose services so agents can validate and update port usage safely.

### SHOULD

1. None

### COULD

1. None

### WANT

1. None

## Port Configuration

### MUST

1. Use the following MongoDB port mapping in Compose files:

   ```yaml
   ports:

     - "${MONGO_PORT}:27017"

   ```

1. Use the following API port mapping in Compose files:

   ```yaml
   ports:

     - "${API_PORT}:5000"

   ```

1. Use the following PWA port mapping in Compose files:

   ```yaml
   ports:

     - "${VITE_PWA_PORT}:${PWA_CONTAINER_PORT}"

   ```

1. Document host port defaults in `sample-development.env` and `sample-production.env`.

### SHOULD

1. Keep container ports stable unless application code changes require updates.

### COULD

1. None

### WANT

1. None

## Rationale

### MUST

1. Treat container ports as stable internal contracts and host ports as configurable values to avoid local port conflicts and enable parallel environments.

### SHOULD

1. Keep service-to-service connection strings aligned with container ports.

### COULD

1. None

### WANT

1. None

## Connection Strings

### MUST

1. Use container DNS names and container ports for internal connections, for example:

   ```env
   MONGO_URI=mongodb://root:password@mongo:27017
   ```

1. Use host-mapped ports for host-to-container connections, for example:

   ```env
   VITE_SEARCHES_STATS_API_URL=http://localhost:${API_PORT}
   ```

### SHOULD

1. Validate connection string updates against the env templates when port values change.

### COULD

1. None

### WANT

1. None

## Best Practices

### MUST

1. Update application code, health checks, and documentation if container ports change.
1. Keep host port environment variables consistent across `sample-*.env` files.
1. Document any new service port mappings here before enabling them in Compose.

### SHOULD

1. Avoid reusing host ports across services unless explicitly required.

### COULD

1. None

### WANT

1. None

## Auto-Discovery

### MUST

1. Inspect `docker-compose.yml`, `docker-compose.production.yml`, `sample-development.env`, and `sample-production.env` to confirm current port mappings and defaults.
1. Use local CLI commands, for example:

   ```bash
   rg -n "ports:" docker-compose*.yml
   rg -n "MONGO_PORT|API_PORT|VITE_PWA_PORT|PWA_CONTAINER_PORT" sample-development.env sample-production.env
   ```

### SHOULD

1. Prefer local file inspection over networked tooling unless the user approves remote lookups.

### COULD

1. None

### WANT

1. None

## Missing Inputs

### MUST

1. If host port defaults or new service mappings are not discoverable in the repo, ask the user for the expected values and update this spec accordingly.

### SHOULD

1. Confirm whether any environment-specific overrides exist outside the sample env files.

### COULD

1. None

### WANT

1. None

## Approval Gates

### MUST

1. Require user approval before changing documented port mappings or renaming port environment variables.

### SHOULD

1. Seek confirmation before introducing new exposed ports.

### COULD

1. None

### WANT

1. None

## Related Specs

### MUST

1. `docs/stack.md`
1. `docs/verification.md`
1. `.agents/fullstack.md`

### SHOULD

1. None

### COULD

1. None

### WANT

1. None

## Contributor Competencies

### MUST

1. Understand Docker Compose port mappings and environment variable templates.

### SHOULD

1. Be familiar with service health checks and connection string updates.

### COULD

1. None

### WANT

1. None
