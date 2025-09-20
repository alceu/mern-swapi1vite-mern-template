import { combineReducers } from '@reduxjs/toolkit';
import { swapiApi } from '../features/api/swapiApi';
import { statsApi } from '../features/api/statsApi';

const rootReducer = combineReducers({
  [swapiApi.reducerPath]: swapiApi.reducer,
  [statsApi.reducerPath]: statsApi.reducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
