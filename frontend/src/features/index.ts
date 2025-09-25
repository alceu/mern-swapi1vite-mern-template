import { combineReducers } from "@reduxjs/toolkit";

import searchReducer from "./search";

const featuresReducer = combineReducers({
  search: searchReducer,
});

export default featuresReducer;
