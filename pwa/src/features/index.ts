import { combineReducers } from "@reduxjs/toolkit";

import searchReducer from "./search";

const reducers = combineReducers({
  search: searchReducer,
});

export default reducers;
