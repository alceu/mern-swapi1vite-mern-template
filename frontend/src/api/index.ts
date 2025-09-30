import { Middleware } from "@reduxjs/toolkit";

import { swapiApi } from "@pwa/api/swapiApi";
import { searchQueryApi } from "@pwa/api/searchQueryApi";
import { topSearchesApi } from "@pwa/api/topSearchesApi";

export const middlewares: Middleware[] = [
  swapiApi.middleware,
  searchQueryApi.middleware,
  topSearchesApi.middleware,
];

export const reducers = {
  [swapiApi.reducerPath]: swapiApi.reducer,
  [searchQueryApi.reducerPath]: searchQueryApi.reducer,
  [topSearchesApi.reducerPath]: topSearchesApi.reducer,
};

export default reducers;
