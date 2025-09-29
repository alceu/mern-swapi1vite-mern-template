import { combineReducers } from "@reduxjs/toolkit";

import apiReducers from "@pwa/api";
import featuresReducers from "@pwa/features";

const rootReducer = combineReducers({
  ...apiReducers,
  features: featuresReducers,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
