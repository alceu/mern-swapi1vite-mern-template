import SearchPage from "./SearchPage";
import { filmRoutes } from "./films";
import { peopleRoutes } from "./people";
import Layout from "./Layout";
import TopSearchesPage from "./TopSearchesPage";

import "./index.css";

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
      {
        path: "top-searches",
        Component: TopSearchesPage,
      },
    ],
  },
];
