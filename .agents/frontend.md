# Frontend Agent Instructions

## State Management

1.  **URL-Driven State**:

    - When developing the frontend, the URL, including the route path and query parameters, should be considered the primary source of truth for any persistent UI state. This ensures that the application state is bookmarkable and shareable, and allows the UI to return to its original state upon reload.

## Component Architecture

Adhere to the following separation of concerns for components:

1.  **Pages Components** (located in `src/pages/...`):

    - Their primary responsibility is to handle page and route-related implementations.
    - They manage URL state.
    - They orchestrate the layout of feature components.
    - They should not contain business logic directly.

2.  **Features Components** (located in `src/features/...`):

    - These components encapsulate a specific piece of business functionality.
    - They are responsible for data fetching, state management related to the feature, and other business logic.
    - They receive their business logic parameters from Pages Components.
    - They use callback props (e.g., `onQueryChange`) to communicate important state changes back to the Pages Components, which can then update the URL etc.

3.  **UI and Design System Components** (located in `src/components/...`):
    - These are "dumb" components that focus on the UI.
    - They receive all data and functions they need as props.
    - They do not have their own state related to business logic.

## Routing

To maintain a scalable and organized frontend, adhere to the following principles for routing and global styles:

1.  **Modular Route Definition**:
    - **Principle**: The `frontend/src/pages/` directory structure should mirror the application's URL paths. This organization enhances discoverability, maintainability, and scalability by co-locating route-related files (components, loaders, actions) with their corresponding URL segments.
    - **Implementation**:
      - The primary route configuration resides in `frontend/src/pages/index.ts`, exporting an array of route objects.
      - For each distinct URL segment and subsegment, create a dedicated subfolder. This subfolder must contain an `index.ts` file that exports its specific route definitions.
      - These feature-specific route arrays are then imported and nested within the main `frontend/src/pages/index.ts` configuration using the `children` property, ensuring a clear hierarchy and modularity that directly reflects the URL structure.
