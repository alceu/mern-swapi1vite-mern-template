# Frontend Agent Instructions

## State Management

1.  **URL-Driven State**:

    - When developing the frontend, the URL, including the route path and query parameters, should be considered the primary source of truth for any persistent UI state. This ensures that the application state is bookmarkable and shareable, and allow the UI to return to its original state on reload.

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
