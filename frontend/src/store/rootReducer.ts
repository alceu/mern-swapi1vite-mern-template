import { combineReducers } from "@reduxjs/toolkit";
import { swapiApi } from "@features/api/swapiApi";
import { searchesStatsApi } from "@features/api/searchesStatsApi";
import featuresReducer from "@features";

const rootReducer = combineReducers({
  [swapiApi.reducerPath]: swapiApi.reducer,
  [searchesStatsApi.reducerPath]: searchesStatsApi.reducer,
  features: featuresReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
