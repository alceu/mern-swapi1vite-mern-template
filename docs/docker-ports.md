# Docker Port Strategy

## Overview

The project uses a hybrid approach for Docker container port management:

- **Host ports**: Parameterized via environment variables for flexibility
- **Container internal ports**: Hardcoded for consistency

## Port Configuration

### MongoDB Service

```yaml
ports:
  - "${MONGO_PORT}:27017"
```

- **Host Port**: `${MONGO_PORT}` - Configurable via `.env` (default: 27017)
- **Container Port**: `27017` - Hardcoded (MongoDB default)

### API Service

```yaml
ports:
  - "${API_PORT}:5000"
```

- **Host Port**: `${API_PORT}` - Configurable via `.env` (default: 5000)
- **Container Port**: `5000` - Hardcoded (matches `packages/api/src/index.ts`)

### PWA Service

```yaml
ports:
  - "${VITE_PWA_PORT}:${PWA_CONTAINER_PORT}"
```

- **Host Port**: `${VITE_PWA_PORT}` - Configurable via `.env` (default: 3000)
- **Container Port**: `${PWA_CONTAINER_PORT}` - Configurable via `.env` (default: 3000)

## Rationale

### Hardcoded Container Ports

Container internal ports are hardcoded for:

1. **Consistency**: Internal services always communicate on predictable ports
2. **Simplicity**: Service-to-service communication doesn't require environment variable coordination
3. **Docker DNS**: Services reference each other by name (e.g., `mongo:27017`, `api:5000`)

### Parameterized Host Ports

Host ports are parameterized for:

1. **Flexibility**: Avoid port conflicts on different development machines
2. **Multiple Environments**: Run development and production stacks simultaneously
3. **CI/CD**: Dynamic port assignment in containerized build environments

## Connection Strings

### Internal (Container-to-Container)

Services use hardcoded container ports:

```env
MONGO_URI=mongodb://root:password@mongo:27017
```

The `mongo` hostname resolves via Docker DNS, connecting to the container's internal port `27017`.

### External (Host-to-Container)

Host applications use parameterized ports:

```env
VITE_SEARCHES_STATS_API_URL=http://localhost:${API_PORT}
```

The `localhost` hostname with `${API_PORT}` connects from host machine to container's mapped port.

## Best Practices

1. **Never change hardcoded container ports** without updating:

   - Application code (e.g., `packages/api/src/index.ts`)
   - Internal connection strings
   - Healthcheck URLs

2. **Always use environment variables for host ports** to:

   - Enable port conflict resolution
   - Support multiple environment instances
   - Maintain deployment flexibility

3. **Document port assignments** in:
   - `sample-development.env`
   - `sample-production.env`
   - README.md

## PWA Exception

The PWA service allows container port configuration via `PWA_CONTAINER_PORT` because:

- Vite's dev server port is configurable
- Build-time configuration may require different ports
- Provides maximum flexibility for development workflows

This is the only service with a parameterized container port.
