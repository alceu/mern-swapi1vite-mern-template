import SearchPage from "./SearchPage";
import { filmRoutes } from "./films";
import { peopleRoutes } from "./people";
import Layout from "./Layout";

export const routes = [
  {
    path: "/",
    Component: Layout,
    children: [
      {
        index: true,
        Component: SearchPage,
      },
      {
        path: "people",
        children: peopleRoutes,
      },
      {
        path: "films",
        children: filmRoutes,
      },
    ],
  },
];
