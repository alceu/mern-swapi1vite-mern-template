import { configureStore } from "@reduxjs/toolkit";

import { middlewares as apiMiddlewares } from "@pwa/api";

import rootReducer from "./rootReducer";

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiMiddlewares),
});

export type AppDispatch = typeof store.dispatch;

export default store;
