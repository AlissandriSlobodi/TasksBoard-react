import { configureStore } from "@reduxjs/toolkit";
import boardsSlice from "./boardsSlice";
import historySlice from "./historySlice";

const localStorageState = localStorage.getItem("reduxState");
const preloadedState = localStorageState
  ? JSON.parse(localStorageState, (key, value) => {
      if (key === "selectedDate") {
        return new Date(value);
      }
      return value;
    })
  : {};

const store = configureStore({
  reducer: {
    boards: boardsSlice.reducer,
    history: historySlice.reducer,
  },
  preloadedState,
});

store.subscribe(() => {
  localStorage.setItem(
    "reduxState",
    JSON.stringify(store.getState(), (key, value) => {
      if (value instanceof Date) {
        return value.toISOString(); // Преобразование объекта Date в строку
      }
      return value;
    })
  );
});

export default store;
