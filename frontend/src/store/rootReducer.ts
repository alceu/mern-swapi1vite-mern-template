import { combineReducers } from '@reduxjs/toolkit';
import { swapiApi } from '../features/api/swapiApi';

const rootReducer = combineReducers({
  [swapiApi.reducerPath]: swapiApi.reducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
