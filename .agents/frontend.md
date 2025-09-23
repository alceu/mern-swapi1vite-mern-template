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
    - They should not directly interact with route-related logic or libraries to derive their operational parameters. Instead, all necessary parameters should be passed down as props from Page Components.
    - Feature Components must expose business-driven event callback props (e.g., `onFilmSelected`, `onPersonViewDetails`, `onBackToSearch`) to communicate state changes. The parents Page Components are responsible for implementing these callbacks and translating them into actual routing operations and updating other page-level parameters. This ensures Feature Components remain decoupled from page structures and routing concerns.

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

## Responsive Design

To ensure a consistent and accessible user experience across a wide range of devices, from mobile phones to desktops, all frontend components must be built with responsiveness as a primary consideration.

1.  **Use Relative Units**:

    - Prefer `rem` units for `font-size`, `padding`, `margin`, and other dimensions. This allows the entire UI to scale proportionally based on the root font size.
    - Avoid using fixed `px` units, as they do not adapt to user preferences or different screen resolutions.

2.  **Fluid Layouts**:

    - Utilize CSS Flexbox and Grid to create flexible and adaptive layouts.
    - Design components to occupy the available space (`width: 100%`) and use `max-width` to constrain them on larger screens, preventing overly wide and hard-to-read content.

3.  **Responsive Breakpoints**:

    - Use CSS media queries to adjust layouts at common breakpoints (e.g., for mobile, tablet, and desktop).
    - Common adjustments include stacking columns vertically on smaller screens, changing font sizes, or hiding non-essential elements.

4.  **Scalable Components**:
    - Components should be designed to be intrinsically scalable. For example, a card component should gracefully handle varying amounts of text, and a form should be usable on both narrow and wide viewports.
