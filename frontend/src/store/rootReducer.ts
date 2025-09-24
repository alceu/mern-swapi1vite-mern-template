import { combineReducers } from "@reduxjs/toolkit";
import { swapiApi } from "@features/api/swapiApi";
import { searchesStatsApi } from "@features/api/searchesStatsApi";
import searchReducer from "@features/search";

const rootReducer = combineReducers({
  [swapiApi.reducerPath]: swapiApi.reducer,
  [searchesStatsApi.reducerPath]: searchesStatsApi.reducer,
  search: searchReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
