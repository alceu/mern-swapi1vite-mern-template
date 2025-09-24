# MERN SWAPI Project

This is a MERN stack project built using a Vite-based boilerplate. It features a React frontend and a Node.js backend, both using TypeScript. The original boilerplate's README is included at the bottom of this file for reference.

## Getting Started

Follow these instructions to set up and run the project.

### 1. Clone the Repository

```bash
git clone <repository-url>
cd mern-swapi1vite-mern-template
```

### 2. Environment Setup

To get started, you need to create `.env` files from the provided samples for both the backend and frontend. These files will hold your environment-specific variables.

- **For Development:**
  ```bash
  cp sample-development.env .env
  cp frontend/sample-development.env frontend/.env
  ```
- **For Production:**
  ```bash
  cp sample-production.env .env
  cp frontend/sample-production.env frontend/.env
  ```

**Note:** The `.env` files are ignored by Git, so your secrets are safe. Ensure you configure the variables within these files according to your needs.

### 3. Running the Application

You can run this project in two ways: using Docker (recommended for a consistent environment) or running the services locally on your machine.

#### A. Docker Development (Recommended)

This is the easiest way to get started. With Docker, the entire application (frontend, backend, and database) runs in containers.

**Prerequisites:**

- Docker
- Docker Compose

**Instructions:**

1.  **Build and run the development containers:**

    ```bash
    docker compose --profile development up --build
    ```

    The `-d` flag can be added to run in detached mode (in the background).

#### B. Docker Production

To run the optimized production build of the application using Docker:

**Instructions:**

1.  **Build and run the production containers:**

    ```bash
    docker compose --profile production up --build
    ```

    The `-d` flag can be added to run in detached mode (in the background).

#### C. Local Development

If you prefer to run the services directly on your machine, follow these steps.

**Prerequisites:**

- Node.js 18+
- npm (or your preferred package manager)
- Docker (for the database)

**Instructions:**

1.  **Install dependencies:**

    ```bash
    npm install
    cd frontend
    npm install
    cd ..
    ```

2.  **Start the database:**

    ```bash
    docker compose up mongo -d
    ```

3.  **Start the development servers:**
    - **Backend (in one terminal):**
      ```bash
      npm run dev:backend
      ```
    - **Frontend (in another terminal):**
      ```bash
      npm run dev:frontend
      ```

**Accessing the Application:**

- **Docker Development:**

  - Backend: `http://localhost:5000`
  - Frontend: `http://localhost:3000`

- **Docker Production:**

  - Backend: `http://localhost:5000`
  - Frontend: `http://localhost:80`

- **Local Development:**
  - Backend: `http://localhost:5000` (default, check your `.env`)
  - Frontend: `http://localhost:3000` (default, check your `frontend/.env`)

---

# vite-mern-template

**(Original template readme content)**

[![Depfu](https://badges.depfu.com/badges/1b70410a7764005553d576dd171dce8d/status.svg)](https://depfu.com)
[![Depfu](https://badges.depfu.com/badges/1b70410a7764005553d576dd171dce8d/count.svg)](https://depfu.com/github/apicgg/vite-mern-template?project_id=38988)

> Simple opinionated boilerplate for MERN stack with Vite, Redux Toolkit and TypeScript.

> This includes React+TypeScript with familiar configuration for vite.config.ts for front-end and Express+TypeScript for back-end.

Feel free to add or tweak the setup as needed.

This has been created with the official [Vite](https://vitejs.dev/) template (`npm create vite@latest`) and some extended setup. There are two separate folders called `backend` and `frontend`. The entry point for the backend is `backend/src/index.js`.

Any package manager can be used with this project (e.g. npm or yarn or pnpm).

```
If you love this boilerplate, give it a star, you will be a ray of sunshine in our lives :)
```

> Thanks to [awesome-vite](https://github.com/vitejs/awesome-vite) for publishing this project.

## Tools & Technology

### Front-end

- [React](https://reactjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [React Router DOM](https://reactrouter.com/)
- [Redux Toolkit](https://redux-toolkit.js.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/)
- [Vitest](https://vitest.dev/)
- [Prettier](https://prettier.io/)
- [Eslint](https://eslint.org/)

### Back-end

- [Node.js](https://nodejs.org/en)
- [Express](https://expressjs.com/)
- [TypeScript](https://www.typescriptlang.org/)
- [express-async-handler](https://www.npmjs.com/package/express-async-handler)
- [mongoose](https://mongoosejs.com/)
- [argon2](https://www.npmjs.com/package/argon2)
- [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken)
- [Prettier](https://prettier.io/)
- [Eslint](https://eslint.org/)

#### The dependency versions are managed by [depfu](https://depfu.com/).

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

- Backend

```bash
npm install
```

- Frontend

```bash
cd frontend
npm install
```

## Start the development server

- Backend

```bash
npm run dev:backend
```

- Frontend

```bash
npm run dev:frontend
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
