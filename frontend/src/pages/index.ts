import SearchPage from './SearchPage';
import { filmRoutes } from './films';
import { peopleRoutes } from './people';
import Layout from './Layout'; // Import the new Layout component

export const routes = [
  {
    path: "/",
    element: <Layout />, // Use Layout as the root element
    children: [
      {
        index: true, // This makes SearchPage the default child route for "/"
        element: <SearchPage />,
      },
      {
        path: "people", // Nested path for people
        children: peopleRoutes,
      },
      {
        path: "films", // Nested path for films
        children: filmRoutes,
      },
    ],
  },
];