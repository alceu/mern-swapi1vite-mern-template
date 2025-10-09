# MERN SWAPI Project

This project implements a MERN (MongoDB, Express.js, React, Node.js) stack application, leveraging a Vite-based build system for the pwa. Both the pwa and api are developed using TypeScript, ensuring type safety and improved code quality.

## Getting Started

Follow these instructions to set up and run the project.

### 1. Clone the Repository

```bash
git clone <repository-url>
cd mern-swapi1vite-mern-template
```

### 2. **Install dependencies:**

    ```bash
    npm install
    ```

### 3. Optional:

    ```bash
    cp -r sample-.vscode .vscode
    ```

### 4. Environment Setup

To get started, you need to create `.env` files from the provided samples for both the api and pwa. These files will hold your environment-specific variables.

- **For Development:**
  ```bash
  cp sample-development.env .env
  ```
- **For Production:**
  ```bash
  cp sample-production.env .env
  ```
- **Finally, create symbolic links for each workspace:**
  ```bash
  ln -s ../.env pwa/.env && ln -s ../.env api/.env
  ```

**Note:** The `.env` files are ignored by Git, so your secrets are safe. Ensure you configure the variables within these files according to your needs.

### 5. Running the Application

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
    - **api (in one terminal):**
      ```bash
      npm run dev:api
      ```
    - **pwa (in another terminal):**
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

## Project Enhancements and Custom Development

This project extends the base `vite-mern-template` with several key enhancements and custom development tailored for the MERN SWAPI application. These additions focus on implementing specific features, improving code organization, and adhering to modern development practices.

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

## TODO

- [ ] Add testing framework.
- [ ] Implement monorepo structure for better project organization and sharing resources and strong type definitions.
- [ ] Achieve code coverage above 90% across the codebase.
- [ ] Improve data normalization and caching strategies between pwa and api, using pwa Top Search Queries Chart feature as example.

---

---

# **(Original template readme content bellow)**

# vite-mern-template

## Requirements

- [Node.js](https://nodejs.org/en/) 18+

## Demo

![vite-mern-template-gh-demo](https://user-images.githubusercontent.com/78271602/234833309-fe8df564-2895-4727-be1e-c807fe142333.gif)

## Installation

```bash
npx degit apicgg/vite-mern-template my-app
```

or

```bash
git clone https://github.com/apicgg/vite-mern-template.git
```

## Install dependencies (npm or yarn or pnpm)

- api

```bash
npm install
```

- pwa

```bash
npm install
```

## Start the development server

- api

```bash
npm run dev:api
```

- pwa

```bash
npm run dev:pwa
```

- Remove the .github folder and initialize your own git repository with `git init`.

## TODO

- [x] Include eslint and prettier.
- [x] Add testing framework.

## License

MIT License.

Please review the [License](https://github.com/apicgg/vite-mern-template/blob/main/LICENSE).

## Contributors ✨

Contributions of any kind welcome! Kindly have a look into [Contributing Guidelines](CONTRIBUTING.md)
