import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './rootReducer';
import { swapiApi } from '../features/api/swapiApi';
import { statsApi } from '../features/api/statsApi';

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(swapiApi.middleware, statsApi.middleware),
});

export type AppDispatch = typeof store.dispatch;

export default store;
