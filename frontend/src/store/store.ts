import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./rootReducer";
import { swapiApi } from "@features/api/swapiApi";
import { searchesStatsApi } from "@features/api/searchesStatsApi";

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      swapiApi.middleware,
      searchesStatsApi.middleware
    ),
});

export type AppDispatch = typeof store.dispatch;

export default store;
