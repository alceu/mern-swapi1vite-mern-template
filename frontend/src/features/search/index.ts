import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "@store/rootReducer";

interface SearchState {
  query: string;
  searchType: "people" | "films";
}

const initialState: SearchState = {
  query: "",
  searchType: "people",
};

const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    setQuery: (state, action: PayloadAction<string>) => {
      state.query = action.payload;
    },
    setSearchType: (state, action: PayloadAction<"people" | "films">) => {
      state.searchType = action.payload;
    },
  },
});

export const { setQuery, setSearchType } = searchSlice.actions;

export const selectQuery = (state: RootState) => state.search.query;
export const selectSearchType = (state: RootState) => state.search.searchType;

export default searchSlice.reducer;
