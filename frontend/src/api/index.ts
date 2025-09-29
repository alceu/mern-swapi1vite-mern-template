import { combineReducers, Middleware } from "@reduxjs/toolkit";

import { swapiApi } from "@pwa/api/swapiApi";
import { searchesStatsApi } from "@pwa/api/searchesStatsApi";

export const middlewares: Middleware[] = [
  swapiApi.middleware,
  searchesStatsApi.middleware,
];

const reducers = combineReducers({
  [swapiApi.reducerPath]: swapiApi.reducer,
  [searchesStatsApi.reducerPath]: searchesStatsApi.reducer,
});

export default reducers;
