import { combineReducers } from "@reduxjs/toolkit";

import apiReducers from "@pwa/api";
import featuresReducers from "@pwa/features";

const rootReducer = combineReducers({
  api: apiReducers,
  features: featuresReducers,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
