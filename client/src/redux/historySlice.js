import { createSlice } from "@reduxjs/toolkit";

const historySlice = createSlice({
  name: "history",
  initialState: [],
  reducers: {
    addToHistory: (state, action) => {
      state.push(action.payload);
    },
    clearHistory: (state) => {
      state.splice(0, state.length);
    },
  },
});

export const { addToHistory, clearHistory } = historySlice.actions;
export default historySlice;
