import { Middleware } from "@reduxjs/toolkit";

import { swapi } from "@pwa/api/swapi";
import { searchQueries } from "@pwa/api/searchQueries";
import { topSearches } from "@pwa/api/topSearches";

export const middlewares: Middleware[] = [
  swapi.middleware,
  searchQueries.middleware,
  topSearches.middleware,
];

export const reducers = {
  [swapi.reducerPath]: swapi.reducer,
  [searchQueries.reducerPath]: searchQueries.reducer,
  [topSearches.reducerPath]: topSearches.reducer,
};

export default reducers;
