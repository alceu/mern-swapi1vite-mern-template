import { combineReducers } from "@reduxjs/toolkit";

import searchReducer from "./search";
import topSearchesChartReducer from "./top-searches-chart";

const featuresReducer = combineReducers({
  search: searchReducer,
  topSearchesChart: topSearchesChartReducer,
});

export default featuresReducer;
