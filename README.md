# SWAPI MERN Example

This project implements a MERN (MongoDB, Express.js, React, Node.js) stack application. It leverages a Vite-based build system for the PWA, and both the PWA and API are developed using TypeScript, ensuring type safety and improved code quality.

## Agent instructions (applied by default)

This repository includes a set of AI agent instruction files. The files listed (notably `main.md` and `developer_assistant.md`) are considered the authoritative, foundational instructions and are applied by default for all AI agent interactions related to this project.

## Getting Started

1. Clone the repository:

   ```bash
   git clone <repository-url>
   cd swapi-mern-example
   ```

1. Run the foundational setup:

   ```text
   First of all, please incorporate the agents' foundational instruction files and apply them by default to all our future queries.

   ```

1. Run this developer assistant query for the onboarding overview:

   ```text
   Now please provide a developer onboarding overview.

   ```

1. Run this developer assistant query for local setup and run/debug instructions:

   ```text
   Now please prepare the local development environment after a fresh git clone.

   ```

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

    - Using the PWA Top Search Queries Chart feature as an example.

1.  **[x] Monorepo structure**:

    - For better project organization, sharing resources, and strong type definitions.

1.  **[x] Test coverage**:

    - API testing framework (Jest/Supertest).
    - Code coverage above 70% across the codebase.
