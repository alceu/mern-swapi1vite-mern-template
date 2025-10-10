# SWAPI MERN Example

This project implements a MERN (MongoDB, Express.js, React, Node.js) stack application. It leverages a Vite-based build system for the PWA, and both the PWA and API are developed using TypeScript, ensuring type safety and improved code quality.

## Getting Started

Follow these instructions to set up and run the project.

### 1. Clone the Repository

```bash
git clone <repository-url>
cd swapi-mern-example
```

1. **Install dependencies:**

   ```bash
   npm install
   ```

1. Optional:

   ```bash
   cp -r sample-.vscode .vscode
   ```

1. Environment Setup

To get started, you need to create `.env` files from the provided samples for both the api and pwa. These files will hold your environment-specific variables.

- **For Development:**
  ```bash
  cp sample-development.env .env
  ```
- **For Production:**
  ```bash
  cp sample-production.env .env
  ```
- **Create symbolic links for each workspace:**
  ```bash
  ln -s ../../.env packages/pwa/.env && ln -s ../../.env packages/api/.env
  ```

**Note:** The `.env` files are ignored by Git, so your secrets are safe. Ensure you configure the variables within these files according to your needs.

1. Running the Application

You can run this project in two ways: using Docker (recommended for a consistent environment) or running the services locally on your machine.

#### A. Docker Development (Recommended)

This is the easiest way to get started. With Docker, the entire application (pwa, api, and database) runs in containers.

**Prerequisites:**

- Docker
- Docker Compose

**Instructions:**

- **For development:**

```bash
docker compose up --build
```

- **For production:**

```bash
docker compose -f docker-compose.yml -f docker-compose.production.yml up --build
```

The `-d` flag can be added to run in detached mode (in the background).

#### B. Local Development

If you prefer to run the services directly on your machine, follow these steps.

**Prerequisites:**

- Node.js 18+
- npm (or your preferred package manager)
- Docker (for the database)

**Instructions:**

1.  **Start the database:**

    ```bash
    docker compose up mongo -d
    ```

1.  **IMPORTANT:** In your `.env` file, update the `MONGO_URI` to replace `mongo:27017` with `localhost:27017`.

1.  **Start the development servers:**

    - **API (in one terminal):**

      ```bash
      npm run dev:api
      ```

    - **PWA (in another terminal):**

      ```bash
      npm run dev:pwa
      ```

**Accessing the Application (default, check your `.env`):**

- **Docker and Local Development:**

  - api: `http://localhost:5000`
  - pwa: `http://localhost:3000`

- **Docker Production:**

  - api: `http://localhost:5000`
  - pwa: `http://localhost`

## Project Development

This project implements specific features and code organization, adhering to modern development practices.

### Key Solutions and Features Implemented:

1.  **[x] State Management with Redux Toolkit**:

    - Utilized Redux Toolkit for centralized and predictable state management across the pwa application.

1.  **[x] Modular Component Architecture**:

    - Organized pwa components into `pages`, `features`, and `components` directories, following a clear separation of concerns.
    - `Pages` handle routing and layout, `Features` encapsulate business logic and data fetching, and `Components` are reusable UI elements.

1.  **[x] Responsive Design**:

    - All pwa components are designed with responsiveness in mind, utilizing `rem` units, Flexbox, Grid, and media queries to ensure optimal viewing across various devices.

1.  **[x] Code Quality and Development Experience**:
    - Integrated Prettier and ESLint for consistent code formatting and linting across both pwa and api.
1.  **[x] Data normalization and caching strategies between PWA and API**:
    - Implemented using the PWA Top Search Queries Chart feature as an example.

## TODO

- [ ] Add testing framework.
- [ ] Implement monorepo structure for better project organization, sharing resources, and strong type definitions.
- [ ] Achieve code coverage above 90% across the codebase.
