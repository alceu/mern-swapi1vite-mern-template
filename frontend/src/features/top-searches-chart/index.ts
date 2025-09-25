import { createSlice } from "@reduxjs/toolkit";

interface TopSearchesChartState {
  isModalOpen: boolean;
}

const initialState: TopSearchesChartState = {
  isModalOpen: false,
};

const topSearchesChartSlice = createSlice({
  name: "topSearchesChart",
  initialState,
  reducers: {
    openModal(state) {
      state.isModalOpen = true;
    },
    closeModal(state) {
      state.isModalOpen = false;
    },
  },
});

export const { openModal, closeModal } = topSearchesChartSlice.actions;

export default topSearchesChartSlice.reducer;
