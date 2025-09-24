import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "@store/rootReducer";

interface SearchState {
  query: string;
  searchType: "people" | "films";
  isSearching: boolean;
}

const initialState: SearchState = {
  query: "",
  searchType: "people",
  isSearching: false,
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
    setIsSearching: (state, action: PayloadAction<boolean>) => {
      state.isSearching = action.payload;
    },
  },
});

export const { setQuery, setSearchType, setIsSearching } = searchSlice.actions;

export const selectQuery = (state: RootState) => state.features.search.query;
export const selectSearchType = (state: RootState) => state.features.search.searchType;
export const selectIsSearching = (state: RootState) => state.features.search.isSearching;

export default searchSlice.reducer;
