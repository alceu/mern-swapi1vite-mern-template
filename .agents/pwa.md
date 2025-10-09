# PWA Agent Instructions

## State Management

1.  **URL-Driven State**:

    - When developing the pwa, the URL, including the route path and query parameters, should be considered the primary source of truth for any persistent UI state. This ensures that the application state is bookmarkable and shareable, and allows the UI to return to its original state upon reload.

1.  **Active Features Store**:

    - For complex features with internal state that doesn't need to be directly reflected in the URL (e.g., form input values before submission, loading indicators), features store should be used as a global state. This allows feature components to manage and share their state efficiently.

## Data Normalization and Caching

1.  **Normalized Data Fetching**:

    - For displaying lists of data, the pwa will first fetch a list of IDs from the corresponding list endpoint, along with any necessary aggregated or calculated data and labels.
    - It will then retrieve the full object for each item by making individual requests to the `byId` endpoint.
    - This approach ensures that data is normalized in the cache, preventing staleness and duplication.

2.  **Cache Invalidation**:

    - The pwa **must** listen to the event endpoints provided by the api.
    - When an event is received with a list of changed document IDs, the pwa will invalidate the cache for the corresponding `byId` queries and any list (`list`) queries that may be affected.

3.  **Composed Queries**:
    - For complex data fetching scenarios that require data from multiple sources, composed queries **must** be implemented.
    - These queries rely on other, simpler queries for their data, and their caching is managed automatically as the underlying data changes.

## Component Architecture

Adhere to the following separation of concerns for components:

1.  **Pages Components** (located in `src/pages/...`):

    - Their primary responsibility is to handle page and route-related implementations.
    - They manage URL state.
    - They orchestrate the layout of feature components.
    - They should not contain business logic directly.
    - Pages Components are responsible for translating URL parameters into props for Feature Components and handling callbacks from Feature Components to update the URL.

1.  **Features Components** (located in `src/features/...`):

    - These components encapsulate a specific piece of business functionality.
    - They are responsible for data fetching, state and features store management related to the feature and other business logic.
    - **Business Listing Data Handling**: Feature components responsible for displaying lists of business data (e.g., search results, product lists) should handle the data fetching and management for that listing internally as much as possible. This minimizes prop drilling and keeps the data logic co-located with the component responsible for rendering it.
    - Feature Components must expose business-driven event callback props (e.g., `onPersonViewDetails`, `onBackToSearch`) to communicate state changes. The parents Page Components are responsible for implementing these callbacks and translating them into actual routing operations and updating other page-level parameters. This ensures Feature Components remain decoupled from page structures and routing concerns.
    - They should not directly interact with route-related logic or libraries to derive their operational parameters. Instead, all necessary parameters and event functions should be passed down as props from Page Components.
    - To avoid prop drilling, Feature Components can directly access their relevant state from features store using selectors and dispatch actions to update it. However, they should still receive parameters that are directly tied to the URL or routing from their parent Page Components as props.

1.  **UI and Design System Components** (located in `src/components/...`):
    - These are "dumb" components that focus on the UI.
    - They receive all data and functions they need as props.
    - They do not have their own state related to business logic.

## Routing

To maintain a scalable and organized pwa, adhere to the following principles for routing and global styles:

1.  **Modular Route Definition**:
- **Principle**: The `pwa/src/pages/` directory structure should mirror the application\'s URL paths.
    - **Implementation**:
      1. The primary route configuration resides in `pwa/src/pages/index.ts`, exporting an array of route objects.
      1. For each distinct URL segment and subsegment, create a dedicated subfolder (e.g., `pages/films/`). This subfolder must contain an `index.ts` file that exports an array of route objects representing the children routes for that segment.
      1. Each `index.ts` will then import these arrays of route objects and include them as the `children` property of their respective parent route definitions. This ensures a clear hierarchy and modularity that directly reflects the URL structure.

## Responsive Design

To ensure a consistent and accessible user experience across a wide range of devices, from mobile phones to desktops, all pwa components must be built with responsiveness as a primary consideration.

1.  **Use Relative Units**:

    - Prefer `rem` units for `font-size`, `padding`, `margin`, and other dimensions. This allows the entire UI to scale proportionally based on the root font size.
    - Avoid using fixed `px` units, as they do not adapt to user preferences or different screen resolutions.

1.  **Fluid Layouts**:

    - Utilize CSS Flexbox and Grid to create flexible and adaptive layouts.
    - Design components to occupy the available space (`width: 100%`) and use `max-width` to constrain them on larger screens, preventing overly wide and hard-to-read content.

1.  **Responsive Breakpoints**:

    - Use CSS media queries to adjust layouts at common breakpoints (e.g., for mobile, tablet, and desktop).
    - Common adjustments include stacking columns vertically on smaller screens, changing font sizes, or hiding non-essential elements.

1.  **Scalable Components**:
    - Components should be designed to be intrinsically scalable. For example, a card component should gracefully handle varying amounts of text, and a form should be usable on both narrow and wide viewports.

## Styling and CSS

To maintain a clean separation of concerns and promote reusability, adhere to the following guidelines for styling and CSS:

1.  **Semantic Class Naming**:

    - CSS class names should reflect the purpose or content of the element (business-driven) or its UI state, rather than its presentational appearance or layout.
    - **Good Example**: `.product-card`, `.user-profile-avatar`, `.is-active`, `.has-error`.
    - **Bad Example**: `.red-text`, `.left-column`, `.big-button`.

1.  **Presentation via CSS**:

    - All presentational styling (colors, fonts, spacing, layout, etc.) should be handled exclusively through CSS.
    - Avoid using HTML elements or content manipulation (e.g., `&nbsp;`, `<br>`, `UPPERCASE TEXT`) solely for visual presentation.
    - **Good Example**: Use `text-transform: uppercase;` in CSS for uppercase text.
    - **Bad Example**: Writing text in all caps directly in HTML to make it uppercase.

1.  **Avoid Layout-Approached HTML Content**:
    - HTML should define the structure and meaning of content. CSS should define its layout and appearance.
    - Do not use HTML elements or their content to dictate layout (e.g., using empty `div`s for spacing, or relying on text content to create visual breaks).
